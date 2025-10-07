import styles from "@/components/Hero/Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="window"
      style={{ maxWidth: "1100px", margin: "1.5rem auto" }}
    >
      <div className="title-bar">
        <div className="title-bar-text">98 Weblog</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        <ul className={`tree-view ${styles.list}`}>
          <li>
            <strong className={styles.title}>✨98 Weblog</strong>
            <div className={styles.subtitle}>
              Share your thoughts, 90s style
            </div>
          </li>

          <li>
            Welcome to 98 Weblog — post short entries and enjoy a retro, focused
            reading experience.
          </li>

          <li>No algorithms. No ads. Just your words.</li>

          <li>Features:</li>
          <ul>
            <li>📝 Write and share short posts.</li>
            <li>💬 Lightweight interactions and likes.</li>
            <li>🎨 Retro UI powered by 98.css.</li>
          </ul>

          <li className={styles.navList}>
            <Link className="default" href="/publish">
              Get started
            </Link>
            <Link href="/blog">Visit blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
