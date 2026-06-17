import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentDetailLoading() {
  return (
    <div className="-m-6 flex h-[calc(100svh-3.5rem)]">
      <div className="min-w-0 flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-52" />
          </div>
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        <Skeleton className="mt-4 h-[70vh] w-full rounded-xl" />
      </div>

      {/* Chat panel */}
      <aside className="flex h-full w-7/12 shrink-0 flex-col border-l border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Skeleton className="size-4 rounded" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-10 w-1/2 self-end rounded-lg" />
          <Skeleton className="h-16 w-4/5 rounded-lg" />
        </div>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <Skeleton className="h-8 flex-1 rounded-sm" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </aside>
    </div>
  );
}
