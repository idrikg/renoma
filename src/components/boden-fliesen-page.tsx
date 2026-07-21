import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { BODEN_FLIESEN_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";

const roomContexts = [
  "Wohn- und Essbereiche",
  "Flure und Eingangsbereiche",
  "Küche",
  "Badezimmer",
  "Gäste-WC",
  "Treppen und Übergänge",
];

const designTopics = [
  {
    title: "Format und Bild",
    description:
      "Großformatige oder kleinere Formate, ruhige oder lebendige Oberflächen – das Verlegebild beeinflusst die Raumwirkung spürbar.",
  },
  {
    title: "Farbe und Materialwirkung",
    description:
      "Helle oder dunklere Töne, matte oder lebendigere Oberflächen sollten zu Licht, Möbeln und angrenzenden Flächen passen.",
  },
  {
    title: "Übergänge und Sockel",
    description:
      "Anschlüsse zu anderen Böden, Türen und Wandbereichen entscheiden mit über ein ruhiges Gesamtbild.",
  },
  {
    title: "Nutzung und Pflege",
    description:
      "Alltag, Beanspruchung und gewünschte Pflege sind Entscheidungskriterien – ohne pauschale Materialempfehlung aus der Ferne.",
  },
];

const beforeWork = [
  "vorhandener Untergrund",
  "Raumhöhe und Anschlüsse",
  "Übergänge zu anderen Bodenflächen",
  "Verlegebild und Ausrichtung",
  "Sockel und Randbereiche",
  "Verbindung zu Türen und Einbauten",
];

const relatedServices = [
  {
    href: "/leistungen/innenrenovierung",
    title: "Innenrenovierung",
    description: "Böden im Kontext ganzer Innenräume planen.",
  },
  {
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description: "Fliesenflächen als Teil des Badprojekts abstimmen.",
  },
  {
    href: "/leistungen/komplettsanierung",
    title: "Komplettsanierung",
    description: "Bodenarbeiten in den Gesamtablauf einbinden.",
  },
  {
    href: "/leistungen/fassade-aussenbereich",
    title: "Fassade & Außenbereich",
    description: "Außenflächen gesondert und klar abgrenzen.",
  },
];

const faqs = [
  {
    question: "Welche Böden und Fliesen passen zu meinem Raum?",
    answer:
      "Das hängt von Nutzung, Licht, angrenzenden Flächen und Ihren Gestaltungszielen ab. Eine konkrete Auswahl entsteht im Gespräch – nicht als Fernempfehlung.",
  },
  {
    question: "Können unterschiedliche Räume optisch miteinander verbunden werden?",
    answer:
      "Oft ja, zum Beispiel über durchlaufende Formate, abgestimmte Farben oder bewusst gesetzte Übergänge. Was sinnvoll ist, hängt vom Bestand ab.",
  },
  {
    question: "Was muss beim vorhandenen Untergrund beachtet werden?",
    answer:
      "Der Untergrund muss projektbezogen geprüft werden. Ob und welche Vorbereitung nötig ist, lässt sich nicht pauschal aus der Ferne festlegen.",
  },
  {
    question:
      "Können Bodenarbeiten mit Türen und weiteren Renovierungsarbeiten abgestimmt werden?",
    answer:
      "Ja. Höhen, Anschlüsse und Reihenfolge sollten früh gemeinsam betrachtet werden, damit Übergänge sauber bleiben.",
  },
  {
    question: "Ist auch die Modernisierung einzelner Flächen möglich?",
    answer:
      "Ja. Auch gezielte Bereiche – etwa ein Bad, ein Flur oder einzelne Räume – können begleitet werden.",
  },
  {
    question: "Wie kann ich RENOMA Bilder der vorhandenen Flächen senden?",
    answer:
      "Über den Projektassistenten können Sie Bilder hochladen. Das hilft bei der Einordnung Ihres Vorhabens.",
  },
];

/** Projects where floors/tiles are clearly visible — labeled by real category. */
const FLOOR_RELATED_SLUGS = [
  "badezimmer-detailmodernisierung",
  "kueche-01",
  "treppe-01",
  "wc-01",
] as const;

export function BodenFliesenPage() {
  const references = FLOOR_RELATED_SLUGS.map((slug) =>
    getPublishedReferenceBySlug(slug),
  ).filter(Boolean);

  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Boden & Fliesen" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Boden &amp; Fliesen
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Böden und Fliesen, die Räume dauerhaft prägen.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Material, Format und Verlegung beeinflussen die Wirkung eines Raumes
            entscheidend. RENOMA begleitet Sie bei der Auswahl und stimmt die
            Umsetzung mit den weiteren Renovierungsarbeiten ab.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={BODEN_FLIESEN_FUNNEL_HREF}
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Bodenprojekt starten
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              Alle Leistungen
            </Link>
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="raeume-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="raeume-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Wo Boden- und Fliesenarbeiten eine Rolle spielen
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Außenflächen werden gesondert betrachtet und nicht mit
              Innenarbeiten vermischt – siehe{" "}
              <Link
                href="/leistungen/fassade-aussenbereich"
                className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                Fassade &amp; Außenbereich
              </Link>
              .
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {roomContexts.map((item, index) => (
              <Reveal key={item} delayMs={index * 25}>
                <li className="border-t border-line pt-5 text-[15px] leading-relaxed text-ink sm:text-base">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="gestaltung-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="gestaltung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Gestaltung und Materialauswahl
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Es gibt keine pauschale Empfehlung für ein bestimmtes Material ohne
              Blick auf Raum und Nutzung.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {designTopics.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 35}>
                <li className="border-t border-line pt-6">
                  <h3 className="text-xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="abstimmung-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="abstimmung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Was vor der Umsetzung abgestimmt wird
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ohne Ferndiagnose zum Untergrund: Die folgenden Punkte werden im
              konkreten Projekt geklärt.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {beforeWork.map((item, index) => (
              <Reveal key={item} delayMs={index * 25}>
                <li className="border-t border-line pt-5 text-[15px] leading-relaxed text-ink sm:text-base">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="ablauf-heading"
        className="py-20 sm:py-28 lg:py-32"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="ablauf-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Ablauf mit RENOMA
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Räume und Wünsche erfassen",
                description:
                  "Sie beschreiben Flächen, Nutzung und die gewünschte Wirkung.",
              },
              {
                number: "02",
                title: "Materialien und Gestaltung abstimmen",
                description:
                  "Format, Oberfläche und Übergänge werden gemeinsam eingeordnet.",
              },
              {
                number: "03",
                title: "Angrenzende Arbeiten koordinieren",
                description:
                  "Türen, Wände und weitere Maßnahmen bleiben im Blick.",
              },
              {
                number: "04",
                title: "Umsetzung begleiten",
                description:
                  "Sie haben einen festen Ansprechpartner während des Projekts.",
              },
            ].map((step, index) => (
              <Reveal key={step.number} delayMs={index * 40}>
                <li className="border-t border-line pt-6">
                  <span className="text-sm font-medium tracking-[0.1em] text-clay">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {references.length > 0 && (
        <section
          aria-labelledby="referenzen-heading"
          className="border-t border-line bg-paper-dim py-20 sm:py-28"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <h2
                id="referenzen-heading"
                className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
              >
                Projekte, in denen Boden und Fliesen sichtbar mitwirken
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Keine eigenständigen „Boden-only“-Referenzen – sondern echte
                Projekte, in denen Flächen klar erkennbar eine Rolle spielen.
              </p>
            </Reveal>
            <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2">
              {references.map((reference, index) => {
                if (!reference) return null;
                const cover = getReferenceCover(reference);
                return (
                  <li key={reference.slug}>
                    <Reveal delayMs={index * 35}>
                      <Link
                        href={`/referenzen/${reference.slug}`}
                        className="group block outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper-dim"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-greige">
                          <Image
                            src={cover.src}
                            alt={cover.alt}
                            fill
                            sizes="(min-width: 640px) 40vw, calc(100vw - 3rem)"
                            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.01]"
                            style={{
                              objectPosition:
                                cover.objectPosition ?? "center center",
                            }}
                          />
                        </div>
                        <p className="mt-4 text-sm font-medium tracking-[0.1em] text-clay uppercase">
                          {reference.category}
                        </p>
                        <h3 className="mt-2 text-xl font-medium text-ink transition-colors group-hover:text-ink-soft">
                          {reference.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
                          {getReferenceTeaser(reference)}
                        </p>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <section
        aria-labelledby="verknuepft-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="verknuepft-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Verknüpfte Leistungen
            </h2>
          </Reveal>
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delayMs={index * 35}>
                  <Link
                    href={service.href}
                    className="group block border-t border-line pt-6 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                  >
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-ink-soft">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10">
            <Link
              href="/leistungen"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              Zur Leistungsübersicht
            </Link>
          </Reveal>
        </Container>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="faq-heading"
                className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
              >
                Häufige Fragen
              </h2>
            </Reveal>
            <div className="divide-y divide-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-3 first:pt-0">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 py-2 text-lg font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-sage">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl leading-none text-clay transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Lassen Sie uns Ihre Flächen gemeinsam betrachten.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Schildern Sie Ihr Vorhaben. Wir ordnen den nächsten Schritt
              persönlich ein.
            </p>
            <div className="mt-10">
              <Link
                href={BODEN_FLIESEN_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Bodenprojekt starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
