import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BlogFeed } from "./_components/blog-feed";

export const metadata: Metadata = {
  title: "Blog · DoxieAI",
  description:
    "Insights on LLMs, document engineering, and product updates from the Doxie team.",
};

const PAGE_NAV: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:py-16">
        {/* Featured release */}
        <section className="overflow-hidden rounded-lg border border-border bg-card ring-1 ring-foreground/5">
          <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Featured Release
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Introducing Doxie: Chat with Any PDF
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our latest release brings state-of-the-art document processing to
                your browser. Upload complex whitepapers, legal contracts, or manuals
                and get instant, cited answers.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Button
                  asChild
                  className="h-11 rounded-md px-6 bg-brand text-brand-foreground hover:bg-brand/90"
                >
                  <Link href="#">
                    Read the announcement
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-brand text-[0.65rem] font-semibold text-brand-foreground">
                      EV
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-xs text-muted-foreground">
                    Elena Vance · 5 min read
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative app preview */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-[#070E1D] ring-1 ring-foreground/5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--brand)_24%,transparent),transparent_60%)]"
              />
              <div className="absolute inset-4 rounded-lg border border-border/60 bg-card/40 p-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-foreground/20" />
                  <span className="size-2 rounded-full bg-foreground/20" />
                  <span className="size-2 rounded-full bg-foreground/20" />
                </div>
                <LayoutDashboard className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-brand opacity-80" />
              </div>
            </div>
          </div>
        </section>

        <BlogFeed />
      </main>

      <LandingFooter />
    </div>
  );
}
