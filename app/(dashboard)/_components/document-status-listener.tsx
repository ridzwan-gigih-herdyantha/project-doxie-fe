"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getEcho } from "@/lib/echo";

type DocumentStatusEvent = {
  uuid: string;
  title: string | null;
  status: string;
};

/** Listens for document status broadcasts; toasts + refreshes the cards live. */
export function DocumentStatusListener({ userId }: { userId: string | number }) {
  const router = useRouter();

  useEffect(() => {
    const channelName = `documents.${userId}`;
    const channel = getEcho().private(channelName);

    channel.listen(".document.status.updated", (e: DocumentStatusEvent) => {
      const name = e.title ?? "Document";
      if (e.status === "ready") toast.success(`"${name}" is ready.`);
      else if (e.status === "processing") toast(`"${name}" is processing…`);
      router.refresh();
    });

    return () => {
      getEcho().leave(channelName);
    };
  }, [userId, router]);

  return null;
}
