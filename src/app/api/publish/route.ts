import { editPost, publishPost } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = await publishPost(formData);
    return NextResponse.json({ success: true, result: res });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = await editPost(formData);
    return NextResponse.json({ success: true, result: res });
  } catch {
    return NextResponse.json({ success: false });
  }
}
