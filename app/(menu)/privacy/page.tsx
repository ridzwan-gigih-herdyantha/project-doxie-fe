import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldUser,
  Ban,
  Database,
  Activity,
  Lock,
  Share2,
  Scale,
  MapPin,
  Mail,
  CheckCircle2,
  Trash2,
  Download,
  PencilLine,
  EyeOff,
  type LucideIcon,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { PrivacyToc } from "./_components/privacy-toc";

export const metadata: Metadata = {
  title: "Privacy Policy · DoxieAI",
  description:
    "How Doxie collects, uses, stores, and protects your data — built on transparency and zero-knowledge security.",
};

// Top-nav links are the sections that live on THIS page.
const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Data Collection & Usage", href: "#data-collection" },
  { label: "Storage", href: "#storage" },
  { label: "User Rights", href: "#user-rights" },
  { label: "DPO Contact", href: "#dpo" },
];

const COLLECTION = [
  { label: "Identity Data:", text: "Full name, business email address." },
  { label: "Technical Data:", text: "IP addresses, browser types, and usage logs." },
  {
    label: "Content Data:",
    text: "Textual content within documents uploaded for processing.",
  },
];

const STORAGE = [
  {
    label: "At Rest",
    value: "AES-256",
    desc: "Military-grade disk-level encryption for all stored assets.",
  },
  {
    label: "In Transit",
    value: "TLS 1.3",
    desc: "End-to-end encrypted tunnels for every data packet.",
  },
  {
    label: "Key Mgmt",
    value: "KMS",
    desc: "FIPS 140-2 Level 3 Hardware Security Modules.",
  },
];

const PARTNERS = [
  {
    category: "Cloud Infrastructure",
    purpose: "Hosting & Computation",
    status: "Sub-processor",
  },
  {
    category: "Payment Processing",
    purpose: "Subscription Billing",
    status: "PCI-DSS",
  },
  {
    category: "Analytics",
    purpose: "Performance Monitoring",
    status: "Anonymized",
  },
];

const RIGHTS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Trash2,
    title: "Right to Erasure",
    desc: "Request complete deletion of your account and all associated document data at any time.",
  },
  {
    icon: Download,
    title: "Data Portability",
    desc: "Export your data in machine-readable JSON/CSV formats whenever you choose.",
  },
  {
    icon: PencilLine,
    title: "Right to Rectify",
    desc: "Correct inaccurate personal information stored within our identity management system.",
  },
  {
    icon: EyeOff,
    title: "Restrict Processing",
    desc: "Opt-out of non-essential processing activities while maintaining core service access.",
  },
];

