// components/landing-navbar.tsx  ← Server Component (no "use client")
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DoxieLogo } from "@/components/doxie-logo";
import { getToken } from "@/lib/auth/session";

export interface NavLink {
  label: string;
  href: string;
}

interface LandingNavbarProps {
  navLinks?: NavLink[];
}

/** Home-page links. Each (menu) page can pass its own `navLinks` instead. */
export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export async function LandingNavbar({ navLinks = DEFAULT_NAV_LINKS }: LandingNavbarProps) {
  const token = await getToken();
  const isLoggedIn = !!token;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <DoxieLogo className="size-6" />
          <span className="font-serif text-lg font-bold tracking-tight text-brand">
            Doxie
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {isLoggedIn ? (
          <Button
            asChild
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link href="/register">Get started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}