"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { getActiveSection } from "@/app/(dashboard)/_components/nav-config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardNavbar() {
  const pathname = usePathname();
  const section = getActiveSection(pathname);
  const Actions = section.Actions;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-[#0F1623] px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-full" />
      <h1 className="text-sm font-semibold text-foreground">{section.title}</h1>

      <div className="ml-auto flex items-center gap-2">
        {Actions ? <Actions /> : null}

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
      </div>
    </header>
  );
}
