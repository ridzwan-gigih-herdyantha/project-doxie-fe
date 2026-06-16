import { FolderOpen, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "./_components/stat-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back. Your documents and sessions at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Documents" 
          value={3} 
          total={3} 
          icon={<FolderOpen />} 
        />
        <StatCard 
          title="Messages" 
          value={42} 
          total={50} 
          icon={<MessageSquare />} 
        />
        <StatCard
          title="Current Plan"
          value="Free"
          action={
            <Button
              size="default"
              className="rounded-full bg-[#68DBA9] text-[#141B2B] text-[0.65rem] font-semibold uppercase tracking-wide hover:bg-[#68DBA9]/80"
            >
              Upgrade
            </Button>
          }
        />
      </div>
    </div>
  );
}
