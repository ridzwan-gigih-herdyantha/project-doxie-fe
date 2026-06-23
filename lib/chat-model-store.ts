/**
 * Shared selected AI model for the chat.
 *
 * The model picker lives in the navbar (`ChatNavbar`) while messages are sent
 * from the document's chat panel (`DocumentSidebar`) — two siblings that can't
 * pass props to each other. This tiny store bridges them: the picker writes the
 * selection, the sender reads it at send time (`getChatModel()`).
 */
export interface ChatModel {
  id: string;
  label: string;
  status: "active" | "inactive";
}

export const CHAT_MODELS: ChatModel[] = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" , status: "active"},
  { id: "gpt-4o", label: "ChatGPT 4.0", status: "inactive" },
  { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", status: "inactive" },
];

let modelId: string = CHAT_MODELS[0].id;
const listeners = new Set<() => void>();

export function setChatModel(next: string): void {
  if (modelId === next) return;
  modelId = next;
  for (const listener of listeners) listener();
}

export function subscribeChatModel(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getChatModel(): string {
  return modelId;
}
