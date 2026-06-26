"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const FAQS = [
  {
    q: "How do I upload a document?",
    a: 'Click "New Document" in the sidebar (or the upload tile on the dashboard), then drop a PDF or pick one from your computer. It appears under Documents once processed.',
  },
  {
    q: "Which AI models can I use?",
    a: "Switch between GPT-4o, Claude 3.5, and Gemini from the model picker in the chat navbar — even mid-conversation.",
  },
  {
    q: "How does Doxie answer from my documents?",
    a: "We chunk and embed your document, retrieve the most relevant passages for each question, and ground the model's answer in them with page references.",
  },
  {
    q: "Is my data private?",
    a: "Your documents are never used to train models, and everything is encrypted in transit and at rest.",
  },
  {
    q: "What are the plan limits?",
    a: "The Free plan includes up to 5 documents. Upgrade to Pro for unlimited documents, larger files, and priority processing.",
  },
  {
    q: "Can I delete a document?",
    a: "Yes — open the Documents page and use the delete button on any document card. This can't be undone.",
  },
];

export function HelpFaq() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? FAQS.filter(
        (f) =>
          f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
      )
    : FAQS;

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search help articles…"
        startIcon={Search}
        className="h-10 rounded-2xl dark:bg-transparent bg-transparent"
        aria-label="Search help articles"
      />

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border bg-card px-5 py-6 text-center text-sm text-muted-foreground ring-1 ring-foreground/5">
            No results for “{query}”. Try different keywords, or reach out to
            support below.
          </p>
        ) : (
          filtered.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border bg-card px-5 ring-1 ring-foreground/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
