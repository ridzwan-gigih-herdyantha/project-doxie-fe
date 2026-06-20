"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/** Copies `value` (a string or a lazy getter) to the clipboard, flashing a check. */
export function CopyButton({
  value,
  className,
  label = "Copy",
}: {
  value: string | (() => string);
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        typeof value === "function" ? value() : value,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context / denied) — ignore.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-brand" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
