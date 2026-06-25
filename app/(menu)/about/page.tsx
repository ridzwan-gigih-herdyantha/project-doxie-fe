import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Lock,
  BadgeCheck,
  Layers,
  Atom,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { CommandCenter } from "./_components/command-center";
import { BrandAurora } from "@/components/landing/brand-aurora";

export const metadata: Metadata = {
  title: "About · DoxieAI",
  description:
    "Doxie transforms static data into actionable wisdom — building the ultimate cognitive layer for the professional world.",
};

// Top-nav links are the sections that live on THIS page.
const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Mission", href: "#mission" },
  { label: "Story", href: "#story" },
  { label: "Foundations", href: "#foundations" },
];

const MISSION_STATS = [
  { value: "10k+", label: "Hours Saved Weekly" },
  { value: "99.9%", label: "Accuracy Rate" },
];

const FOUNDATIONS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Lock,
    title: "Privacy-first",
    desc: "Your data never trains our public models. We utilize localized encryption and enterprise-grade isolation for every workspace.",
  },
  {
    icon: BadgeCheck,
    title: "Accuracy",
    desc: "Built-in source attribution. Every answer provided by Doxie comes with direct citations to the original documentation.",
  },
  {
    icon: Layers,
    title: "Multi-model",
    desc: "Agnostic by design. We leverage the best frontier models, dynamically switching logic to ensure optimal performance for your task.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand">
              <Sparkles className="size-3.5" />
              Next-gen intelligence
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Unlocking the world&apos;s{" "}
              <span className="text-brand">knowledge</span> with AI
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Doxie transforms static data into actionable wisdom, empowering modern
              professionals to transcend information overload.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Link href="/register">Try Doxie free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 rounded-xl px-6"
              >
                <Link href="#">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section id="mission" className="scroll-mt-26 border-b border-border/60 bg-[#070E1D]">
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 px-6 py-28 lg:grid-cols-8">
              <Card className="ring-foreground/10 lg:col-span-5">
                <CardContent className="flex h-full flex-col justify-center">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Our Mission
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    We believe that human potential is currently throttled by the sheer
                    volume of data we produce. Our mission is to build the ultimate
                    cognitive layer for the professional world, saving individuals
                    thousands of hours by synthesizing complex information into precise,
                    verifiable insights.
                  </p>
                  <dl className="mt-8 flex flex-wrap gap-12">
                    {MISSION_STATS.map((s) => (
                      <div key={s.label}>
                        <dd className="text-3xl font-bold tracking-tight text-brand">
                          {s.value}
                        </dd>
                        <dt className="mt-1 text-xs text-muted-foreground">
                          {s.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
              <div className="lg:col-span-3">
                <CommandCenter />
              </div>
            </div>
        </section>

        {/* The Story */}
        <section id="story" className="scroll-mt-6 border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-28 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                The Story
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From Chaos to Clarity
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Born out of a research lab in San Francisco, Doxie began as an
                  experiment in neural retrieval systems. Our founders—a group of AI
                  researchers and data scientists—realized that while AI models were
                  getting better at writing, they were still struggling with the most
                  important thing: contextually accurate data extraction from private
                  knowledge bases.
                </p>
                <p>
                  Today, Doxie serves as the central intelligence hub for law firms,
                  medical researchers, and global engineering teams, bridging the gap
                  between raw data and decision-making.
                </p>
              </div>
            </div>

            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-foreground/5">
              <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                Est. 2021
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_60%)]"
              />
              <div className="absolute inset-8 rounded-xl border border-border/60" />
              <Atom className="relative size-28 text-brand" />
            </div>
          </div>
        </section>

        {/* Our Core Foundations */}
        <section id="foundations" className="scroll-mt-6 border-b border-border/60 bg-[#141B2B]">
          <div className="mx-auto max-w-6xl px-6 py-32">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Core Foundations
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                The pillars that define every line of code we write.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {FOUNDATIONS.map((f) => (
                <Card key={f.title} className="ring-foreground/10 bg-background/60 rounded-lg py-6 px-2">
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex size-11 items-center justify-center rounded-sm bg-brand/10 text-brand ring-1 ring-brand/20">
                      <f.icon className="size-5" />
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-card px-8 py-28 text-center ring-1 ring-foreground/5">
              {/* Aurora background (brand) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
              >
                <BrandAurora blend={0.5} amplitude={1.0} speed={0.8} />
              </div>
              {/* Legibility veil so the copy stays readable over the aurora */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-card via-card/70 to-transparent"
              />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to unlock your insight?
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Join 50,000+ professionals who are reclaiming their time with Doxie.
                  No credit card required to start.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-xl px-7 text-base bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    <Link href="/register">Try Doxie free</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="h-12 rounded-xl px-7 text-base"
                  >
                    <Link href="#">Talk to Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