function SectionHeading({
  id,
  n,
  icon: Icon,
  children,
}: {
  id: string;
  n: number;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="flex scroll-mt-24 items-center gap-3 text-2xl font-bold tracking-tight"
    >
      <Icon className="size-6 text-brand" />
      <span>
        {n}. {children}
      </span>
    </h2>
  );
}

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-fit items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand ring-1 ring-brand/20">
      {/* <span className="size-1.5 rounded-full bg-brand" /> */}
      {children}
    </span>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 lg:py-20">
        {/* Header */}
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 ring-1 ring-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-strong">
            <ShieldCheck className="size-3.5" />
            Privacy &amp; Security
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Last updated: October 24, 2023. At Doxie, we treat your documents with
            the same level of security we would our own. Our platform is built on
            transparency and non-compromised data integrity.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Sticky table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PrivacyToc />
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-16">
            {/* Highlight cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="ring-foreground/10">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <ShieldUser className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Privacy Zero-Knowledge</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Our proprietary architecture ensures that even we cannot read
                    your data. Your decryption keys are managed locally on your
                    device or via secure HSMs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-brand/5 ring-brand/20">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                    <Ban className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand">No Training Data</h3>
                  <p className="text-sm font-medium leading-relaxed text-foreground/85">
                    Your documents are never used for training models. Every
                    interaction is stateless, and your intellectual property remains
                    exclusively yours.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 1. Data Collection */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="data-collection" n={1} icon={Database}>
                Data Collection
              </SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We collect only the information necessary to provide the Doxie AI
                service. This includes account credentials (email and hashed
                passwords), technical metadata for service performance, and the
                content you explicitly upload for analysis.
              </p>
              <div className="rounded-xs border-l-4 border-brand bg-card/60 px-5 py-4 ring-1 ring-foreground/5">
                <dl className="flex flex-col gap-2 font-mono text-sm">
                  {COLLECTION.map((row) => (
                    <div key={row.label} className="flex flex-wrap gap-x-2">
                      <dt className="text-brand">{row.label}</dt>
                      <dd className="text-muted-foreground">{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            {/* 2. Data Usage */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="data-usage" n={2} icon={Activity}>
                Data Usage
              </SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Doxie uses your data solely to execute the AI-driven transformations,
                summarizations, and extractions you request. We do not monetize your
                data through advertising or profiling.
              </p>
              <Card className="bg-brand/5 ring-brand/30 rounded-md">
                <CardContent className="flex gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="text-sm font-semibold text-brand">
                      Model Integrity Guarantee
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      We utilize &ldquo;Private Instance&rdquo; deployments of Large
                      Language Models. This means your data is processed in an
                      isolated environment and purged immediately after the session
                      concludes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 3. Storage & Encryption */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="storage" n={3} icon={Lock}>
                Storage &amp; Encryption
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-3">
                {STORAGE.map((s) => (
                  <Card key={s.label} className="ring-brand-dark/30">
                    <CardContent className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-brand">
                        {s.label}
                      </span>
                      <span className="text-2xl font-bold tracking-tight">
                        {s.value}
                      </span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {s.desc}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Our infrastructure is hosted in ISO 27001, SOC2 Type II, and
                HIPAA-compliant data centers. We maintain 99.9% uptime while ensuring
                your document fragments are geographically sharded to prevent
                unauthorized reassembly.
              </p>
            </section>

            {/* 4. Third-party Sharing */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="sharing" n={4} icon={Share2}>
                Third-party Sharing
              </SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personally
                identifiable information to outside parties. This does not include
                trusted third parties who assist us in operating our website and
                conducting our business, so long as those parties agree to keep this
                information confidential.
              </p>

              <div className="overflow-hidden rounded-md">
                <div className="grid grid-cols-3 gap-4 bg-card/60 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-brand">
                  <span>Partner Category</span>
                  <span>Purpose</span>
                  <span>Status</span>
                </div>
                {PARTNERS.map((p, i) => (
                  <div key={p.category}>
                    {i > 0 && <Separator />}
                    <div className="grid grid-cols-3 items-center gap-4 px-5 py-4 text-sm">
                      <span className="font-medium">{p.category}</span>
                      <span className="text-muted-foreground">{p.purpose}</span>
                      <StatusBadge>{p.status}</StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. User Rights */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="user-rights" n={5} icon={Scale}>
                User Rights
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {RIGHTS.map((r) => (
                  <Card key={r.title} className="ring-foreground/10 rounded-sm">
                    <CardContent className="flex gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-sm text-brand">
                        <r.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{r.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {r.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* DPO Contact */}
            <section id="dpo" className="scroll-mt-24">
              <Card className="bg-card/60 ring-foreground/10 rounded-sm">
                <CardContent className="flex flex-col gap-6 py-2">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-brand">
                      Contact Our DPO
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      If you have any questions about this Privacy Policy or our
                      treatment of your personal data, please contact our Data
                      Protection Officer (DPO).
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href="mailto:support@doxieai.ridzwangigih.com"
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-brand/40"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg text-brand">
                        <Mail className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">support@doxieai.ridzwangigih.com</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg text-brand">
                        <MapPin className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Office</p>
                        <p className="text-sm font-medium">Silicon Valley, CA, USA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <p className="text-center text-xs text-muted-foreground">
              Looking for our terms?{" "}
              <Link href="/terms" className="text-brand hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
