import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { EinsatzgebietPage } from "@/components/einsatzgebiet-page";
import { buildEinsatzgebietStructuredData } from "@/lib/structured-data";

const pageTitle =
  "Einsatzgebiet in der Region Stuttgart & Heilbronn | RENOMA";
const pageDescription =
  "RENOMA begleitet Renovierungs- und Sanierungsprojekte in Ludwigsburg, Remseck, Stuttgart, Waiblingen, Heilbronn und der angrenzenden Umgebung.";
const canonicalPath = "/einsatzgebiet";

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
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const pageLd = buildEinsatzgebietStructuredData({
  name: pageTitle,
  description: pageDescription,
});

export default function EinsatzgebietRoute() {
  return (
    <>
      <JsonLd data={pageLd} />
      <SiteHeader />
      <main>
        <EinsatzgebietPage />
      </main>
      <SiteFooter />
    </>
  );
}
