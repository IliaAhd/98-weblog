import Warn from "@/components/Warn/Warn";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PostsView from "../../components/PostsView/PostsView";
import Pagination from "@/components/Pagination/Pagination";
import { POSTS_PER_PAGE } from "@/utils/constants";

export const dynamic = "force-dynamic";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const postsPerPage = POSTS_PER_PAGE;
  const currentPage = Number(searchParams?.page) || 1;

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),
    prisma.post.count(),
  ]);

  const lastPage = Math.ceil(totalPosts / postsPerPage);

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
      <Pagination currentPage={currentPage} lastPage={lastPage} />
    </>
  );
}
