import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(dashboard)/_components/app-sidebar";
import { DashboardNavbar } from "@/app/(dashboard)/_components/dashboard-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getToken } from "@/lib/auth/session";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  console.log("token login : ", token);
  if (!token) {
    redirect("/login");
  }

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
      <SidebarInset>
        <DashboardNavbar />
        <main className="flex flex-1 flex-col gap-4 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
