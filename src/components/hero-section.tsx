import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { hasPublishedReferences } from "@/lib/references-data";
import { mediaConfig } from "@/lib/media-config";

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
        <div className="grid items-center gap-y-14 lg:grid-cols-[1.4fr_1fr] lg:gap-x-16">
          {/* min-w-0 is required here: without it, a grid track will grow to
              fit its longest unbreakable word (e.g. "Renovierungsprojekt"),
              which can force this column wider than intended and overlap
              the media column next to it. No max-width cap on this wrapper
              itself — the heading should get the column's full ~58% share,
              not a further-reduced width. */}
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
            <p className="animate-fade-up animate-delay-1 mt-4 max-w-md text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
              Ihr Zuhause verdient Vorfreude statt Baustress.
            </p>
            <p className="animate-fade-up animate-delay-2 mt-5 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
              Sie freuen sich auf Ihr neues Zuhause.
              <br />
              Wir kümmern uns um den Weg dorthin.
            </p>
            <div className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/projekt-starten"
                className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Projekt starten
              </Link>
              {showReferencesCta && (
                <a
                  href="#referenzen"
                  className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-clay"
                >
                  Referenzen ansehen
                </a>
              )}
            </div>
            <ul className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted">
              {trustStatements.map((statement) => (
                <li key={statement} className="flex items-center gap-2 whitespace-nowrap">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-clay" />
                  {statement}
                </li>
              ))}
            </ul>
          </div>

          <HeroMedia />
        </div>
      </Container>
    </section>
  );
}

function HeroMedia() {
  const image = mediaConfig.heroImage;

  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(20,17,15,0.25)] ring-1 ring-inset ring-ink/5 lg:aspect-[4/5] lg:max-h-[560px]">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div aria-hidden className="media-frame-warm absolute inset-0" />
          <div aria-hidden className="media-frame-grain absolute inset-0" />
        </>
      )}
    </div>
  );
}
