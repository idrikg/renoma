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

export function HeroSection() {
  const showReferencesCta = hasPublishedReferences();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
      <Container>
        <div className="grid items-center gap-y-14 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16">
          {/* min-w-0 is required here: without it, a grid track will grow to
              fit its longest unbreakable word (e.g. "Renovierungsprojekt"),
              which can force this column wider than intended and overlap
              the media column next to it. No max-width cap on this wrapper
              itself — the heading should get the column's full share of
              the grid (~52%), not a further-reduced width. */}
          <div className="min-w-0">
            <p className="animate-fade-up text-sm font-medium tracking-[0.18em] text-clay uppercase">
              RENOMA
            </p>
            {/* The line break between "Ihr" and "Renovierungsprojekt." is
                intentional and authored here, not left to the browser —
                see .hero-headline in globals.css for why. */}
            <h1 className="hero-headline animate-fade-up animate-delay-1 mt-5 text-ink">
              Ihr
              <br />
              Renovierungsprojekt.
            </h1>
            <p className="animate-fade-up animate-delay-2 mt-6 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
              Sie freuen sich auf Ihr neues Zuhause.
              <br />
              Wir kümmern uns um den Weg dorthin.
            </p>
            <div className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/projekt-starten"
                className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
            <ul className="animate-fade-up animate-delay-3 mt-8 flex flex-col gap-2.5 text-[14px] text-muted sm:text-[15px]">
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

          <HeroMediaFrame image={resolveHeroImage()} />
        </div>
      </Container>
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
