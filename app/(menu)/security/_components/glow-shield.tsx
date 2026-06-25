// app/(menu)/enterprise/_components/shield-showcase.tsx
"use client";

import { ShieldPlus } from "lucide-react";

export function GlowShield() {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative flex aspect-square w-full max-w-md items-center justify-center">
        {/* static glow */}
        <div
          aria-hidden
          className="absolute top-12 inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,var(--brand)_5%,transparent),transparent_65%)]"
        />
        {/* pulse glow layer */}
        <div
          aria-hidden
          className="absolute top-12 inset-0 animate-[glowPulse_3s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,var(--brand)_15%,transparent),transparent_50%)]"
        />
        <ShieldPlus className="relative size-36 text-brand opacity-65 drop-shadow-[0_0_18px_color-mix(in_oklch,var(--brand)_50%,transparent)]" />
      </div>
    </div>
  );
}