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
 * Or area-only: ?bereich=<mainAreaOptions.value> (no leistung) for pages
 * without a single matching leaf category.
 *
 * Only allowlisted combinations that exist in validation.ts are supported.
 */

export const BAD_MODERNIZATION_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=bad-sanitaer";

export const KOMPLETTSANIERUNG_FUNNEL_HREF =
  "/projekt-starten?bereich=gesamt&leistung=komplettsanierung";

export const ELEKTRIK_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=elektrik";

export const FENSTER_TUEREN_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=fenster-tueren";

/** No single “Innenrenovierung” leaf ID — preselect Innenbereich only. */
export const INNENRENOVIERUNG_FUNNEL_HREF =
  "/projekt-starten?bereich=innen";

export const BODEN_FLIESEN_FUNNEL_HREF =
  "/projekt-starten?bereich=innen&leistung=boden";

/** No combined Fassade+Außen leaf ID — preselect Außenbereich only. */
export const FASSADE_AUSSEN_FUNNEL_HREF =
  "/projekt-starten?bereich=aussen";

const ALLOWED_BEREICH: ReadonlySet<string> = new Set(
  mainAreaOptions.map((option) => option.value),
);
const ALLOWED_LEISTUNG: ReadonlySet<string> = new Set(
  renovationCategories.map((category) => category.value),
);

export type FunnelPreset = {
  mainArea: string;
  /** Empty when only the main area is preselected. */
  categories: readonly string[];
  summaryLabel: string;
};

const FULL_PRESETS: readonly FunnelPreset[] = [
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
  {
    mainArea: "innen",
    categories: ["boden"],
    summaryLabel: "Innenbereich · Böden",
  },
];

/** Area-only entries — only when `leistung` is omitted from the URL. */
const AREA_ONLY_PRESETS: Readonly<Record<string, FunnelPreset>> = {
  innen: {
    mainArea: "innen",
    categories: [],
    summaryLabel: "Innenbereich",
  },
  aussen: {
    mainArea: "aussen",
    categories: [],
    summaryLabel: "Außenbereich",
  },
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

function findFullPreset(bereich: string, leistung: string): FunnelPreset | null {
  return (
    FULL_PRESETS.find(
      (preset) =>
        preset.mainArea === bereich && preset.categories[0] === leistung,
    ) ?? null
  );
}

/**
 * Returns a preset when query values are allowlisted and match a supported
 * marketing entry. Area-only presets require `bereich` without `leistung`.
 * Unknown or invalid params yield null — the funnel starts normally.
 */
export function parseFunnelPreset(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): FunnelPreset | null {
  const bereich = readParam(params, "bereich");
  const leistung = readParam(params, "leistung");

  if (!bereich || !ALLOWED_BEREICH.has(bereich)) return null;

  if (!leistung) {
    return AREA_ONLY_PRESETS[bereich] ?? null;
  }

  if (!ALLOWED_LEISTUNG.has(leistung)) return null;

  const allowedForArea = categoriesByMainArea[bereich] ?? [];
  if (!allowedForArea.includes(leistung)) return null;

  return findFullPreset(bereich, leistung);
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
