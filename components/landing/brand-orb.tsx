"use client";

import { useEffect, useState } from "react";

import Orb from "@/components/Orb";

/**
 * Orb tints its base palette by rotating hue in YIQ space, starting from this
 * violet (baseColor1 in the shader). We rotate FROM this hue TO the live brand
 * hue so the orb always matches `--brand`, including runtime branding overrides.
 */
const BASE_RGB = { r: 0.611765, g: 0.262745, b: 0.996078 };

function yiqAngleDeg(r: number, g: number, b: number): number {
  const i = 0.596 * r - 0.274 * g - 0.322 * b;
  const q = 0.211 * r - 0.523 * g + 0.312 * b;
  return (Math.atan2(q, i) * 180) / Math.PI;
}

const BASE_ANGLE = yiqAngleDeg(BASE_RGB.r, BASE_RGB.g, BASE_RGB.b);

/** Resolve any CSS color string (hex / oklch / rgb / named) to 0–1 rgb. */
function resolveToRgb(value: string): { r: number; g: number; b: number } | null {
  const el = document.createElement("span");
  el.style.color = value;
  el.style.display = "none";
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = computed.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  if (!m) return null;
  return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255 };
}

/** Hue rotation (deg) that maps the orb's base violet onto the current brand. */
function readBrandHue(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--brand")
    .trim();
  if (!raw) return 0;
  const rgb = resolveToRgb(raw);
  if (!rgb) return 0;
  const deg = yiqAngleDeg(rgb.r, rgb.g, rgb.b) - BASE_ANGLE;
  return ((deg % 360) + 360) % 360;
}

type BrandOrbProps = {
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  backgroundColor?: string;
};

export function BrandOrb(props: BrandOrbProps) {
  const [hue, setHue] = useState(234);

  useEffect(() => {
    const update = () => setHue(readBrandHue());
    update();

    // Runtime branding writes inline CSS vars on <html>; react to those.
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    // And to brand changes saved from another tab.
    window.addEventListener("storage", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", update);
    };
  }, []);

  return <Orb hue={hue} {...props} />;
}
