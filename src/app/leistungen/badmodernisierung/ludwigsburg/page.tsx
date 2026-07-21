import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BadmodernisierungLudwigsburgPage } from "@/components/badmodernisierung-ludwigsburg-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  BAD_LUDWIGSBURG_PATH,
  LUDWIGSBURG_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Badmodernisierung in Ludwigsburg & Remseck | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Badmodernisierung in Ludwigsburg, Remseck und Umgebung persönlich – von den ersten Vorstellungen bis zur abgestimmten Umsetzung.";
const canonicalPath = BAD_LUDWIGSBURG_PATH;

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
  path: BAD_LUDWIGSBURG_PATH,
  name: "Badmodernisierung in Ludwigsburg und Remseck",
  serviceType: "Badmodernisierung",
  description: pageDescription,
  areaServed: LUDWIGSBURG_AREA_SERVED,
});

export default function BadmodernisierungLudwigsburgRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <BadmodernisierungLudwigsburgPage />
      </main>
      <SiteFooter />
    </>
  );
}
