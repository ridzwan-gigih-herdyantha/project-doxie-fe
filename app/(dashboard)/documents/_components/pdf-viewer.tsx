"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

// Self-hosted worker (copied to /public). Re-copy after upgrading pdfjs-dist:
//   cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function Status({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
      {icon}
      <p>{text}</p>
    </div>
  );
}

/**
 * Continuous-scroll PDF renderer (PDF.js via react-pdf). Pages are rendered to
 * canvas and stacked inside a dark, scrollable wrapper with a floating
 * "Page X of Y" indicator that tracks the most-visible page.
 *
 * Text/annotation layers are off (render-only, per the design). Must be loaded
 * client-side only — see `pdf-viewer-client.tsx`.
 */
export function PdfViewer({ url, className }: { url: string; className?: string }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState<number>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageEls = useRef<Map<number, HTMLDivElement>>(new Map());

  // Fit each page to the column width (capped for readability).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setPageWidth(Math.min(el.clientWidth - 32, 820));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track the most-visible page for the indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !numPages) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) {
          const n = Number((top.target as HTMLElement).dataset.page);
          if (n) setCurrentPage(n);
        }
      },
      { root: el, threshold: [0.1, 0.5, 0.9] },
    );
    pageEls.current.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [numPages]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl bg-background ring-1 ring-foreground/5",
        className,
      )}
    >
      {numPages > 0 && (
        <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-foreground/10 backdrop-blur">
          Page {currentPage} of {numPages}
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <Status
              icon={<Loader2 className="size-5 animate-spin" />}
              text="Loading PDF…"
            />
          }
          error={<Status text="Couldn't load this PDF." />}
          noData={<Status text="No PDF to display." />}
          className="flex flex-col items-center gap-4 p-4"
        >
          {Array.from({ length: numPages }, (_, i) => {
            const n = i + 1;
            return (
              <div
                key={n}
                data-page={n}
                ref={(node) => {
                  if (node) pageEls.current.set(n, node);
                  else pageEls.current.delete(n);
                }}
                className="overflow-hidden rounded-lg bg-white shadow-lg shadow-black/40 ring-1 ring-foreground/10"
              >
                <Page
                  pageNumber={n}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <div
                      className="flex aspect-[1/1.414] items-center justify-center"
                      style={{ width: pageWidth }}
                    >
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    </div>
                  }
                />
              </div>
            );
          })}
        </Document>
      </div>
    </div>
  );
}
