import styles from "@/app/profile/components/Profile/Profile.module.css";
import { UserWithPosts } from "@/utils/types";
import Image from "next/image";

export default function Profile({
  user,
  isPrivateProfile = false,
  avatar,
}: {
  user: UserWithPosts;
  avatar?: string;
  isPrivateProfile?: boolean;
}) {
  return (
    <div className={`title-bar inactive ${styles.profile}`}>
      <div className={styles.title}>
        <Image
          className={styles.avatar}
          src={avatar || user.image || "/default-avatar.png"}
          alt={`${user?.name}'s avatar`}
          width={48}
          height={48}
        />
        <div className={`title-bar-text ${styles.info}`}>
          <h1 style={{ fontSize: "1rem" }}>{user?.name}</h1>
          <div className={styles.status}>
            <span style={{ fontWeight: "bold" }}>{user.Post?.length}</span>
            <span>Posts</span>
          </div>
        </div>
      </div>

      {isPrivateProfile && <h2 style={{ fontSize: "1rem" }}>{user?.email}</h2>}
    </div>
  );
}
