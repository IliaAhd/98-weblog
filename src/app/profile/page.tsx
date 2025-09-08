import PostsView from "@/components/PostsView/PostsView";
import SignIn from "@/components/SignIn/SignIn";
import Warn from "@/components/Warn/Warn";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Profile from "./components/Profile/Profile";

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
      Post: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user?.Post || !user.Post.length)
    return (
      <Warn title="No posts yet" message="Share your first post">
        <button>
          <Link href="/publish">Publish</Link>
        </button>
      </Warn>
    );

  return (
    <div>
      <Profile session={session} />

      <div>
        <div
          className="title-bar"
          style={{
            maxWidth: "800px",
            fontSize: "1rem",
            marginTop: "1rem",
            marginInline: "auto",
          }}
        >
          <div className="title-bar-text">Your posts</div>
        </div>
        <PostsView posts={user?.Post} isProfile={true} />
      </div>
    </div>
  );
}
