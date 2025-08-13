"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <button>Loading...</button>;

  if (session?.user)
    return (
      <form action={signOutWithGoogle}>
        <button>{session.user.name}/ Sign Out</button>
      </form>
    );

  return (
    <form action={signInWithGoogle}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
