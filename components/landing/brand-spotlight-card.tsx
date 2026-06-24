"use client";

import { useEffect, useState } from "react";

import SpotlightCard from "@/components/SpotlightCard";

type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type Rgb = { r: number; g: number; b: number };

const FALLBACK: Rgb = { r: 255, g: 214, b: 21 };

/** Resolve the live `--brand` CSS var to 0–255 rgb (handles hex/oklch/named). */
function readBrandRgb(): Rgb {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--brand")
    .trim();
  const el = document.createElement("span");
  el.style.color = raw || "#FFD615";
  el.style.display = "none";
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = resolved.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  if (!m) return FALLBACK;
  return { r: Math.round(+m[1]), g: Math.round(+m[2]), b: Math.round(+m[3]) };
}

type BrandSpotlightCardProps = Omit<
  React.ComponentProps<typeof SpotlightCard>,
  "spotlightColor"
> & {
  /** Opacity of the brand-tinted spotlight glow. */
  alpha?: number;
};

export function BrandSpotlightCard({
  alpha = 0.12,
  ...props
}: BrandSpotlightCardProps) {
  const [rgb, setRgb] = useState<Rgb>(FALLBACK);

  useEffect(() => {
    const update = () => setRgb(readBrandRgb());
    update();

    // Runtime branding writes inline CSS vars on <html>; react to those.
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    window.addEventListener("storage", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", update);
    };
  }, []);

  const spotlightColor =
    `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` as RgbaColor;

  return <SpotlightCard spotlightColor={spotlightColor} {...props} />;
}
