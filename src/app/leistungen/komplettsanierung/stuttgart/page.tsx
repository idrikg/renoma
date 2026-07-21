import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { KomplettsanierungStuttgartPage } from "@/components/komplettsanierung-stuttgart-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  KOMPLETT_STUTTGART_PATH,
  STUTTGART_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Komplettsanierung in Stuttgart | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Komplettsanierung in Stuttgart – strukturiert, persönlich und mit einer klaren Abstimmung der beteiligten Maßnahmen.";
const canonicalPath = KOMPLETT_STUTTGART_PATH;

const ogReference = getPublishedReferenceBySlug("fassade-01");
const ogImage = ogReference ? getReferenceCover(ogReference) : null;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    type: "website",
    ...(ogImage
      ? {
          images: [{ url: ogImage.src, alt: ogImage.alt }],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    ...(ogImage ? { images: [ogImage.src] } : {}),
  },
};

const serviceLd = buildServiceStructuredData({
  path: KOMPLETT_STUTTGART_PATH,
  name: "Komplettsanierung in Stuttgart",
  serviceType: "Komplettsanierung",
  description: pageDescription,
  areaServed: STUTTGART_AREA_SERVED,
});

export default function KomplettsanierungStuttgartRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <KomplettsanierungStuttgartPage />
      </main>
      <SiteFooter />
    </>
  );
}
