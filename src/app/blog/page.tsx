import Warn from "@/components/Warn/Warn";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PostsView from "../../components/PostsView/PostsView";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts || posts.length === 0)
    return (
      <Warn title="No posts found" message="Be the first one to post!">
        <button>
          <Link href="/publish">Create a post</Link>
        </button>
      </Warn>
    );

  return (
    <>
      <PostsView posts={posts} />
    </>
  );
}
