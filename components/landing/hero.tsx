import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

function AppPreview() {
  return (
    <div className="relative rounded-3xl border border-border bg-[#0F1623] p-1 shadow-2xl shadow-black/50 ring-1 ring-foreground/10">
      <Image
        src="/Doxie AI Dashboard.png"
        alt="App preview"
        width={1280}
        height={720}
        priority
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-18 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#68DBA9]/30 bg-[#68DBA9]/10 px-3 py-1 text-xs font-medium text-[#68DBA9]">
            <Sparkles className="size-3.5" />
            AI-Powered Document Intelligence
          </span>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Chat with your <span className="text-[#68DBA9]">documents</span> —
            instantly.
          </h1>

          <p className="max-w-md text-base text-muted-foreground">
            Upload any PDF and get instant AI-powered answers. Powered by GPT-4o,
            Claude, and Gemini for unprecedented precision.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 px-6 bg-[#68DBA9] text-[#0C1322] hover:bg-[#68DBA9]/90"
            >
              <Link href="/register">
                Get started free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="default" 
              className="h-11 px-6 bg-transparent border border-white text-white hover:bg-white/90 hover:text-[#0C1322] hover:border-[#0C1322]">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-full bg-[#68DBA9]/15 blur-3xl"
          />
          <div className="relative lg:-top-8">
            <AppPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
