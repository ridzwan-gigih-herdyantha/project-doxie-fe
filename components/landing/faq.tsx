import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What file types are supported?",
    a: "Doxie supports PDF, Word (.docx), and spreadsheet files today, with more formats on the way.",
  },
  {
    q: "Can I switch AI models mid-chat?",
    a: "Yes — switch between GPT-4o, Claude 3.5, and Gemini at any point in a conversation.",
  },
  {
    q: "Is my data private?",
    a: "Always. Your documents are never used to train models, and everything is encrypted end-to-end.",
  },
  {
    q: "How does the RAG pipeline work?",
    a: "We chunk and embed your document, retrieve the most relevant passages per question, and ground the model's answer in them with page citations.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time — no questions asked.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-[#0A1019]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
          Frequently asked questions
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border bg-card px-5 ring-1 ring-foreground/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-mono text-sm font-medium">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
