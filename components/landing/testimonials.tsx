"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const TESTIMONIALS = [
  {
    quote:
      "Doxie has completely changed how I conduct lit reviews. What used to take days now takes minutes. The citations are incredibly reliable.",
    name: "Dr. Sarah Jenkins",
    role: "Senior Researcher, Stanford",
  },
  {
    quote:
      "The multi-model switching is a game changer. I use Claude for creative synthesis and GPT-4o for data extraction. Simply brilliant.",
    name: "Marcus Thorne",
    role: "Legal Analyst, NY",
  },
  {
    quote:
      "Cleanest UI in the AI space. It's rare to find a tool that is both this powerful and this intuitive. Our whole team is hooked.",
    name: "Elena Rodriguez",
    role: "Product Manager, FinTech",
  },
  {
    quote:
      "We onboarded our whole compliance team in a day. Page-cited answers mean we actually trust what it returns.",
    name: "David Okafor",
    role: "Head of Compliance, Lumen",
  },
  {
    quote:
      "I feed it 300-page technical specs and get precise answers in seconds. It has replaced three internal tools for us.",
    name: "Priya Nair",
    role: "Staff Engineer, Northwind",
  },
  {
    quote:
      "The summaries are genuinely good, not generic. It understands nuance better than anything else I've tried.",
    name: "Tom Becker",
    role: "Investigative Journalist",
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section className="border-t border-border/60 bg-[#0A1019]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Loved by experts</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Used by researchers at top universities and legal firms globally.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {TESTIMONIALS.map((t) => (
              <CarouselItem
                key={t.name}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/5">
                  <div className="flex gap-0.5 text-[#68DBA9]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic text-muted-foreground">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <Avatar size="default">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>DX</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
