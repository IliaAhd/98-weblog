"use client";

import { useEffect } from "react";

export default function Views({ postId }: { postId: number }) {
  useEffect(() => {
    fetch(`/api/views/${postId}`, { method: "POST" });
  }, [postId]);

  return null;
}
