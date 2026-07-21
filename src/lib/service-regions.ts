/**
 * Confirmed RENOMA service-area cities and regional page paths.
 * Do not invent additional cities or local offices.
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

/** Footer / overview links — short labels, not every long service URL. */
export const FOOTER_REGION_LINKS = [
  { href: REGIONAL_PATHS.einsatzgebiet, label: "Einsatzgebiet" },
  { href: REGIONAL_PATHS.bad.ludwigsburg, label: "Ludwigsburg & Remseck" },
  { href: REGIONAL_PATHS.bad.stuttgart, label: "Stuttgart" },
  { href: REGIONAL_PATHS.bad.heilbronn, label: "Heilbronn" },
  { href: REGIONAL_PATHS.bad.waiblingen, label: "Waiblingen" },
] as const;

export const BAD_REGION_LINKS = [
  {
    href: REGIONAL_PATHS.bad.ludwigsburg,
    label: "Ludwigsburg & Remseck",
  },
  {
    href: REGIONAL_PATHS.bad.stuttgart,
    label: "Stuttgart",
  },
  {
    href: REGIONAL_PATHS.bad.heilbronn,
    label: "Heilbronn",
  },
  {
    href: REGIONAL_PATHS.bad.waiblingen,
    label: "Waiblingen",
  },
] as const;

export const KOMPLETT_REGION_LINKS = [
  {
    href: REGIONAL_PATHS.komplett.ludwigsburg,
    label: "Ludwigsburg & Remseck",
  },
  {
    href: REGIONAL_PATHS.komplett.stuttgart,
    label: "Stuttgart",
  },
  {
    href: REGIONAL_PATHS.komplett.heilbronn,
    label: "Heilbronn",
  },
] as const;
