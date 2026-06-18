"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import NewDocumentButton from "./new-document-button";
import { listRecentChats, type Session } from "../chats/action";


export function AppSidebar() {
  const pathname = usePathname();
  const [recentChats, setRecentChats] = useState<Session[]>([]);
  const [isLoadRecentChats, setIsLoadRecentChats] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await listRecentChats();
        if (active && response.success) setRecentChats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setIsLoadRecentChats(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard">
                <Image
                  src="/logo/doxie-logo-teal.svg"
                  alt="Doxie"
                  width={28}
                  height={28}
                  priority
                  unoptimized
                  className="size-7 shrink-0"
                />
                <span className="font-serif text-xl font-bold tracking-tight text-[#68DBA9]">
                  Doxie
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <span className="text-sm text-left ml-4 font-light font-sans text-gray-400">Main Workspace</span>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <NewDocumentButton/>
        </SidebarGroup>
        <SidebarGroup>
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
                        "bg-[#232A3A]! text-[#68DBA9]! hover:bg-[#232A3A]! hover:text-[#68DBA9]!",
                    )}
                  >
                    <Link href={section.href}>
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-[3px] bg-[#68DBA9]"
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
        </SidebarGroup>
        {/* <SidebarSeparator/> */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Recent Chats</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {isLoadRecentChats ? (
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
              recentChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild tooltip={chat.title ?? "Untitled"}>
                    <Link href={`/documents/${chat.document_id}?session=${chat.id}`}>
                      <MessageSquare />
                      <span className="truncate">{chat.title ?? "Untitled"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
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
                      "bg-[#232A3A]! text-[#68DBA9]! hover:bg-[#232A3A]! hover:text-[#68DBA9]!",
                  )}
                >
                  <Link href={section.href}>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px] bg-[#68DBA9]"
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
