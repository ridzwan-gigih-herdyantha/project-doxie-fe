import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { humanTime } from "@/lib/human-time";
import { getDocument } from "../action";
import { DocumentSidebar } from "../_components/document_sidebar";
import { SetDocumentTitle } from "../_components/set-document-title";
import { PdfViewerClient } from "../_components/pdf-viewer-client";

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
      {/* Shares the title with the navbar (no refetch). */}
      <SetDocumentTitle title={doc.title} />

      {/* Detail / viewer */}
      <div className="min-w-0 flex-1 overflow-y-auto px-6 pt-4 pb-2">
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

        {/* TODO: point this at your real PDF endpoint. It goes through the
            proxy so the auth cookie is attached. Adjust the path to match the
            Laravel route that streams the file. */}
        <PdfViewerClient
          url={`/api/backend/documents/${doc.id}/download`}
          className="mt-4 h-[75vh]"
        />
      </div>

      <DocumentSidebar documentTitle={doc.title} />
    </div>
  );
}
