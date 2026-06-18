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
import { HelpFaq } from "./_components/help-faq";

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
    href: "#",
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Help &amp; Support</h1>
        <p className="text-sm text-muted-foreground">
          Find answers, browse guides, or reach out — we&apos;re here to help.
        </p>
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group rounded-xl border border-border bg-card p-5 ring-1 ring-foreground/5 transition-colors hover:border-[#68DBA9]/40"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#68DBA9]/10 text-[#68DBA9]">
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
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Frequently asked questions</h2>
        <HelpFaq />
      </section>

      {/* Contact */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Still need help?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT.map((c) => (
            <Card key={c.title} className="gap-0 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#68DBA9]/10 text-[#68DBA9]">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <Button asChild variant="outline" className="mt-4 w-fit">
                <a href={c.href}>{c.action}</a>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
