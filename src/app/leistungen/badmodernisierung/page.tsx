import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BadmodernisierungPage } from "@/components/badmodernisierung-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";

const pageTitle = "Badmodernisierung mit persönlicher Begleitung | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Badmodernisierung persönlich – von den ersten Vorstellungen bis zur abgestimmten Umsetzung. Einfach, klar und mit einem festen Ansprechpartner.";
const canonicalPath = "/leistungen/badmodernisierung";

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

export default function BadmodernisierungRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <BadmodernisierungPage />
      </main>
      <SiteFooter />
    </>
  );
}
