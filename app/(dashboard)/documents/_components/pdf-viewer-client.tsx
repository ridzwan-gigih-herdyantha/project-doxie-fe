"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Loads the PDF viewer client-side only. PDF.js touches browser APIs (canvas,
 * DOMMatrix) that don't exist during SSR, so `ssr: false` keeps it off the
 * server. Server Components can render this wrapper directly.
 */
const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-xl bg-background ring-1 ring-foreground/5">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);

export function PdfViewerClient({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return <PdfViewer url={url} className={cn(className)} />;
}
