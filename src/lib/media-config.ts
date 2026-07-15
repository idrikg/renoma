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
    alt: "Lichtdurchfluteter Wohn- und Essbereich mit hellem Fischgrätparkett, Esstisch, geschwungener Sofalandschaft und Olivenbaum im Vordergrund",
    // Portrait source (760×1024): center-weighted crop keeps windows, dining
    // area and olive tree visible across desktop (4/5) and mobile (16/11).
    objectPosition: "50% 42%",
  } as { src: string; alt: string; objectPosition?: string } | null,
  founderImage: null as { src: string; alt: string } | null,
};
