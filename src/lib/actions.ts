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
    select: { authorId: true, title: true },
  });

  if (!post) throw new Error("Post not found!");

  const isAdmin = session.user.role === "ADMIN";
  const isAuthor = post.authorId === session.user.id;

  if (!isAdmin && !isAuthor) throw new Error("Not authorized");

  await prisma.like.deleteMany({ where: { postId: id } });
  const deletedPost = await prisma.post.delete({ where: { id } });

  return deletedPost;
}

export async function likePost(postId: number) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Not authenticated" };

  try {
    await prisma.like.create({
      data: { userId: session.user.id, postId },
    });
    revalidatePath(`/blog/${postId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Already liked" };
  }
}

export async function unlikePost(postId: number) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Not authenticated" };

  try {
    await prisma.like.delete({
      where: { userId_postId: { userId: session.user.id, postId } },
    });
    revalidatePath(`/blog/${postId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Not liked yet" };
  }
}

// export async function createNotification({
//   userId,
//   actorId,
//   postId,
//   postTitle,
//   message,
// }: {
//   userId: string;
//   actorId?: string;
//   postId?: number;
//   postTitle?: string;
//   message: string;
// }) {
//   return await prisma.notification.create({
//     data: {
//       userId,
//       actorId,
//       postId,
//       postTitle,
//       message,
//     },
//   });
// }

// export async function getNotifications() {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   return await prisma.notification?.findMany({
//     where: { userId: session.user.id },
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function markNotificationAsRead(id: number) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const notif = await prisma.notification.findUnique({ where: { id } });
//   if (!notif || notif.userId !== session.user.id) {
//     throw new Error("Forbidden");
//   }

//   return await prisma.notification.update({
//     where: { id },
//     data: { read: true },
//   });
// }
