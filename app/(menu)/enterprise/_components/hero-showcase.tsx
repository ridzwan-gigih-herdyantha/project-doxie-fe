"use client";

import { Shield, TerminalSquare, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroShowcase() {
  const [flipped, setFlipped] = useState(false);

  const tiles = [
    { icon: Shield, active: true },
    { icon: TerminalSquare, active: false },
    { icon: BarChart3, active: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border bg-card p-5 ring-1 ring-foreground/5 transition-transform duration-700 ease-in-out ${
        flipped ? "-rotate-3" : "rotate-3"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_60%)]"
      />
      <div className="relative">
        <div className="space-y-2">
          <div
            className={`h-2.5 rounded-full bg-foreground/15 transition-all duration-700 ease-in-out ${
              flipped ? "w-1/3" : "w-2/3"
            }`}
          />
          <div
            className={`h-2.5 rounded-full transition-all duration-700 ease-in-out ${
              flipped ? "bg-foreground/15 w-3/5" : "bg-foreground/8 w-2/5"
            }`}
          />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={
                t.active
                  ? "flex aspect-video items-center justify-center rounded-md bg-brand/10 ring-1 ring-brand/50"
                  : "flex aspect-video items-center justify-center rounded-md border border-border bg-background/40"
              }
            >
              <t.icon className="size-6 text-brand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}