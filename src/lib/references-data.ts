/**
 * Authentic before/after project references.
 *
 * TRUTHFULNESS RULE: only entries with `isPublished: true` — backed by
 * real photographs and confirmed project details — may ever reach the
 * visitor-facing References section. Never invent a location, duration,
 * budget, customer name/quote, or completion year. Leave those fields
 * unset until they are genuinely confirmed; the section only renders the
 * fields that are actually present.
 */

export type ProjectReference = {
  /** Stable project identifier, e.g. "bad-01". */
  slug: string;
  /** Short, human project title, e.g. "Ein Bad, das wieder Ruhe ausstrahlt." */
  title: string;
  category: string;
  /** Restrained case-study body copy. No invented specifics. */
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  /** Optional per-image crop tuning for object-fit: cover. */
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  /** Omit unless genuinely confirmed. Never invented. */
  location?: string;
  durationApprox?: string;
  /** Only include if genuinely provided by the customer. Never invented. */
  customerStatement?: string;
  isPublished: boolean;
};

export const references: ProjectReference[] = [
  {
    slug: "bad-01",
    title: "Ein Bad, das wieder Ruhe ausstrahlt.",
    category: "Badmodernisierung",
    description:
      "Aus einem dunklen Bestandsbad entstand ein heller und klar gestalteter Raum mit moderner, ruhiger Atmosphäre.",
    beforeImage: "/images/references/bad-01/before.jpg",
    afterImage: "/images/references/bad-01/after.jpg",
    beforeAlt: "Bad vor der Modernisierung",
    afterAlt: "Modernisiertes Bad mit hellem, ruhigem Design",
    isPublished: true,
  },
  {
    slug: "fassade-01",
    title: "Ein neuer Ausdruck für das ganze Zuhause.",
    category: "Fassadenmodernisierung",
    description:
      "Die Außenansicht der Doppelhaushälfte wurde erneuert und erhielt eine klare, zeitgemäße Gesamtwirkung.",
    beforeImage: "/images/references/fassade-01/before.jpg",
    afterImage: "/images/references/fassade-01/after.jpg",
    beforeAlt: "Doppelhaushälfte vor der Fassadenmodernisierung",
    afterAlt: "Doppelhaushälfte mit erneuerter Fassade",
    beforeObjectPosition: "50% 35%",
    afterObjectPosition: "50% 40%",
    isPublished: true,
  },
  {
    slug: "kueche-01",
    title: "Aus einer Küche wird ein neuer Mittelpunkt.",
    category: "Küchenmodernisierung",
    description:
      "Die bestehende Küche wurde vollständig neu gedacht und als heller, moderner Mittelpunkt des Einfamilienhauses gestaltet.",
    beforeImage: "/images/references/kueche-01/before.jpg",
    afterImage: "/images/references/kueche-01/after.jpg",
    beforeAlt: "Küche vor der Modernisierung",
    afterAlt: "Modernisierte Küche im Einfamilienhaus",
    beforeObjectPosition: "50% 45%",
    afterObjectPosition: "50% 50%",
    isPublished: true,
  },
  {
    slug: "wc-01",
    title: "Kleiner Raum. Spürbare Veränderung.",
    category: "WC-Modernisierung",
    description:
      "Aus dem bestehenden WC entstand ein klar gestalteter, moderner Raum mit ruhiger Atmosphäre.",
    beforeImage: "/images/references/wc-01/before.jpg",
    afterImage: "/images/references/wc-01/after.jpg",
    beforeAlt: "WC vor der Modernisierung",
    afterAlt: "Modernisiertes WC",
    beforeObjectPosition: "50% 50%",
    afterObjectPosition: "50% 45%",
    isPublished: true,
  },
  {
    slug: "treppe-01",
    title: "Eine Treppe, die wieder zum Zuhause passt.",
    category: "Treppenmodernisierung",
    description:
      "Die bestehende Treppe wurde optisch erneuert und fügt sich nun harmonisch in das Einfamilienhaus ein.",
    beforeImage: "/images/references/treppe-01/before.jpg",
    afterImage: "/images/references/treppe-01/after.jpg",
    beforeAlt: "Treppe vor der Modernisierung",
    afterAlt: "Modernisierte Treppe im Einfamilienhaus",
    beforeObjectPosition: "50% 55%",
    afterObjectPosition: "50% 50%",
    isPublished: true,
  },
];

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
