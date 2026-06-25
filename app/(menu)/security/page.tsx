import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldPlus,
  Lock,
  Layers,
  ArrowLeftRight,
  Database,
  Fingerprint,
  BadgeCheck,
  Award,
  CheckCircle2,
  Download,
  ArrowRight,
  Network,
  type LucideIcon,
  CloudCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BrandAurora } from "@/components/landing/brand-aurora";
import { GlowShield } from "./_components/glow-shield";

export const metadata: Metadata = {
  title: "Security · DoxieAI",
  description:
    "Military-grade encryption, rigorous compliance, and multi-layered infrastructure — built on a foundation of absolute trust.",
};

const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Compliance", href: "#compliance" },
  { label: "Transparency", href: "#transparency" },
];

const COMPLIANCE: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: BadgeCheck,
    title: "SOC 2 Type II",
    desc: "Annual audit of security, availability, and confidentiality.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR Compliant",
    desc: "Strict adherence to EU data protection and privacy rules.",
  },
  {
    icon: ShieldPlus,
    title: "HIPAA Ready",
    desc: "Certified to handle protected health information securely.",
  },
  {
    icon: Award,
    title: "ISO 27001",
    desc: "International standard for information security management.",
  },
];

const TRANSPARENCY = [
  {
    title: "Bug Bounty Program",
    desc: "We partner with top-tier security researchers to identify and resolve vulnerabilities before they can be exploited.",
  },
  {
    title: "Real-time Status Page",
    desc: "Full visibility into our system health and incident history at any time.",
  },
  {
    title: "No Personal Data Sales",
    desc: "Your data is never sold, traded, or used for advertising. Period.",
  },
];

function SectionHeading({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">{sub}</p>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand">
                <ShieldCheck className="size-3.5" />
                Enterprise-grade security
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Built on a foundation of absolute trust.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Doxie employs military-grade encryption, rigorous compliance
                standards, and multi-layered infrastructure to ensure your
                intelligence remains yours alone.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5">
                  <Lock className="size-5 text-brand" />
                  <div>
                    <p className="text-xs text-muted-foreground">Encryption</p>
                    <p className="font-mono text-lg font-semibold -my-1">AES-256</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 ring-1 ring-foreground/5">
                  <ShieldCheck className="size-5 text-brand" />
                  <div>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="font-mono text-lg font-semibold -my-1">99.99%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shield showcase */}
            <GlowShield/>
          </div>
        </section>

        {/* Infrastructure & Resilience */}
        <section id="infrastructure" className="scroll-mt-20 border-b border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              title="Infrastructure & Resilience"
              sub="Operating on the world's most secure cloud environments with multi-region redundancy."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {/* Hybrid Cloud — large */}
              <Card className="relative overflow-hidden ring-foreground/10 lg:col-span-2">
                <CardContent className="flex h-full flex-col">
                  <Network
                    aria-hidden
                    className="pointer-events-none absolute right-0 bottom-0 size-60 text-brand opacity-10"
                  />
                  <CloudCheck className="size-14 text-brand" />
                  <h3 className="mt-4 text-lg font-semibold">
                    Hybrid Cloud Architecture
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    Our core is distributed across AWS and GCP, utilizing isolated
                    VPCs and dedicated hardware to prevent noisy-neighbor effects and
                    ensure consistent performance.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["AWS US-East-1", "GCP Europe-West"].map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-md text-foreground/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Right stack */}
              <div className="grid gap-5">
                <Card className="ring-foreground/10">
                  <CardContent className="flex flex-col gap-1.5">
                    <Layers className="size-6 text-brand" />
                    <h3 className="mt-1 text-sm font-semibold">Redundancy</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Real-time data replication across 3 availability zones with
                      automated failover.
                    </p>
                  </CardContent>
                </Card>
                <Card className="ring-foreground/10">
                  <CardContent className="flex flex-col gap-1.5">
                    <ShieldAlert className="size-6 text-brand" />
                    <h3 className="mt-1 text-sm font-semibold">DDoS Shield</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Enterprise-grade protection against Layer 3, 4, and 7 attacks,
                      integrated at the edge.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Row 2 */}
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <Card className="ring-foreground/10">
                <CardContent className="flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Encryption in Transit & Rest
                      </h3>
                      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        All sensitive data is secured with advanced cryptographic
                        protocols.
                      </p>
                    </div>
                    <Lock className="size-5 shrink-0 text-brand" />
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm">
                        <ArrowLeftRight className="size-4 text-muted-foreground" />
                        In-Transit
                      </span>
                      <span className="font-mono text-sm text-brand">
                        TLS 1.3 (ChaCha20)
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm">
                        <Database className="size-4 text-muted-foreground" />
                        At-Rest
                      </span>
                      <span className="font-mono text-sm text-brand">
                        AES-256-GCM
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ring-foreground/10">
                <CardContent className="flex items-center gap-5">
                  <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background/60">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_70%)]"
                    />
                    <Fingerprint className="relative size-12 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Identity & Access</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Granular RBAC, SAML 2.0 SSO integration, and mandatory
                      multi-factor authentication for all administrative actions.
                    </p>
                    <Link
                      href="#"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                    >
                      Configure SSO
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance & Certifications */}
        <section id="compliance" className="scroll-mt-20 border-b border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              title="Compliance & Certifications"
              sub="We undergo regular third-party audits to maintain the highest standards of data privacy."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COMPLIANCE.map((c) => (
                <Card key={c.title} className="ring-foreground/10">
                  <CardContent className="flex flex-col items-center gap-3 text-center">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                      <c.icon className="size-6" />
                    </div>
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-wide">
                      {c.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {c.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency + Whitepaper */}
        <section id="transparency" className="scroll-mt-20 border-b border-border/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Transparency is our core policy.
              </h2>
              <ul className="mt-8 flex flex-col gap-6">
                {TRANSPARENCY.map((t) => (
                  <li key={t.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <h3 className="text-sm font-semibold">{t.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="relative overflow-hidden ring-foreground/10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_60%)]"
              />
              <CardContent className="relative flex flex-col items-center gap-4 py-10 text-center">
                <h3 className="text-xl font-semibold">
                  Download our Security Whitepaper
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Get a deep dive into our architectural decisions and data handling
                  procedures.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 rounded-md p-6 dark:border-brand/60 border-brand/40 bg-transparent text-brand hover:bg-brand/10 hover:text-brand"
                >
                  <a href="#">
                    <Download className="size-4" />
                    Download PDF (2.4 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-card px-8 py-16 text-center ring-1 ring-foreground/5">
              {/* Aurora background (brand gold) */}
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
                  Secure your future today.
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Join over 500+ enterprises who trust Doxie with their most
                  sensitive AI workloads.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-xl px-7 text-base bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    <Link href="/register">Get Started Now</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="h-12 rounded-xl px-7 text-base"
                  >
                    <Link href="#">Contact Sales</Link>
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
