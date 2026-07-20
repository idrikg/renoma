import { z } from "zod";

export const renovationCategories = [
  { value: "bad-sanitaer", label: "Bad & Sanitär" },
  { value: "kueche", label: "Küche" },
  { value: "boden", label: "Böden" },
  { value: "waende-decken", label: "Wände & Decken" },
  { value: "fenster-tueren", label: "Fenster & Türen" },
  { value: "elektrik", label: "Elektrik" },
  { value: "smart_home", label: "Smart Home" },
  { value: "heizung-waermepumpe", label: "Heizung & Wärmepumpe" },
  { value: "photovoltaik", label: "Photovoltaik" },
  { value: "dach-fassade", label: "Dach & Fassade" },
  { value: "garten-aussenbereich", label: "Garten & Außenbereich" },
  { value: "pool", label: "Pool" },
  { value: "anbau-erweiterung", label: "Anbau & Erweiterung" },
  { value: "komplettsanierung", label: "Komplettsanierung" },
  // Only offered under the "Gesamtprojekt" main area (see
  // `categoriesByMainArea`) — combined, higher-level scopes that don't
  // fit a single Innenbereich/Außenbereich leaf category.
  { value: "innen-aussenbereich", label: "Innen- und Außenbereich" },
  { value: "energie-gebaeude", label: "Energie & Gebäude" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

/**
 * The three high-level entry points shown in funnel Step 1. Step 2 then
 * only shows the subset of `renovationCategories` relevant to whichever
 * one was chosen — see `categoriesByMainArea`. Purely a client-side
 * funnel-flow concept: never sent to the server or included in emails,
 * only the resulting `categories` selection is.
 */
export const mainAreaOptions = [
  {
    value: "innen",
    label: "Innenbereich",
    description: "Räume, Ausstattung und Haustechnik",
  },
  {
    value: "aussen",
    label: "Außenbereich",
    description: "Fassade, Garten und Außenanlagen",
  },
  {
    value: "gesamt",
    label: "Gesamtprojekt",
    description: "Komplettsanierung, Anbau oder mehrere Bereiche",
  },
] as const;

export type MainAreaValue = (typeof mainAreaOptions)[number]["value"];

/** Which `renovationCategories` values Step 2 offers for each main area. */
export const categoriesByMainArea: Record<string, readonly string[]> = {
  innen: [
    "bad-sanitaer",
    "kueche",
    "boden",
    "waende-decken",
    "fenster-tueren",
    "elektrik",
    "smart_home",
    "heizung-waermepumpe",
    "sonstiges",
  ],
  aussen: [
    "dach-fassade",
    "garten-aussenbereich",
    "pool",
    "photovoltaik",
    "fenster-tueren",
    "sonstiges",
  ],
  gesamt: [
    "komplettsanierung",
    "anbau-erweiterung",
    "innen-aussenbereich",
    "energie-gebaeude",
    "sonstiges",
  ],
};

/** Categories offered when no (or an unrecognized) main area is set — a
 *  defensive fallback so Step 2 never renders an empty list. */
const ALL_CATEGORY_VALUES = renovationCategories.map((category) => category.value);

export function categoriesForMainArea(mainArea: string): readonly string[] {
  return categoriesByMainArea[mainArea] ?? ALL_CATEGORY_VALUES;
}

/** Maps pre-revision stored values to their current equivalents. */
const LEGACY_CATEGORY_VALUES: Record<string, string> = {
  bad: "bad-sanitaer",
  fenster: "fenster-tueren",
  tueren: "fenster-tueren",
  waermepumpe: "heizung-waermepumpe",
  garten: "garten-aussenbereich",
  anbau: "anbau-erweiterung",
};

const VALID_CATEGORY_VALUES = new Set<string>(
  renovationCategories.map((category) => category.value)
);

/**
 * Normalizes category selections from older funnel drafts so saved
 * session state and legacy submissions do not break the current schema.
 */
export function normalizeCategories(categories: readonly string[]): string[] {
  const normalized = new Set<string>();
  for (const value of categories) {
    const mapped = LEGACY_CATEGORY_VALUES[value] ?? value;
    if (VALID_CATEGORY_VALUES.has(mapped)) {
      normalized.add(mapped);
    }
  }
  return [...normalized];
}

export const objectTypes = [
  { value: "haus", label: "Haus" },
  { value: "wohnung", label: "Wohnung" },
  { value: "gewerbe", label: "Gewerbe" },
] as const;

/** Only relevant when `objectType` is "haus" — see StepObject. */
export const houseSubtypes = [
  { value: "einfamilienhaus", label: "Einfamilienhaus" },
  { value: "doppelhaushaelfte", label: "Doppelhaushälfte" },
  { value: "reihenhaus", label: "Reihenhaus" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "sonstiges_haus", label: "Sonstiges Haus" },
] as const;

export const desiredStartOptions = [
  { value: "asap", label: "So bald wie möglich" },
  { value: "in_1_3_months", label: "In 1–3 Monaten" },
  { value: "in_3_6_months", label: "In 3–6 Monaten" },
  { value: "later", label: "Später" },
] as const;

export const budgetOptions = [
  { value: "under_10k", label: "Unter 10.000 €" },
  { value: "10k_25k", label: "10.000–25.000 €" },
  { value: "25k_50k", label: "25.000–50.000 €" },
  { value: "50k_100k", label: "50.000–100.000 €" },
  { value: "over_100k", label: "Über 100.000 €" },
  { value: "unclear", label: "Noch unklar" },
] as const;

export const contactPreferenceOptions = [
  { value: "phone", label: "Telefon" },
  { value: "email", label: "E-Mail" },
  { value: "either", label: "Telefon oder E-Mail" },
] as const;

function values<T extends ReadonlyArray<{ value: string }>>(
  options: T
): [string, ...string[]] {
  return options.map((option) => option.value) as [string, ...string[]];
}

const baseProjectRequestSchema = z.object({
  categories: z.preprocess(
    (value) => (Array.isArray(value) ? normalizeCategories(value as string[]) : value),
    z
      .array(z.enum(values(renovationCategories)))
      .min(1, "Bitte wählen Sie mindestens einen Bereich aus.")
  ),
  wishes: z.string().trim().max(2000, "Die Nachricht ist zu lang.").optional().or(z.literal("")),
  imageCount: z.coerce.number().int().min(0).max(30).optional().default(0),
  postalCode: z
    .string()
    .trim()
    .min(4, "Bitte geben Sie eine gültige Postleitzahl an.")
    .max(10, "Bitte geben Sie eine gültige Postleitzahl an."),
  city: z.string().trim().min(2, "Bitte geben Sie Ihren Ort an.").max(100),
  objectType: z.enum(values(objectTypes), {
    message: "Bitte wählen Sie eine Objektart aus.",
  }),
  // Only required when objectType is "haus" — enforced via .refine below.
  houseSubtype: z.string().trim().optional().or(z.literal("")),
  areaSqm: z.string().trim().max(20).optional().or(z.literal("")),
  constructionYear: z.string().trim().max(4).optional().or(z.literal("")),
  desiredStart: z.enum(values(desiredStartOptions), {
    message: "Bitte wählen Sie den gewünschten Start aus.",
  }),
  budgetRange: z.enum(values(budgetOptions), {
    message: "Bitte wählen Sie einen Investitionsrahmen aus.",
  }),
  firstName: z.string().trim().min(2, "Bitte geben Sie Ihren Vornamen an.").max(80),
  lastName: z.string().trim().min(2, "Bitte geben Sie Ihren Nachnamen an.").max(80),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  preferredContact: z.enum(values(contactPreferenceOptions), {
    message: "Bitte wählen Sie einen bevorzugten Kontaktweg aus.",
  }),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    }),
  // Honeypot: must remain empty. A filled-in value indicates a bot.
  company: z.string().max(0).optional().or(z.literal("")),
});

