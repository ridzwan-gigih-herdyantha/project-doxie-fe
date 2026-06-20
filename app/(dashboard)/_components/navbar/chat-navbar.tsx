"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useSyncExternalStore } from "react"
import { ChevronDown, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ExportButton from "../export-button";
import {
  getDocumentTitle,
  subscribeDocumentTitle,
} from "@/lib/document-title-store";
import {
  CHAT_MODELS,
  getChatModel,
  setChatModel,
  subscribeChatModel,
} from "@/lib/chat-model-store";

export function ChatNavbar() {
    // Shared so the chat panel knows which model to send with.
    const model = useSyncExternalStore(subscribeChatModel, getChatModel, getChatModel);
    const selectedModel = CHAT_MODELS.find(m => m.id === model)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Title is pushed into the store by the document detail page (no refetch).
    const documentTitle = useSyncExternalStore(
      subscribeDocumentTitle,
      getDocumentTitle,
      () => null,
    );

    function handleOpenChange(open: boolean) {
      setIsOpen(open);
    }

    return (
      <div className="flex w-full justify-between items-center gap-2 p-2">
        <div className="flex w-full justify-start items-center gap-2">
          {documentTitle && (
            <div className="flex items-center">
              <div className="flex min-w-0 items-center gap-2">
                <FileText className="h-5 w-5 shrink-0 text-brand" />
                <h1
                  className="max-w-[200px] truncate text-sm font-semibold text-foreground"
                  title={documentTitle}
                >
                  {documentTitle}
                </h1>
              </div>
              <Separator orientation="vertical" className="mx-4" />
            </div>
          )}
          <div className="flex gap-2 items-center py-1 pl-2 pr-1 rounded-xl border border-border bg-[#141B2B]">
            <h1 className="text-sm font-semibold text-foreground">
              Model
            </h1>
            <DropdownMenu onOpenChange={handleOpenChange}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedModel?.label}
                  {isOpen ? (
                    <ChevronDown className="ml-2 h-4 w-4 transform transition duration-300 rotate-180" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 transform transition duration-300" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Select Model</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={model}
                    onValueChange={setChatModel}
                  >
                  {CHAT_MODELS.map((m) => (
                      <DropdownMenuRadioItem
                        key={m.id}
                        value={m.id}
                        className="capitalize"
                      >
                        {m.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ExportButton/>
      </div>
  )
}
