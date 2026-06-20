import Link from "next/link";
import { MessageSquare, MessagesSquare, Sparkles } from "lucide-react";

import { listDocuments } from "../documents/action";
import { listRecentChats } from "./action";
import { NewChatComposer } from "./_components/new-chat-composer";

export default async function ChatsPage() {
  const [docsResult, sessionsResult] = await Promise.all([
    listDocuments(),
    listRecentChats(),
  ]);

  const documents = docsResult.success ? docsResult.data : [];
  const sessions = sessionsResult.success ? sessionsResult.data : [];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pt-8 pb-16">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Sparkles className="size-6" />
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Doxie AI</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Pick one of your documents and ask anything — get cited answers in
          seconds.
        </p>
      </div>

      {/* New chat composer */}
      <NewChatComposer documents={documents} />

      {/* Existing sessions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Your chats</h2>
        {sessions.length === 0 ? (
          <p className="rounded-xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground ring-1 ring-foreground/5">
            No chats yet. Start one above.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/documents/${s.document_id}?session=${s.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <MessagesSquare className="size-4" />
                  </div>
                  <span className="truncate text-sm">
                    {s.title ?? "Untitled chat"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
