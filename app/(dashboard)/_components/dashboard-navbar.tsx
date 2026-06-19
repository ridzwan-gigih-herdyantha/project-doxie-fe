"use client";

import { usePathname } from "next/navigation";

import { getActiveSection } from "@/app/(dashboard)/_components/nav-config";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AvatarUser } from "./avatar-user";
import NotificationBell from "./navbar/notif-button";
import type { SessionUser } from "@/lib/auth/session";

export function DashboardNavbar({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const section = getActiveSection(pathname);
  const Actions = section.Actions;

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-sidebar px-4">
      <SidebarTrigger className="-ml-1"/>
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-full" />
      {/* <h1 className="text-sm font-semibold text-foreground">{section.title}</h1> */}

      <div className="flex w-full items-center">
        {Actions ? <Actions /> : null}
        <div className="ml-auto flex items-center">
          <NotificationBell className="mx-2"/>
          <AvatarUser user={user} />
        </div>
      </div>
    </header>
  );
}
