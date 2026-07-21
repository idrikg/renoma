/**
 * Authentic before/after project references.
 *
 * TRUTHFULNESS RULE: only entries with `isPublished: true` — backed by
 * real photographs and confirmed project details — may ever reach the
 * visitor-facing References section or project detail pages. Never invent
 * a location, duration, budget, customer name/quote, or completion year.
 * Leave those fields unset until they are genuinely confirmed; UI only
 * renders fields that are actually present.
 *
 * HOW TO ADD A PROJECT
 * --------------------
 * 1. Place images under `public/images/references/{slug}/`
 *    - Required today: `before.jpg`, `after.jpg`
 *    - Optional: `cover.jpg`, `before-02.jpg`, `after-02.jpg`,
 *      `detail-01.jpg`, …
 * 2. Append an object to `references` below (or keep drafts with
 *    `isPublished: false` until ready).
 * 3. Required: slug, title, category, description, beforeImage,
 *    afterImage, beforeAlt, afterAlt, isPublished.
 * 4. Optional: teaser, location, projectType, completionPeriod, scope,
 *    longDescription, quote, services, resultText, highlights,
 *    coverImage, beforeImages[], afterImages[], detailImages[].
 * 5. Empty optional galleries / fields are never rendered.
 *
 * Detail pages live at `/referenzen/[slug]`. Prefer a dedicated detail
 * view for multi-image galleries rather than crowding the homepage carousel.
 */

export type ReferenceImage = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

/** @deprecated Prefer ReferenceImage — kept as an alias for existing imports. */
export type ReferenceDetailImage = ReferenceImage;

export type ProjectReference = {
  /** Stable project identifier, e.g. "bad-01". */
  slug: string;
  /** Short, human project title, e.g. "Ein Bad, das wieder Ruhe ausstrahlt." */
  title: string;
  category: string;
  /** Restrained case-study body copy. No invented specifics. */
  description: string;
  /**
   * Optional shorter line for cards/listings. Falls back to `description`
   * when omitted (see `getReferenceTeaser`).
   */
  teaser?: string;
  /** Primary before photograph (required for published projects today). */
  beforeImage: string;
  /** Primary after photograph (required for published projects today). */
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  /** Optional per-image crop tuning for object-fit: cover. */
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  /**
   * Optional cover / hero crop for detail pages. Defaults to `afterImage`
   * when omitted (see `getReferenceCover`).
   */
  coverImage?: string;
  coverAlt?: string;
  coverObjectPosition?: string;
  /**
   * Multi-image galleries. When present and non-empty they are preferred
   * over the primary before/after fields; empty arrays must not produce UI.
   */
  beforeImages?: ReferenceImage[];
  afterImages?: ReferenceImage[];
  detailImages?: ReferenceImage[];
  /** Short factual service tags — only when confirmed. */
  highlights?: string[];
  /** Optional service list for detail pages — only when confirmed. */
  services?: string[];
  /** Omit unless genuinely confirmed. Never invented. */
  location?: string;
  /** Optional finer project type label; falls back to category in overview. */
  projectType?: string;
  /** Optional completion window, e.g. "Frühjahr 2025". Never invented. */
  completionPeriod?: string;
  /** @deprecated Prefer completionPeriod. Still read by helpers. */
  durationApprox?: string;
  /** Optional scope summary — only when confirmed. */
  scope?: string;
  /** Longer narrative for detail pages. Falls back to description. */
  longDescription?: string;
  /** Optional result summary for the closing block. */
  resultText?: string;
  /** Customer quote — only if genuinely provided. */
  quote?: string;
  /** @deprecated Prefer quote. Still read by helpers. */
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
    slug: "badezimmer-detailmodernisierung",
    title: "Ein Badezimmer, bei dem jedes Detail stimmt.",
    category: "Badmodernisierung",
    teaser:
      "Ein vollständig erneuertes Badezimmer mit ruhiger Gestaltung, klaren Linien und besonders sorgfältig ausgeführten Details.",
    description:
      "Das bestehende Badezimmer wurde vollständig modernisiert und gestalterisch neu aufgebaut. Ziel war ein zeitgemäßer, hochwertiger Raum, der funktionale Lösungen mit einer ruhigen und klaren Optik verbindet. Materialien, Flächen und Einbauten wurden aufeinander abgestimmt und bis ins Detail sauber ausgeführt.",
    beforeImage:
      "/images/references/badezimmer-detailmodernisierung/before-01.jpg",
    afterImage:
      "/images/references/badezimmer-detailmodernisierung/after-01.jpg",
    beforeAlt:
      "Bestehendes Badezimmer mit Waschtisch, Duschkabine und Badewanne vor der Modernisierung",
    afterAlt:
      "Modernisiertes Badezimmer mit Walk-in-Dusche, integriertem Waschtisch und hinterleuchtetem Spiegel",
    coverImage:
      "/images/references/badezimmer-detailmodernisierung/after-01.jpg",
    coverAlt:
      "Modernisiertes Badezimmer mit Walk-in-Dusche, integriertem Waschtisch und hinterleuchtetem Spiegel",
    beforeImages: [
      {
        src: "/images/references/badezimmer-detailmodernisierung/before-01.jpg",
        alt: "Bestehendes Badezimmer mit Waschtisch, Duschkabine und Badewanne vor der Modernisierung",
      },
      {
        src: "/images/references/badezimmer-detailmodernisierung/before-02.jpg",
        alt: "Bestehendes Badezimmer mit Wand-WC, Heizkörper und Badewanne vor der Modernisierung",
      },
    ],
    afterImages: [
      {
        src: "/images/references/badezimmer-detailmodernisierung/after-01.jpg",
        alt: "Modernisiertes Badezimmer mit Walk-in-Dusche, integriertem Waschtisch und hinterleuchtetem Spiegel",
      },
      {
        src: "/images/references/badezimmer-detailmodernisierung/after-02.jpg",
        alt: "Modernisiertes Badezimmer mit wandhängendem WC und Walk-in-Dusche hinter getönter Glaswand",
      },
    ],
    detailImages: [
      {
        src: "/images/references/badezimmer-detailmodernisierung/detail-drueckerplatte.jpg",
        alt: "In die Wandfliesen integrierte Dual-Flush-Drückerplatte",
        caption: "Verflieste Drückerplatte",
      },
      {
        src: "/images/references/badezimmer-detailmodernisierung/detail-waschbecken.jpg",
        alt: "Integrierter Waschtisch mit wandmontierter Armatur und Linearablauf",
        caption: "Integrierter Waschplatz",
      },
    ],
    services: [
      "vollständige Modernisierung des Badezimmers",
      "Erneuerung der Wand- und Bodenflächen",
      "Neugestaltung des Waschplatzes",
      "Integration der Sanitärbereiche",
      "Fliesenarbeiten",
      "sorgfältige Ausführung von Übergängen und Anschlüssen",
      "gestalterische Abstimmung der einzelnen Elemente",
    ],
    highlights: [
      "verflieste Drückerplatte",
      "hochwertig integrierter Waschplatz",
      "einheitliches und ruhiges Fliesenbild",
      "sauber ausgeführte Kanten und Übergänge",
      "harmonisch aufeinander abgestimmte Oberflächen",
      "funktionale Lösungen, die sich dezent in die Raumgestaltung einfügen",
    ],
    resultText:
      "Entstanden ist ein modernes Badezimmer, das Ruhe, Funktionalität und handwerkliche Präzision miteinander verbindet. Besonders die zurückhaltend integrierten Details geben dem Raum seinen hochwertigen und individuellen Charakter.",
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
];

