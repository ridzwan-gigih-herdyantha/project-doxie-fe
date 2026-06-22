import { cookies } from "next/headers";
import { Suspense } from "react";

import { AppSidebar } from "@/app/(dashboard)/_components/app-sidebar";
import { DashboardNavbar } from "@/app/(dashboard)/_components/dashboard-navbar";
import { DocumentStatusListener } from "@/app/(dashboard)/_components/document-status-listener";
import { NoticeToaster } from "@/app/(dashboard)/_components/notice-toaster";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getToken, getUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  const user = await getUser();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "12rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar/>
      {user && <DocumentStatusListener userId={user.id} />}
      <Suspense fallback={null}>
        <NoticeToaster />
      </Suspense>
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <DashboardNavbar user={user} />
        <main className="flex min-w-0 flex-1 flex-col gap-4 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
