"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import NotificationBell from "./notif-button";

export function DocumentNavbar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full justify-between items-center gap-2">
      <Input
        type="search"
        placeholder="Search documents…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        startIcon={Search}
        className="w-64"
        aria-label="Search documents"
      />

      <NotificationBell />
    </div>
  );
}
