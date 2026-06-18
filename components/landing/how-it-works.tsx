import { CircleCheck, FileUp, MessageSquareText, type LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: FileUp,
    title: "Upload",
    description:
      "Drop your PDFs, Word docs, or spreadsheets into our secure cloud environment.",
  },
  {
    icon: MessageSquareText,
    title: "Ask",
    description:
      "Ask complex questions in natural language. Our AI understands context and nuances.",
  },
  {
    icon: CircleCheck,
    title: "Get Answers",
    description:
      "Receive accurate, cited answers with page references within seconds.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border/60 bg-[#0A1019]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Three simple steps to unlock the knowledge trapped inside your files.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#68DBA9]/10 text-[#68DBA9]">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
