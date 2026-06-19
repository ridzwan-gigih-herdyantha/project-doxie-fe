import { Skeleton } from "@/components/ui/skeleton";

export default function ChatsLoading() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pt-8 pb-16">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Skeleton className="size-12 rounded-2xl" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      {/* Composer */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 ring-1 ring-foreground/5">
        <Skeleton className="h-11 w-full rounded-xl" />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-9 w-40 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <ul className="flex flex-col gap-2">
          {["w-2/3", "w-1/2", "w-3/4", "w-2/5", "w-3/5"].map((w, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5"
            >
              <Skeleton className="size-8 shrink-0 rounded-lg" />
              <Skeleton className={`h-4 ${w}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
