import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeistungenOverviewPage } from "@/components/leistungen-overview-page";

const pageTitle = "Leistungen für Renovierung und Sanierung | RENOMA";
const pageDescription =
  "Entdecken Sie die Leistungen von RENOMA rund um Badmodernisierung, Komplettsanierung, Elektroarbeiten sowie Fenster und Türen – persönlich begleitet und klar koordiniert.";
const canonicalPath = "/leistungen";

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

export default function LeistungenRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <LeistungenOverviewPage />
      </main>
      <SiteFooter />
    </>
  );
}
