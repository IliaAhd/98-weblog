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
    <div className={`window ${styles.width}`}>
      <div className="window-body">
        <div className={styles.profile}>
          <Image
            className={styles.avatar}
            src={avatar || user.image || "/default-avatar.png"}
            alt={`${user?.name}'s avatar`}
            width={67}
            height={67}
          />

          <div className={`title-bar-text ${styles.info}`}>
            <div className={styles.items}>
              <div style={{ fontSize: "1.5rem" }}>{user?.name}</div>

              <div className={`${styles.status} ${styles.mHidden}`}>
                <span>{user.Post?.length}</span>
                <span>Posts</span>
              </div>
            </div>

            {isPrivateProfile && (
              <div style={{ fontSize: "1rem" }}>{user?.email}</div>
            )}

            <div className={`${styles.status} ${styles.dHidden}`}>
              <span>{user.Post?.length}</span>
              <span>Posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
