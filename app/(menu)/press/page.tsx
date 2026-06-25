import type { Metadata } from "next";
import {
  BadgeCheck,
  Download,
  DownloadCloud,
  ArrowRight,
  Share2,
  Rss,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DoxieLogo } from "@/components/doxie-logo";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BrandPalette, CopyTextButton } from "./_components/press-kit";

export const metadata: Metadata = {
  title: "Press · DoxieAI",
  description:
    "Media kit, brand assets, and press resources for Doxie AI — logos, palette, screenshots, and company boilerplate.",
};

// Top-nav links are the sections that live on THIS page.
const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Logo Pack", href: "#logos" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Press", href: "#press" },
];

const BOILERPLATE =
  "Founded in 2023, Doxie AI is a San Francisco-based technology company pioneering the future of technical knowledge management. By leveraging proprietary LLM architectures specifically tuned for engineering workflows, Doxie transforms fragmented data into structured, actionable documentation. Our mission is to eliminate the 'documentation debt' that stalls innovation in global enterprise teams.";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <DoxieLogo className={light ? "size-6 text-brand-dark" : "size-6"} />
        <span
          className={
            light
              ? "font-serif text-2xl font-bold tracking-tight text-brand-dark"
              : "font-serif text-2xl font-bold tracking-tight text-brand"
          }
        >
          Doxie
        </span>
      </div>
      <span
        className={
          light ? "text-xs text-neutral-500" : "text-xs text-muted-foreground"
        }
      >
        On {light ? "Light" : "Dark"} Surface
      </span>
    </div>
  );
}

/** Decorative screenshot placeholder (no real asset shipped). */
function ScreenshotTile() {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-[#070E1D] ring-1 ring-foreground/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_65%)]"
      />
      <div className="absolute inset-3 flex gap-2">
        <div className="hidden w-1/4 flex-col gap-1.5 sm:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded-full bg-foreground/10" />
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-md border border-border/60 bg-background/40 p-2">
          {[50, 75, 40, 90, 60, 80, 55].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-brand/40"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 lg:py-20">
        {/* Hero */}
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand">
            <BadgeCheck className="size-3.5" />
            Media Kit 2024
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Everything you need to{" "}
            <span className="text-brand">share our story.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Doxie is building the next generation of AI-driven technical
            documentation. We help high-growth engineering teams turn chaos into
            clarity with industrial-grade reliability.
          </p>
        </header>

        {/* Logo Pack + Brand Palette */}
        <section id="logos" className="mt-14 grid scroll-mt-24 gap-6 lg:grid-cols-3">
          <Card className="ring-foreground/10 lg:col-span-2">
            <CardContent className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Logo Pack</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Available in light and dark variants for any background.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Download className="size-4" />
                    SVG
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Download className="size-4" />
                    PNG
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-border bg-[#0C1322]">
                  <Wordmark />
                </div>
                <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-white">
                  <Wordmark light />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/10">
            <CardContent className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight">Brand Palette</h2>
              <div className="mt-6">
                <BrandPalette />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Screenshot Kit */}
        <section id="screenshots" className="mt-6 scroll-mt-24">
          <Card className="ring-foreground/10">
            <CardContent className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Screenshot Kit
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    High-resolution previews of our core platform interface.
                  </p>
                </div>
                <Button className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90">
                  <DownloadCloud className="size-4" />
                  Download All Previews
                </Button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <ScreenshotTile />
                <ScreenshotTile />
                <ScreenshotTile />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Boilerplate + Press Inquiries */}
        <section id="press" className="mt-6 grid scroll-mt-24 gap-6 lg:grid-cols-2">
          <Card className="ring-foreground/10">
            <CardContent className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight">
                Company Boilerplate
              </h2>
              <div className="mt-5 rounded-xl border border-border bg-background/60 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {BOILERPLATE}
                </p>
              </div>
              <div className="mt-5">
                <CopyTextButton value={BOILERPLATE}>
                  Copy to clipboard
                </CopyTextButton>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand/5 ring-brand/20">
            <CardContent className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight">Press Inquiries</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For interview requests, speaking engagements, or further media
                information, please reach out to our communications team.
              </p>

              <a
                href="mailto:press@doxieai.com"
                className="group mt-6 flex items-center justify-between rounded-xl border border-border bg-background/60 px-5 py-4 transition-colors hover:border-brand/40"
              >
                <span>
                  <span className="block font-mono text-[0.7rem] font-medium uppercase tracking-wide text-brand">
                    Email Contact
                  </span>
                  <span className="mt-0.5 block text-sm font-medium">
                    press@doxieai.com
                  </span>
                </span>
                <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  aria-label="Share"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <Share2 className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="RSS feed"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <Rss className="size-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
