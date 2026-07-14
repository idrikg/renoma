/**
 * Central reference for authentic photography that hasn't been supplied
 * yet. Each entry is `null` until a genuine image exists — never a stock
 * placeholder. Once a real file is added to `public/` (or a remote,
 * allow-listed source), set the `src` here and the relevant section picks
 * it up automatically without any layout changes.
 */
export const mediaConfig = {
  heroImage: null as { src: string; alt: string } | null,
  founderImage: null as { src: string; alt: string } | null,
};
