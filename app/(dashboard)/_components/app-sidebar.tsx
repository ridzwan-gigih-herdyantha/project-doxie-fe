"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DoxieLogo } from "@/components/doxie-logo";
import { NAV_FOOTER, NAV_SECTIONS } from "@/app/(dashboard)/_components/nav-config";
import { ModalLogout } from "@/app/(dashboard)/_components/modal/modal-logout";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useSyncExternalStore } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import NewDocumentButton from "./new-document-button";
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


export function AppSidebar() {
  const pathname = usePathname();
  const recentChats = useSyncExternalStore(
    subscribeRecentChats,
    getRecentChats,
    getRecentChats,
  );
  const loaded = useSyncExternalStore(
    subscribeRecentChats,
    isRecentChatsLoaded,
    () => false,
  );
  const loadingTitleIds = useSyncExternalStore(
    subscribeRecentChats,
    getLoadingTitleIds,
    getLoadingTitleIds,
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

  // Seed the store once from the server (guarded against duplicate fetches).
  useEffect(() => {
    seedRecentChats();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard">
                <DoxieLogo className="size-7 shrink-0" />
                <span className="font-serif text-xl font-bold tracking-tight text-brand">
                  Doxie
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <span className="text-sm text-left ml-4 font-light font-sans text-gray-400">Main Workspace</span>
          </SidebarMenuItem> */}
        </SidebarMenu>
        <SidebarMenu>
          <NewDocumentButton/>
        </SidebarMenu>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarMenu className="gap-1">
            {NAV_SECTIONS.map((section) => {
              const active =
                pathname === section.href ||
                pathname.startsWith(`${section.href}/`);
              const Icon = section.icon;

              return (
                <SidebarMenuItem key={section.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={section.label}
                    className={cn(
                      "relative",
                      active &&
                        "bg-[#232A3A]! text-brand! hover:bg-[#232A3A]! hover:text-brand!",
                    )}
                  >
                    <Link href={section.href}>
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-[3px] bg-brand"
                        />
                      )}
                      <Icon />
                      <span>{section.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
      </SidebarHeader>

          <SidebarGroupLabel className="text-sm">Recent Chats</SidebarGroupLabel>
      <SidebarContent>
        
        {/* <SidebarSeparator/> */}
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {!loaded ? (
              ["w-3/4", "w-1/2", "w-2/3", "w-4/5"].map((w, i) => (
                <SidebarMenuItem key={i}>
                  <div className="flex h-8 items-center gap-2 px-2">
                    <Skeleton className="size-4 shrink-0 rounded-sm" />
                    <Skeleton
                      className={cn(
                        "h-3 rounded-sm",
                        w,
                        "group-data-[collapsible=icon]:hidden",
                      )}
                    />
                  </div>
                </SidebarMenuItem>
              ))
            ) : recentChats.length === 0 ? (
              <p className="px-2 py-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                No recent chats yet.
              </p>
            ) : (
              <>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.uuid}>
                    <SidebarMenuButton asChild tooltip={chat.title ?? "Untitled"}>
                      <Link href={`/documents/${chat.document_uuid}?session=${chat.uuid}`}>
                        <MessageSquare />
                        {loadingTitleIds.has(chat.uuid) ? (
                          <Skeleton className="h-4 w-full rounded-sm group-data-[collapsible=icon]:hidden" />
                        ) : (
                          <span className="truncate">{chat.title ?? "Untitled"}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {hasMore && (
                  <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenuButton
                      onClick={() => loadMoreRecentChats()}
                      disabled={loadingMore}
                      className="justify-center text-xs text-muted-foreground hover:text-foreground"
                    >
                      {loadingMore ? (
                        <Spinner className="size-3.5" />
                      ) : (
                        <ChevronDown className="size-3.5" />
                      )}
                      <span>{loadingMore ? "Loading…" : "Load more"}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mb-2"/>
      <SidebarFooter>
        <SidebarMenu className="gap-1">
          {NAV_FOOTER.map((section) => {
            const active =
              pathname === section.href ||
              pathname.startsWith(`${section.href}/`);
            const Icon = section.icon;

            return (
              <SidebarMenuItem key={section.key}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={section.label}
                  className={cn(
                    "relative",
                    active &&
                      "bg-[#232A3A]! text-brand! hover:bg-[#232A3A]! hover:text-brand!",
                  )}
                >
                  <Link href={section.href}>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px] bg-brand"
                      />
                    )}
                    <Icon />
                    <span>{section.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <ModalLogout />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
