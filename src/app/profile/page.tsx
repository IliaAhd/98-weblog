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
      posts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/avatar/${session?.user?.id}`
  );
  const img = await res.json();

  return (
    <div>
      {user && (
        <Profile user={user} avatar={img.avatar} isPrivateProfile={true} />
      )}

      {!user?.posts || !user.posts.length ? (
        <Warn title="No posts yet" message="Share your first post">
          <button>
            <Link href="/publish">Publish</Link>
          </button>
        </Warn>
      ) : (
        <div>
          <div
            className="title-bar"
            style={{
              maxWidth: "1100px",
              fontSize: "1rem",
              marginTop: "1rem",
              marginInline: "auto",
            }}
          >
            <div className="title-bar-text">Your posts</div>
          </div>
          <PostsView posts={user?.posts} isProfile={true} />
        </div>
      )}
    </div>
  );
}
