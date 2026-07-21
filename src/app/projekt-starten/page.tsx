import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectAssistant } from "@/components/project-assistant/project-assistant";
import { parseFunnelPreset } from "@/components/project-assistant/funnel-preset";

export const metadata: Metadata = {
  title: "Projekt starten",
  description:
    "Erzählen Sie uns von Ihrem Renovierungsprojekt. Wir kümmern uns um den Weg dorthin.",
  alternates: {
    canonical: "/projekt-starten",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjektStartenPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialPreset = parseFunnelPreset(params);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="text-[15px] font-medium tracking-[0.14em] text-ink"
          >
            RENOMA
          </Link>
          <Link
            href="/"
            aria-label="Zurück zur Startseite"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <span className="sm:hidden">Startseite</span>
            <span className="hidden sm:inline">Zurück zur Startseite</span>
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-10 sm:py-24">
        <Container className="max-w-2xl">
          <ProjectAssistant initialPreset={initialPreset} />
        </Container>
      </main>

      <footer className="border-t border-line py-8">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/impressum" className="hover:text-ink">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            Datenschutz
          </Link>
        </Container>
      </footer>
    </div>
  );
}
