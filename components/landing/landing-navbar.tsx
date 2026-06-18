import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/doxie-logo-teal.svg"
            alt="Doxie"
            width={24}
            height={24}
            priority
            unoptimized
          />
          <span className="font-serif text-lg font-bold tracking-tight text-[#68DBA9]">
            Doxie
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-[#68DBA9] text-[#0C1322] hover:bg-[#68DBA9]/90"
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
