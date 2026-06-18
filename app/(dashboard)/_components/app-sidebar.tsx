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
import { useState } from "react";
import NewDocumentButton from "./new-document-button";


export function AppSidebar() {
  const pathname = usePathname();
  const [recentChats, setRecentChats] = useState<string[]>([]);

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
            {recentChats.map((chat) => (
              <SidebarMenuItem key={chat}>
                <SidebarMenuButton asChild>
                  <Link href={`/chat/${chat}`}>{chat}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
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
