import type { ChatMessage } from "@/hooks/use-chat";

/**
 * Tiny external store bridging the active chat to the navbar's Export button.
 *
 * The chat panel (DocumentSidebar) and the Export button live in different parts
 * of the tree, so the panel pushes its current messages + document title here and
 * the button reads them. Mirrors `document-title-store`.
 */
let messages: ChatMessage[] = [];
let title = "chat";
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setChatExport(next: { messages: ChatMessage[]; title?: string }): void {
  messages = next.messages;
  if (next.title) title = next.title;
  emit();
}

export function subscribeChatExport(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getChatExportMessages(): ChatMessage[] {
  return messages;
}

export function getChatExportTitle(): string {
  return title;
}
