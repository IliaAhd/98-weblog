"use client";

import styles from "@/components/Loader/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.progressWrapper}>
        <span className={styles.progressBar} />
      </div>
    </div>
  );
}
