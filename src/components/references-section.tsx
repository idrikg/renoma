import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ReferencesCarousel } from "@/components/references-carousel";
import { getPublishedReferences } from "@/lib/references-data";

/**
 * Rendered only by the parent page when `hasPublishedReferences()` is
 * true — see app/page.tsx. That keeps the `#referenzen` anchor, the nav
 * link, and this section's existence all governed by the same single
 * source of truth, so there is never an empty section, a stray gap, or a
 * dead link.
 *
 * Editorial project carousel: one reference at a time with a controlled
 * next-card peek — not a marketplace gallery grid.
 */
export function ReferencesSection() {
  const publishedReferences = getPublishedReferences();

  return (
    <section id="referenzen" className="scroll-mt-24 overflow-x-clip bg-paper-dim py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Referenzen
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
            Aus Veränderung wird Zuhause.
          </h2>
        </Reveal>
      </Container>

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <Reveal delayMs={60}>
          <ReferencesCarousel references={publishedReferences} />
        </Reveal>
      </div>
    </section>
  );
}
