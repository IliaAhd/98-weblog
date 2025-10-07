import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import { siteUrl } from "@/utils/site";

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