// A confirmation email always goes out, so `email` stays required for
// everyone regardless of preference (enforced above). When "Telefon" is
// chosen as the preferred contact method, a reachable phone number is
// additionally required — mirrors the client-side check in steps.tsx.
export const projectRequestSchema = baseProjectRequestSchema
  .refine(
    (data) => data.preferredContact !== "phone" || (data.phone ?? "").trim().length >= 4,
    {
      message: "Bitte geben Sie eine Telefonnummer an.",
      path: ["phone"],
    }
  )
  .refine(
    (data) =>
      data.objectType !== "haus" ||
      houseSubtypes.some((subtype) => subtype.value === data.houseSubtype),
    {
      message: "Bitte wählen Sie eine Hausart aus.",
      path: ["houseSubtype"],
    }
  );

export type ProjectRequestInput = z.infer<typeof baseProjectRequestSchema>;

export type ProjectRequestFieldErrors = Partial<
  Record<keyof ProjectRequestInput, string>
>;

function labelFor<T extends ReadonlyArray<{ value: string; label: string }>>(
  options: T,
  value: string
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function categoryLabels(selected: readonly string[]): string[] {
  return normalizeCategories(selected).map((value) =>
    labelFor(renovationCategories, value)
  );
}

export function objectTypeLabel(value: string): string {
  return labelFor(objectTypes, value);
}

export function houseSubtypeLabel(value: string): string {
  return labelFor(houseSubtypes, value);
}

/** Combined, human-readable object description, e.g. "Haus – Einfamilienhaus". */
export function objectDescription(objectType: string, houseSubtype: string): string {
  if (objectType === "haus" && houseSubtype) {
    return `${objectTypeLabel(objectType)} – ${houseSubtypeLabel(houseSubtype)}`;
  }
  return objectTypeLabel(objectType);
}

export function desiredStartLabel(value: string): string {
  return labelFor(desiredStartOptions, value);
}

export function budgetLabel(value: string): string {
  return labelFor(budgetOptions, value);
}

export function contactPreferenceLabel(value: string): string {
  return labelFor(contactPreferenceOptions, value);
}
