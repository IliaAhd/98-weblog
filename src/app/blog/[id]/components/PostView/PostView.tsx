"use client";

import styles from "@/app/blog/[id]/components/PostView/PostView.module.css";
import Warn from "@/components/Warn/Warn";
import { Like, Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import trashImg from "/public/recycle_bin_file.png";
import editImg from "/public/true_type_paint.png";
import successImg from "/public/success.png";
import heartFillImg from "/public/heart_fill.png";
import heartEmptyImg from "/public/heart_empty.png";

import { deletePost, editPost, likePost, unlikePost } from "@/lib/actions";
import { formatDistanceStrict } from "date-fns";

interface PostWithAuthor extends Post {
  author: User | null;
  likes: Like[];
}

interface PostViewProps {
  post: PostWithAuthor;
}

export default function PostView({ post }: PostViewProps) {
  const { data } = useSession();
  const router = useRouter();

  const isAuthor = post.authorId === data?.user?.id;

  // likes state
  const likedByUser = post.likes.some((like) => like.userId === data?.user?.id);
  const [liked, setLiked] = useState(likedByUser);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  // UI state
  const [showModal, setShowModal] = useState<"delete" | "edit" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  /** Toggle like with optimistic UI */
  async function toggleLike() {
    if (!data?.user?.id) return;
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
      try {
        await unlikePost(post.id);
      } catch {
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      try {
        await likePost(post.id);
      } catch {
        setLiked(false);
        setLikeCount((c) => c - 1);
      }
    }
  }

  /** Delete post */
  async function handleDelete() {
    if (!isAuthor) return;
    try {
      setLoading(true);
      await deletePost(post.id);
      setMessage("Post deleted successfully!");
      setTimeout(() => router.push("/profile"), 3000);
    } catch {
      setError("Failed to delete post!");
    } finally {
      setLoading(false);
    }
  }

  /** Edit post */
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
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
      {/* Post */}
      <div className={`${styles.post} window`}>
        <div className="title-bar">
          <div className={`title-bar-text ${styles.title}`}>
            <div>{post.title}</div>
            {isAuthor && (
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

        {/* Content */}
        <div className="window-body">
          <pre className={styles.content}>{post.content}</pre>
        </div>

        {/* Likes / Views / Comments */}
        <div className={`status-bar ${styles.status}`}>
          <p
            className="status-bar-field"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Image
              onClick={toggleLike}
              style={{ cursor: "pointer" }}
              src={liked ? heartFillImg : heartEmptyImg}
              alt="Like"
              width={30}
              height={30}
            />
            <span style={{ fontSize: "1rem" }}>{likeCount}</span>
          </p>
          <p className="status-bar-field">Views: {post.views}</p>
          <p
            className="status-bar-field"
            style={{ color: "#616161" }}
            title="Soon.."
          >
            Comments: 0
          </p>
        </div>

        {/* Author / Date */}
        <div className={`status-bar ${styles.status}`}>
          <p className="status-bar-field">
            Author:{" "}
            <Link href={`/profile/${post.authorId}`}>{post.author?.name}</Link>
          </p>
          <p
            title={new Date(post.createdAt).toDateString()}
            className="status-bar-field"
          >
            {formatDistanceStrict(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {/* Delete Modal */}
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
            <button disabled={loading} onClick={handleDelete}>
              Delete
            </button>
          </>
        </Warn>
      )}

      {/* Edit Modal */}
      {showModal === "edit" && (
        <Warn
          title="Editing!"
          message="Edit your post."
          handleClose={() => setShowModal(null)}
          img={editImg}
        >
          <div className={styles.form}>
            <form onSubmit={handleEdit}>
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

      {/* Alerts */}
      {error && <Warn title="Something went wrong!" message={error} />}
      {message && (
        <Warn
          title={message}
          message="Navigating to your profile page in 3 seconds..."
          img={successImg}
        />
      )}
    </>
  );
}
