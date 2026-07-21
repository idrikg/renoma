import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { KOMPLETTSANIERUNG_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";

const whenMakesSense = [
  {
    title: "Mehrere Räume sollen modernisiert werden",
    description:
      "Wohnen, Bad, Küche oder Flur greifen ineinander – Einzelentscheidungen reichen dann oft nicht aus.",
  },
  {
    title: "Technik und Oberflächen hängen zusammen",
    description:
      "Elektrik, Böden, Fenster, Türen und Oberflächen beeinflussen sich gegenseitig und brauchen eine gemeinsame Reihenfolge.",
  },
  {
    title: "Vor Einzug umfassend überarbeiten",
    description:
      "Eine Immobilie soll vor dem Einzug klar und nutzbar modernisiert werden – mit abgestimmtem Gesamtbild.",
  },
  {
    title: "Einzelmaßnahmen zum Gesamtprojekt verbinden",
    description:
      "Was zunächst getrennt wirkt, soll zu einem nachvollziehbaren Vorhaben zusammengeführt werden.",
  },
];

const combinedAreas = [
  {
    href: "/leistungen/innenrenovierung",
    title: "Innenrenovierung",
    description: "Räume, Oberflächen und Ausbau im Gesamtvorhaben.",
  },
  {
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description: "Sanitär und Badgestaltung als Teil der Sanierung.",
  },
  {
    href: "/leistungen/boden-fliesen",
    title: "Böden und Fliesen",
    description: "Material und Verlegung mit angrenzenden Arbeiten.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Anschlüsse und Beleuchtung im Ablauf abstimmen.",
  },
  {
    href: "/leistungen/fenster-tueren",
    title: "Fenster und Türen",
    description: "Austausch und Anschlüsse mit dem Gesamtprojekt.",
  },
  {
    href: "/leistungen/fassade-aussenbereich",
    title: "Fassade und Außenbereich",
    description: "Außenmaßnahmen, sofern sie zum Vorhaben gehören.",
  },
];

const coordinationBenefits = [
  {
    title: "Zusammenhänge früh erkennen",
    description:
      "Abhängigkeiten zwischen Bereichen werden sichtbar, bevor Einzelentscheidungen feststehen.",
  },
  {
    title: "Sinnvolle Reihenfolge abstimmen",
    description:
      "Arbeiten folgen einer nachvollziehbaren Abfolge statt isolierter Einzelaufträge.",
  },
  {
    title: "Einen Ansprechpartner behalten",
    description:
      "Änderungen und nächste Schritte bleiben während des Projekts klar zuordenbar.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Ausgangssituation erfassen",
    description:
      "Sie schildern Immobilie, gewünschte Veränderungen und Prioritäten.",
  },
  {
    number: "02",
    title: "Maßnahmen strukturieren",
    description:
      "Gemeinsam ordnen wir Bereiche und den möglichen Umfang ein.",
  },
  {
    number: "03",
    title: "Zusammenhänge und Reihenfolge abstimmen",
    description:
      "Abhängigkeiten werden sichtbar gemacht und priorisiert.",
  },
  {
    number: "04",
    title: "Umsetzung koordinieren und begleiten",
    description:
      "RENOMA hält den Überblick und bleibt Ihr fester Ansprechpartner.",
  },
];

const relatedServices = [
  {
    href: "/leistungen/komplettsanierung",
    title: "Komplettsanierung",
    description: "Zur allgemeinen Leistungsseite.",
  },
  {
    href: "/leistungen/innenrenovierung",
    title: "Innenrenovierung",
    description: "Innenräume im Gesamtvorhaben.",
  },
  {
    href: "/leistungen/badmodernisierung/ludwigsburg",
    title: "Badmodernisierung in der Region",
    description: "Badprojekte im gleichen Einsatzgebiet.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Anschlüsse und Lichtführung.",
  },
  {
    href: "/leistungen/fenster-tueren",
    title: "Fenster & Türen",
    description: "Austausch und Modernisierung.",
  },
  {
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description: "Flächen im Sanierungsablauf.",
  },
  {
    href: "/leistungen/fassade-aussenbereich",
    title: "Fassade & Außenbereich",
    description: "Außenmaßnahmen bei Bedarf.",
  },
];

const faqs = [
  {
    question: "Begleitet RENOMA Komplettsanierungen in Ludwigsburg?",
    answer:
      "Ja. RENOMA begleitet Gesamtvorhaben in diesem Einsatzgebiet – mit klarer Koordination und einem festen Ansprechpartner.",
  },
  {
    question: "Ist eine Projektbegleitung auch in Remseck möglich?",
    answer:
      "Ja. Remseck am Neckar gehört zum genannten Einsatzgebiet. Die konkrete Annahme prüfen wir im ersten Gespräch.",
  },
  {
    question: "Was kann zu einer Komplettsanierung gehören?",
    answer:
      "Je nach Vorhaben Innenräume, Bad, Böden, Elektrik, Fenster und Türen sowie gegebenenfalls Außenmaßnahmen. Der Zuschnitt entsteht aus Ihrer Immobilie und Ihren Zielen.",
  },
  {
    question: "Können einzelne Leistungen schrittweise umgesetzt werden?",
    answer:
      "Oft ja. Manche Projekte starten mit einem klaren ersten Schritt und werden später erweitert – solange der Einstieg zum Gesamtkontext passt.",
  },
  {
    question: "Wie wird die Reihenfolge der Arbeiten abgestimmt?",
    answer:
      "Gemeinsam anhand der Abhängigkeiten zwischen den Bereichen. Pauschale Bauzeit- oder Preiszusagen gibt es nicht.",
  },
  {
    question: "Kann ich Bilder und Informationen zur Immobilie übermitteln?",
    answer:
      "Ja. Über den Projektassistenten können Sie Bilder und vorhandene Angaben mitschicken.",
  },
  {
    question: "Wie wird das Einsatzgebiet geprüft?",
    answer:
      "Ob Ihr Projekt innerhalb unseres Einsatzgebiets liegt, klären wir direkt im ersten Austausch.",
  },
];

/** Real projects showing modernized areas — not labeled as full renovations. */
const INSIGHT_SLUGS = [
  "badezimmer-detailmodernisierung",
  "kueche-01",
  "fassade-01",
] as const;

export function KomplettsanierungLudwigsburgPage() {
  const insights = INSIGHT_SLUGS.map((slug) =>
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
              {
                label: "Komplettsanierung",
                href: "/leistungen/komplettsanierung",
              },
              { label: "Ludwigsburg & Remseck" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Komplettsanierung in Ihrer Region
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Komplettsanierung in Ludwigsburg, Remseck und Umgebung.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Wenn mehrere Bereiche einer Immobilie modernisiert werden sollen,
            müssen Entscheidungen, Reihenfolge und beteiligte Arbeiten sinnvoll
            zusammenpassen. RENOMA begleitet Komplettsanierungen in Ludwigsburg,
            Remseck am Neckar und der angrenzenden Umgebung mit einer festen
            Ansprechperson.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={KOMPLETTSANIERUNG_FUNNEL_HREF}
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Sanierungsprojekt starten
            </Link>
            <Link
              href="/leistungen/komplettsanierung"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              Mehr über Komplettsanierungen
            </Link>
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="wann-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="wann-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Wann eine Komplettsanierung sinnvoll sein kann
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Keine baurechtliche oder wirtschaftliche Beratung – sondern eine
              Einordnung, wann Abstimmung mehrerer Bereiche hilft.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {whenMakesSense.map((item, index) => (
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
        aria-labelledby="bereiche-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="bereiche-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Welche Bereiche zusammenkommen können
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Auch Maler- und Oberflächenarbeiten können Teil des Vorhabens sein
              – sie werden im Projektablauf mit den übrigen Maßnahmen
              abgestimmt.
            </p>
          </Reveal>
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {combinedAreas.map((area, index) => (
              <li key={area.href}>
                <Reveal delayMs={index * 30}>
                  <Link
                    href={area.href}
                    className="group block border-t border-line pt-6 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper-dim"
                  >
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-ink-soft">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {area.description}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="koordination-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="koordination-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Koordination statt Einzelentscheidungen
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ohne Garantie für Bauzeit, Preis oder vollständige
              Störungsfreiheit: Der Mehrwert liegt in Klarheit und Abstimmung.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {coordinationBenefits.map((item, index) => (
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
        aria-labelledby="begleitung-heading"
        className="py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="begleitung-heading"
                className="text-display-2 text-balance text-ink"
              >
                Persönliche Begleitung vor Ort
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl space-y-5 lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ludwigsburg und Remseck am Neckar sind Teil unseres
                Einsatzgebiets – keine erfundene Niederlassung. Ob wir Ihr
                Vorhaben annehmen, prüfen wir individuell.
              </p>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Der Erstkontakt erfolgt über den Projektassistenten. Ort und
                PLZ geben Sie dort wie gewohnt an.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="einsatzgebiet-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="einsatzgebiet-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Einsatzgebiet
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ludwigsburg, Remseck am Neckar und angrenzende Umgebung nach
              projektbezogener Prüfung. Ob Ihr Projekt innerhalb unseres
              Einsatzgebiets liegt, klären wir direkt im ersten Austausch.
            </p>
          </Reveal>
        </Container>
      </section>

      <section
        aria-labelledby="ablauf-heading"
        className="border-t border-line py-20 sm:py-28 lg:py-32"
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
            {processSteps.map((step, index) => (
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

      {insights.length > 0 && (
        <section
          aria-labelledby="einblicke-heading"
          className="border-t border-line bg-paper-dim py-20 sm:py-28"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <h2
                id="einblicke-heading"
                className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
              >
                Einblicke in modernisierte Bereiche
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Echte RENOMA-Referenzen aus unterschiedlichen Bereichen – nicht
                als vollständige Komplettsanierungen ausgewiesen und ohne
                lokale Ortszuordnung.
              </p>
            </Reveal>
            <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((reference, index) => {
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
                            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 40vw, calc(100vw - 3rem)"
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
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delayMs={index * 30}>
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
              Bringen Sie Struktur in Ihr Sanierungsprojekt.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Schildern Sie uns Ihre Ausgangssituation. RENOMA bespricht mit
              Ihnen die nächsten sinnvollen Schritte.
            </p>
            <div className="mt-10">
              <Link
                href={KOMPLETTSANIERUNG_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Sanierungsprojekt starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
