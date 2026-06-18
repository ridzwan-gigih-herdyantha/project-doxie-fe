import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyDoxie } from "@/components/landing/why-doxie";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingNavbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyDoxie />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <LandingFooter />
    </div>
  );
}
