import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BodenFliesenPage } from "@/components/boden-fliesen-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";

const pageTitle = "Boden und Fliesen modernisieren | RENOMA";
const pageDescription =
  "RENOMA begleitet die Modernisierung von Böden und Fliesen – von der Materialauswahl bis zur abgestimmten Umsetzung.";
const canonicalPath = "/leistungen/boden-fliesen";

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

export default function BodenFliesenRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <BodenFliesenPage />
      </main>
      <SiteFooter />
    </>
  );
}
