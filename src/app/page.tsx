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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <RealitySection />
        <PivotSection />
        <PositioningStatement />
        <BenefitsSection />
        <ReferencesSection />
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
