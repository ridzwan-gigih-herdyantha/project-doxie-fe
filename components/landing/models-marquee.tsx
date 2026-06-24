"use client";

import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

const ModelChip = ({ name }: { name: string }) => (
  <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground">
    {name}
  </span>
);

const MODELS: LogoItem[] = [
  { node: <ModelChip name="GPT-4o" />, title: "GPT-4o" },
  { node: <ModelChip name="Claude 3.5 Sonnet" />, title: "Claude 3.5 Sonnet" },
  { node: <ModelChip name="Gemini 1.5 Pro" />, title: "Gemini 1.5 Pro" },
];

export function ModelsMarquee() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          One workspace, every frontier model
        </p>
        <LogoLoop
          logos={MODELS}
          speed={30}
          direction="left"
          gap={64}
          logoHeight={20}
          pauseOnHover
          fadeOut
          fadeOutColor="#0C1322"
          ariaLabel="Supported AI models"
        />
      </div>
    </section>
  );
}
