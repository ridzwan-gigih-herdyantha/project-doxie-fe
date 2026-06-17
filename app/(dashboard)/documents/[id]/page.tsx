import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { humanTime } from "@/lib/human-time";
import { getDocument } from "../action";
import { DocumentSidebar } from "../_components/document_sidebar";

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getDocument(id);

  if (!result.success) {
    notFound();
  }

  const doc = result.data;
  const isReady = doc.status === "ready";

  return (
    <div className="-m-6 flex h-[calc(100svh-3.5rem)]">
      {/* Detail / viewer */}
      <div className="min-w-0 flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className="truncate font-serif text-xl font-semibold tracking-tight"
              title={doc.title}
            >
              {doc.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {doc.page_count} page{doc.page_count === 1 ? "" : "s"} ·{" "}
              {formatBytes(doc.file_size)} · Uploaded {humanTime(doc.created_at)}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
              isReady
                ? "bg-[#68DBA9]/20 text-[#68DBA9]"
                : "bg-muted text-muted-foreground",
            )}
          >
            {doc.status}
          </span>
        </div>

        <div className="mt-4 flex h-[70vh] flex-col items-center justify-center gap-3 rounded-xl bg-background/50 text-muted-foreground ring-1 ring-foreground/5">
          <FileText className="size-10 text-[#68DBA9]/70" />
          <p className="text-sm">{doc.file_name}</p>
          <p className="text-xs">PDF preview coming soon</p>
        </div>
      </div>

      <DocumentSidebar documentTitle={doc.title} />
    </div>
  );
}
