/**
 * Local German PLZ → city lookup for the project funnel.
 *
 * Data: `de-postal-cities.json` — compact unique PLZ→Ort map derived from the
 * open zauberware postal-codes dataset (ODbL). Only unambiguous mappings are
 * included; ambiguous or company-PO-box entries are omitted. Loaded lazily
 * on first use so the initial page payload is unaffected. No network
 * requests are made at runtime.
 */

type PostalCityMap = Record<string, string>;

let mapPromise: Promise<PostalCityMap> | null = null;
let cachedMap: PostalCityMap | null = null;

function loadPostalCityMap(): Promise<PostalCityMap> {
  if (cachedMap) return Promise.resolve(cachedMap);
  if (!mapPromise) {
    mapPromise = import("@/lib/data/de-postal-cities.json").then((module) => {
      cachedMap = module.default as PostalCityMap;
      return cachedMap;
    });
  }
  return mapPromise;
}

/** Digits only, max 5 — for controlled PLZ inputs. */
export function sanitizeGermanPostalCode(value: string): string {
  return value.replace(/\D/g, "").slice(0, 5);
}

export function isCompleteGermanPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

/**
 * Resolves a city for a German PLZ when the mapping is unique and known.
 * Returns `null` for incomplete, unknown, or intentionally omitted codes —
 * callers must leave the city field alone in those cases (no error).
 */
export async function lookupCityForPostalCode(
  postalCode: string
): Promise<string | null> {
  const code = postalCode.trim();
  if (!isCompleteGermanPostalCode(code)) return null;
  const map = await loadPostalCityMap();
  return map[code] ?? null;
}

/** Prefetch the map once the object step is likely needed. */
export function prefetchPostalCityMap(): void {
  void loadPostalCityMap();
}
