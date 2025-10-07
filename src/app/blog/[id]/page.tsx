import { prisma } from "@/lib/prisma";
import PostView from "./components/PostView/PostView";
import Warn from "@/components/Warn/Warn";
import Link from "next/link";
import Views from "@/components/Views";
import { siteUrl } from "@/utils/site";

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
  const url = `${siteUrl}/blog/${post.id}`;
  const description =
    post.content?.slice(0, 160) || "Read this post on 98 Weblog.";
  const image = `${siteUrl}/favicon.ico`;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      images: [image],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    other: {
      "article:author": post.author?.name || undefined,
      "article:published_time": post.createdAt?.toISOString?.(),
      "article:modified_time": post.updatedAt?.toISOString?.(),
      // "article:tag": post.tags?.join(", ") || undefined,
    },
    // Note: JSON-LD is injected into the page output (see Post component) because
    // Next's Metadata object doesn't accept a top-level `jsonLd` key.
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
      {/* JSON-LD structured data for the post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: (post.content || "").slice(0, 160),
            author: {
              "@type": "Person",
              name: post.author?.name || "Unknown",
            },
            datePublished: post.createdAt?.toISOString?.(),
            dateModified: post.updatedAt?.toISOString?.(),
            url: `https://98weblog.com/blog/${post.id}`,
            image: "https://98weblog.com/favicon.ico",
          }),
        }}
      />
      <Views postId={post.id} />
    </>
  );
}
