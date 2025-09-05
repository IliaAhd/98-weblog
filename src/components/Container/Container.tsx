import React from "react";
import styles from "@/components/Container/Container.module.css";

export default function Container({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}
