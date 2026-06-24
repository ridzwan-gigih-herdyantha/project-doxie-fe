import { ChevronDown } from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import { BrandSpotlightCard } from "@/components/landing/brand-spotlight-card";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";

const FAQS = [
  {
    q: "What file types are supported?",
    a: "For now, Doxie only supports PDF files. We're working on more formats — Word, spreadsheets, and slides are on the way.",
  },
  {
    q: "Can I switch AI models mid-chat?",
    a: "Yes. Switch between GPT-4o, Claude 3.5, and Gemini at any point in a conversation without losing context.",
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
    a: "Yes, you can cancel your subscription at any time, no questions asked.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-[#0A1019]">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <AnimatedContent distance={40} duration={0.7}>
          <div className="mb-12 text-center">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
        </AnimatedContent>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <AnimatedContent key={item.q} distance={30} duration={0.6} delay={i * 0.08}>
              <BrandSpotlightCard alpha={0.1} className="rounded-xl p-0">
                <details className="group px-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              </BrandSpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
