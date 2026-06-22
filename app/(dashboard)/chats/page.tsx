import { Sparkles } from "lucide-react";

import { listDocuments } from "../documents/action";
import { NewChatComposer } from "./_components/new-chat-composer";
import { ChatsList } from "./_components/chats-list";

export default async function ChatsPage() {
  const docsResult = await listDocuments();
  const documents = docsResult.success ? docsResult.data : [];

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
        <ChatsList />
      </div>
    </div>
  );
}
