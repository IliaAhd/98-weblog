"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
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

  if (!authorId || !title || !content) return "error";

  const newPost = {
    authorId,
    title,
    content,
  };

  return await prisma.post.create({
    data: newPost,
  });
}

export async function editPost(formData: FormData) {
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

  if (!authorId || !title || !content || !postId) return "error";

  return await prisma.post.update({
    where: { id: +postId },
    data: {
      title,
      content,
    },
  });
}
