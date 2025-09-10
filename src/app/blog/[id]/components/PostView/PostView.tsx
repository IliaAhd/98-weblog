"use client";

import styles from "@/app/blog/[id]/components/PostView/PostView.module.css";
import Warn from "@/components/Warn/Warn";
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import trashImg from "/public/recycle_bin_file.png";
import editImg from "/public/true_type_paint.png";
import successImg from "/public/success.png";
import { deletePost, editPost } from "@/lib/actions";

interface PostWithAuthor extends Post {
  author: User | null;
}

interface PostViewProps {
  post: PostWithAuthor;
}

export default function PostView({ post }: PostViewProps) {
  const { data } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState<"delete" | "edit" | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function handleDeletePost() {
    try {
      setLoading(true);
      if (post.authorId !== data?.user?.id) return;

      await deletePost(post.id);

      setMessage("Post deleted successfully!");
      setTimeout(() => router.push("/profile"), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete post!");
    } finally {
      setLoading(false);
    }
  }

  async function handleEditPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      await editPost(formData);
      setShowModal(null);
    } catch {
      setError("Failed to edit post!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={`${styles.post} window`}>
        <div className="title-bar">
          <div className={`title-bar-text ${styles.title}`}>
            <div>{post.title}</div>
            {post.authorId === data?.user?.id && (
              <div>
                <Image
                  className={styles.btn}
                  onClick={() => setShowModal("edit")}
                  width={35}
                  height={35}
                  src={editImg}
                  alt="edit"
                  title="Edit your post"
                />
                <Image
                  className={styles.btn}
                  onClick={() => setShowModal("delete")}
                  width={35}
                  height={35}
                  src={trashImg}
                  alt="delete"
                  title="Delete your post"
                />
              </div>
            )}
          </div>
        </div>

        <div className="window-body">
          <pre className={styles.content}>{post.content}</pre>
        </div>

        <div className={`status-bar ${styles.status}`}>
          <p className="status-bar-field">Author: {post.author?.name}</p>
          <p className="status-bar-field">Views: {post.views}</p>
          <p className="status-bar-field">
            Created At: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {showModal === "delete" && (
        <Warn
          title="Warning!"
          message="Are you sure you want to delete your post?"
          handleClose={() => setShowModal(null)}
        >
          <>
            <button disabled={loading} onClick={() => setShowModal(null)}>
              Close
            </button>
            <button disabled={loading} onClick={handleDeletePost}>
              Delete
            </button>
          </>
        </Warn>
      )}

      {error && <Warn title="Something went wrong!" message={error} />}

      {message && (
        <Warn
          title={message}
          message="Navigating to your profile page in 3 seconds..."
          img={successImg}
        />
      )}

      {showModal === "edit" && (
        <Warn
          title="Editing!"
          message="Edit your post."
          handleClose={() => setShowModal(null)}
          img={editImg}
        >
          <div className={styles.form}>
            <form onSubmit={handleEditPost}>
              <div className="field-row-stacked">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={post.title}
                  disabled={loading}
                />
              </div>

              <div className="field-row-stacked">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  rows={8}
                  defaultValue={post.content || undefined}
                  disabled={loading}
                />
              </div>

              <input type="hidden" name="authorId" value={post.authorId} />
              <input type="hidden" name="postId" value={post.id} />

              <div className={styles.buttons}>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowModal(null)}
                >
                  Close
                </button>
                <button className="default" disabled={loading}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </Warn>
      )}
    </>
  );
}
