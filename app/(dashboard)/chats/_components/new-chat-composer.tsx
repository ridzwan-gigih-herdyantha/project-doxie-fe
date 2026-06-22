"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { addRecentChat } from "@/lib/recent-chats-store";
import type { dataDocument } from "../../documents/action";
import { createSession } from "../action";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function NewChatComposer({ documents }: { documents: dataDocument[] }) {
  const router = useRouter();
  const [documentId, setDocumentId] = useState("");
  const [question, setQuestion] = useState("");
  const [creating, setCreating] = useState(false);

  const hasDocuments = documents.length > 0;
  const canStart =
    hasDocuments && documentId !== "" && question.trim() !== "" && !creating;

  const start = async () => {
    if (!documentId) {
      toast.error("Choose a document to chat with first.");
      return;
    }
    if (!question.trim() || creating) return;

    setCreating(true);
    const toastId = toast.loading("Starting a new chat…");
    try {
      const result = await createSession(documentId);
      if (!result.success) {
        toast.error(result.message, { id: toastId });
        return;
      }
      toast.success("Chat created.", { id: toastId });
      addRecentChat(result.data);
      const q = encodeURIComponent(question.trim());
      router.push(
        `/documents/${documentId}?session=${result.data.uuid}&q=${q}`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Couldn't start the chat. Please try again.", { id: toastId });
    } finally {
      setCreating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start();
      }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 ring-1 ring-foreground/5"
    >
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={
          hasDocuments
            ? "Ask anything about your document…"
            : "Upload a document first to start chatting"
        }
        disabled={!hasDocuments || creating}
        className="h-11 rounded-xl border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
      />

      <div className="flex items-center justify-between gap-2">
        <Select
          value={documentId}
          onValueChange={setDocumentId}
          disabled={!hasDocuments || creating}
        >
          <SelectTrigger className="w-auto max-w-[60%] gap-2">
            <FileText className="size-4 text-brand" />
            <SelectValue placeholder="Select a document" />
          </SelectTrigger>
          <SelectContent>
            {documents.map((doc) => (
              <SelectItem key={doc.uuid} value={doc.uuid}>
                {doc.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="shrink-0">
              <Button
                type="submit"
                size="icon"
                disabled={!canStart}
                aria-label="Start chat"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                {creating ? (
                  <Spinner className="size-4" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </span>
          </TooltipTrigger>
          {!canStart && (
            <TooltipContent>Type a message and choose a document to start chatting</TooltipContent>
          )}
        </Tooltip>
      </div>
    </form>
  );
}
