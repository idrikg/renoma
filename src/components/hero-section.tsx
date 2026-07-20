import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/container";
import { HeroMediaFrame } from "@/components/hero-media";
import { hasPublishedReferences } from "@/lib/references-data";
import { mediaConfig } from "@/lib/media-config";
import { publicAssetExists } from "@/lib/public-asset";

const trustStatements = [
  "Persönlicher Ansprechpartner",
  "Wir stehen auf Ihrer Seite",
  "Erfahrenes Handwerkernetzwerk",
];

/**
 * First viewport: brand, one headline, one supporting thought, CTA, trust.
 * Load-in motion is CSS-only (`animate-fade-up`). Media scroll response lives
 * inside HeroMediaFrame (desktop only).
 */
export function HeroSection() {
  const showReferencesCta = hasPublishedReferences();

  return (
    <section className="hero-section relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
      <div aria-hidden className="bg-hero-glow pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <Container>
        <div className="grid items-center gap-y-10 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 lg:gap-y-14">
          {/* min-w-0: prevent long German compounds from blowing the grid track. */}
          <div className="min-w-0">
            <p className="animate-fade-up text-sm font-medium tracking-[0.18em] text-clay uppercase">
              RENOMA
            </p>
            {/* Authored break keeps "Renovierungsprojekt." unbroken — see .hero-headline. */}
            <h1 className="hero-headline animate-fade-up animate-delay-1 mt-4 text-ink sm:mt-5">
              Ihr
              <br />
              Renovierungsprojekt.
            </h1>
            <p className="animate-fade-up animate-delay-2 mt-5 max-w-sm text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              Sie freuen sich auf Ihr neues Zuhause.
              <br />
              Wir kümmern uns um den Weg dorthin.
            </p>
            <div className="animate-fade-up animate-delay-3 mt-7 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
              <Link
                href="/projekt-starten"
                className="flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
              >
                Projekt starten
              </Link>
              {showReferencesCta && (
                <a
                  href="#referenzen"
                  className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Referenzen ansehen
                </a>
              )}
            </div>
            <ul className="animate-fade-up animate-delay-4 mt-7 flex flex-col gap-2.5 text-[14px] text-muted sm:mt-8 sm:text-[15px]">
              {trustStatements.map((statement) => (
                <li key={statement} className="flex items-center gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-sage"
                    strokeWidth={2}
                  />
                  {statement}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up animate-delay-2">
            <HeroMediaFrame image={resolveHeroImage()} />
          </div>
        </div>
      </Container>
      {/* Soft handoff into the next section — no decorative wave shapes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-paper sm:h-24"
      />
    </section>
  );
}

/** Only pass image config when the file actually exists under `public/`. */
function resolveHeroImage() {
  const image = mediaConfig.heroImage;
  if (!image || !publicAssetExists(image.src)) {
    return null;
  }
  return image;
}
