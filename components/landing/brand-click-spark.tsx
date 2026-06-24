"use client";

import { useEffect, useState } from "react";

import ClickSpark from "@/components/ClickSpark";

/** Resolve the live `--brand` CSS var to a canvas-friendly color string. */
function readBrandColor(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--brand")
    .trim();
  if (!raw) return "#FFD615";
  // Resolve hex/oklch/named to rgb so canvas strokeStyle is always valid.
  const el = document.createElement("span");
  el.style.color = raw;
  el.style.display = "none";
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color;
  document.body.removeChild(el);
  return resolved || raw;
}

type BrandClickSparkProps = Omit<
  React.ComponentProps<typeof ClickSpark>,
  "sparkColor"
>;

export function BrandClickSpark(props: BrandClickSparkProps) {
  const [color, setColor] = useState("#FFD615");

  useEffect(() => {
    const update = () => setColor(readBrandColor());
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

  return <ClickSpark sparkColor={color} {...props} />;
}
