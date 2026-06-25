"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import type { Root, Element, Text, ElementContent } from "hast";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { goToPdfPage, tokenizeCitations } from "@/lib/pdf-citation";

// Don't turn citations into chips inside these elements (code/links).
const SKIP_TAGS = new Set(["code", "pre", "a"]);

/**
 * Rehype plugin: replace page-citation tokens (e.g. "[p. 12]") in prose text
 * nodes with a <span data-citation-page="12"> that we render as a clickable chip.
 */
function rehypeCitations() {
  const walk = (node: Root | Element, skip: boolean) => {
    const children = node.children as ElementContent[];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === "text" && !skip) {
        const segments = tokenizeCitations((child as Text).value);
        if (segments.length === 1 && segments[0].type === "text") continue;

        const replacement: ElementContent[] = segments.map((seg) =>
          seg.type === "text"
            ? { type: "text", value: seg.value }
            : {
                type: "element",
                tagName: "span",
                properties: { dataCitationPage: String(seg.page) },
                children: [{ type: "text", value: seg.label }],
              },
        );
        children.splice(i, 1, ...replacement);
        i += replacement.length - 1;
      } else if (child.type === "element") {
        walk(child, skip || SKIP_TAGS.has(child.tagName));
      }
    }
  };
  return (tree: Root) => walk(tree, false);
}

/** Inline, clickable citation that scrolls the PDF viewer to the page. */
function CitationChip({
  page,
  children,
}: {
  page: number;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => goToPdfPage(page)}
      title={`Jump to page ${page}`}
      className="mx-0.5 inline-flex items-baseline rounded-md border border-brand/30 bg-brand/10 px-1.5 py-0.5 align-baseline text-xs font-medium text-brand transition-colors hover:bg-brand/20"
    >
      {children}
    </button>
  );
}

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
        "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-[#0B1018] [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs [&_:not(pre)>code]:text-foreground",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeCitations]}
        components={{ pre: CodeBlock, span: CitationSpan }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Renders the citation chip for our injected spans; a plain span otherwise. */
function CitationSpan({
  node,
  children,
  ...props
}: React.ComponentProps<"span"> & { node?: Element }) {
  const page = node?.properties?.dataCitationPage;
  if (page != null) {
    return <CitationChip page={Number(page)}>{children}</CitationChip>;
  }
  return <span {...props}>{children}</span>;
}

/** A code block with a hover copy button (copies the rendered text). */
function CodeBlock({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className="group relative my-2">
      <pre
        ref={ref}
        style={{ minWidth: 0, maxWidth: "100%", overflowX: "auto" }}
        className="rounded-lg bg-[#0B1018] p-3 text-xs text-foreground"
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
