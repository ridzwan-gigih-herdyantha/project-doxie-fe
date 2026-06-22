import { useState } from "react";

import { redirectToSessionExpired } from "@/lib/auth/expire";

export interface ChatMessage {
  id: string | number;
  role: "user" | "assistant" | "role-assistant" | "agent";
  content: string;
}

const MODEL_ROLES: Record<string, ChatMessage["role"]> = {
  "gpt-4o": "role-assistant",
  "claude-3-5-sonnet-20241022": "agent",
  "gemini-2.5-flash": "assistant",
};

/**
 * Chat state + SSE streaming for a document's chat session.
 *
 * `sendMessage` POSTs the question and streams the answer from
 * `POST /api/session/{chatSession}/messages` (text/event-stream): each event is
 * `data: {"content": "..."}` and the stream ends with `data: [DONE]`. The request
 * goes through the same-origin `/api/backend` proxy, which attaches the Bearer
 * token from the httpOnly cookie — so no token is passed from client JS.
 */
export function useChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (
    chatSessionId: number,
    question: string,
    model: string,
  ) => {
    const userId = crypto.randomUUID();
    const assistantId = crypto.randomUUID();

    const modelRole: ChatMessage["role"] = MODEL_ROLES[model] ?? "assistant";

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: question },
      { id: assistantId, role: modelRole, content: "" },
    ]);
    setIsStreaming(true);

    const appendToAssistant = (chunk: string) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: m.content + chunk } : m,
        ),
      );

    try {
      const response = await fetch(
        `/api/backend/session/${chatSessionId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ question, model }),
        },
      );

      // Token rejected mid-session — clear it and bounce to login.
      if (response.status === 401) {
        redirectToSessionExpired();
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error(`Request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep the incomplete trailing line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") {
            setIsStreaming(false);
            return;
          }

          try {
            const parsed = JSON.parse(data) as { content?: string };
            if (parsed.content) appendToAssistant(parsed.content);
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.content === ""
            ? { ...m, content: "⚠️ Couldn't get a response. Please try again." }
            : m,
        ),
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return { messages, isStreaming, sendMessage };
}