export function getPublishedReferences(): ProjectReference[] {
  return references.filter((reference) => reference.isPublished);
}

export function getPublishedReferenceBySlug(
  slug: string
): ProjectReference | undefined {
  return getPublishedReferences().find((reference) => reference.slug === slug);
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

export function getReferenceTeaser(reference: ProjectReference): string {
  return reference.teaser?.trim() || reference.description;
}

export function getReferenceBody(reference: ProjectReference): string {
  return reference.longDescription?.trim() || reference.description;
}

export function getReferenceQuote(
  reference: ProjectReference
): string | undefined {
  const value = reference.quote?.trim() || reference.customerStatement?.trim();
  return value || undefined;
}

export function getReferenceCompletion(
  reference: ProjectReference
): string | undefined {
  const value =
    reference.completionPeriod?.trim() || reference.durationApprox?.trim();
  return value || undefined;
}

export function getReferenceCover(reference: ProjectReference): ReferenceImage {
  if (reference.coverImage) {
    return {
      src: reference.coverImage,
      alt: reference.coverAlt?.trim() || reference.title,
      objectPosition: reference.coverObjectPosition,
    };
  }
  return {
    src: reference.afterImage,
    alt: reference.afterAlt,
    objectPosition: reference.afterObjectPosition,
  };
}

export function getBeforeImages(reference: ProjectReference): ReferenceImage[] {
  if (reference.beforeImages && reference.beforeImages.length > 0) {
    return reference.beforeImages;
  }
  return [
    {
      src: reference.beforeImage,
      alt: reference.beforeAlt,
      objectPosition: reference.beforeObjectPosition,
    },
  ];
}

export function getAfterImages(reference: ProjectReference): ReferenceImage[] {
  if (reference.afterImages && reference.afterImages.length > 0) {
    return reference.afterImages;
  }
  return [
    {
      src: reference.afterImage,
      alt: reference.afterAlt,
      objectPosition: reference.afterObjectPosition,
    },
  ];
}

export function getDetailImages(reference: ProjectReference): ReferenceImage[] {
  return reference.detailImages?.filter((image) => image.src) ?? [];
}

export function getReferenceHighlights(
  reference: ProjectReference
): string[] {
  return reference.highlights?.filter((item) => item.trim()) ?? [];
}

export function getReferenceServices(reference: ProjectReference): string[] {
  return reference.services?.filter((item) => item.trim()) ?? [];
}

/** Overview rows for the detail page — only entries with real values. */
export function getReferenceOverviewItems(
  reference: ProjectReference
): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  const projectType = reference.projectType?.trim() || reference.category;
  if (projectType) items.push({ label: "Projektart", value: projectType });
  if (reference.location?.trim()) {
    items.push({ label: "Ort", value: reference.location.trim() });
  }
  if (reference.scope?.trim()) {
    items.push({ label: "Leistungsumfang", value: reference.scope.trim() });
  }
  const completion = getReferenceCompletion(reference);
  if (completion) {
    items.push({ label: "Fertigstellung", value: completion });
  }
  return items;
}
