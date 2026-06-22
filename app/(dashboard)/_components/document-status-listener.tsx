"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getEcho } from "@/lib/echo";

/** Listens for the document-ready broadcast; toasts + refreshes the cards live. */
export function DocumentStatusListener({ userId }: { userId: string | number }) {
  const router = useRouter();

  useEffect(() => {
    const channelName = `user.${userId}`;
    console.log("[listener] subscribing", channelName);
    const channel = getEcho().private(channelName);

    // Diagnostic: log EVERY event on the channel (reveals the real event name).
    channel.listenToAll((event: string, data: unknown) =>
      console.log("[listener] ANY event:", event, data),
    );

    channel
      .subscribed(() => console.log("[listener] subscribed", channelName))
      .error((e: unknown) => console.error("[listener] subscribe error", channelName, e))
      .listen(".document.ready", (e: unknown) => {
        console.log("[listener] .document.ready", e);
        toast.success("Your document is ready.");
        router.refresh();
      });

    return () => {
      getEcho().leave(channelName);
    };
  }, [userId, router]);

  return null;
}
