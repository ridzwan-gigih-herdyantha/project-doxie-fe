"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Status = "loading" | "ok" | "down";

/** Live backend health dot — green = all good, red = down. */
export function SystemStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const data = (await res.json()) as { ok?: boolean };
        if (active) setStatus(data.ok ? "ok" : "down");
      } catch {
        if (active) setStatus("down");
      }
    };

    check();
    const id = setInterval(check, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const label =
    status === "ok"
      ? "All systems operational"
      : status === "down"
        ? "Service disruption"
        : "Checking status…";

  return (
    <p className={cn("flex items-center gap-2", className)}>
      <span className="relative flex size-2">
        {status === "ok" && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            status === "ok"
              ? "bg-emerald-500"
              : status === "down"
                ? "bg-red-500"
                : "bg-muted-foreground",
          )}
        />
      </span>
      {label}
    </p>
  );
}
