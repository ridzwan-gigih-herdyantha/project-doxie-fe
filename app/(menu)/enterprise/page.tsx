import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyRound,
  ScrollText,
  Cloud,
  Gauge,
  Maximize2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { DemoForm } from "./_components/demo-form";
import { HeroShowcase } from "./_components/hero-showcase";

export const metadata: Metadata = {
  title: "Enterprise · DoxieAI",
  description:
    "Scale your document intelligence with industrial-grade security, dedicated infrastructure, and 24/7 priority support.",
};

// Top-nav links are the sections that live on THIS page.
const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Pillars", href: "#pillars" },
  { label: "Compare Plans", href: "#compare" },
  { label: "Request Demo", href: "#demo" },
];

const PILLARS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: KeyRound,
    title: "SSO / SAML",
    desc: "Centralize access control with enterprise-standard authentication. Integrated with Okta, Azure AD, and Google Workspace.",
  },
  {
    icon: ScrollText,
    title: "Audit Logs",
    desc: "Complete visibility into document access, edits, and exports. Exportable logs for compliance and internal security reviews.",
  },
  {
    icon: Cloud,
    title: "Dedicated Tenant",
    desc: "Your own isolated compute and storage infrastructure. No noisy neighbors, guaranteed performance, and custom regional deployments.",
  },
];

const COMPARE: { capability: string; pro: string; enterprise: string }[] = [
  {
    capability: "Document Processing",
    pro: "5k pages / month",
    enterprise: "Unlimited",
  },
  {
    capability: "User Authentication",
    pro: "Email/Password",
    enterprise: "SSO / SAML 2.0",
  },
  {
    capability: "Compliance Support",
    pro: "Standard GDPR",
    enterprise: "HIPAA / SOC2 / Custom",
  },
  {
    capability: "Deployment",
    pro: "Shared Cloud",
    enterprise: "Dedicated Tenant",
  },
  {
    capability: "Admin Controls",
    pro: "Basic",
    enterprise: "Advanced RBAC + Audit",
  },
  {
    capability: "Support SLA",
    pro: "24h Response",
    enterprise: "1h Priority Response",
  },
];

const CONSULT = [
  "Personalized platform walkthrough",
  "Custom pricing & package analysis",
  "Security & compliance consultation",
];

export default function EnterprisePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand">
                <span className="size-1.5 rounded-full bg-brand" />
                Enterprise Solutions
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Doxie for <span className="text-brand">Teams &amp; Enterprise</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Scale your document intelligence with industrial-grade security,
                dedicated infrastructure, and 24/7 priority support. Designed for the
                most demanding technical environments.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-xl px-6 bg-brand text-brand-foreground hover:bg-brand/90"
                >
                  <Link href="#demo">Request Demo</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-11 rounded-xl px-6"
                >
                  <Link href="#pillars">Explore Platform</Link>
                </Button>
              </div>
            </div>

            <HeroShowcase />
          </div>
        </section>

        {/* Enterprise Pillars */}
        <section id="pillars" className="scroll-mt-20 border-b border-border/60 bg-[#070E1D]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Enterprise Pillars
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Security and performance shouldn&apos;t be tradeoffs. Doxie Enterprise
                provides a no-compromise foundation for your global team.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {PILLARS.map((p) => (
                <Card key={p.title} className="ring-foreground/10 rounded-lg">
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex size-11 items-center justify-center rounded-md bg-brand/10 text-brand ring-1 ring-brand/20">
                      <p.icon className="size-5" />
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {/* SLA — wide */}
              <Card className="ring-foreground/10 lg:col-span-2 rounded-lg">
                <CardContent className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-md">
                    <div className="flex size-11 items-center justify-center rounded-md bg-brand/10 text-brand ring-1 ring-brand/20">
                      <Gauge className="size-6" />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">
                      99.9% Service Level Agreement
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Reliability you can bank on. Our enterprise contracts include
                      legally binding uptime guarantees and financial credits for
                      deviations.
                    </p>
                  </div>
                  <div className="shrink-0 text-center">
                    <p className="text-4xl font-bold tracking-tight text-brand sm:text-5xl">
                      99.9%
                    </p>
                    <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                      Uptime Guaranteed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Custom API Limits */}
              <Card className="ring-foreground/10 rounded-lg">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex size-11 items-center justify-center rounded-md bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Maximize2 className="size-5" />
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">Custom API Limits</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Remove technical bottlenecks with high-throughput API tiers
                    tailored to your organization&apos;s specific processing volume.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compare Plans */}
        <section id="compare" className="scroll-mt-20">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Compare Plans
            </h2>

            <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              {/* header */}
              <div className="grid grid-cols-3 text-sm font-semibold">
                <div className="px-5 py-4">Capability</div>
                <div className="px-5 py-4 text-center text-muted-foreground">Pro</div>
                <div className="bg-brand/10 px-5 py-4 text-center text-brand">
                  Enterprise
                </div>
              </div>
              {COMPARE.map((row) => (
                <div
                  key={row.capability}
                  className="grid grid-cols-3 border-t border-border/60 text-sm"
                >
                  <div className="px-5 py-4">{row.capability}</div>
                  <div className="px-5 py-4 text-center text-muted-foreground wrap-break-word">
                    {row.pro}
                  </div>
                  <div className="bg-brand/5 px-5 py-4 text-center font-semibold">
                    {row.enterprise}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request Demo */}
        <section id="demo" className="scroll-mt-20 mb-10">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-brand/7 transform -rotate-2 scale-110"
            />
            <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to scale{" "}
                  <span className="block text-brand">your intelligence?</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Speak with our solutions engineering team to see how Doxie can
                  integrate with your existing enterprise stack.
                </p>
                <ul className="mt-8 flex flex-col gap-4">
                  {CONSULT.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="size-5 shrink-0 text-brand" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <DemoForm />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter/>
    </div>
  );
}
