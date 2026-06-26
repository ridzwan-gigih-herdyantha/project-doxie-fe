"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  KeyRound,
  Upload,
  MessageSquare,
  History,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "introduction", label: "Introduction", icon: LayoutDashboard },
  { id: "authentication", label: "Authentication", icon: KeyRound },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "sessions", label: "Sessions", icon: History },
];

const ACTIVE_OFFSET = 140;

export function DocsSidebarNav() {
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
    <nav className="mt-4 flex flex-col gap-1">
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => {
            setActive(item.id);
            lockUntil.current = Date.now() + 700;
          }}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-sm transition-colors",
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
