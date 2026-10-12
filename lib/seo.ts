import type { Metadata } from "next";

/**
 * Single source of truth for site-wide SEO values. The canonical origin comes
 * from NEXT_PUBLIC_SITE_URL so previews and production each emit correct
 * absolute URLs (canonical, Open Graph, sitemap).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "DoxieAI",
  shortName: "Doxie",
  url: resolveSiteUrl(),
  title: "DoxieAI — Chat with your PDF documents, answered instantly",
  description:
    "Upload any PDF and get instant, page-cited answers. Doxie grounds GPT-4o, Claude, and Gemini in your documents for precision you can actually trust.",
  keywords: [
    "chat with PDF",
    "AI PDF reader",
    "document AI",
    "PDF question answering",
    "page-cited answers",
    "RAG",
    "semantic search",
    "GPT-4o",
    "Claude",
    "Gemini",
    "AI document assistant",
    "DoxieAI",
  ],
  locale: "en_US",
  themeColor: "#0A1019",
  logo: "/logo/doxie-logo-teal.svg",
  ogImage: {
    url: "/og-image.png",
    width: 1286,
    height: 674,
    alt: "DoxieAI — Chat with your documents, answered instantly.",
    type: "image/png",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path used for the canonical URL, e.g. "/about". Omit for shared defaults. */
  path?: string;
  type?: "website" | "article";
  /** Extra Open Graph fields (e.g. article publishedTime/authors). */
  openGraph?: Metadata["openGraph"];
};

/**
 * Builds per-page metadata. Nested `openGraph`/`twitter` objects replace the
 * parent's entirely, so every page re-declares the shared image here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(path && { url: path }),
      title,
      description,
      images: [SITE.ogImage],
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE.ogImage],
    },
  };
}

/**
 * Converts a human-readable post date ("Feb 12, 2026") to ISO 8601, pinned to
 * UTC so the day doesn't shift with the server's timezone.
 */
export const toIsoDate = (date: string) => new Date(`${date} UTC`).toISOString();

/** Serializes JSON-LD safely for a <script> tag (escapes `<`). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
