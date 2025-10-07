import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";

export default async function sitemap() {
  const getPosts = await prisma.post.findMany();
  const post = getPosts.map((post: Post) => {
    return {
      url: `https://98-weblog.vercel.app/blog/${post.id}`,
      lastModified: post.updatedAt,
    };
  });

  return [
    {
      url: "https://98-weblog.vercel.app",
      lastModified: new Date(),
    },
    ...post,
  ];
}
