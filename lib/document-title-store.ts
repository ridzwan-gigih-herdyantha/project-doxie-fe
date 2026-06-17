/**
 * Tiny external store for the active document's title.
 */
let title: string | null = null;
const listeners = new Set<() => void>();

export function setDocumentTitle(next: string | null): void {
  if (title === next) return;
  title = next;
  for (const listener of listeners) listener();
}

export function subscribeDocumentTitle(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDocumentTitle(): string | null {
  return title;
}
