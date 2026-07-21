import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InnenrenovierungPage } from "@/components/innenrenovierung-page";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
} from "@/lib/references-data";

const pageTitle =
  "Innenrenovierung mit persönlicher Begleitung | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Innenrenovierung persönlich – von einzelnen Räumen bis zu miteinander abgestimmten Modernisierungsmaßnahmen.";
const canonicalPath = "/leistungen/innenrenovierung";

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

export default function InnenrenovierungRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <InnenrenovierungPage />
      </main>
      <SiteFooter />
    </>
  );
}
