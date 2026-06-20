import { BrainCircuit, Zap } from "lucide-react";

export function WhyDoxie() {
  return (
    <section id="features" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why choose Doxie?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Built for precision, security, and scale.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured: privacy */}
          <div className="bg-[#232A3A] flex flex-col rounded-2xl border border-border p-6 ring-1 ring-foreground/5 lg:col-span-2 lg:row-span-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-brand px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wide text-brand-foreground">
              Security First
            </span>
            <h3 className="mt-4 text-3xl font-semibold">Enterprise-Grade Privacy</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Your data is never used to train our models. We use SOC-2 compliant
              infrastructure with end-to-end encryption for every document.
            </p>

            {/* Bottom preview: a darker panel that fades to the right into the card. */}
            <div className="mt-6 flex-1 rounded-lg bg-linear-to-b from-background to-transparent p-4">
              <div className="space-y-2.5">
                <div className="h-2.5 w-1/3 rounded bg-brand/50" />
                <div className="h-2.5 w-2/3 rounded bg-brand/20" />
                <div className="h-2.5 w-1/2 rounded bg-brand/8" />
                <div className="h-2.5 w-3/5 rounded bg-brand/2" />
              </div>
            </div>
          </div>

          {/* Instant processing */}
          <div className="rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5">
            <Zap className="size-6 text-brand" />
            <h3 className="mt-3 font-semibold">Instant Processing</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Proprietary OCR technology processes 100+ pages in under 5 seconds.
            </p>
          </div>

          {/* Multi-model (filled) */}
          <div className="rounded-2xl bg-brand-strong p-6 text-brand-foreground">
            <BrainCircuit className="size-6" />
            <h3 className="mt-3 font-semibold">Multi-Model Brain</h3>
            <p className="mt-1.5 text-sm text-brand-foreground/80">
              Switch between GPT-4, Claude 3.5, and Gemini 1.5 Pro seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
