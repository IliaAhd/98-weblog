import { Session } from "next-auth";
import styles from "@/app/profile/components/Profile/Profile.module.css";

export default function Profile({ session }: { session: Session }) {
  return (
    <div
      className="title-bar inactive"
      style={{
        maxWidth: "800px",
        marginInline: "auto",
        paddingInline: "1rem",
      }}
    >
      <h1 className="title-bar-text" style={{ fontSize: "1rem" }}>
        {session.user?.name}
        <span className={styles.title}>&apos;s profile</span>
      </h1>

      <h2 style={{ fontSize: "1rem" }}>
        <span className={styles.title}>Your email:</span> {session.user?.email}
      </h2>
    </div>
  );
}
