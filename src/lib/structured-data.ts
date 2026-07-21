import { getContactEmail, legalConfig } from "@/lib/legal-config";
import { CONFIRMED_SERVICE_CITIES } from "@/lib/service-regions";
import { getSiteUrl, homeDescription } from "@/lib/site-url";

/**
 * Central JSON-LD builders. Only use fields backed by public site / Impressum
 * data. No LocalBusiness: the Impressum address is the operator’s legal
 * address; the site does not state that customers visit a showroom there.
 * RENOMA projects are accompanied at the customer’s location (service area).
 */

export const ORGANIZATION_ID = "https://renoma-zuhause.de/#organization";
export const BRAND_ID = "https://renoma-zuhause.de/#brand";
export const WEBSITE_ID = "https://renoma-zuhause.de/#website";
export const EINSATZGEBIET_PAGE_ID =
  "https://renoma-zuhause.de/einsatzgebiet#webpage";

const LOGO_PATH = "/brand/renoma-logo-square.png";

/** Drop keys whose values are undefined / null (keeps JSON-LD valid). */
function compact<T extends Record<string, unknown>>(input: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      out[key] = value
        .filter((item) => item !== undefined && item !== null)
        .map((item) =>
          item !== null && typeof item === "object" && !Array.isArray(item)
            ? compact(item as Record<string, unknown>)
            : item,
        );
      continue;
    }
    if (typeof value === "object") {
      out[key] = compact(value as Record<string, unknown>);
      continue;
    }
    out[key] = value;
  }
  return out as T;
}

function absoluteUrl(path: string): string {
  const siteUrl = getSiteUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function cityNodes(cities: readonly { name: string }[]) {
  return cities.map((city) =>
    compact({
      "@type": "City",
      name: city.name,
    }),
  );
}

export function buildOrganizationNode() {
  const email = getContactEmail();

  return compact({
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: legalConfig.operatorName,
    url: getSiteUrl(),
    description: homeDescription,
    email,
    telephone: legalConfig.phoneInternational,
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl(LOGO_PATH),
    address: {
      "@type": "PostalAddress",
      streetAddress: legalConfig.streetAddress,
      postalCode: legalConfig.postalCode,
      addressLocality: legalConfig.city,
      addressCountry: "DE",
    },
    areaServed: cityNodes(CONFIRMED_SERVICE_CITIES),
    brand: {
      "@id": BRAND_ID,
    },
  });
}

export function buildBrandNode() {
  return compact({
    "@type": "Brand",
    "@id": BRAND_ID,
    name: legalConfig.brandName,
    url: getSiteUrl(),
    logo: absoluteUrl(LOGO_PATH),
    description: legalConfig.brandNotice,
  });
}

export function buildWebsiteNode() {
  return compact({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: getSiteUrl(),
    name: legalConfig.brandName,
    inLanguage: "de-DE",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  });
}

/** Sitewide graph for the root layout — Organization, Brand, WebSite once. */
export function buildSitewideStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationNode(), buildBrandNode(), buildWebsiteNode()],
  };
}

export type ServiceStructuredDataInput = {
  /** Absolute path, e.g. `/leistungen/badmodernisierung/ludwigsburg` */
  path: string;
  /** Fragment id, e.g. `service` → `#service` on that URL */
  idFragment?: string;
  name: string;
  serviceType: string;
  description: string;
  areaServed: readonly { name: string }[];
};

export function buildServiceStructuredData(input: ServiceStructuredDataInput) {
  const pageUrl = absoluteUrl(input.path);
  const serviceId = `${pageUrl}#${input.idFragment ?? "service"}`;

  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: input.name,
    serviceType: input.serviceType,
    url: pageUrl,
    description: input.description,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: cityNodes(input.areaServed),
  });
}

export function buildEinsatzgebietStructuredData(input: {
  name: string;
  description: string;
}) {
  const pageUrl = absoluteUrl("/einsatzgebiet");

  return compact({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": EINSATZGEBIET_PAGE_ID,
    url: pageUrl,
    name: input.name,
    description: input.description,
    inLanguage: "de-DE",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Bestätigte Einsatzgebiete",
      itemListElement: CONFIRMED_SERVICE_CITIES.map((city, index) =>
        compact({
          "@type": "ListItem",
          position: index + 1,
          name: city.name,
          item: {
            "@type": "City",
            name: city.name,
          },
        }),
      ),
    },
  });
}

/** Service markup for Ludwigsburg Ortsseiten — single city only. */
export const LUDWIGSBURG_AREA_SERVED = [{ name: "Ludwigsburg" }] as const;

export const STUTTGART_AREA_SERVED = [{ name: "Stuttgart" }] as const;
export const HEILBRONN_AREA_SERVED = [{ name: "Heilbronn" }] as const;
export const WAIBLINGEN_AREA_SERVED = [{ name: "Waiblingen" }] as const;

export const BAD_LUDWIGSBURG_PATH =
  "/leistungen/badmodernisierung/ludwigsburg";
export const KOMPLETT_LUDWIGSBURG_PATH =
  "/leistungen/komplettsanierung/ludwigsburg";
export const BAD_STUTTGART_PATH = "/leistungen/badmodernisierung/stuttgart";
export const KOMPLETT_STUTTGART_PATH =
  "/leistungen/komplettsanierung/stuttgart";
export const BAD_HEILBRONN_PATH = "/leistungen/badmodernisierung/heilbronn";
export const KOMPLETT_HEILBRONN_PATH =
  "/leistungen/komplettsanierung/heilbronn";
export const BAD_WAIBLINGEN_PATH = "/leistungen/badmodernisierung/waiblingen";
