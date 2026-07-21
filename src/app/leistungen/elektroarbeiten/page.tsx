import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ElektroarbeitenPage } from "@/components/elektroarbeiten-page";

const pageTitle = "Elektroarbeiten bei Renovierung und Sanierung | RENOMA";
const pageDescription =
  "RENOMA begleitet und koordiniert Elektroarbeiten im Rahmen Ihrer Renovierung oder Sanierung – klar abgestimmt und mit einem festen Ansprechpartner.";
const canonicalPath = "/leistungen/elektroarbeiten";

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

export default function ElektroarbeitenRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <ElektroarbeitenPage />
      </main>
      <SiteFooter />
    </>
  );
}
