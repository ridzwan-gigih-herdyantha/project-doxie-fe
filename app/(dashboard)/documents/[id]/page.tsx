import { DocumentSidebar } from "../_components/document_sidebar";

/**
 * Document detail: the document (viewer/details) on the left, and the
 * self-contained chat panel on the right (open by default).
 *
 * `-m-6` cancels the dashboard <main>'s padding so the chat panel sits flush to
 * the edge, and the row fills the viewport height below the 3.5rem navbar.
 */
export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="-m-6 flex h-[calc(100svh-3.5rem)]">
      {/* Detail / viewer */}
      <div className="min-w-0 flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-semibold tracking-tight">Document #{id}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Document details and PDF preview will go here.
        </p>
        <div className="mt-4 flex h-[70vh] items-center justify-center rounded-xl bg-background/50 text-sm text-muted-foreground ring-1 ring-foreground/5">
          PDF preview
        </div>
      </div>

      {/* Chat panel — open by default, collapsible */}
      <DocumentSidebar documentTitle={`Document #${id}`} />
    </div>
  );
}
