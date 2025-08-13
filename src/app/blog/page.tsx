import { prisma } from "@/lib/prisma";
import PostsView from "../../components/PostsView/PostsView";
import Warn from "@/components/Warn/Warn";
import Link from "next/link";

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
    <div>
      <PostsView posts={posts} />
    </div>
  );
}
