"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`title-bar inactive ${styles.footer}`}>
      <div className="title-bar-text">
        Made with ❤️ by
        <a
          href="https://github.com/iliaahd"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ilia
        </a>
        <span> | </span>
        Feel free to contact me and share your thoughts.
      </div>
    </footer>
  );
}
