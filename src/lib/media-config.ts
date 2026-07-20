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
    alt: "Heller, modern gestalteter Wohnraum mit maßgefertigtem Einbauregal und natürlichen Akzenten",
    // Portrait source (768×1024). Desktop 4/5 frame: slight bias keeps
    // shelving and plant corner visible. Mobile 16/11 frame crops more
    // vertically — lower bias avoids empty ceiling and keeps the room.
    objectPosition: "48% 42%",
    objectPositionMobile: "46% 55%",
  } as {
    src: string;
    alt: string;
    objectPosition?: string;
    objectPositionMobile?: string;
  } | null,
  founderImage: null as { src: string; alt: string } | null,
};
