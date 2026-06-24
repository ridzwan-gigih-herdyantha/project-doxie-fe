import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  Layers,
  Search,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandOrb } from "@/components/landing/brand-orb";
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import StarBorder from "@/components/StarBorder";

const CAPABILITIES: { icon: LucideIcon; label: string }[] = [
  { icon: FileText, label: "Page-cited answers" },
  { icon: Lock, label: "Private by default" },
  { icon: Layers, label: "Multi-model" },
  { icon: Search, label: "Semantic search" },
];

function AppPreview() {
  return (
    <div className="group relative mx-auto w-full max-w-5xl">
      {/* Gold glow pooled behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[2.5rem] bg-brand/20 blur-3xl"
      />
      <div className="relative rounded-2xl border border-border bg-[#0F1623]/80 p-1.5 shadow-2xl shadow-black/60 ring-1 ring-foreground/10 backdrop-blur">
        {/* faux window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]/80" />
          <span className="size-2.5 rounded-full bg-[#28C840]/80" />
        </div>
        <Image
          src="/Doxie AI Dashboard.png"
          alt="Doxie AI dashboard preview"
          width={1280}
          height={720}
          priority
          className="w-full rounded-xl"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Orb — kept subtle; sits centered behind the hero copy */}
        <div className="absolute left-1/2 top-[40%] aspect-square w-[min(120vw,1100px)] -translate-x-1/2 -translate-y-1/2 opacity-100">
          <BrandOrb hoverIntensity={0.3} backgroundColor="#0C1322" />
        </div>
        {/* Gold blobs guarantee the on-brand tint */}
        <div className="animate-blob-drift absolute -left-24 top-10 size-[28rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="animate-blob-drift absolute -right-20 top-40 size-[24rem] rounded-full bg-brand-dark/10 blur-3xl [animation-delay:-6s]" />
        {/* Subtle grid, faded with a radial mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,226,247,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,226,247,0.04)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_40%,transparent_100%)]" />
        {/* Fade the section into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-20 text-center lg:pt-28">
        <Link
          href="#features"
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-brand/15"
        >
          <Sparkles className="size-3.5 text-brand" />
          <ShinyText
            text="AI-Powered Document Intelligence"
            speed={4}
            color="var(--brand)"
            shineColor="#FFFFFF"
            className="font-medium"
          />
        </Link>

        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          <SplitText
            tag="span"
            text="Chat with your documents,"
            className="block text-foreground"
            splitType="words"
            delay={40}
            duration={0.9}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
          />
          <SplitText
            tag="span"
            text="answered instantly."
            className="block text-brand"
            splitType="words"
            delay={40}
            duration={0.9}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
          />
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Upload any PDF and get instant, page-cited answers. Grounded by GPT-4o,
          Claude, and Gemini for precision you can actually trust.
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
          <StarBorder
            as={Link}
            href="#how-it-works"
            color="var(--brand)"
            speed="5s"
            className="text-base"
          >
            See how it works
          </StarBorder>
        </div>

        {/* Capabilities — truthful, no metrics */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {CAPABILITIES.map((c) => (
            <li
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-sm text-foreground/80 backdrop-blur"
            >
              <c.icon className="size-4 text-brand" />
              {c.label}
            </li>
          ))}
        </ul>
{/* 
        <div className="mt-16 w-full">
          <AppPreview />
        </div> */}
      </div>
    </section>
  );
}
