import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BadmodernisierungHeilbronnPage } from "@/components/badmodernisierung-heilbronn-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  BAD_HEILBRONN_PATH,
  HEILBRONN_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Badmodernisierung in Heilbronn | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Badmodernisierung in Heilbronn – von den ersten Vorstellungen bis zur koordinierten Umsetzung.";
const canonicalPath = BAD_HEILBRONN_PATH;

const bathroomReference = getPublishedReferenceBySlug("bad-01");
const ogImage = bathroomReference ? getReferenceCover(bathroomReference) : null;

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
  path: BAD_HEILBRONN_PATH,
  name: "Badmodernisierung in Heilbronn",
  serviceType: "Badmodernisierung",
  description: pageDescription,
  areaServed: HEILBRONN_AREA_SERVED,
});

export default function BadmodernisierungHeilbronnRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <BadmodernisierungHeilbronnPage />
      </main>
      <SiteFooter />
    </>
  );
}
