"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MessageSquare, PanelRightClose, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat, type ChatMessage } from "@/hooks/use-chat";
import { getChatModel } from "@/lib/chat-model-store";
import { Spinner } from "@/components/ui/spinner";
import { CopyButton } from "@/components/ui/copy-button";
import { Markdown } from "./markdown";
import { setChatExport } from "@/lib/chat-export-store";
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
  const atBottomRef = useRef(true);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior });
  };

  // Track whether the user is near the bottom; reveal the jump button otherwise.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    atBottomRef.current = atBottom;
    setShowScrollDown(!atBottom);
  };

  useEffect(() => {
    if (atBottomRef.current) scrollToBottom("auto");
  }, [messages]);

  // Expose the conversation to the navbar's Export button; clear on unmount.
  useEffect(() => {
    setChatExport({ messages, title: documentTitle });
  }, [messages, documentTitle]);
  useEffect(() => () => setChatExport({ messages: [], title: "chat" }), []);

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow the textarea with its content, up to a few lines.
  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const question = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    sendMessage(sessionId!, question, getChatModel());
  };

  // Enter sends; Shift+Enter inserts a newline.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
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
          <MessageSquare className="size-4 shrink-0 text-brand" />
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

      <div className="relative min-w-0 flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full min-w-0 flex-col gap-3 overflow-x-hidden overflow-y-auto p-4"
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
                  ? "bg-brand text-brand-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              {m.role === "user" ? (
                <span className="whitespace-pre-wrap">{m.content}</span>
              ) : m.content ? (
                <>
                  <Markdown>{m.content}</Markdown>
                  <div className="mt-1 flex justify-end">
                    <CopyButton
                      value={m.content}
                      label="Copy to clipboard"
                      tooltip
                      className="-mr-1"
                    />
                  </div>
                </>
              ) : isStreaming ? (
                <Spinner className="size-4" />
              ) : null}
            </div>
          </div>
        ))}
      </div>

        <Button
          type="button"
          size="icon"
          onClick={() => scrollToBottom()}
          aria-label="Scroll to latest"
          className={cn(
            "absolute bottom-3 left-1/2 size-8 -translate-x-1/2 rounded-full bg-brand text-brand-foreground shadow-[0_0_16px_4px_rgba(0,0,0,0.55)] transition-all duration-300 hover:bg-brand/90",
            showScrollDown
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <ChevronDown className="size-4" />
        </Button>
      </div>

      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            autoGrow();
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={
            sessionId === undefined
              ? "No chat session for this document"
              : "Ask about this document…"
          }
          disabled={sessionId === undefined || isStreaming}
          className="max-h-32 min-h-8 flex-1 resize-none rounded-md border border-input bg-transparent px-2.5 py-1.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          className="shrink-0 w-9 h-9 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Send />
        </Button>
      </form>
    </aside>
  );
}
