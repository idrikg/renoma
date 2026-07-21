import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BadmodernisierungStuttgartPage } from "@/components/badmodernisierung-stuttgart-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  BAD_STUTTGART_PATH,
  STUTTGART_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Badmodernisierung in Stuttgart | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Badmodernisierung in Stuttgart persönlich – mit klarer Abstimmung, koordinierten Schritten und einem festen Ansprechpartner.";
const canonicalPath = BAD_STUTTGART_PATH;

const bathroomReference = getPublishedReferenceBySlug(
  "badezimmer-detailmodernisierung",
);
const ogImage = bathroomReference
  ? getReferenceCover(bathroomReference)
  : null;

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
  path: BAD_STUTTGART_PATH,
  name: "Badmodernisierung in Stuttgart",
  serviceType: "Badmodernisierung",
  description: pageDescription,
  areaServed: STUTTGART_AREA_SERVED,
});

export default function BadmodernisierungStuttgartRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <BadmodernisierungStuttgartPage />
      </main>
      <SiteFooter />
    </>
  );
}
