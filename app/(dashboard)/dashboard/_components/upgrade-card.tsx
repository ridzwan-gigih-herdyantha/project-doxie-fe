"use client";

import { useRef } from "react";
import { CircleCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FEATURES = ["GPT-4o Integration", "Custom Workspaces"];

export default function UpgradeCard({ className }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
  };

  const rest = "translate(calc(100cqw - 68px), -66px)";

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.transform = rest;
  };

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "@container relative justify-between gap-6 overflow-hidden bg-[#070E1D] p-6 ring-1 ring-brand/15 transition-all duration-200",
        className,
      )}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute size-30 rounded-full bg-brand-strong blur-3xl transition-transform duration-150 ease-out"
        style={{ transform: rest }}
      />

      <div className="relative flex flex-col gap-4">
        <Sparkles className="size-6 text-brand" />

        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold text-foreground">Unlock AI Power</h3>
          <p className="text-sm text-muted-foreground">
            Get unlimited document uploads, 100k+ tokens/mo, and priority document
            parsing.
          </p>
        </div>

        <ul className="flex flex-col gap-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
              <CircleCheck className="size-4 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/settings?tab=billing"> 
        <Button
          size="lg"
          className="relative w-full border-0 font-semibold text-brand-foreground bg-brand-strong
            shadow-[0_8px_14px_-4px_var(--brand-strong)] hover:bg-brand hover:shadow-[0_3px_22px_-2px_var(--brand)]
            active:shadow-[0_4px_14px_-4px_var(--brand)] transition-all duration-400
            disabled:pointer-events-none disabled:opacity-50
            aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          Upgrade to Pro
        </Button>
      </Link>
    </Card>
  );
}