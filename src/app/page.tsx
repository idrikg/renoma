import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { RealitySection } from "@/components/reality-section";
import { PivotSection } from "@/components/pivot-section";
import { PositioningStatement } from "@/components/positioning-statement";
import { BenefitsSection } from "@/components/benefits-section";
import { ReferencesSection } from "@/components/references-section";
import { ProcessSection } from "@/components/process-section";
import { FounderSection } from "@/components/founder-section";
import { ManifestoSection } from "@/components/manifesto-section";
import { FaqSection } from "@/components/faq-section";
import { ProjectAssistantTeaser } from "@/components/project-assistant-teaser";
import { FinalCtaSection } from "@/components/final-cta-section";
import { SiteFooter } from "@/components/site-footer";
import { hasPublishedReferences } from "@/lib/references-data";
import { getSiteUrl, homeDescription, homeTitle } from "@/lib/site-url";

const siteUrl = getSiteUrl();

/**
 * Absolute title avoids the root template appending " · RENOMA" again.
 */
export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: `${siteUrl}/`,
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const showReferences = hasPublishedReferences();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <RealitySection />
        <PivotSection />
        <PositioningStatement />
        <BenefitsSection />
        {showReferences && <ReferencesSection />}
        <ProcessSection />
        <FounderSection />
        <ManifestoSection />
        <FaqSection />
        <ProjectAssistantTeaser />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
