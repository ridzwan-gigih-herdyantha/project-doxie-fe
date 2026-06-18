"use client";

import { useEffect, useRef, useState } from "react";
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
import { Markdown } from "./markdown";
import { listRecentChats } from "../../chats/action";
import {
  clearRecentChatTitleLoading,
  setRecentChats,
} from "@/lib/recent-chats-store";

export function DocumentSidebar({
  documentTitle = "Document",
  sessionId,
  messages: initialMessages = [],
  initialQuestion,
  defaultOpen = true,
}: {
  documentTitle?: string;
  sessionId?: number;
  messages?: ChatMessage[];
  /** First message to auto-send on mount (e.g. from the /chats composer). */
  initialQuestion?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [input, setInput] = useState("");
  const { messages, isStreaming, sendMessage } = useChat(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);
  const wasStreamingRef = useRef(false);

  // Keep the conversation pinned to the bottom as messages arrive / stream in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Auto-send the first question once (new chat started from the composer).
  useEffect(() => {
    if (autoSentRef.current) return;
    const question = initialQuestion?.trim();
    if (question && sessionId !== undefined && messages.length === 0) {
      autoSentRef.current = true;
      sendMessage(sessionId, question, getChatModel());
    }
  }, [initialQuestion, sessionId, messages.length, sendMessage]);

  // When a reply finishes streaming, the backend may have generated a session
  // title — refetch and sync the store so the sidebar's Recent Chats updates.
  useEffect(() => {
    const finished = wasStreamingRef.current && !isStreaming;
    wasStreamingRef.current = isStreaming;
    if (!finished) return;

    const timer = setTimeout(async () => {
      try {
        const res = await listRecentChats();
        if (res.success) setRecentChats(res.data);
        else clearRecentChatTitleLoading();
      } catch (error) {
        console.error(error);
        clearRecentChatTitleLoading();
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [isStreaming]);

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
    <aside className="flex h-full w-7/12 min-w-0 shrink-0 flex-col overflow-hidden border-l border-border bg-sidebar">
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

      <div
        ref={scrollRef}
        className="flex min-w-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto p-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            No messages yet. Ask something about this document to get started.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex min-w-0",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "min-w-0 max-w-[85%] rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-[#68DBA9] text-[#141B2B]"
                  : "bg-muted text-foreground",
              )}
            >
              {m.role === "user" ? (
                <span className="whitespace-pre-wrap">{m.content}</span>
              ) : m.content ? (
                <Markdown>{m.content}</Markdown>
              ) : isStreaming ? (
                <Spinner className="size-4" />
              ) : null}
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
