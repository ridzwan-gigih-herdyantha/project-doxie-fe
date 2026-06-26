"use client";

import { useEffect, useRef, useState } from "react";
import {
  Database,
  Activity,
  Lock,
  Share2,
  Scale,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Order matches the content's DOM order.
const ITEMS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "data-collection", label: "Data Collection", icon: Database },
  { id: "data-usage", label: "Usage & Models", icon: Activity },
  { id: "storage", label: "Storage & Encryption", icon: Lock },
  { id: "sharing", label: "Third-party Sharing", icon: Share2 },
  { id: "user-rights", label: "User Rights", icon: Scale },
  { id: "dpo", label: "DPO Contact", icon: MapPin },
];

// How far below the viewport top the "active line" sits.
const ACTIVE_OFFSET = 140;

/** Sticky table of contents with scroll-spy highlighting of the active section. */
export function PrivacyToc() {
  const [active, setActive] = useState(ITEMS[0].id);
  // Ignore scroll updates briefly after a click so the highlight doesn't flicker
  // through the in-between sections while the smooth scroll is in flight.
  const lockUntil = useRef(0);

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el != null,
    );

    let frame = 0;
    const compute = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      let current = sections[0]?.id ?? ITEMS[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = s.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="flex flex-col gap-2">
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => {
            setActive(item.id);
            lockUntil.current = Date.now() + 700;
          }}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-sm font-medium transition-colors",
            active === item.id
              ? "bg-brand text-brand-foreground"
              : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
