"use client";

import styles from "@/app/publish/components/Form/Form.module.css";
import Warn from "@/components/Warn/Warn";
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormDataInterface {
  authorId: string;
  title: string;
  content: string;
}

export default function Form() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataInterface>();
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      {
        setValue("authorId", session.user.id);
      }
    }
  }, [session?.user?.id, setValue]);

  const onSubmit = async (data: FormDataInterface) => {
    const formData = new FormData();
    formData.append("authorId", data.authorId);
    formData.append("title", data.title);
    formData.append("content", data.content);

    const res = await fetch("/api/publish", {
      method: "POST",
      body: formData,
    });

    reset();

    if (res.ok) {
      const data = await res.json();
      setPosted(true);
      setTimeout(() => router.push(`/blog/${data.result.id}`), 3000);
    } else {
      console.error("Failed to publish post");
    }
  };

  if (posted)
    return (
      <Warn
        title="Post published successfully!"
        message="Navigating in 3 seconds to your post to see it live..."
      />
    );

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={styles.signinError}
          style={errors.authorId && { opacity: 1 }}
        >
          You have to sign in before publishing
        </div>

        <div className="field-row-stacked">
          <label style={{ fontSize: "2rem" }} htmlFor="text18">
            Post Title
          </label>
          <span
            className={styles.required}
            style={errors.title && { opacity: 1 }}
          >
            This field is required
          </span>
          <input
            className={`${styles.input} ${styles.fontSize}`}
            id="text18"
            type="text"
            {...register("title", {
              required: true,
              maxLength: MAX_TITLE_LENGTH,
            })}
            disabled={isSubmitting}
          />
        </div>

        <div className="field-row-stacked">
          <label className={styles.fontSize} htmlFor="text20">
            Additional notes
          </label>
          <span
            className={styles.required}
            style={errors.content && { opacity: 1 }}
          >
            This field is required
          </span>
          <textarea
            className={styles.fontSize}
            id="text20"
            rows={10}
            {...register("content", {
              required: true,
              maxLength: MAX_CONTENT_LENGTH,
            })}
            disabled={isSubmitting}
          ></textarea>

          <input
            type="hidden"
            {...register("authorId", { required: true })}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.btnContainer}>
          <button
            type="submit"
            className={`${styles.fontSize} ${styles.btn} default`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
