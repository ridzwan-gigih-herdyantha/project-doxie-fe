import { Suspense } from "react";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import { humanTime } from "@/lib/human-time";
import { Skeleton } from "@/components/ui/skeleton";
import { getDocument } from "../action";
import { DocumentSidebar } from "../_components/document_sidebar";
import { SetDocumentTitle } from "../_components/set-document-title";
import { PdfViewerClient } from "../_components/pdf-viewer-client";
import { listChats, listSessions } from "../../chats/action";

type DocumentPromise = ReturnType<typeof getDocument>;
type ChatPromise = ReturnType<typeof loadChat>;

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
}

async function loadChat(documentId: number, session?: string) {
  let sessionId = session ? Number(session) : undefined;

  if (!sessionId) {
    const sessions = await listSessions(documentId);
    if (sessions.success) sessionId = sessions.data[0]?.id;
  }
  if (!sessionId) return { sessionId: undefined, messages: [] };

  const chats = await listChats(sessionId);
  const messages = chats.success
    ? chats.data.map((m) => ({ id: m.id, role: m.role, content: m.content }))
    : [];

  return { sessionId, messages };
}

export default async function DocumentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session?: string; q?: string }>;
}) {
  const { id } = await params;
  const { session, q } = await searchParams;

  const documentPromise = getDocument(id);
  const chatPromise = loadChat(Number(id), session);

  return (
    <div className="-m-6 flex h-[calc(100svh-3.5rem)] overflow-hidden">
      <Suspense fallback={<DetailSkeleton />}>
        <DocumentDetail documentPromise={documentPromise} />
      </Suspense>

      <Suspense fallback={<ChatSkeleton />}>
        <ChatPanel
          documentId={Number(id)}
          documentPromise={documentPromise}
          chatPromise={chatPromise}
          initialQuestion={q}
        />
      </Suspense>
    </div>
  );
}

async function DocumentDetail({
  documentPromise,
}: {
  documentPromise: DocumentPromise;
}) {
  const result = await documentPromise;
  if (!result.success) notFound();

  const doc = result.data;
  const isReady = doc.status === "ready";

  return (
    <>
      {/* Shares the title with the navbar (no refetch). */}
      <SetDocumentTitle title={doc.title} />

      <div className="min-w-0 flex-1 overflow-y-auto px-6 pt-4 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className="truncate font-serif text-xl font-semibold tracking-tight"
              title={doc.title}
            >
              {doc.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {doc.page_count} page{doc.page_count === 1 ? "" : "s"} ·{" "}
              {formatBytes(doc.file_size)} · Uploaded {humanTime(doc.created_at)}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
              isReady
                ? "bg-brand/20 text-brand"
                : "bg-muted text-muted-foreground",
            )}
          >
            {doc.status}
          </span>
        </div>

        <PdfViewerClient url={`${doc.file_url}`} className="mt-4 h-[75vh]" />
      </div>
    </>
  );
}

async function ChatPanel({
  documentId,
  documentPromise,
  chatPromise,
  initialQuestion,
}: {
  documentId: number;
  documentPromise: DocumentPromise;
  chatPromise: ChatPromise;
  initialQuestion?: string;
}) {
  const [docResult, chat] = await Promise.all([documentPromise, chatPromise]);
  const documentTitle = docResult.success ? docResult.data.title : "Document";

  return (
    <DocumentSidebar
      key={chat.sessionId ?? documentId}
      documentTitle={documentTitle}
      sessionId={chat.sessionId}
      messages={chat.messages}
      initialQuestion={initialQuestion}
    />
  );
}

function DetailSkeleton() {
  return (
    <div className="min-w-0 flex-1 overflow-y-auto px-6 pt-4 pb-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-64 max-w-full" />
          <Skeleton className="h-4 w-52 max-w-full" />
        </div>
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <Skeleton className="mt-4 h-[75vh] w-full rounded-xl" />
    </div>
  );
}

function ChatSkeleton() {
  return (
    <aside className="flex h-full w-7/12 shrink-0 flex-col border-l border-border bg-sidebar">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Skeleton className="size-4 rounded" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-10 w-1/2 self-end rounded-lg" />
        <Skeleton className="h-16 w-4/5 rounded-lg" />
      </div>
      <div className="flex items-center gap-2 border-t border-border p-3">
        <Skeleton className="h-8 flex-1 rounded-sm" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
    </aside>
  );
}
