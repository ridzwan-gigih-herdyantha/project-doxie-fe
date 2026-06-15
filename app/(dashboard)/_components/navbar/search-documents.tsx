"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SearchDocuments() {
  const [query, setQuery] = useState("");

  return (
    <Input
      type="search"
      placeholder="Search documents…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      startIcon={Search}
      className="w-64"
      aria-label="Search documents"
    />
  );
}
