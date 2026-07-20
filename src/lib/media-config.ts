/**
 * Central reference for authentic photography. Each entry that isn't
 * genuinely available yet stays `null` — never a stock placeholder.
 *
 * Hero image lives at `public/images/hero/renoma-hero.jpg`.
 *
 * TO SWAP THE HERO PHOTOGRAPH LATER
 * ---------------------------------
 * Edit only this file (`src/lib/media-config.ts`):
 *   - `heroImage.src`  → path under `public/`
 *   - `heroImage.alt`  → factual German description of visible motifs
 *   - `heroImage.objectPosition` → crop anchor (e.g. "50% 42%")
 * Replace the file at `public/images/hero/renoma-hero.jpg` (or point `src`
 * at a new path). No homepage component needs to change. If the file is
 * missing, HeroMediaFrame falls back to the warm gradient.
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
