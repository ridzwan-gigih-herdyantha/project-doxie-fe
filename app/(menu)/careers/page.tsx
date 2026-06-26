import type { Metadata } from "next";
import { Rocket, Zap, BrainCircuit, AtSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata: Metadata = {
  title: "Careers · DoxieAI",
  description:
    "We're a small team building big things at the intersection of AI and technical documentation. Join the mission.",
};

const PAGE_NAV: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Careers", href: "/careers" },
];

const STACK = ["Rust", "PyTorch", "WASM", "Kubernetes", "Next.js"];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-brand/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Join the Mission
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              We&apos;re a small team building big things.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Doxie is redefining the intersection of AI and technical documentation.
              We value precision over volume, and high-agency individuals over large
              hierarchies.
            </p>
          </div>
        </section>

        {/* Values bento */}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Our Mission — large */}
              <div className="flex flex-col rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5 lg:col-span-2">
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                  <Rocket className="size-5" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight">
                  Our Mission
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Our goal is to make the world&apos;s technical knowledge instantly
                  accessible and perfectly structured. We&apos;re building the cognitive
                  backbone for modern engineering teams.
                </p>
                <div className="relative mt-6 h-40 overflow-hidden rounded-lg border border-border/60 bg-background/40">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--brand)_10%,transparent),transparent_60%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,226,247,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,226,247,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]"
                  />
                </div>
              </div>

              {/* High Agency */}
              <div className="flex flex-col rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5">
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                  <Zap className="size-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold tracking-tight">High Agency</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We don&apos;t do micromanagement. We hire experts and give them the
                  runway to own entire product verticals.
                </p>
              </div>

              {/* Deep Focus */}
              <div className="flex flex-col rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5">
                <div className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                  <BrainCircuit className="size-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold tracking-tight">Deep Focus</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Async-first and minimal meetings. We protect long stretches of
                  uninterrupted time for technical work.
                </p>
              </div>

              {/* Industrial Grade Tech */}
              <div className="flex flex-col rounded-2xl border border-border bg-card/40 p-7 ring-1 ring-foreground/5 lg:col-span-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Industrial Grade Tech
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-brand/20 bg-brand/5 px-2.5 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wide text-brand"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — full-bleed, gradient glowing from the center out to both sides */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_85%_at_50%_50%,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_72%)]"
          />
          <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Open roles? We prefer conversations.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Even if you don&apos;t see a specific opening, we&apos;re always looking
              for exceptional software engineers, researchers, and designers who want
              to move fast.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl px-7 text-base bg-brand font-semibold text-brand-foreground hover:bg-brand/90"
              >
                <a href="mailto:support@doxieai.ridzwangigih.com">
                  Send CV to support@doxieai.ridzwangigih.com
                  {/* <AtSign className="size-4" /> */}
                </a>
              </Button>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Responses typically within 48 hours
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
