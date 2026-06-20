import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    caption: "For individuals getting started.",
    features: ["3 documents per month", "up to 50 pages / doc", "GPT-3.5 access"],
    cta: "Get started",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    caption: "For power users and professionals.",
    features: [
      "Unlimited documents",
      "up to 2,000 pages / doc",
      "Access to GPT-4o, Claude 3.5",
      "Priority processing",
    ],
    cta: "Start 7-day free trial",
    href: "/register",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start for free and upgrade as your library grows.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col gap-5 rounded-2xl p-6",
                plan.featured
                  ? "bg-brand-strong text-brand-foreground"
                  : "border border-border bg-card ring-1 ring-foreground/5",
              )}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full text-white/90 bg-brand-foreground px-3.5 py-1 text-[0.85rem] font-semibold">
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    plan.featured ? "text-brand-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {plan.caption}
                </p>
              </div>

              <p className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-brand-foreground/70" : "text-muted-foreground",
                  )}
                >
                  /mo
                </span>
              </p>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CircleCheck
                      className={cn(
                        "size-4 shrink-0",
                        plan.featured ? "text-brand-foreground" : "text-brand",
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "mt-auto w-full",
                  plan.featured
                    ? "bg-white text-brand-foreground hover:bg-white/90"
                    : "bg-muted text-foreground hover:bg-muted/80",
                )}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
