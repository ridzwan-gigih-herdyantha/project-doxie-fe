"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { ChevronDown, MessagesSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  getLoadingTitleIds,
  getRecentChats,
  hasMoreRecentChats,
  isLoadingMoreRecentChats,
  isRecentChatsLoaded,
  loadMoreRecentChats,
  seedRecentChats,
  subscribeRecentChats,
} from "@/lib/recent-chats-store";

export function ChatsList() {
  const sessions = useSyncExternalStore(
    subscribeRecentChats,
    getRecentChats,
    getRecentChats,
  );
  const loaded = useSyncExternalStore(
    subscribeRecentChats,
    isRecentChatsLoaded,
    () => false,
  );
  const hasMore = useSyncExternalStore(
    subscribeRecentChats,
    hasMoreRecentChats,
    () => false,
  );
  const loadingMore = useSyncExternalStore(
    subscribeRecentChats,
    isLoadingMoreRecentChats,
    () => false,
  );
  const loadingTitleIds = useSyncExternalStore(
    subscribeRecentChats,
    getLoadingTitleIds,
    getLoadingTitleIds,
  );

  // Shared with the sidebar; guarded so it fetches the first page only once.
  useEffect(() => {
    seedRecentChats();
  }, []);

  if (!loaded) {
    return (
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5"
          >
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-sm" />
          </li>
        ))}
      </ul>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground ring-1 ring-foreground/5">
        No chats yet. Start one above.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {sessions.map((s) => (
          <li key={s.uuid}>
            <Link
              href={`/documents/${s.document_uuid}?session=${s.uuid}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <MessagesSquare className="size-4" />
              </div>
              {loadingTitleIds.has(s.uuid) ? (
                <Skeleton className="h-4 w-40 max-w-full rounded-sm" />
              ) : (
                <span className="truncate text-sm">
                  {s.title ?? "Untitled chat"}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <Button
          type="button"
          variant="outline"
          onClick={() => loadMoreRecentChats()}
          disabled={loadingMore}
          className="self-center gap-2"
        >
          {loadingMore ? (
            <Spinner className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
          {loadingMore ? "Loading…" : "Load more"}
        </Button>
      )}
    </div>
  );
}
