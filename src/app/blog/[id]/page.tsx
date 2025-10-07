import { prisma } from "@/lib/prisma";
import PostView from "./components/PostView/PostView";
import Warn from "@/components/Warn/Warn";
import Link from "next/link";
import Views from "@/components/Views";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: +id },
    include: { author: true, likes: true },
  });

  if (!post) return {};

  return {
    title: post.title,
    content: post.content,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: +id },
    include: { author: true, likes: true },
  });

  if (!post)
    return (
      <Warn title="Error!" message="Post not found">
        <>
          <button>
            <Link href="/">Go to Home</Link>
          </button>
          <button>
            <Link href="/blog">Visit weblog</Link>
          </button>
        </>
      </Warn>
    );

  return (
    <>
      <PostView post={post} />
      <Views postId={post.id} />
    </>
  );
}
