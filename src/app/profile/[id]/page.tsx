import PostsView from "@/components/PostsView/PostsView";
import Warn from "@/components/Warn/Warn";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/avatar/${id}`
  );
  const img = await res.json();

  if (!user) return <Warn title="Error!" message="User not found" />;

  return (
    <div>
      <div
        style={{
          fontSize: "1.3rem",
          maxWidth: "800px",
          marginInline: "auto",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1rem",
          border: "2px solid #ddd",
        }}
        className="title-bar inactive"
      >
        <div
          className="title-bar-text"
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Image
            style={{
              border: "1px solid #ddd",
              borderRadius: "100%",
              backgroundColor: "#ddd",
            }}
            src={img.avatar}
            width={50}
            height={50}
            alt="Avatar"
          />
          <div>{user?.name}</div>
        </div>

        <div className="title-bar-controls">
          <div>Total posts: {user?.Post?.length || 0}</div>
        </div>
      </div>

      <div>
        <PostsView posts={user?.Post} isProfile={true} />
      </div>
    </div>
  );
}
