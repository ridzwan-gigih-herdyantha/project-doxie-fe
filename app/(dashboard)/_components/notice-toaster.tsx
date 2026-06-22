"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, { type: "info" | "error" | "success"; text: string }> = {
  "already-authed": {
    type: "info",
    text: "You're already signed in. Log out first to use a different account.",
  },
};

/** Shows a one-off toast from a `?notice=` param (e.g. after a redirect), then strips it. */
export function NoticeToaster() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shown = useRef(false);

  useEffect(() => {
    const notice = params.get("notice");
    if (!notice || shown.current) return;
    const msg = MESSAGES[notice];
    if (!msg) return;

    shown.current = true;
    toast[msg.type](msg.text);

    const next = new URLSearchParams(params);
    next.delete("notice");
    router.replace(`${pathname}${next.toString() ? `?${next}` : ""}`);
  }, [params, router, pathname]);

  return null;
}
