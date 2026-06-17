import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

function DocumentCardSkeleton() {
  return (
    <Card className="gap-3 p-3">
      <Skeleton className="h-28 w-full rounded-lg" />
      <Skeleton className="h-9 w-full rounded-md" />
    </Card>
  );
}

export default function DocumentsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>
      <DocumentCardSkeleton />
    </div>
  );
}