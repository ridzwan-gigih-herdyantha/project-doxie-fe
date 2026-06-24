import {
  ShieldCheck,
  Zap,
  BrainCircuit,
  Quote,
  FileSearch,
  Lock,
  type LucideIcon,
} from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import { BrandSpotlightCard } from "@/components/landing/brand-spotlight-card";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";

const MODELS = ["GPT-4o", "Claude 3.5", "Gemini 1.5"];

/** Decorative "encrypted document" graphic — illustrative, no fabricated metrics. */
function EncryptedDocGraphic() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-5">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
          <Lock className="size-5" />
        </div>
        <div className="flex-1 space-y-2.5 pt-1">
          <div className="h-2.5 w-3/4 rounded-full bg-foreground/15" />
          <div className="h-2.5 w-full rounded-full bg-foreground/10" />
          <div className="flex gap-2">
            <div className="h-2.5 flex-1 rounded-full bg-brand/30" />
            <div className="h-2.5 w-12 rounded-full bg-foreground/10" />
          </div>
          <div className="h-2.5 w-2/3 rounded-full bg-foreground/8" />
        </div>
      </div>
      {/* gold scan-line sweeping across the "document" */}
      <div
        aria-hidden
        className="animate-blob-drift pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-transparent via-brand/10 to-transparent"
      />
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </>
  );
}

export function WhyDoxie() {
  return (
    <section id="features" className="relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <AnimatedContent distance={40} duration={0.7}>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <SectionEyebrow>Why Doxie</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for precision, privacy, and scale
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Everything you need to turn dense documents into trustworthy answers.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid auto-rows-fr gap-5 lg:grid-cols-3">
          {/* Featured: privacy — spans two columns + two rows */}
          <AnimatedContent
            distance={50}
            duration={0.7}
            className="lg:col-span-2 lg:row-span-2"
          >
            <BrandSpotlightCard className="flex h-full flex-col justify-between bg-[#1a2233] p-8">
              <div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand-foreground">
                  <ShieldCheck className="size-3.5" />
                  Security first
                </span>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  Enterprise-grade privacy by default
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your documents are never used to train models. SOC-2 compliant
                  infrastructure with end-to-end encryption on every file you upload.
                </p>
              </div>

              <EncryptedDocGraphic />

              <div className="mt-4 flex flex-wrap gap-2">
                {["SOC-2", "E2E Encrypted", "GDPR Ready"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </BrandSpotlightCard>
          </AnimatedContent>

          {/* Instant processing */}
          <AnimatedContent distance={50} duration={0.7} delay={0.1}>
            <BrandSpotlightCard className="h-full p-7">
              <Feature icon={Zap} title="Instant processing">
                Proprietary OCR pipeline ingests 100+ pages in under five seconds.
              </Feature>
            </BrandSpotlightCard>
          </AnimatedContent>

          {/* Multi-model — filled brand card with model chips */}
          <AnimatedContent distance={50} duration={0.7} delay={0.18}>
            <div className="flex h-full flex-col rounded-3xl bg-brand-strong p-7 text-brand-foreground">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-foreground/10">
                <BrainCircuit className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Multi-model brain</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-foreground/80">
                Switch between frontier models mid-conversation — no copy-paste.
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {MODELS.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-brand-foreground/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Citations */}
          <AnimatedContent distance={50} duration={0.7} delay={0.1}>
            <BrandSpotlightCard className="h-full p-7">
              <Feature icon={Quote} title="Verifiable citations">
                Every answer links back to the exact page, so you can trust and verify.
              </Feature>
            </BrandSpotlightCard>
          </AnimatedContent>

          {/* Semantic search */}
          <AnimatedContent distance={50} duration={0.7} delay={0.18}>
            <BrandSpotlightCard className="h-full p-7">
              <Feature icon={FileSearch} title="Semantic search">
                Retrieval-augmented answers surface the right passage, not just keywords.
              </Feature>
            </BrandSpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
