import PostsView from "@/components/PostsView/PostsView";
import Warn from "@/components/Warn/Warn";
import { prisma } from "@/lib/prisma";
import Profile from "../components/Profile/Profile";

export default async function UsersProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/avatar/${id}`
  );
  const img = await res.json();

  if (!user) return <Warn title="Error!" message="User not found" />;

  return (
    <div>
      <Profile user={user} avatar={img.avatar} />

      <div>
        <PostsView posts={user?.posts} isProfile={true} />
      </div>
    </div>
  );
}
