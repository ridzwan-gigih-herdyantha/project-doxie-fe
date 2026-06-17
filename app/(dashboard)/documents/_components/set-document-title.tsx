"use client";

import { useEffect } from "react";

import { setDocumentTitle } from "@/lib/document-title-store";

/**
 * Pushes the already-fetched document title into the shared store so the navbar
 * can show it without re-fetching. Render it on the document detail page. Clears
 * the title on unmount (e.g. navigating away).
 */
export function SetDocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    setDocumentTitle(title);
    return () => setDocumentTitle(null);
  }, [title]);

  return null;
}
