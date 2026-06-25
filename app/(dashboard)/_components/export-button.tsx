"use client";

import { useState, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  getChatExportMessages,
  getChatExportTitle,
  subscribeChatExport,
} from "@/lib/chat-export-store";
import type { ChatMessage } from "@/hooks/use-chat";

type ExportFormat = "json" | "text";

const EMPTY_MESSAGES: ChatMessage[] = [];

function slugify(value: string) {
  return (
    value
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "chat"
  );
}

function buildContent(messages: ChatMessage[], format: ExportFormat) {
  if (format === "json") {
    return JSON.stringify(
      messages.map((m) => ({ role: m.role, content: m.content })),
      null,
      2,
    );
  }
  return messages
    .map((m) => `${m.role === "user" ? "You" : "Assistant"}:\n${m.content}`)
    .join("\n\n");
}

function downloadFile(filename: string, content: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ExportButton() {
  const [loadingFormat, setLoadingFormat] = useState<ExportFormat | null>(null);
  const messages = useSyncExternalStore(
    subscribeChatExport,
    getChatExportMessages,
    () => EMPTY_MESSAGES,
  );
  const title = useSyncExternalStore(
    subscribeChatExport,
    getChatExportTitle,
    () => "chat",
  );

  const isLoading = loadingFormat !== null;
  const hasMessages = messages.length > 0;

  async function handleExport(format: ExportFormat) {
    if (!hasMessages) {
      toast.error("No messages to export yet.");
      return;
    }

    setLoadingFormat(format);
    try {
      const ext = format === "json" ? "json" : "txt";
      const mime = format === "json" ? "application/json" : "text/plain";
      downloadFile(`${slugify(title)}.${ext}`, buildContent(messages, format), mime);
      toast.success(
        `Chat exported as ${format === "json" ? "JSON" : "plain text"}.`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Couldn't export the chat. Please try again.");
    } finally {
      setLoadingFormat(null);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading || !hasMessages}
          className="shrink-0 items-center bg-gray-800 px-2 py-4 text-foreground hover:bg-gray-900"
          aria-label="Export chat"
        >
          {isLoading ? <Spinner /> : <Download />}
          <span className="ml-1 hidden sm:inline">Export Chat</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isLoading}
            onSelect={() => handleExport("json")}
          >
            {loadingFormat === "json" ? <Spinner className="mr-2" /> : null}
            JSON
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isLoading}
            onSelect={() => handleExport("text")}
          >
            {loadingFormat === "text" ? <Spinner className="mr-2" /> : null}
            Plain Text
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
