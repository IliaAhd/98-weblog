"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "../SignIn/SignIn";
import styles from "./Navbar.module.css";
import { useSession } from "next-auth/react";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Publish",
    link: "/publish",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <menu className={styles.menu} role="tablist">
      {navLinks.map((nav, key) => (
        <li
          key={key}
          role="tab"
          aria-selected={pathname === nav.link ? true : false}
        >
          {<Link href={nav.link}>{nav.title}</Link>}
        </li>
      ))}

      {session && (
        <li role="tab" aria-selected={pathname === "/profile" ? true : false}>
          <Link href="/profile">Profile</Link>
        </li>
      )}
      <div className={styles.signIn}>
        <li role="tab">
          <SignIn />
        </li>
      </div>
    </menu>
  );
}
