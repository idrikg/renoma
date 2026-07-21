import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FassadeAussenbereichPage } from "@/components/fassade-aussenbereich-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";

const pageTitle = "Fassade und Außenbereich modernisieren | RENOMA";
const pageDescription =
  "RENOMA begleitet die Modernisierung von Fassaden und Außenbereichen – abgestimmt auf Gebäude, Nutzung und gewünschte Gestaltung.";
const canonicalPath = "/leistungen/fassade-aussenbereich";

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

export default function FassadeAussenbereichRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <FassadeAussenbereichPage />
      </main>
      <SiteFooter />
    </>
  );
}
