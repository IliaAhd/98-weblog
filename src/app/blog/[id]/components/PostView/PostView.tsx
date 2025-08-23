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

type PostWithAuthor = Post & {
  author: User | null;
};

export default function PostView({ post }: { post: PostWithAuthor }) {
  const { data } = useSession();
  const [showModal, setShowModal] = useState<"delete" | "edit" | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDeletePost() {
    try {
      setLoading(true);
      if (post.authorId !== data?.user?.id) return;

      await fetch(`/api/publish/${post.id}`, {
        method: "DELETE",
      });

      setDeleteMessage("Post deleted successfully!");

      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch {
      setDeleteMessage("Failed to delete post");
    } finally {
      setLoading(false);
    }
  }

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/publish", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/blog/${data.result.id}`);
        setShowModal(null);
      } else {
        console.error("Failed to edit post");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (deleteMessage)
    return (
      <Warn
        title={deleteMessage}
        message="Navigating to blog page in 3 seconds..."
      />
    );

  return (
    <div className={`${styles.post} window`}>
      <div className="title-bar">
        <div
          className="title-bar-text"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingInline: "8px",
            paddingBlock: "5px",
          }}
        >
          <div>{post?.title}</div>

          {post.authorId === data?.user?.id && (
            <div>
              <Image
                className={styles.btn}
                onClick={() => setShowModal("edit")}
                width={35}
                height={35}
                src={editImg}
                alt="edit"
              />

              <Image
                className={styles.btn}
                onClick={() => setShowModal("delete")}
                width={35}
                height={35}
                src={trashImg}
                alt="trash"
                title="Delete your post"
              />
            </div>
          )}
        </div>
      </div>

      <div className="window-body">
        <pre style={{ whiteSpace: "pre-wrap" }}>{post?.content}</pre>
      </div>

      <div className="status-bar">
        <p className="status-bar-field">Author: {post?.author?.name}</p>
        <p className="status-bar-field">
          Word Count: {post?.content?.split(" ").length}
        </p>
        <p className="status-bar-field">
          Created At: {new Date(post?.createdAt).toLocaleDateString()}
        </p>
      </div>

      {showModal === "delete" ? (
        <Warn
          title="Warning!"
          message="Are you sure you want to delete your post?"
          handleClose={() => setShowModal(null)}
        >
          <>
            <button
              disabled={loading}
              className="default"
              onClick={() => setShowModal(null)}
            >
              Close
            </button>

            <button disabled={loading} onClick={handleDeletePost}>
              Delete
            </button>
          </>
        </Warn>
      ) : showModal === "edit" ? (
        <Warn
          title="Editing!"
          message="Edit your post."
          handleClose={() => setShowModal(null)}
        >
          <div className={styles.form}>
            <form onSubmit={handleEditPost}>
              <div className="field-row-stacked">
                <label htmlFor="text18">Title</label>
                <input
                  disabled={loading}
                  defaultValue={post.title}
                  id="text18"
                  type="text"
                  name="title"
                />
              </div>

              <div className="field-row-stacked">
                <label htmlFor="text20">Content</label>
                <textarea
                  disabled={loading}
                  defaultValue={post.content || undefined}
                  id="text20"
                  rows={8}
                  name="content"
                ></textarea>
              </div>

              <input
                disabled={loading}
                type="hidden"
                defaultValue={post.authorId}
                name="authorId"
              />
              <input
                disabled={loading}
                type="hidden"
                defaultValue={post.id}
                name="postId"
              />

              <div className={styles.buttons}>
                <button disabled={loading} onClick={() => setShowModal(null)}>
                  Close
                </button>

                <button className="default" disabled={loading}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </Warn>
      ) : null}
    </div>
  );
}
