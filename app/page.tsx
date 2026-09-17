import type { Metadata } from "next";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { ModelsMarquee } from "@/components/landing/models-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyDoxie } from "@/components/landing/why-doxie";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing, PLANS } from "@/components/landing/pricing";
import { Faq, FAQS } from "@/components/landing/faq";
import { CtaBand } from "@/components/landing/cta-band";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BrandClickSpark } from "@/components/landing/brand-click-spark";
import { SITE, absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: SITE.title,
    description: SITE.description,
    path: "/",
  }),
  // Skip the "%s · DoxieAI" template — the home title already carries the brand.
  title: { absolute: SITE.title },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: absoluteUrl(SITE.ogImage.url),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": absoluteUrl("/#organization") },
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.caption,
      price: plan.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      url: absoluteUrl("/#pricing"),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function LandingPage() {
  return (
    <BrandClickSpark sparkCount={10} sparkRadius={22} duration={500}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
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
