/**
 * Central reference for authentic photography. Each entry that isn't
 * genuinely available yet stays `null` — never a stock placeholder.
 *
 * Hero image lives at `public/images/hero/renoma-hero.jpg`. Swapping in a
 * new photograph later only means changing `src`/`alt`/`objectPosition`
 * here; no component needs to change. HeroMediaFrame falls back to the
 * warm gradient if the file is ever removed.
 */
export const mediaConfig = {
  heroImage: {
    src: "/images/hero/renoma-hero.jpg",
    alt: "Modernes Bad mit beleuchtetem Spiegel, Holz-Waschtisch und Walk-in-Dusche",
    // Portrait source (764×1024). Desktop 4/5: slight right bias keeps
    // vanity and lit mirror as focus. Mobile 16/11 crops vertically —
    // mid bias keeps wash area and shower niche in frame.
    objectPosition: "55% 44%",
    objectPositionMobile: "54% 48%",
  } as {
    src: string;
    alt: string;
    objectPosition?: string;
    objectPositionMobile?: string;
  } | null,
  founderImage: null as { src: string; alt: string } | null,
};
