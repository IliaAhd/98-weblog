"use client";

import { markNotificationAsRead } from "@/lib/actions";
import { useState, useTransition } from "react";

export type Notification = {
  id: string;
  message: string;
  postTitle?: string;
  read: boolean;
};

export default function NotificationItem({ notif }: { notif: Notification }) {
  const [read, setRead] = useState(notif.read);
  const [isPending, startTransition] = useTransition();

  async function handleMarkRead() {
    startTransition(async () => {
      await markNotificationAsRead(Number(notif.id));
      setRead(true);
    });
  }

  return (
    <li
      style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        backgroundColor: read ? "#f5f5f5" : "#fff7e6",
        opacity: read ? 0.7 : 1,
      }}
    >
      <div style={{ fontSize: 14, marginBottom: 4 }}>{notif.message}</div>
      {notif.postTitle && (
        <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>
          Post: {notif.postTitle}
        </div>
      )}
      {!read && (
        <button
          onClick={handleMarkRead}
          disabled={isPending}
          style={{
            fontSize: 12,
            padding: "4px 8px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          Mark as read
        </button>
      )}
    </li>
  );
}
