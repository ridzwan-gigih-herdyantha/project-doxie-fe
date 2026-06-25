"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type Swatch = {
  name: string;
  hex: string;
  /** Tailwind classes for the chip surface + text. */
  className: string;
};

const SWATCHES: Swatch[] = [
  { name: "Gold Primary", hex: "#FFD615", className: "bg-brand text-brand-foreground" },
  {
    name: "Deep Slate",
    hex: "#0C1322",
    className: "bg-background text-foreground ring-1 ring-border",
  },
  {
    name: "Amber Dark",
    hex: "#C9A800",
    className: "bg-brand-dark text-brand-foreground",
  },
];

function useCopied() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — ignore.
    }
  };
  return { copied, copy };
}

export function BrandPalette() {
  return (
    <div className="flex flex-col gap-3">
      {SWATCHES.map((s) => (
        <ColorChip key={s.hex} {...s} />
      ))}
      <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">
        Click color chips to copy HEX codes to your clipboard.
      </p>
    </div>
  );
}

function ColorChip({ name, hex, className }: Swatch) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-3 font-mono text-sm transition-transform hover:scale-[1.01]",
        className,
      )}
    >
      <span className="font-medium">{name}</span>
      <span className="inline-flex items-center gap-1.5 opacity-90">
        {copied ? (
          <>
            <Check className="size-3.5" /> Copied
          </>
        ) : (
          hex
        )}
      </span>
    </button>
  );
}

export function CopyTextButton({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-4 py-2 font-mono text-sm text-foreground/80 transition-colors hover:border-brand/40 hover:text-foreground"
    >
      {copied ? (
        <Check className="size-4 text-brand" />
      ) : (
        <Copy className="size-4" />
      )}
      {copied ? "Copied!" : children}
    </button>
  );
}
