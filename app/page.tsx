import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { ModelsMarquee } from "@/components/landing/models-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyDoxie } from "@/components/landing/why-doxie";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { CtaBand } from "@/components/landing/cta-band";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BrandClickSpark } from "@/components/landing/brand-click-spark";

export default function LandingPage() {
  return (
    <BrandClickSpark sparkCount={10} sparkRadius={22} duration={500}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <LandingNavbar />
        <main className="flex-1">
          <Hero />
          <ModelsMarquee />
          <HowItWorks />
          <WhyDoxie />
          <Testimonials />
          <Pricing />
          <Faq />
          <CtaBand />
        </main>
        <LandingFooter />
      </div>
    </BrandClickSpark>
  );
}
