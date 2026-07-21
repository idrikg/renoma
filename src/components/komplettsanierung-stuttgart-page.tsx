import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { RegionalCitiesNav } from "@/components/regional-cities-nav";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { KOMPLETTSANIERUNG_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";
import { REGIONAL_PATHS } from "@/lib/service-regions";

const projectTriggers = [
  {
    title: "Mehrere Räume sollen zeitgleich modernisiert werden",
    description:
      "Wohnen, Bad, Küche oder Flur greifen ineinander – Einzelentscheidungen reichen dann nicht mehr aus.",
  },
  {
    title: "Technik und Oberflächen hängen zusammen",
    description:
      "Elektrik, Böden, Fenster und Sanitär beeinflussen sich gegenseitig und brauchen eine gemeinsame Reihenfolge.",
  },
  {
    title: "Bestehende Einzelmaßnahmen sollen verbunden werden",
    description:
      "Was zunächst getrennt geplant war, soll zu einem nachvollziehbaren Gesamtvorhaben zusammengeführt werden.",
  },
  {
    title: "Vor Einzug alles auf den neuesten Stand",
    description:
      "Eine Immobilie soll vor dem Einzug klar und nutzbar modernisiert werden – mit abgestimmtem Gesamtbild.",
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

const dependencyTopics = [
  {
    title: "Rohinstallation vor Oberflächen",
    description:
      "Elektrik, Sanitär und Leitungen sollten abgeschlossen sein, bevor Fliesen, Böden oder Anstriche folgen.",
  },
  {
    title: "Fenster und Türen im Gesamtkontext",
    description:
      "Maße, Anschlüsse und Dämmung beeinflussen angrenzende Innenarbeiten und deren Reihenfolge.",
  },
  {
    title: "Feuchte und trockene Bereiche trennen",
    description:
      "Bad und Küche haben andere Anforderungen als Wohnräume – das spiegelt sich in der Abfolge wider.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Ausgangslage schildern",
    description:
      "Sie beschreiben Immobilie, gewünschte Veränderungen und was Ihnen wichtig ist.",
  },
  {
    number: "02",
    title: "Maßnahmen zusammenführen",
    description:
      "Gemeinsam ordnen wir Bereiche und den möglichen Umfang in ein Gesamtbild ein.",
  },
  {
    number: "03",
    title: "Abhängigkeiten klären",
    description:
      "Reihenfolge und Zusammenhänge werden sichtbar gemacht und priorisiert.",
  },
  {
    number: "04",
    title: "Koordiniert umsetzen",
    description:
      "RENOMA hält den Überblick und bleibt während des Projekts Ihr fester Ansprechpartner.",
  },
];

const relatedServices = [
  {
    href: REGIONAL_PATHS.bad.stuttgart,
    title: "Badmodernisierung in Stuttgart",
    description: "Badprojekte im gleichen Einsatzgebiet.",
  },
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
    href: REGIONAL_PATHS.einsatzgebiet,
    title: "Einsatzgebiet",
    description: "Wo RENOMA Projekte begleitet.",
  },
];

const faqs = [
  {
    question: "Begleitet RENOMA Komplettsanierungen in Stuttgart?",
    answer:
      "Ja. Stuttgart gehört zu unseren bestätigten Einsatzgebieten. RENOMA begleitet Gesamtvorhaben dort mit klarer Koordination und einem festen Ansprechpartner.",
  },
  {
    question: "Wann wird aus Einzelmaßnahmen ein Gesamtprojekt?",
    answer:
      "Wenn mehrere Bereiche gleichzeitig oder in enger Abfolge modernisiert werden sollen und Entscheidungen in einem Bereich die anderen beeinflussen.",
  },
  {
    question: "Welche Leistungsbereiche können zusammenkommen?",
    answer:
      "Je nach Vorhaben Innenräume, Bad, Böden, Elektrik, Fenster und Türen sowie gegebenenfalls Außenmaßnahmen. Der Zuschnitt entsteht aus Ihrer Immobilie und Ihren Zielen.",
  },
  {
    question: "Wie wird die Reihenfolge der Arbeiten festgelegt?",
    answer:
      "Gemeinsam anhand der Abhängigkeiten zwischen den Bereichen – ohne pauschale Bauzeit- oder Preiszusagen.",
  },
  {
    question: "Kann ich schrittweise vorgehen?",
    answer:
      "Oft ja. Manche Projekte starten mit einem klaren ersten Abschnitt und werden später erweitert – solange der Einstieg zum Gesamtkontext passt.",
  },
  {
    question: "Gibt es eine Niederlassung in Stuttgart?",
    answer:
      "Nein. RENOMA begleitet Projekte beim Kunden vor Ort – ohne lokales Büro oder Niederlassung zu behaupten.",
  },
  {
    question: "Wie übermittle ich Informationen zur Immobilie?",
    answer:
      "Über den Projektassistenten können Sie Bilder und vorhandene Angaben mitschicken. RENOMA prüft alles persönlich.",
  },
];

/** Real projects showing modernized areas — not labeled as full renovations. */
const INSIGHT_SLUGS = ["kueche-01", "fassade-01", "wc-01"] as const;

export function KomplettsanierungStuttgartPage() {
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
              { label: "Stuttgart" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Komplettsanierung in Ihrer Region
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Komplettsanierung in Stuttgart – strukturiert begleitet.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Wenn mehrere Bereiche einer Immobilie modernisiert werden sollen,
            müssen Entscheidungen, Reihenfolge und beteiligte Arbeiten
            zusammenpassen. RENOMA begleitet Ihr Sanierungsprojekt in Stuttgart
            mit einer festen Ansprechperson.
          </p>
          <p className="mt-5 text-sm font-medium tracking-[0.06em] text-muted">
            Persönlich begleitet · klar abgestimmt · feste Ansprechperson
          </p>
          <div className="mt-9 flex flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
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
            <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted">
              Sie schildern zunächst nur Ihr Vorhaben. Die nächsten Schritte
              besprechen wir persönlich.
            </p>
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="gesamtprojekt-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="gesamtprojekt-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Wann aus Einzelmaßnahmen ein Gesamtprojekt wird
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Keine baurechtliche Beratung – sondern eine Einordnung, wann
              Abstimmung mehrerer Bereiche sinnvoll ist.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {projectTriggers.map((item, index) => (
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
              Mögliche Leistungsbereiche
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Je nach Immobilie und Zielsetzung können unterschiedliche Bereiche
              zusammenkommen – auch Maler- und Oberflächenarbeiten im Ablauf.
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
        aria-labelledby="abhaengigkeiten-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="abhaengigkeiten-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Reihenfolge und Abhängigkeiten
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Der Mehrwert liegt in Klarheit: Welche Arbeit muss vor welcher
              folgen, damit das Gesamtprojekt stimmig bleibt.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {dependencyTopics.map((item, index) => (
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
                Persönliche Begleitung in Stuttgart
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl space-y-5 lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA begleitet Sanierungsprojekte in Stuttgart persönlich –
                vom ersten Austausch bis zur koordinierten Umsetzung. Eine feste
                Ansprechperson hält den Überblick über die beteiligten Maßnahmen.
              </p>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Der Erstkontakt erfolgt über den Projektassistenten. Ob Ihr
                Vorhaben angenommen wird, prüfen wir individuell – ohne
                erfundene Niederlassung vor Ort.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ablauf-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28 lg:py-32"
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
          className="border-t border-line py-20 sm:py-28"
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
                        className="group block outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
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
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
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
                <Reveal delayMs={index * 30}>
                  <Link
                    href={service.href}
                    className="group block border-t border-line pt-6 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper-dim"
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
        </Container>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="border-t border-line py-20 sm:py-28"
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

      <RegionalCitiesNav
        context="komplett"
        currentPath="/leistungen/komplettsanierung/stuttgart"
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Struktur für Ihr Sanierungsprojekt in Stuttgart.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Beschreiben Sie uns Ihre Ausgangssituation – RENOMA bespricht mit
              Ihnen die nächsten sinnvollen Schritte persönlich.
            </p>
            <p className="mt-5 text-sm font-medium tracking-[0.06em] text-muted">
              Persönlich begleitet · klar abgestimmt · feste Ansprechperson
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={KOMPLETTSANIERUNG_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Sanierungsprojekt starten
              </Link>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                Sie schildern zunächst nur Ihr Vorhaben. Die nächsten Schritte
                besprechen wir persönlich.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
