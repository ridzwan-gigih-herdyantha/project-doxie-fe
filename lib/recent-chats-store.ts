import type { Session } from "@/app/(dashboard)/chats/action";

/**
 * Shared store for the sidebar's "Recent Chats".
 *
 * A freshly created session has no title yet, so its id is tracked in
 * `loadingTitleIds` and the sidebar shows a skeleton for it. Once a real list is
 * fetched (`setRecentChats`) the loading set is cleared — sessions then show
 * their title, or "Untitled" if the backend never produced one.
 */
let sessions: Session[] = [];
let loadingTitleIds: Set<number> = new Set();
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** Seed/refresh from the server. A fresh list means all titles are resolved. */
export function setRecentChats(next: Session[]): void {
  sessions = next;
  loadingTitleIds = new Set();
  loaded = true;
  emit();
}

/** Prepend a freshly created session; show a skeleton until its title resolves. */
export function addRecentChat(session: Session): void {
  sessions = [session, ...sessions.filter((s) => s.id !== session.id)];
  if (!session.title) {
    loadingTitleIds = new Set(loadingTitleIds);
    loadingTitleIds.add(session.id);
  }
  loaded = true;
  emit();
}

/** Set a session's title directly and stop its skeleton. */
export function updateRecentChatTitle(id: number, title: string): void {
  sessions = sessions.map((s) => (s.id === id ? { ...s, title } : s));
  if (loadingTitleIds.has(id)) {
    loadingTitleIds = new Set(loadingTitleIds);
    loadingTitleIds.delete(id);
  }
  emit();
}

/** Give up waiting for titles (e.g. the refetch failed) → resolve to "Untitled". */
export function clearRecentChatTitleLoading(): void {
  if (loadingTitleIds.size === 0) return;
  loadingTitleIds = new Set();
  emit();
}

/** Mark loading finished without changing the list (e.g. on a failed seed). */
export function markRecentChatsLoaded(): void {
  if (loaded) return;
  loaded = true;
  emit();
}

export function subscribeRecentChats(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getRecentChats(): Session[] {
  return sessions;
}

export function getLoadingTitleIds(): Set<number> {
  return loadingTitleIds;
}

export function isRecentChatsLoaded(): boolean {
  return loaded;
}
