import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

// Manrope: functional UI, navigation, body copy, forms.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Newsreader: the editorial display serif, used selectively for emotional
// brand statements (hero headline, "Wir kümmern uns.", "Wir stehen auf
// Ihrer Seite.", the manifesto, the final CTA) — never for every heading.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://renoma.de";
const title = "RENOMA — Wir stehen auf Ihrer Seite.";
const description =
  "RENOMA übernimmt die Koordination Ihrer Renovierung – von der ersten Idee bis zur Übergabe. Ein Ansprechpartner. Volle Verantwortung. Sie müssen sich um nichts mehr kümmern.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · RENOMA",
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "RENOMA",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${newsreader.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
