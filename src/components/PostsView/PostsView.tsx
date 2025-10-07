import styles from "./PostsView.module.css";
import Link from "next/link";
import { PostWithAuthor } from "@/types/types";
import { formatDistanceStrict } from "date-fns";

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
          <tr>
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
                {!isProfile ? (
                  <Link href={`/profile/${post.author?.id}`}>
                    {post.author?.name}
                  </Link>
                ) : (
                  <span title={new Date(post.createdAt).toDateString()}>
                    {formatDistanceStrict(
                      new Date(post.createdAt),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
