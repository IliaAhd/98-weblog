import PostsView from "@/components/PostsView/PostsView";
import Warn from "@/components/Warn/Warn";
import { prisma } from "@/lib/prisma";

export default async function UsersProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Post: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) return <Warn title="Error!" message="User not found" />;

  return (
    <div>
      <div
        style={{
          fontSize: "1.3rem",
          maxWidth: "1100px",
          marginInline: "auto",
          padding: "0.5rem",
        }}
        className="title-bar inactive"
      >
        <div className="title-bar-text">{user?.name}&apos;s profile</div>
        <div className="title-bar-controls">
          Total posts: {user?.Post?.length || 0}
        </div>
      </div>
      <div>
        <PostsView posts={user?.Post} isProfile={true} />
      </div>
    </div>
  );
}
