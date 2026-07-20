import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { StorySection } from "@/components/story-section";
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
import { mediaConfig } from "@/lib/media-config";
import { publicAssetExists } from "@/lib/public-asset";

export default function Home() {
  const showReferences = hasPublishedReferences();
  const hero = mediaConfig.heroImage;
  const storyVisualImage =
    hero && publicAssetExists(hero.src)
      ? {
          src: hero.src,
          alt: hero.alt,
          objectPosition: hero.objectPosition,
        }
      : null;

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <StorySection visualImage={storyVisualImage} />
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
