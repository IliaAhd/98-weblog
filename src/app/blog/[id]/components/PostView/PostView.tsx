"use client";

import styles from "@/app/blog/[id]/components/PostView/PostView.module.css";
import Warn from "@/components/Warn/Warn";
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import trashImg from "/public/recycle_bin_file.png";

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
            marginRight: "0 !important",
          }}
        >
          <div>{post?.title}</div>

          {post.authorId === data?.user?.id && (
            <>
              {/* <button
                  onClick={() => setShowModal("edit")}
                  className={`default ${styles.btn}`}
                >
                  <Image width={28} height={28} src={editImg} alt="edit" />
                </button> */}

              <Image
                className={styles.btn}
                onClick={() => setShowModal("delete")}
                width={35}
                height={35}
                src={trashImg}
                alt="trash"
                title="Delete your post"
              />
            </>
          )}
        </div>
      </div>
      <div className="window-body">{post?.content}</div>
      <div className="status-bar">
        <p className="status-bar-field">Author: {post?.author?.name}</p>
        <p className="status-bar-field">
          Word Count: {post?.content?.split(" ").length}
        </p>
        <p className="status-bar-field">
          Created At: {post?.createdAt?.toLocaleDateString()}
        </p>
      </div>

      {showModal === "delete" ? (
        <Warn
          title="Warning!"
          message="Are you sure want to delete your post?"
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
          <button
            disabled={loading}
            className="default"
            onClick={() => setShowModal(null)}
          >
            Close
          </button>
        </Warn>
      ) : null}
    </div>
  );
}
