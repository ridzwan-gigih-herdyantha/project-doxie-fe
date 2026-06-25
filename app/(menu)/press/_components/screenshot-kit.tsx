"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, DownloadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

const DIR = "/public-screenshots/";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Clean, generic download name — hides the real on-disk filename. */
function downloadName(file: string, index: number): string {
  const ext = file.includes(".") ? file.split(".").pop() : "png";
  return `doxie-brand-screenshot-${index + 1}.${ext}`;
}

function triggerDownload(file: string, index: number) {
  const a = document.createElement("a");
  a.href = DIR + encodeURIComponent(file);
  a.download = downloadName(file, index);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function ScreenshotKit({ files }: { files: string[] }) {
  // Render a deterministic set for SSR, then reshuffle to a random 3 on mount.
  const [shown, setShown] = useState<string[]>(() => files.slice(0, 3));

  useEffect(() => {
    setShown(shuffle(files).slice(0, 3));
  }, [files]);

  const downloadAll = () => {
    // Stagger so browsers don't drop the rapid-fire downloads.
    files.forEach((f, i) =>
      window.setTimeout(() => triggerDownload(f, i), i * 250),
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Screenshot Kit</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            High-resolution previews of our core platform interface.
          </p>
        </div>
        <Button
          onClick={downloadAll}
          disabled={files.length === 0}
          className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <DownloadCloud className="size-4" />
          Download All Previews
        </Button>
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {shown.map((file) => (
            <button
              key={file}
              type="button"
              onClick={() => triggerDownload(file, files.indexOf(file))}
              title="Download screenshot"
              className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-[#070E1D] ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
            >
              <Image
                src={DIR + encodeURIComponent(file)}
                alt="Doxie platform screenshot"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground">
                  <Download className="size-3.5" />
                  Download
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          No screenshots available yet.
        </p>
      )}
    </div>
  );
}
