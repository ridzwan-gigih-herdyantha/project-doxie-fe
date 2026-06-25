/**
 * Page-cited answers: a tiny bridge between the chat (which renders citations)
 * and the PDF viewer (which scrolls to the cited page). They live in separate
 * client islands under the document page's Server Component, so they communicate
 * via a window CustomEvent rather than shared React state.
 *
 * Citation convention (what the model is expected to emit in its answers):
 *   [p. 12]  [p.12]  [page 12]  [pages 3-5]  [pp. 3, 7]  (p. 4)
 * The leading "p"/"page" keyword is required so plain bracketed numbers
 * (list markers, footnotes) are not mistaken for citations.
 */

export const PDF_GOTO_EVENT = "doxie:pdf-goto";

/** Ask any mounted PDF viewer to scroll to (and highlight) a page. */
export function goToPdfPage(page: number): void {
  if (typeof window === "undefined" || !Number.isFinite(page)) return;
  window.dispatchEvent(
    new CustomEvent<{ page: number }>(PDF_GOTO_EVENT, { detail: { page } }),
  );
}

/** Subscribe a PDF viewer to citation clicks. Returns an unsubscribe fn. */
export function onPdfGoto(handler: (page: number) => void): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<{ page: number }>).detail;
    if (detail?.page) handler(detail.page);
  };
  window.addEventListener(PDF_GOTO_EVENT, listener);
  return () => window.removeEventListener(PDF_GOTO_EVENT, listener);
}

// Matches a bracketed/parenthesised page citation. Group 1 holds the number(s).
const CITATION_RE =
  /[[(]\s*(?:pp?\.?|pages?)\s*(\d+(?:\s*[–-]\s*\d+)?(?:\s*(?:,|&|and)\s*\d+)*)\s*[\])]/gi;

export type CitationSegment =
  | { type: "text"; value: string }
  | { type: "cite"; page: number; label: string };

/** First page number referenced inside a citation's number group. */
function firstPage(group: string): number {
  const m = group.match(/\d+/);
  return m ? Number(m[0]) : NaN;
}

/**
 * Split a plain string into text + citation segments. Used by the markdown
 * rehype plugin to turn citation tokens into clickable chips.
 */
export function tokenizeCitations(text: string): CitationSegment[] {
  const segments: CitationSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CITATION_RE)) {
    const start = match.index ?? 0;
    const page = firstPage(match[1]);
    if (!Number.isFinite(page)) continue;

    if (start > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, start) });
    }
    // Label = the citation without its surrounding bracket/paren, e.g. "p. 12".
    segments.push({
      type: "cite",
      page,
      label: match[0].slice(1, -1).trim(),
    });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }
  return segments;
}

export interface Citation {
  page: number;
  label: string;
}

/**
 * Unique pages an assistant message cites (sorted). Empty array => no citations,
 * which is how the UI knows whether a response is page-cited.
 */
export function parseCitations(text: string): Citation[] {
  const byPage = new Map<number, string>();
  for (const seg of tokenizeCitations(text)) {
    if (seg.type === "cite" && !byPage.has(seg.page)) {
      byPage.set(seg.page, `p. ${seg.page}`);
    }
  }
  return [...byPage.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([page, label]) => ({ page, label }));
}
