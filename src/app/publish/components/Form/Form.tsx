"use client";

import styles from "@/app/publish/components/Form/Form.module.css";
import Warn from "@/components/Warn/Warn";
import { publishPost } from "@/lib/actions";
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import successImg from "/public/success.png";

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
  const [posted, setPosted] = useState<boolean>(false);
  const [maxTitle, setMaxTitle] = useState<number>(0);
  const [maxContent, setMaxContent] = useState<number>(0);

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

    const res = await publishPost(formData);

    if (res) {
      reset();
      setPosted(true);
      setTimeout(() => router.push(`/blog/${res.id}`), 3000);
    } else {
      throw new Error("Failed to publish post");
    }
  };

  if (posted)
    return (
      <Warn
        title="Post published successfully!"
        message="Navigating in 3 seconds to your post to see it live..."
        img={successImg}
      />
    );

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={styles.signinError}
          style={errors.authorId && { opacity: 1 }}
        >
          You have to sign in before publishing!
        </div>

        <div className="field-row-stacked">
          <label className={styles.label} htmlFor="text18">
            <div className={styles.requirements}>
              Title
              <span
                className={styles.required}
                style={errors.title && { opacity: 1 }}
              >
                This field is required!
              </span>
            </div>
            <span className={styles.length}>
              <span
                style={maxTitle === MAX_TITLE_LENGTH ? { color: "red" } : {}}
              >
                {maxTitle}
              </span>
              /{MAX_TITLE_LENGTH}
            </span>
          </label>
          <input
            className={`${styles.input} ${styles.fontSize}`}
            id="text18"
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            {...register("title", {
              required: true,
              maxLength: MAX_TITLE_LENGTH,
              onChange: (e) => setMaxTitle(e.target.value.length),
            })}
            disabled={isSubmitting}
          />
        </div>

        <div className="field-row-stacked">
          <label className={styles.label} htmlFor="text20">
            <div className={styles.requirements}>
              Post content
              <span
                className={styles.required}
                style={errors.content && { opacity: 1 }}
              >
                This field is required!
              </span>
            </div>
            <span className={styles.length}>
              <span
                style={
                  maxContent === MAX_CONTENT_LENGTH ? { color: "red" } : {}
                }
              >
                {maxContent}
              </span>
              /{MAX_CONTENT_LENGTH}
            </span>
          </label>
          <textarea
            className={styles.fontSize}
            id="text20"
            rows={10}
            maxLength={MAX_CONTENT_LENGTH}
            {...register("content", {
              required: true,
              maxLength: MAX_CONTENT_LENGTH,
              onChange: (e) => setMaxContent(e.target.value.length),
            })}
            disabled={isSubmitting}
          ></textarea>

          <input
            type="hidden"
            {...register("authorId", { required: true })}
            disabled={isSubmitting}
          />
        </div>

        <div>
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
