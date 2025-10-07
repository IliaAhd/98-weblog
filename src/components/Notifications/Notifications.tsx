import NotificationItem from "./NotificationsItem";

type Notification = {
  id: number;
  message: string;
  read: boolean;
  postTitle?: string | null;
};

export default async function Notifications() {
  const notifications: Notification[] = await getNotifications();

  if (!notifications) return <div>No notifications found.</div>;

  return (
    <div style={{ maxWidth: 500 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notifications.map((n) => (
          <NotificationItem key={n.id} notif={n} />
        ))}
      </ul>
    </div>
  );
}
