import { FileUp, MessageSquareText, CircleCheck, type LucideIcon } from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: FileUp,
    title: "Upload",
    description:
      "Drop your PDFs into a secure, encrypted workspace. We chunk and embed every page in seconds.",
  },
  {
    icon: MessageSquareText,
    title: "Ask",
    description:
      "Ask anything in natural language. Doxie retrieves the most relevant passages to ground its answer.",
  },
  {
    icon: CircleCheck,
    title: "Get answers",
    description:
      "Receive accurate, page-cited responses you can verify — in seconds, not hours.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-border/60 bg-[#0A1019]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <AnimatedContent distance={40} duration={0.7}>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From file to answer in three steps
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Unlock the knowledge trapped inside your documents — no setup, no learning curve.
            </p>
          </div>
        </AnimatedContent>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* connecting line on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-linear-to-r from-transparent via-brand/30 to-transparent md:block"
          />
          {STEPS.map((s, i) => (
            <AnimatedContent key={s.title} distance={60} duration={0.7} delay={i * 0.12}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 ring-1 ring-foreground/5 transition-colors hover:border-brand/40">
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <s.icon className="size-5" />
                  </div>
                  <span className="font-mono text-4xl font-bold text-foreground/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
