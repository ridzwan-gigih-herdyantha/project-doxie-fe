"use client";

import GradientText from "@/components/GradientText";
import { cn } from "@/lib/utils";

/**
 * Animated, brand-reactive eyebrow used above section headings.
 * Colors reference the live `--brand*` CSS vars so it follows runtime branding.
 */
export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GradientText
      colors={[
        "var(--brand-dark)",
        "var(--brand-strong)",
        "var(--brand)",
        "var(--brand-strong)",
        "var(--brand-dark)",
      ]}
      animationSpeed={6}
      className={cn(
        "mb-3 cursor-default! text-xs font-semibold uppercase tracking-[0.25em]",
        className,
      )}
    >
      {children}
    </GradientText>
  );
}
