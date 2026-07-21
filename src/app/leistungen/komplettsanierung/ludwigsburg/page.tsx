import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { KomplettsanierungLudwigsburgPage } from "@/components/komplettsanierung-ludwigsburg-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";
import {
  KOMPLETT_LUDWIGSBURG_PATH,
  LUDWIGSBURG_AREA_SERVED,
  buildServiceStructuredData,
} from "@/lib/structured-data";

const pageTitle = "Komplettsanierung in Ludwigsburg | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Komplettsanierung in Ludwigsburg – klar koordiniert und mit einem festen Ansprechpartner.";
const canonicalPath = KOMPLETT_LUDWIGSBURG_PATH;

const ogReference = getPublishedReferenceBySlug("kueche-01");
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
  path: KOMPLETT_LUDWIGSBURG_PATH,
  name: "Komplettsanierung in Ludwigsburg",
  serviceType: "Komplettsanierung",
  description: pageDescription,
  areaServed: LUDWIGSBURG_AREA_SERVED,
});

export default function KomplettsanierungLudwigsburgRoute() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <SiteHeader />
      <main>
        <KomplettsanierungLudwigsburgPage />
      </main>
      <SiteFooter />
    </>
  );
}
