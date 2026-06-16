import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex min-w-0 flex-col gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-16" />
      </div>
      <Skeleton className="size-12 rounded-lg" />
    </div>
  );
}

function DocumentCardSkeleton() {
  return (
    <Card className="gap-3 p-3">
      <Skeleton className="h-28 w-full rounded-lg" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </Card>
  );
}

function RecentActivitySkeleton() {
  return (
    <Card className="gap-0 p-0 lg:col-span-2">
      <div className="flex items-center justify-between px-5 py-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-14" />
      </div>

      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 px-5 my-1 py-3.5">
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <Skeleton className="h-3.5 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-10 shrink-0" />
            </div>
            {i < 2 && (
              <div className="px-5">
                <Separator />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function UpgradeCardSkeleton() {
  return (
    <Card className="justify-between gap-6 p-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="size-6 rounded-md" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stat cards */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* "Documents" section divider */}
      <div className="mt-6 flex flex-row items-center gap-6">
        <Skeleton className="h-6 w-28" />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Documents */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DocumentCardSkeleton />
        <DocumentCardSkeleton />
        <DocumentCardSkeleton />
        <DocumentCardSkeleton />
      </div>

      {/* Recent Activity + Upgrade */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentActivitySkeleton />
        <UpgradeCardSkeleton />
      </div>
    </div>
  );
}
