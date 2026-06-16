import { FolderOpen, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "./_components/stat-card";
import { Separator } from "@/components/ui/separator";
import { listDocuments } from "../documents/action";

export default async function DashboardPage() {
  const result = await listDocuments();
  const maxDocs = 5;
  const documents = result.success ? result.data : [];

  const sortReadyDocs = () => {
    const readyDocs = documents.filter((doc) => doc.status === "ready");
    return readyDocs.length;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back. You have {sortReadyDocs()} active documents today.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Documents"
          value={documents.length}
          total={maxDocs}
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

      <div className="flex flex-row gap-6 items-center mt-6">
        <h2 className="text-xl font-semibold tracking-tight">Documents</h2>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
