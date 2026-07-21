import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BadmodernisierungWaiblingenPage } from "@/components/badmodernisierung-waiblingen-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  BAD_WAIBLINGEN_PATH,
  WAIBLINGEN_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Badmodernisierung in Waiblingen | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Badmodernisierung in Waiblingen persönlich – von der Ausgangssituation bis zur abgestimmten Umsetzung.";
const canonicalPath = BAD_WAIBLINGEN_PATH;

const bathroomReference = getPublishedReferenceBySlug("wc-01");
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
  path: BAD_WAIBLINGEN_PATH,
  name: "Badmodernisierung in Waiblingen",
  serviceType: "Badmodernisierung",
  description: pageDescription,
  areaServed: WAIBLINGEN_AREA_SERVED,
});

export default function BadmodernisierungWaiblingenRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <BadmodernisierungWaiblingenPage />
      </main>
      <SiteFooter />
    </>
  );
}
