import {
  categoriesByMainArea,
  mainAreaOptions,
  normalizeCategories,
  renovationCategories,
} from "@/lib/validation";
import type { WizardData } from "@/components/project-assistant/types";

/**
 * Marketing entry presets for /projekt-starten.
 * Query: ?bereich=<mainAreaOptions.value>&leistung=<renovationCategories.value>
 *
 * Only allowlisted combinations that exist in validation.ts are supported —
 * never invent parallel IDs for marketing URLs.
 */

export const BAD_MODERNIZATION_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=bad-sanitaer";

export const KOMPLETTSANIERUNG_FUNNEL_HREF =
  "/projekt-starten?bereich=gesamt&leistung=komplettsanierung";

export const ELEKTRIK_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=elektrik";

export const FENSTER_TUEREN_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=fenster-tueren";

const ALLOWED_BEREICH: ReadonlySet<string> = new Set(
  mainAreaOptions.map((option) => option.value),
);
const ALLOWED_LEISTUNG: ReadonlySet<string> = new Set(
  renovationCategories.map((category) => category.value),
);

export type FunnelPreset = {
  mainArea: string;
  categories: readonly string[];
  summaryLabel: string;
};

const PRESETS: readonly FunnelPreset[] = [
  {
    mainArea: "innen",
    categories: ["bad-sanitaer"],
    summaryLabel: "Innenbereich · Bad & Sanitär",
  },
  {
    mainArea: "gesamt",
    categories: ["komplettsanierung"],
    summaryLabel: "Gesamtprojekt · Komplettsanierung",
  },
  {
    mainArea: "innen",
    categories: ["elektrik"],
    summaryLabel: "Innenbereich · Elektrik",
  },
  {
    mainArea: "innen",
    categories: ["fenster-tueren"],
    summaryLabel: "Innenbereich · Fenster & Türen",
  },
];

function readParam(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string,
): string | null {
  if (params instanceof URLSearchParams) {
    const value = params.get(key);
    return value?.trim() || null;
  }
  const raw = params[key];
  if (typeof raw === "string") return raw.trim() || null;
  if (Array.isArray(raw) && typeof raw[0] === "string") {
    return raw[0].trim() || null;
  }
  return null;
}

function findPreset(bereich: string, leistung: string): FunnelPreset | null {
  return (
    PRESETS.find(
      (preset) =>
        preset.mainArea === bereich && preset.categories[0] === leistung,
    ) ?? null
  );
}

/**
 * Returns a preset only when both query values are present, allowlisted,
 * belong together in categoriesByMainArea, and match a supported marketing
 * entry. Unknown or partial params yield null — the funnel starts normally.
 */
export function parseFunnelPreset(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): FunnelPreset | null {
  const bereich = readParam(params, "bereich");
  const leistung = readParam(params, "leistung");

  if (!bereich || !leistung) return null;
  if (!ALLOWED_BEREICH.has(bereich) || !ALLOWED_LEISTUNG.has(leistung)) {
    return null;
  }

  const allowedForArea = categoriesByMainArea[bereich] ?? [];
  if (!allowedForArea.includes(leistung)) return null;

  return findPreset(bereich, leistung);
}

/** First step that still needs attention after applying known answers. */
export function getFirstOpenStep(data: WizardData): number {
  if (!data.mainArea.trim()) return 1;
  if (normalizeCategories(data.categories).length === 0) return 2;
  // Images (step 3) are optional but are the next open funnel step.
  return 3;
}

export function categoriesMatchPreset(
  categories: readonly string[],
  preset: FunnelPreset,
): boolean {
  const normalized = normalizeCategories(categories);
  if (normalized.length !== preset.categories.length) return false;
  return preset.categories.every((value) => normalized.includes(value));
}

export function dataMatchesPreset(
  data: Pick<WizardData, "mainArea" | "categories">,
  preset: FunnelPreset,
): boolean {
  return (
    data.mainArea === preset.mainArea &&
    categoriesMatchPreset(data.categories, preset)
  );
}
