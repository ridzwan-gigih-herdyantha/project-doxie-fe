"use client";

import { useState } from "react";
import { MessageSquare, PanelRightClose, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat, type ChatMessage } from "@/hooks/use-chat";
import { getChatModel } from "@/lib/chat-model-store";
import { Spinner } from "@/components/ui/spinner";

export function DocumentSidebar({
  documentTitle = "Document",
  sessionId,
  messages: initialMessages = [],
  defaultOpen = true,
}: {
  documentTitle?: string;
  sessionId?: number;
  messages?: ChatMessage[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [input, setInput] = useState("");
  const { messages, isStreaming, sendMessage } = useChat(initialMessages);

  const canSend = input.trim() !== "" && sessionId !== undefined && !isStreaming;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const question = input.trim();
    setInput("");
    sendMessage(sessionId!, question, getChatModel());
  };

  if (!open) {
    return (
      <div className="flex h-full w-12 shrink-0 flex-col items-center gap-3 border-l border-border bg-sidebar pt-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              aria-label="Open document chat"
            >
              <MessageSquare className="size-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Open document chat</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <aside className="flex h-full w-7/12 shrink-0 flex-col border-l border-border bg-sidebar">
      <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <MessageSquare className="size-4 shrink-0 text-[#68DBA9]" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight text-foreground">Chat</p>
            <p className="truncate text-xs text-muted-foreground">{documentTitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          aria-label="Collapse chat"
        >
          <PanelRightClose />
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            No messages yet. Ask something about this document to get started.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-[#68DBA9] text-[#141B2B]"
                  : "bg-muted text-foreground",
              )}
            >
              {m.content || (isStreaming ? <Spinner className="size-4" /> : "")}
            </div>
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={handleSubmit}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            sessionId === undefined
              ? "No chat session for this document"
              : "Ask about this document…"
          }
          disabled={sessionId === undefined || isStreaming}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          className="shrink-0 bg-[#68DBA9] text-[#141B2B] hover:bg-[#68DBA9]/90"
        >
          <Send />
        </Button>
      </form>
    </aside>
  );
}
