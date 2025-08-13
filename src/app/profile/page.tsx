import PostsView from "@/components/PostsView/PostsView";
import SignIn from "@/components/SignIn/SignIn";
import Warn from "@/components/Warn/Warn";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session)
    return (
      <Warn message="Not authenticated!">
        <SignIn />
      </Warn>
    );

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      Post: true,
    },
  });

  return (
    <div>
      <PostsView posts={user?.Post} isProfile={true} />
    </div>
  );
}
