"use client";

import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

/**
 * Article markdown renderer. Uses the already-installed react-markdown (no GFM),
 * styled for long-form blog prose: headings, lists, code blocks, blockquotes.
 */
export function BlogMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 text-base leading-relaxed text-foreground/85",
        "[&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5",
        "[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5",
        "[&_li]:marker:text-brand",
        "[&_a]:font-medium [&_a]:text-brand [&_a]:underline",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
        "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-card [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:text-brand",
        "[&_hr]:border-border/60",
        className,
      )}
    >
      <ReactMarkdown components={{ pre: CodeBlock }}>{children}</ReactMarkdown>
    </div>
  );
}

function CodeBlock({ children }: { children?: React.ReactNode }) {
  return (
    <pre
      style={{ minWidth: 0, maxWidth: "100%", overflowX: "auto" }}
      className="rounded-lg border border-border bg-[#0B1018] p-4 font-mono text-sm leading-relaxed text-foreground"
    >
      {children}
    </pre>
  );
}
