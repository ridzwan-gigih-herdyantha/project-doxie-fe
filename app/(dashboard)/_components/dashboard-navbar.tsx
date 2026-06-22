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
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-sidebar px-3 sm:px-4">
      <SidebarTrigger className="-ml-1 shrink-0" />
      <Separator
        orientation="vertical"
        className="mr-1 shrink-0 data-[orientation=vertical]:h-full"
      />

      <div className="flex min-w-0 flex-1 items-center">
        {Actions ? <Actions /> : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <NotificationBell />
        <AvatarUser user={user} />
      </div>
    </header>
  );
}
