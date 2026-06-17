"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { getActiveSection } from "@/app/(dashboard)/_components/nav-config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AvatarUser } from "./avatar-user";
import NotificationBell from "./navbar/notif-button";

export function DashboardNavbar() {
  const pathname = usePathname();
  const section = getActiveSection(pathname);
  const Actions = section.Actions;

  return (
    <header className="flex h-14 sticky top-0 z-999 shrink-0 items-center gap-3 border-b border-border bg-sidebar px-4">
      <SidebarTrigger className="-ml-1"/>
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-full" />
      {/* <h1 className="text-sm font-semibold text-foreground">{section.title}</h1> */}

      <div className="flex w-full items-center">
        {Actions ? <Actions /> : null}
        <div className="ml-auto flex items-center">
          <NotificationBell className="mx-2"/>
          <AvatarUser />
        </div>
      </div>
    </header>
  );
}
