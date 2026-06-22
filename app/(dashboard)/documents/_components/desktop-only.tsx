"use client";

import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Renders children on tablet/desktop only. On phones it returns null so the
 * heavy inline PDF viewer never mounts (the PDF is reachable via a Sheet there).
 */
export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <>{children}</>;
}
