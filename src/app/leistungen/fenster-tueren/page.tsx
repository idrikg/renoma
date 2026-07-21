import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FensterTuerenPage } from "@/components/fenster-tueren-page";

const pageTitle = "Fenster und Türen modernisieren | RENOMA";
const pageDescription =
  "RENOMA begleitet die Modernisierung von Fenstern und Türen – von den ersten Anforderungen bis zur abgestimmten Umsetzung.";
const canonicalPath = "/leistungen/fenster-tueren";

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

export default function FensterTuerenRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <FensterTuerenPage />
      </main>
      <SiteFooter />
    </>
  );
}
