"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function LoginNotifications() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Channel name : notifications
    // event name : user-logged-in
    const channel = pusher.subscribe("notifications");

    channel.bind("user-logged-in", (data: any) => {
      //setNotification(data.message);
      setNotification(`${data.message} (${Date.now()})`);
      // hide after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
      {notification}
    </div>
  );
}
