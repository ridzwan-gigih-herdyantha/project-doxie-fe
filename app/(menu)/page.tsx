import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BrandClickSpark } from "@/components/landing/brand-click-spark";

export default function LandingPage(children: React.ReactNode) {
  return (
    <BrandClickSpark sparkCount={10} sparkRadius={22} duration={500}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <LandingNavbar />
        <main className="flex-1">
          {children}
        </main>
        <LandingFooter />
      </div>
    </BrandClickSpark>
  );
}
