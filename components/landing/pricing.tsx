import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedContent from "@/components/AnimatedContent";
import { BrandSpotlightCard } from "@/components/landing/brand-spotlight-card";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    caption: "For individuals getting started.",
    features: ["3 documents per month", "Up to 50 pages / doc", "GPT-3.5 access"],
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
      "Up to 2,000 pages / doc",
      "GPT-4o, Claude 3.5 & Gemini",
      "Priority processing",
    ],
    cta: "Start 7-day free trial",
    href: "/register",
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    caption: "For teams that collaborate.",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "SSO & admin controls",
      "Priority support",
    ],
    cta: "Contact sales",
    href: "/register",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <AnimatedContent distance={40} duration={0.7}>
          <div className="mx-auto mb-12 max-w-md text-center">
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Start for free and upgrade as your library grows.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const inner = (
              <>
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-foreground px-3 py-1 text-xs font-semibold text-white/90">
                    Most popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      plan.featured
                        ? "text-brand-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.caption}
                  </p>
                </div>

                <p className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.featured
                        ? "text-brand-foreground/70"
                        : "text-muted-foreground",
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
              </>
            );

            return (
              <AnimatedContent
                key={plan.name}
                distance={50}
                duration={0.7}
                delay={i * 0.1}
                className="h-full"
              >
                {plan.featured ? (
                  <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-brand-strong p-7 text-brand-foreground shadow-2xl shadow-brand/20 ring-2 ring-brand lg:-my-2">
                    {inner}
                  </div>
                ) : (
                  <BrandSpotlightCard className="flex h-full flex-col gap-5 rounded-3xl p-7">
                    {inner}
                  </BrandSpotlightCard>
                )}
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
