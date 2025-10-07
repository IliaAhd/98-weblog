import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.features} aria-labelledby="features-title">
      <div className={styles.grid}>
        <div className={`window ${styles.card}`}>
          <div className="window-body">
            <h3>Retro UI</h3>
            <p>Built with 98.css to give your blog a touch of nostalgia.</p>
          </div>
        </div>

        <div className={`window ${styles.card}`}>
          <div className="window-body">
            <h3>Fast & Simple</h3>
            <p>Minimal dependencies and fast server-side rendering.</p>
          </div>
        </div>

        <div className={`window ${styles.card}`}>
          <div className="window-body">
            <h3>Open Source</h3>
            <p>Easy to fork, extend and deploy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
