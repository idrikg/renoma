import { z } from "zod";

export const renovationCategories = [
  { value: "bad", label: "Bad" },
  { value: "kueche", label: "Küche" },
  { value: "boden", label: "Boden" },
  { value: "fenster", label: "Fenster" },
  { value: "tueren", label: "Türen" },
  { value: "elektrik", label: "Elektrik" },
  { value: "photovoltaik", label: "Photovoltaik" },
  { value: "waermepumpe", label: "Wärmepumpe" },
  { value: "garten", label: "Garten" },
  { value: "pool", label: "Pool" },
  { value: "smart_home", label: "Smart Home" },
  { value: "anbau", label: "Anbau" },
  { value: "komplettsanierung", label: "Komplettsanierung" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

export const propertyTypes = [
  { value: "einfamilienhaus", label: "Einfamilienhaus" },
  { value: "doppelhaushaelfte", label: "Doppelhaushälfte" },
  { value: "reihenhaus", label: "Reihenhaus" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "eigentumswohnung", label: "Eigentumswohnung" },
  { value: "gewerbeobjekt", label: "Gewerbeobjekt" },
  { value: "sonstiges", label: "Sonstiges" },
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
  categories: z
    .array(z.enum(values(renovationCategories)))
    .min(1, "Bitte wählen Sie mindestens einen Bereich aus."),
  wishes: z.string().trim().max(2000, "Die Nachricht ist zu lang.").optional().or(z.literal("")),
  imageCount: z.coerce.number().int().min(0).max(30).optional().default(0),
  postalCode: z
    .string()
    .trim()
    .min(4, "Bitte geben Sie eine gültige Postleitzahl an.")
    .max(10, "Bitte geben Sie eine gültige Postleitzahl an."),
  city: z.string().trim().min(2, "Bitte geben Sie Ihren Ort an.").max(100),
  propertyType: z.enum(values(propertyTypes), {
    message: "Bitte wählen Sie eine Objektart aus.",
  }),
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
export const projectRequestSchema = baseProjectRequestSchema.refine(
  (data) => data.preferredContact !== "phone" || (data.phone ?? "").trim().length >= 4,
  {
    message: "Bitte geben Sie eine Telefonnummer an.",
    path: ["phone"],
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
  return selected.map((value) => labelFor(renovationCategories, value));
}

export function propertyTypeLabel(value: string): string {
  return labelFor(propertyTypes, value);
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
