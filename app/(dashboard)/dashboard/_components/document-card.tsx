"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, MessageSquare, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { humanTime } from "@/lib/human-time";
import type { dataDocument } from "../../documents/action";
import { createSession, listSessions } from "../../chats/action";
import { DeleteDocumentButton } from "./delete-document-button";

export default function DocumentCard({
  doc,
  href = `/documents/${doc.uuid}`,
  deletable = false,
}: {
  doc: dataDocument;
  href?: string;
  deletable?: boolean;
}) {
  const isReady = doc.status === "ready";
  const canOpen = doc.uuid != null;
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const openChat = async () => {
    // Never send a request with a missing id (would 404 with a raw backend leak).
    if (!canOpen) {
      toast.error("This document isn't available yet. Please refresh and try again.");
      return;
    }

    setOpening(true);
    const toastId = toast.loading("Opening chat...");
    try {
      toast.loading("Fetching chat sessions...", { id: toastId });
      const list = await listSessions(doc.uuid);
      if (!list.success) {
        toast.error(list.message, { id: toastId });
        return;
      }

      let sessionId = list.data[0]?.uuid;

      if (sessionId === undefined) {
        toast.loading("Creating a new session...", { id: toastId });
        const created = await createSession(doc.uuid);
        if (!created.success) {
          toast.error(created.message, { id: toastId });
          return;
        }
        sessionId = created.data.uuid;
      }

      toast.success("Chat ready. Redirecting...", { id: toastId });
      router.push(`/documents/${doc.uuid}?session=${sessionId}`);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't open the chat. Please try again.", { id: toastId });
    } finally {
      setOpening(false);
    }
  };

  return (
    <Card className="gap-3 p-3">
      {/* Preview / status */}
      <div className="relative flex h-28 items-center justify-center rounded-lg bg-background/50 ring-1 ring-foreground/5">
        {isReady ? (
          <>
            <span className="absolute right-2 top-2 rounded-md bg-brand/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-brand">
              Ready
            </span>
            <FileText className="size-10 text-brand/80" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <RefreshCw className="size-8 animate-spin [animation-duration:3s]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest">
              Processing
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5">
        <Link
          href={canOpen ? href : "#"}
          className="block truncate font-serif text-sm text-foreground hover:text-brand"
          title={doc.title}
        >
          {doc.title}
        </Link>
        <p className="text-xs text-muted-foreground">
          {isReady
            ? `Updated ${humanTime(doc.updated_at)}`
            : `Started ${humanTime(doc.created_at)}`}
        </p>
      </div>

      {/* Action */}
      {isReady ? (
        <div className="flex gap-2">
          <Button
            onClick={openChat}
            disabled={opening}
            variant="outline"
            className="flex-1 border-brand/40 text-brand hover:bg-brand/10 hover:text-brand"
          >
            {opening ? <Spinner /> : <MessageSquare />}
            {opening ? "Opening…" : "Open chat"}
          </Button>
          {deletable && canOpen && (
            <DeleteDocumentButton id={doc.uuid} title={doc.title} />
          )}
        </div>
      ) : (
        <Button disabled variant="secondary" className="w-full">
          <MessageSquare />
          Open chat
        </Button>
      )}
    </Card>
  );
}
