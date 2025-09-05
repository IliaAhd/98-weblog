import { Post, User } from "@prisma/client";
import styles from "./PostsView.module.css";
import Link from "next/link";

type PostWithAuthor = Post & {
  author?: User | null;
};

export default function PostsView({
  posts,
  isProfile = false,
}: {
  posts: PostWithAuthor[] | undefined;
  isProfile?: boolean;
}) {
  if (!posts) return null;

  return (
    <div className={`${styles.table} sunken-panel`}>
      <table className="interactive">
        <thead>
          <tr style={{ width: "100%" }}>
            <th>Title</th>
            <th>Post</th>
            <th>{!isProfile ? "Author" : "Creation date"}</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr className={styles.row} key={post.id}>
              <td>
                <Link href={`/blog/${post.id}`}>{post.title} </Link>
              </td>
              <td>
                <Link href={`/blog/${post.id}`}>
                  {post.content?.slice(0, 20)}...{" "}
                </Link>
              </td>
              <td>
                {!isProfile
                  ? post.author?.name
                  : post.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
