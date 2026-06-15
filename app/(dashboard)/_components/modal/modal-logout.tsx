"use client";

import { AlertDialog } from "radix-ui";

import { logout } from "@/app/(dashboard)/actions";
import { LOGOUT_ITEM } from "@/app/(dashboard)/_components/nav-config";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";


export function ModalLogout() {
  const Icon = LOGOUT_ITEM.icon;

  return (
    <AlertDialog.Root>
      <SidebarMenuItem>
        <AlertDialog.Trigger asChild>
          <SidebarMenuButton
            tooltip={LOGOUT_ITEM.label}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Icon />
            <span>{LOGOUT_ITEM.label}</span>
          </SidebarMenuButton>
        </AlertDialog.Trigger>
      </SidebarMenuItem>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">
          <AlertDialog.Title className="text-base font-semibold text-foreground">
            Log out?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-1.5 text-sm text-muted-foreground">
            You&apos;ll need to sign in again to access your dashboard.
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialog.Cancel>
            <form action={logout}>
              <Button type="submit" variant="destructive">
                Log out
              </Button>
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
