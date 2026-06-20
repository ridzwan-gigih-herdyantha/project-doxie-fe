"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";

/**
 * Renders an assistant message as markdown, styled for the dark chat bubble.
 * Tailwind's preflight strips list styles, so they're restored here via child
 * selectors. The `pre` block is rendered through `components` (real className,
 * always compiled) with `min-w-0 max-w-full overflow-x-auto` so long code lines
 * scroll inside the block instead of widening the chat panel.
 *
 * Basic markdown only — add `remark-gfm` if you need tables / task lists.
 */
export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2 text-sm leading-relaxed wrap-break-word",
        "[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5",
        "[&_li]:marker:text-muted-foreground",
        "[&_a]:font-medium [&_a]:text-brand [&_a]:underline",
        "[&_strong]:font-semibold",
        "[&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h3]:font-semibold",
        "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-black/30 [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown components={{ pre: CodeBlock }}>{children}</ReactMarkdown>
    </div>
  );
}

/** A code block with a hover copy button (copies the rendered text). */
function CodeBlock({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className="group relative my-2">
      <pre
        ref={ref}
        style={{ minWidth: 0, maxWidth: "100%", overflowX: "auto" }}
        className="rounded-lg bg-black/40 p-3 text-xs"
      >
        {children}
      </pre>
      <CopyButton
        value={() => ref.current?.innerText ?? ""}
        label="Copy to clipboard"
        copiedLabel="Copied!"
        tooltip
        className="absolute right-1.5 top-1.5 bg-black/40 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}
