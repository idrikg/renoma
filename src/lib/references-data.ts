/**
 * Authentic before/after project references.
 *
 * TRUTHFULNESS RULE: only entries with `isPublished: true` — backed by
 * real photographs and confirmed project details — may ever reach the
 * visitor-facing References section. Never flip a placeholder entry to
 * `isPublished: true` just to fill space. Never invent a location,
 * duration, challenge, solution, or customer statement. Until real
 * entries exist, this array stays empty and the References section
 * renders nothing visible — see `references-section.tsx`.
 */

export type ProjectReference = {
  slug: string;
  /** A short, human project title, e.g. "Badsanierung mit Tageslicht".
   *  Falls back to `category` when not set. */
  title?: string;
  category: string;
  location: string;
  durationApprox: string;
  challenge: string;
  solution: string;
  /** Large lead image for the project. Required — this section is
   *  image-led by design. */
  heroImage: string;
  /** Optional second image to support a before/after reveal. If omitted,
   *  the section falls back to a single static image for that project. */
  afterImage?: string;
  beforeImage?: string;
  /** Only include if genuinely provided by the customer. Never invented. */
  customerStatement?: string;
  isPublished: boolean;
};

export const references: ProjectReference[] = [];

export function getPublishedReferences(): ProjectReference[] {
  return references.filter((reference) => reference.isPublished);
}

/**
 * Single source of truth for whether the References section (and its
 * navigation entry / Hero secondary CTA) should appear at all. Everything
 * that links to `#referenzen` must check this first — an anchor to a
 * section that doesn't exist is a broken, unpolished experience.
 */
export function hasPublishedReferences(): boolean {
  return getPublishedReferences().length > 0;
}
