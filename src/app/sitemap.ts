import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://98-weblog.vercel.app";

export default async function sitemap() {
  const posts = await prisma.post.findMany();
  const urls = posts.map((p: Post) => ({
    url: `${siteUrl}/blog/${p.id}`,
    lastModified: p.updatedAt,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...urls,
  ];
}
