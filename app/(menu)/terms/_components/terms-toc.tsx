"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe,
  CircleCheck,
  UserCircle,
  Hand,
  CreditCard,
  Copyright,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Order matches the content's DOM order (the disclaimer callout sits first).
const ITEMS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "ai-disclaimer", label: "AI Disclaimer", icon: Globe },
  { id: "acceptance", label: "Acceptance", icon: CircleCheck },
  { id: "account", label: "Account", icon: UserCircle },
  { id: "acceptable-use", label: "Acceptable Use", icon: Hand },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "ip", label: "IP Ownership", icon: Copyright },
];

// How far below the viewport top the "active line" sits.
const ACTIVE_OFFSET = 140;

export function TermsToc() {
  const [active, setActive] = useState(ITEMS[0].id);
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
