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
  category: string;
  location: string;
  durationApprox: string;
  challenge: string;
  solution: string;
  beforeImage: string;
  afterImage: string;
  /** Only include if genuinely provided by the customer. Never invented. */
  customerStatement?: string;
  isPublished: boolean;
};

export const references: ProjectReference[] = [];

export function getPublishedReferences(): ProjectReference[] {
  return references.filter((reference) => reference.isPublished);
}
