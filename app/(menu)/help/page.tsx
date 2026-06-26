import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CreditCard,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquare,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LandingNavbar,
  type NavLink,
} from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { HelpFaq } from "./_components/help-faq";

export const metadata: Metadata = {
  title: "Help & Support · DoxieAI",
  description: "Find answers, browse guides, or reach out — we're here to help.",
};

const PAGE_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#categories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Set up your workspace and upload your first document.",
    href: "#",
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Uploading, processing, and managing your files.",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Chat & AI",
    description: "Asking questions, citations, and switching models.",
    href: "#",
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description: "Subscriptions, invoices, and plan limits.",
    href: "#",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description: "How we protect and encrypt your data.",
    href: "#",
  },
  {
    icon: LifeBuoy,
    title: "Troubleshooting",
    description: "Fixes for common issues and errors.",
    href: "#",
  },
];

const CONTACT: {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  href: string;
}[] = [
  {
    icon: Mail,
    title: "Email support",
    description: "We usually reply within 24 hours.",
    action: "Email us",
    href: "mailto:support@doxieai.com",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Guides and API references.",
    action: "Read docs",
    href: "/api-documentation",
  },
  {
    icon: Activity,
    title: "System status",
    description: "All systems operational.",
    action: "View status",
    href: "#",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar navLinks={PAGE_NAV} />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Help &amp; Support
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Find answers, browse guides, or reach out — we&apos;re here to help.
          </p>
        </div>

        {/* Categories */}
        <div
          id="categories"
          className="grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group rounded-xl border border-border bg-card p-5 ring-1 ring-foreground/5 transition-colors hover:border-brand/40"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-4 flex items-center gap-1 font-semibold">
                {c.title}
                <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <section id="faq" className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="text-lg font-semibold">Frequently asked questions</h2>
          <HelpFaq />
        </section>

        {/* Contact */}
        <section id="contact" className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="text-lg font-semibold">Still need help?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {CONTACT.map((c) => (
              <Card key={c.title} className="gap-0 p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {c.description}
                </p>
                <Button asChild variant="outline" className="mt-4 w-fit">
                  <a href={c.href}>{c.action}</a>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
