import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const postId = Number((await params).id);

  // Read cookie
  const cookie = req.cookies.get("viewed_posts")?.value;
  const viewedPosts: number[] = cookie ? JSON.parse(cookie) : [];

  // Already viewed? Don’t increment again
  if (viewedPosts.includes(postId)) {
    return NextResponse.json({ success: false, alreadyViewed: true });
  }

  // Increment views in DB
  await prisma.post.update({
    where: { id: postId },
    data: { views: { increment: 1 } },
  });

  // Update cookie
  viewedPosts.push(postId);
  const res = NextResponse.json({ success: true });
  res.cookies.set("viewed_posts", JSON.stringify(viewedPosts), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
