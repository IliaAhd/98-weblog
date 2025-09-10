"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { prisma } from "@/lib/prisma";
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/utils/constants";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signOutWithGoogle() {
  await signOut();
  revalidatePath("/");
}

export async function publishPost(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("Not Authenticated!");

  const authorId = formData.get("authorId")?.toString();
  const title = formData
    .get("title")
    ?.toString()
    .trim()
    .slice(0, MAX_TITLE_LENGTH);
  const content = formData
    .get("content")
    ?.toString()
    .slice(0, MAX_CONTENT_LENGTH);

  if (!authorId || !title || !content) return;

  const newPost = {
    authorId,
    title,
    content,
  };

  const post = await prisma.post.create({
    data: newPost,
  });

  return post;
}

export async function editPost(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("Not Authenticated!");

  const authorId = formData.get("authorId")?.toString();
  const postId = formData.get("postId");
  const title = formData
    .get("title")
    ?.toString()
    .trim()
    .slice(0, MAX_TITLE_LENGTH);
  const content = formData
    .get("content")
    ?.toString()
    .slice(0, MAX_CONTENT_LENGTH);

  if (!authorId || !title || !content || !postId) return;

  await prisma.post.update({
    where: { id: +postId },
    data: {
      title,
      content,
    },
  });

  revalidatePath(`/blog/${postId}`);
}

export async function deletePost(id: number) {
  const session = await auth();

  if (!session) throw new Error("Not Authenticated!");

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!post) throw new Error("Post not found!");

  if (post.authorId !== session.user?.id) throw new Error("Not authorized");

  return await prisma.post.delete({ where: { id } });
}
