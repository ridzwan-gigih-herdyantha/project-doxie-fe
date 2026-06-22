import { listRecentChats, type Session } from "@/app/(dashboard)/chats/action";

/**
 * Shared store for "Recent Chats" (sidebar + /chats), with cursor pagination.
 */
const INITIAL_PAGE_SIZE = 6;
const LOAD_MORE_SIZE = 10;

let sessions: Session[] = [];
let loadingTitleIds: Set<string> = new Set();
let loaded = false;
let nextCursor: string | null = null;
let loadingMore = false;
let seeding = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** Seed/replace with the first page. A fresh list means all titles are resolved. */
export function setRecentChats(next: Session[], cursor: string | null = null): void {
  sessions = next ?? [];
  loadingTitleIds = new Set();
  loaded = true;
  nextCursor = cursor;
  emit();
}

/** Append the next page, skipping any ids already present. */
export function appendRecentChats(next: Session[], cursor: string | null): void {
  const seen = new Set(sessions.map((s) => s.uuid));
  sessions = [...sessions, ...(next ?? []).filter((s) => !seen.has(s.uuid))];
  nextCursor = cursor;
  loaded = true;
  emit();
}

/** Prepend a freshly created session; show a skeleton until its title resolves. */
export function addRecentChat(session: Session): void {
  sessions = [session, ...sessions.filter((s) => s.uuid !== session.uuid)];
  if (!session.title) {
    loadingTitleIds = new Set(loadingTitleIds);
    loadingTitleIds.add(session.uuid);
  }
  loaded = true;
  emit();
}

/** Set a session's title directly and stop its skeleton. */
export function updateRecentChatTitle(id: string, title: string): void {
  sessions = sessions.map((s) => (s.uuid === id ? { ...s, title } : s));
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

/** Fetch the first page once. No-op if already loaded or a seed is in flight. */
export async function seedRecentChats(): Promise<void> {
  if (loaded || seeding) return;
  seeding = true;
  try {
    const res = await listRecentChats({ perPage: INITIAL_PAGE_SIZE });
    if (res.success) setRecentChats(res.data, res.nextCursor);
    else markRecentChatsLoaded();
  } catch (error) {
    console.error(error);
    markRecentChatsLoaded();
  } finally {
    seeding = false;
  }
}

/** Refetch the first page (e.g. to pick up a freshly generated title). */
export async function refreshRecentChats(): Promise<void> {
  try {
    const res = await listRecentChats({ perPage: INITIAL_PAGE_SIZE });
    if (res.success) setRecentChats(res.data, res.nextCursor);
    else clearRecentChatTitleLoading();
  } catch (error) {
    console.error(error);
    clearRecentChatTitleLoading();
  }
}

/** Append the next page. No-op if already loading or there is nothing more. */
export async function loadMoreRecentChats(): Promise<void> {
  if (loadingMore || !nextCursor) return;
  loadingMore = true;
  emit();
  try {
    const res = await listRecentChats({ cursor: nextCursor, perPage: LOAD_MORE_SIZE });
    if (res.success) appendRecentChats(res.data, res.nextCursor);
  } catch (error) {
    console.error(error);
  } finally {
    loadingMore = false;
    emit();
  }
}

export function subscribeRecentChats(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getRecentChats(): Session[] {
  return sessions;
}

export function getLoadingTitleIds(): Set<string> {
  return loadingTitleIds;
}

export function isRecentChatsLoaded(): boolean {
  return loaded;
}

export function hasMoreRecentChats(): boolean {
  return nextCursor !== null;
}

export function isLoadingMoreRecentChats(): boolean {
  return loadingMore;
}
