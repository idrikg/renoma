import {
  categoriesByMainArea,
  mainAreaOptions,
  normalizeCategories,
  renovationCategories,
} from "@/lib/validation";
import type { WizardData } from "@/components/project-assistant/types";

/**
 * Confirmed bathroom-modernization entry preset only.
 * Query: /projekt-starten?bereich=innen&leistung=bad-sanitaer
 *
 * Values must match `mainAreaOptions` / `renovationCategories` exactly —
 * never invent parallel IDs for marketing URLs.
 */
export const BAD_MODERNIZATION_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=bad-sanitaer";

const ALLOWED_BEREICH: ReadonlySet<string> = new Set(
  mainAreaOptions.map((option) => option.value),
);
const ALLOWED_LEISTUNG: ReadonlySet<string> = new Set(
  renovationCategories.map((category) => category.value),
);

export type FunnelPreset = {
  mainArea: "innen";
  categories: readonly ["bad-sanitaer"];
  summaryLabel: string;
};

const BATHROOM_PRESET: FunnelPreset = {
  mainArea: "innen",
  categories: ["bad-sanitaer"],
  summaryLabel: "Innenbereich · Bad & Sanitär",
};

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

/**
 * Returns a preset only when both query values are present, allowlisted,
 * and match the single supported bathroom entry. Unknown or partial
 * params yield null — the funnel starts normally.
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
  if (bereich !== BATHROOM_PRESET.mainArea) return null;
  if (leistung !== BATHROOM_PRESET.categories[0]) return null;

  // Structural check: leistung must belong to the chosen main area.
  const allowedForArea = categoriesByMainArea[bereich] ?? [];
  if (!allowedForArea.includes(leistung)) return null;

  return BATHROOM_PRESET;
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
