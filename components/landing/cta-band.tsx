import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedContent from "@/components/AnimatedContent";
import { BrandClickSpark } from "@/components/landing/brand-click-spark";

export function CtaBand() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <AnimatedContent distance={50} duration={0.8}>
          <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-card px-8 py-16 text-center ring-1 ring-foreground/5">
            {/* gold ambiance */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%, #0C1322_0%, #0C1322_100%,transparent)]" />
            </div>

            {/* <BrandClickSpark sparkCount={10} sparkRadius={22} duration={500}> */}
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Stop reading. Start asking.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Join the researchers, analysts, and teams who turned their document
                pile into an instant, citable knowledge base.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-xl px-7 text-base bg-brand text-brand-foreground shadow-lg shadow-brand/20 hover:bg-brand/90"
                >
                  <Link href="/register">
                    Get started free
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-xl px-7 text-base hover:bg-foreground/5"
                >
                  <Link href="#pricing">View pricing</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No credit card required · Free forever plan
              </p>
            </div>
            {/* </BrandClickSpark> */}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
