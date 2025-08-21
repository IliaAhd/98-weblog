"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/lib/actions";
import { useSession } from "next-auth/react";
import styles from "@/components/SignIn/SignIn.module.css";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <button className={styles.btn}>Loading...</button>;

  if (session?.user)
    return (
      <form action={signOutWithGoogle}>
        <button className={styles.btn}>
          <span className={styles.userName}>{session.user.name} /</span> Sign
          Out
        </button>
      </form>
    );

  return (
    <form action={signInWithGoogle}>
      <button className={styles.btn} type="submit">
        Signin with Google
      </button>
    </form>
  );
}
