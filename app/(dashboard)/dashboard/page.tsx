import { FolderOpen, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "./_components/stat-card";
import { Separator } from "@/components/ui/separator";
import { listDocuments } from "../documents/action";
import DocumentCard from "./_components/document-card";
import UploadDocumentCard from "./_components/upload-document-card";
import RecentActivity from "./_components/recent-activity";
import UpgradeCard from "./_components/upgrade-card";
import Link from "next/link";

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
            <Link href="/settings?tab=billing">
              <Button
                size="default"
                className="rounded-full bg-brand text-brand-foreground text-[0.65rem] font-semibold uppercase tracking-wide hover:bg-brand/80"
              >
                Upgrade
              </Button>
            </Link>
          }
        />
      </div>

      <div className="flex flex-row gap-6 items-center mt-6">
        <h2 className="text-xl font-semibold tracking-tight">Recent Documents</h2>
        <Separator className="flex-1" />
      </div>

      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {documents.slice(0, 3).map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
        <UploadDocumentCard />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentActivity className="lg:col-span-2" />
        <UpgradeCard />
      </div>
    </div>
  );
}
