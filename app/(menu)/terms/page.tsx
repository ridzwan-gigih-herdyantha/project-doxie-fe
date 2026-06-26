import type { Metadata } from "next";
import { BadgeCheck, Info, Ban, Lock, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { TermsToc } from "./_components/terms-toc";

export const metadata: Metadata = {
  title: "Terms of Service · DoxieAI",
  description:
    "The legal terms governing your access to and use of the Doxie AI platform and services.",
};

// Top-nav links are the sections that live on THIS page.
const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Acceptable Use", href: "#acceptable-use" },
  { label: "Billing", href: "#billing" },
  { label: "AI Disclaimer", href: "#ai-disclaimer" },
];

const ACCOUNT = [
  {
    label: "Eligibility",
    desc: "You must be at least 18 years of age and have the legal capacity to enter into a binding contract to create a workspace.",
  },
  {
    label: "Security",
    desc: "You are responsible for safeguarding your password and for all activities that occur under your account credentials.",
  },
];

const PROHIBITED = [
  "Reverse engineering, decompiling, or attempting to extract the source code of the Doxie AI models.",
  "Using the service to generate malicious content, malware, or fraudulent documentation.",
  "Circumventing any rate limits or security measures designed to protect the infrastructure.",
  "Automated data scraping of our underlying proprietary knowledge base.",
];

const BILLING = [
  {
    term: "Subscription Cycles",
    condition:
      "Billed monthly or annually in advance. Non-refundable after the first 7 days.",
  },
  {
    term: "Usage Limits",
    condition: "Excessive API consumption may result in tiered overage charges.",
  },
  {
    term: "Taxes",
    condition:
      "Prices are exclusive of VAT and local taxes unless otherwise specified.",
  },
];

function SectionHeading({
  id,
  n,
  children,
}: {
  id: string;
  n: number;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight">
      {n}. {children}
    </h2>
  );
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 lg:py-20">
        {/* Header */}
        <header className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs">
            <span className="rounded-md bg-brand/15 px-2 py-0.5 font-mono font-semibold uppercase tracking-wide text-brand">
              Legal
            </span>
            <span className="font-mono text-muted-foreground">
              Last Updated: June 2026
            </span>
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Please read these terms carefully. By using Doxie, you agree to be bound
            by these legal conditions ensuring a secure AI-driven documentation
            environment.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sticky table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TermsToc />
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-16">
            {/* AI Disclaimer callout */}
            <section
              id="ai-disclaimer"
              className="relative scroll-mt-24 overflow-hidden rounded-lg border border-brand/20 bg-brand/5 ring-1 ring-foreground/5"
            >
              {/* Left accent — clipped by the rounded container so it follows the corner. */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-brand"
              />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3 rounded">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/20">
                    <BadgeCheck className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-brand">
                      Mandatory AI Accuracy Disclaimer
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Doxie utilizes advanced Large Language Models to process and
                      summarize documentation. While we strive for absolute precision,
                      AI may generate inaccurate information or &ldquo;hallucinations.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border bg-background/40 p-5">
                  <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-brand">
                    <Info className="size-4" />
                    Our Verification Protocol
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    To mitigate risk, Doxie provides{" "}
                    <span className="font-medium text-brand">
                      direct page citations
                    </span>{" "}
                    and source linking for every claim generated. Users are
                    contractually obligated to verify critical data points by clicking
                    the citations provided before relying on AI outputs for legal or
                    technical decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* 1. Acceptance */}
            <section className="flex flex-col gap-4">
              <SectionHeading id="acceptance" n={1}>
                Acceptance of Terms
              </SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                These Terms of Service constitute a legally binding agreement between
                you and Doxie AI regarding your access to and use of the Doxie platform
                and associated services.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By accessing our website or using our software, you represent that you
                have read, understood, and agreed to be bound by all of these Terms. If
                you do not agree with all of these terms, then you are expressly
                prohibited from using the service and must discontinue use immediately.
              </p>
            </section>

            {/* 2. Account Registration */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="account" n={2}>
                Account Registration
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {ACCOUNT.map((a) => (
                  <Card key={a.label} className="ring-foreground/10 rounded-md">
                    <CardContent className="flex flex-col gap-2">
                      <h3 className="font-mono text-sm font-semibold text-brand">
                        {a.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {a.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 3. Acceptable Use */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="acceptable-use" n={3}>
                Acceptable Use Policy
              </SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You <strong className="text-brand">agree not to engage</strong> in any of the following prohibited activities:
              </p>
              <ul className="flex flex-col gap-3">
                {PROHIBITED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Ban className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span className="leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Billing */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="billing" n={4}>
                Billing and Payments
              </SectionHeading>
              <div className="overflow-hidden rounded-md ring-1 ring-foreground/10">
                <div className="grid grid-cols-[200px_1fr] gap-4 bg-muted-foreground/15 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Payment Term</span>
                  <span>Condition</span>
                </div>
                {BILLING.map((row, i) => (
                  <div key={row.term}>
                    {i > 0 && <Separator />}
                    <div className="grid grid-cols-[200px_1fr] bg-card/80 gap-4 px-5 py-4 text-sm">
                      <span className="font-medium text-brand">{row.term}</span>
                      <span className="leading-relaxed text-muted-foreground">
                        {row.condition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Intellectual Property */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="ip" n={5}>
                Intellectual Property
              </SectionHeading>
              <div className="grid items-center gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your documents remain{" "}
                    <span className="font-medium text-brand">yours</span>. Doxie does
                    not claim ownership of the input data or the specific outputs
                    generated for your account.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    However, Doxie AI retains all rights to the platform interface, the
                    underlying model architecture, and the proprietary vector database
                    methods used to provide the service.
                  </p>
                </div>
                <ProtectedAssets />
              </div>
            </section>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

/** Decorative "PROTECTED ASSETS" graphic for the IP section. */
function ProtectedAssets() {
  const Icon: LucideIcon = Lock;
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#070E1D] ring-1 ring-foreground/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(220,226,247,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,226,247,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--brand)_16%,transparent),transparent_60%)]"
      />
      <div className="relative flex flex-col items-center gap-3">
        <Icon className="size-12 text-brand drop-shadow-[0_0_20px_var(--brand)]" />
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Protected Assets
        </span>
      </div>
    </div>
  );
}
