"use client";

import styles from "@/components/Loader/Loader.module.css";
import { useEffect, useState } from "react";

export default function Loader() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div
        className="progress-indicator segmented"
        style={{ width: "400px", overflow: "hidden" }}
      >
        <span
          className="progress-indicator-bar"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
