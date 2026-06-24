"use client";

import { useEffect, useState } from "react";

import Aurora from "@/components/Aurora";

const FALLBACK = ["#C9A800", "#FFD615", "#F9FF21"];
const BRAND_VARS = ["--brand-dark", "--brand", "--brand-strong"] as const;

const toHex = (n: string) => Math.round(+n).toString(16).padStart(2, "0");

/** Resolve a CSS var (hex/oklch/named) to a #rrggbb string OGL can parse. */
function resolveHex(varName: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  const el = document.createElement("span");
  el.style.color = raw || "#FFD615";
  el.style.display = "none";
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = resolved.match(/(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/);
  if (!m) return "#FFD615";
  return `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`;
}

type BrandAuroraProps = {
  amplitude?: number;
  blend?: number;
  speed?: number;
};

export function BrandAurora(props: BrandAuroraProps) {
  const [colorStops, setColorStops] = useState<string[]>(FALLBACK);

  useEffect(() => {
    const update = () => setColorStops(BRAND_VARS.map(resolveHex));
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

  return <Aurora colorStops={colorStops} {...props} />;
}
