import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { KomplettsanierungHeilbronnPage } from "@/components/komplettsanierung-heilbronn-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  KOMPLETT_HEILBRONN_PATH,
  HEILBRONN_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Komplettsanierung in Heilbronn | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Komplettsanierung in Heilbronn – mit klarer Struktur, abgestimmten Maßnahmen und persönlicher Koordination.";
const canonicalPath = KOMPLETT_HEILBRONN_PATH;

const ogReference = getPublishedReferenceBySlug("treppe-01");
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
  path: KOMPLETT_HEILBRONN_PATH,
  name: "Komplettsanierung in Heilbronn",
  serviceType: "Komplettsanierung",
  description: pageDescription,
  areaServed: HEILBRONN_AREA_SERVED,
});

export default function KomplettsanierungHeilbronnRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <KomplettsanierungHeilbronnPage />
      </main>
      <SiteFooter />
    </>
  );
}
