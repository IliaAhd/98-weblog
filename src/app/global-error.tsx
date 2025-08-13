"use client";

import "98.css";
import "./globals.css";
import Link from "next/link";
import Warn from "@/components/Warn/Warn";

const bodyStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={bodyStyles}>
        <Warn message={error.message}>
          <>
            <button>
              <Link href="/">Go to Home</Link>
            </button>
            <button onClick={() => reset()}>Try again</button>
          </>
        </Warn>
      </body>
    </html>
  );
}
