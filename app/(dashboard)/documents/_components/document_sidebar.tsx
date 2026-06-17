"use client";

import { useState } from "react";
import { MessageSquare, PanelRightClose, PanelRightOpen, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ChatMessage {
  id: string | number;
  role: "user" | "assistant";
  content: string;
}

// TODO: Implement sidebar chat for document
/** Placeholder until the document chat endpoint is wired up. */
const SAMPLE: ChatMessage[] = [
  { id: 1, role: "assistant", content: "Hi! Ask me anything about this document." },
  { id: 2, role: "user", content: "Can you summarize the Q3 financials?" },
  {
    id: 3,
    role: "assistant",
    content:
      "Revenue grew 12% QoQ, mainly from enterprise renewals. Want the full breakdown?",
  },
];

export function DocumentSidebar({
  documentTitle = "Document",
  messages = SAMPLE,
  defaultOpen = true,
}: {
  documentTitle?: string;
  messages?: ChatMessage[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

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
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-[#68DBA9] text-[#141B2B]"
                  : "bg-muted text-foreground",
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input placeholder="Ask about this document…" className="flex-1" />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 bg-[#68DBA9] text-[#141B2B] hover:bg-[#68DBA9]/90"
        >
          <Send />
        </Button>
      </form>
    </aside>
  );
}
