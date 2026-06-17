import DocumentCard from "../dashboard/_components/document-card";
import UploadDocumentCard from "../dashboard/_components/upload-document-card";
import { listDocuments } from "./action";

export default async function DocumentsPage() {
  const result = await listDocuments();
  const documents = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">Documents</h2>
        <p className="text-sm text-muted-foreground">
          {documents.length} document{documents.length === 1 ? "" : "s"}. Upload a
          PDF and open it to start chatting.
        </p>
      </div>

      {!result.success && (
        <p className="text-sm text-destructive">{result.message}</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            href={`/documents/${doc.id}`}
            deletable
          />
        ))}
        <UploadDocumentCard />
      </div>
    </div>
  );
}
