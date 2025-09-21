import styles from "@/components/Warn/Warn.module.css";
import Image, { StaticImageData } from "next/image";
import warnImg from "/public/msg_warning.png";
import Link from "next/link";

export default function Warn({
  children,
  message,
  title,
  handleClose,
  img,
}: {
  children?: React.ReactElement;
  title?: string;
  message: string;
  handleClose?: () => void;
  img?: StaticImageData;
}) {
  return (
    <div className={styles.bg}>
      <div className={`window ${styles.modal}`}>
        <div className="title-bar">
          <div className={`title-bar-text ${styles.fontSize}`}>
            {title || "Something went wrong!"}
          </div>
          <div className="title-bar-controls">
            <button onClick={handleClose} aria-label="Minimize"></button>
            <button onClick={handleClose} aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image width={40} height={40} src={img || warnImg} alt="warn" />
            <p className={styles.fontSize}>{message}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: "1rem",
              gap: "0.5rem",
            }}
          >
            {!children ? (
              <>
                <button>
                  <Link href="/">Go to Home</Link>
                </button>
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
