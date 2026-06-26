import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Lock,
  Gauge,
  Network,
  CloudUpload,
  MessageSquare,
  History,
  Info,
  CircleCheck,
  ChevronRight,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DoxieLogo } from "@/components/doxie-logo";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { SystemStatus } from "@/app/(auth)/system-status";
import { DocsSidebarNav } from "./_components/docs-sidebar-nav";

export const metadata: Metadata = {
  title: "API Docs · DoxieAI",
  description:
    "The enterprise-grade API for intelligent document processing — extract, chat, and reason with your unstructured data.",
};

const PAGE_NAV: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "API Docs", href: "/api-documentation" },
];

const CURL = `curl https://api.doxie.ai/v1/chat \\
  -H "Authorization: Bearer $DOXIE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "doxie-turbo-1",
    "messages": [
      {"role": "user", "content": "Analyze the contract"}
    ]
  }'`;

const FEATURES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}[] = [
  {
    icon: Lock,
    title: "Authentication",
    desc: "Secure your requests with Bearer tokens. We support environment-based key rotation and granular scoping.",
    link: "Learn about Security",
  },
  {
    icon: Gauge,
    title: "Performance",
    desc: "Up to 1,000 requests per second on enterprise tiers. Sub-200ms latency for document reasoning tasks.",
    link: "View Limits",
  },
  {
    icon: Network,
    title: "Webhooks",
    desc: "Subscribe to real-time events for document processing completion and session updates.",
    link: "Setup Webhooks",
  },
];

const RESOURCES = ["API Reference", "Python SDK", "Node.js SDK", "Community Forum"];
const SECURITY = ["Trust Center", "Data Privacy", "SOC2 Compliance"];

function Method({ method }: { method: "POST" | "GET" | "PATCH" }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide ring-1",
        method === "POST"
          ? "bg-brand/15 text-brand ring-brand/20"
          : "bg-foreground/10 text-foreground/70 ring-foreground/15",
      )}
    >
      {method}
    </span>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <div className="flex flex-1">
        {/* Docs sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-border/60 p-4 lg:flex">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
              <DoxieLogo className="size-5" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold">Doxie API</p>
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                v1.4.2
              </p>
            </div>
          </div>

          <DocsSidebarNav />

          <div className="mt-auto flex flex-col gap-1">
            <a
              href="/help"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <HelpCircle className="size-4" />
              Help Center
            </a>
            <SystemStatus className="px-3 py-2 font-mono text-xs text-muted-foreground" />
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
            {/* Hero */}
            <section
              id="introduction"
              className="scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-card/40 ring-1 ring-foreground/5"
            >
              <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
                <div className="flex flex-col">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-brand">
                    <Zap className="size-3.5" />
                    Now in Public Beta
                  </span>
                  <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                    Build with Doxie
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    The enterprise-grade API for intelligent document processing.
                    Extract, chat, and reason with your unstructured data using our
                    ultra-fast proprietary LLM infrastructure.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="h-11 rounded-xl px-6 bg-brand text-brand-foreground hover:bg-brand/90"
                    >
                      <Link href="/register">
                        Get API Keys
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="h-11 rounded-xl px-6"
                    >
                      <Link href="#">Explore Reference</Link>
                    </Button>
                  </div>
                </div>

                {/* Terminal */}
                <div className="overflow-hidden rounded-xl border border-border bg-[#0B1018] ring-1 ring-foreground/5">
                  <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
                    <span className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F57]/80" />
                      <span className="size-2.5 rounded-full bg-[#FEBC2E]/80" />
                      <span className="size-2.5 rounded-full bg-[#28C840]/80" />
                    </span>
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      Quick Start: Chat Request
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground/80">
                    {CURL}
                  </pre>
                </div>
              </div>
            </section>

            {/* Feature cards */}
            <section
              id="authentication"
              className="mt-6 grid scroll-mt-20 gap-5 md:grid-cols-3"
            >
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-2xl border border-border bg-card/40 p-6 ring-1 ring-foreground/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-0.5 font-mono text-xs font-medium text-brand hover:underline"
                  >
                    {f.link}
                    <ChevronRight className="size-3.5" />
                  </a>
                </div>
              ))}
            </section>

            {/* Core Endpoints */}
            <h2 className="mt-14 text-3xl font-bold tracking-tight">
              Core Endpoints
            </h2>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {/* Upload — large */}
              <div
                id="upload"
                className="relative flex scroll-mt-20 flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5"
              >
                <CloudUpload
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-7 size-24 text-foreground/5"
                />
                <div className="flex items-center gap-2">
                  <Method method="POST" />
                  <span className="font-mono text-sm text-muted-foreground">
                    /v1/upload
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Ingest Documents</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Upload PDFs, DOCX, or scanned images. Our OCR engine automatically
                  parses and prepares the content for semantic reasoning.
                </p>
                <ul className="mt-auto flex flex-col gap-2.5 pt-10">
                  {["Auto-layout detection", "Multi-language support", "Table extraction"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CircleCheck className="size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-5">
                <div
                  id="chat"
                  className="flex scroll-mt-20 gap-4 rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <MessageSquare className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Method method="POST" />
                      <span className="font-mono text-sm text-muted-foreground">
                        /v1/chat
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">
                      Document Interaction
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Perform RAG-based chat over uploaded documents with precise
                      citation tracking.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div
                    id="sessions"
                    className="flex scroll-mt-20 flex-col rounded-2xl border border-border bg-card/40 p-6 ring-1 ring-foreground/5"
                  >
                    <div className="flex items-center justify-between">
                      <History className="size-6 text-brand" />
                      <Method method="GET" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Sessions</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Manage context and history across multiple interactions.
                    </p>
                  </div>

                  <div className="flex flex-col rounded-2xl border border-border bg-card/40 p-6 ring-1 ring-foreground/5">
                    <div className="flex items-center justify-between">
                      <Info className="size-6 text-brand" />
                      <Method method="PATCH" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Metadata</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Tag and categorize documents for optimized filtering.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance footer */}
            <div className="mt-14 border-t border-border/60 pt-12">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Need specialized assistance?
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Our engineering team is available for architectural reviews and
                    custom deployment strategies.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="mt-6 h-11 rounded-xl px-6"
                  >
                    <Link href="/careers">Talk to an Architect</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6 lg:justify-items-end">
                  <FooterLinks title="Resources" links={RESOURCES} />
                  <FooterLinks title="Security" links={SECURITY} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-brand">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
