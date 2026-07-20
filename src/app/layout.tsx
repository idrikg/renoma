import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { getSiteUrl, homeDescription, homeTitle } from "@/lib/site-url";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s · RENOMA",
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    siteName: "RENOMA",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
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
