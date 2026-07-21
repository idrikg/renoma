/**
 * Confirmed RENOMA service-area cities and regional page paths.
 * Do not invent additional cities or local offices.
 * Ludwigsburg and Remseck are separate destinations — never combine labels.
 */

export const CONFIRMED_SERVICE_CITIES = [
  { name: "Ludwigsburg" },
  { name: "Remseck am Neckar" },
  { name: "Stuttgart" },
  { name: "Heilbronn" },
  { name: "Waiblingen" },
] as const;

export const REGIONAL_PATHS = {
  einsatzgebiet: "/einsatzgebiet",
  remseckAnchor: "/einsatzgebiet#remseck-am-neckar",
  bad: {
    ludwigsburg: "/leistungen/badmodernisierung/ludwigsburg",
    stuttgart: "/leistungen/badmodernisierung/stuttgart",
    heilbronn: "/leistungen/badmodernisierung/heilbronn",
    waiblingen: "/leistungen/badmodernisierung/waiblingen",
  },
  komplett: {
    ludwigsburg: "/leistungen/komplettsanierung/ludwigsburg",
    stuttgart: "/leistungen/komplettsanierung/stuttgart",
    heilbronn: "/leistungen/komplettsanierung/heilbronn",
  },
} as const;

/** Footer links — short labels; Remseck points to the service-area anchor. */
export const FOOTER_REGION_LINKS = [
  { href: REGIONAL_PATHS.einsatzgebiet, label: "Einsatzgebiet" },
  { href: REGIONAL_PATHS.bad.ludwigsburg, label: "Ludwigsburg" },
  { href: REGIONAL_PATHS.remseckAnchor, label: "Remseck am Neckar" },
  { href: REGIONAL_PATHS.bad.stuttgart, label: "Stuttgart" },
  { href: REGIONAL_PATHS.bad.heilbronn, label: "Heilbronn" },
  { href: REGIONAL_PATHS.bad.waiblingen, label: "Waiblingen" },
] as const;

/** Bad-service regional links on /leistungen/badmodernisierung */
export const BAD_REGION_LINKS = [
  { href: REGIONAL_PATHS.bad.ludwigsburg, label: "Ludwigsburg" },
  { href: REGIONAL_PATHS.remseckAnchor, label: "Remseck am Neckar" },
  { href: REGIONAL_PATHS.bad.stuttgart, label: "Stuttgart" },
  { href: REGIONAL_PATHS.bad.heilbronn, label: "Heilbronn" },
  { href: REGIONAL_PATHS.bad.waiblingen, label: "Waiblingen" },
  { href: REGIONAL_PATHS.einsatzgebiet, label: "Einsatzgebiet ansehen" },
] as const;

/** Komplettsanierung regional links — no Waiblingen Ortsseite. */
export const KOMPLETT_REGION_LINKS = [
  { href: REGIONAL_PATHS.komplett.ludwigsburg, label: "Ludwigsburg" },
  { href: REGIONAL_PATHS.remseckAnchor, label: "Remseck am Neckar" },
  { href: REGIONAL_PATHS.komplett.stuttgart, label: "Stuttgart" },
  { href: REGIONAL_PATHS.komplett.heilbronn, label: "Heilbronn" },
  { href: REGIONAL_PATHS.einsatzgebiet, label: "Einsatzgebiet ansehen" },
] as const;

export type RegionalNavContext = "bad" | "komplett";

export type RegionalNavItem = {
  label: string;
  href: string;
};

/**
 * City switcher for the end of location pages.
 * Remseck always goes to the service-area anchor (no dedicated Ortsseite).
 */
export function getRegionalNavItems(
  context: RegionalNavContext,
): RegionalNavItem[] {
  if (context === "bad") {
    return [
      { label: "Ludwigsburg", href: REGIONAL_PATHS.bad.ludwigsburg },
      { label: "Remseck am Neckar", href: REGIONAL_PATHS.remseckAnchor },
      { label: "Stuttgart", href: REGIONAL_PATHS.bad.stuttgart },
      { label: "Heilbronn", href: REGIONAL_PATHS.bad.heilbronn },
      { label: "Waiblingen", href: REGIONAL_PATHS.bad.waiblingen },
    ];
  }

  return [
    { label: "Ludwigsburg", href: REGIONAL_PATHS.komplett.ludwigsburg },
    { label: "Remseck am Neckar", href: REGIONAL_PATHS.remseckAnchor },
    { label: "Stuttgart", href: REGIONAL_PATHS.komplett.stuttgart },
    { label: "Heilbronn", href: REGIONAL_PATHS.komplett.heilbronn },
    { label: "Waiblingen", href: REGIONAL_PATHS.einsatzgebiet },
  ];
}
