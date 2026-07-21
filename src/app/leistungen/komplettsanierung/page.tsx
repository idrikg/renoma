import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { KomplettsanierungPage } from "@/components/komplettsanierung-page";

const pageTitle = "Komplettsanierung mit persönlicher Begleitung | RENOMA";
const pageDescription =
  "RENOMA begleitet Ihre Komplettsanierung persönlich und koordiniert die nächsten Schritte – für klare Abläufe und einen festen Ansprechpartner.";
const canonicalPath = "/leistungen/komplettsanierung";

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

export default function KomplettsanierungRoute() {
  return (
    <>
      <SiteHeader />
      <main>
        <KomplettsanierungPage />
      </main>
      <SiteFooter />
    </>
  );
}
