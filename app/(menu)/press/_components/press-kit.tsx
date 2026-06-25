"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import namer from "color-namer";

import { cn } from "@/lib/utils";

type Role = {
  /** CSS var to read the live color from. */
  cssVar: string;
  /** Role suffix appended after the derived color name. */
  role: string;
  /** Tailwind classes for the chip surface + text (already brand-reactive). */
  className: string;
};

const ROLES: Role[] = [
  { cssVar: "--brand", role: "Primary", className: "bg-brand text-brand-foreground" },
  {
    cssVar: "--background",
    role: "Base",
    className: "bg-background text-foreground ring-1 ring-border",
  },
  {
    cssVar: "--brand-dark",
    role: "Dark",
    className: "bg-brand-dark text-brand-foreground",
  },
];

const toHex = (n: string) => Math.round(+n).toString(16).padStart(2, "0");

/** Resolve a CSS var (hex/oklch/named) to an uppercase #RRGGBB string. */
function resolveHex(cssVar: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
  const el = document.createElement("span");
  el.style.color = raw || "#000000";
  el.style.display = "none";
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = resolved.match(/(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/);
  if (!m) return "#000000";
  return `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`.toUpperCase();
}

/** Nearest human-readable color name for a hex (e.g. "Gold", "Mirage"). */
function colorName(hex: string): string {
  try {
    return namer(hex, { pick: ["ntc"] }).ntc[0].name.replace(/\b\w/g, (c) =>
      c.toUpperCase(),
    );
  } catch {
    return "Color";
  }
}

type Swatch = { name: string; hex: string; className: string };

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
  const [swatches, setSwatches] = useState<Swatch[]>([]);

  useEffect(() => {
    const update = () =>
      setSwatches(
        ROLES.map((r) => {
          const hex = resolveHex(r.cssVar);
          return { name: `${colorName(hex)} ${r.role}`, hex, className: r.className };
        }),
      );
    update();

    // Runtime branding writes inline CSS vars on <html>; react to those.
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    window.addEventListener("storage", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {swatches.map((s, i) => (
        <ColorChip key={ROLES[i].cssVar} {...s} />
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
