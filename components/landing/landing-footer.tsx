import Link from "next/link";

import { DoxieLogo } from "@/components/doxie-logo";

const COLUMNS = [
  { title: "Product", links: ["Features", "Pricing", "API", "Enterprise"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <DoxieLogo className="size-6" />
            <span className="font-serif text-lg font-bold tracking-tight text-brand">
              Doxie
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Unlocking the world&apos;s knowledge with AI.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 mx-auto max-w-6xl px-6 py-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Doxie AI Inc. All rights reserved.
          </p>
      </div>
    </footer>
  );
}
