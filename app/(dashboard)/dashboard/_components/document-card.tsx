import Link from "next/link";
import { FileText, MessageSquare, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { dataDocument } from "../../documents/action";
import { humanTime } from "@/lib/human-time";

export default function DocumentCard({ doc }: { doc: dataDocument }) {
  const isReady = doc.status === "ready";

  return (
    <Card className="gap-3 p-3">
      {/* Preview / status */}
      <div className="relative flex h-28 items-center justify-center rounded-lg bg-background/50 ring-1 ring-foreground/5">
        {isReady ? (
          <>
            <span className="absolute right-2 top-2 rounded-md bg-[#68DBA9]/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-[#68DBA9]">
              Ready
            </span>
            <FileText className="size-10 text-[#68DBA9]/80" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <RefreshCw className="size-8 animate-spin [animation-duration:3s]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest">
              Processing
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-0.5">
        <p
          className="truncate font-serif text-sm text-foreground"
          title={doc.title}
        >
          {doc.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {isReady
            ? `Updated ${humanTime(doc.updated_at)}`
            : `Started ${humanTime(doc.created_at)}`}
        </p>
      </div>

      {/* Action */}
      {isReady ? (
        <Button
          asChild
          variant="outline"
          className="w-full border-[#68DBA9]/40 text-[#68DBA9] hover:bg-[#68DBA9]/10 hover:text-[#68DBA9]"
        >
          <Link href={`/chats/${doc.id}`}>
            <MessageSquare />
            Open chat
          </Link>
        </Button>
      ) : (
        <Button disabled variant="secondary" className="w-full">
          <MessageSquare />
          Open chat
        </Button>
      )}
    </Card>
  );
}
