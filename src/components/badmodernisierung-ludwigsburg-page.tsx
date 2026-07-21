import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { RegionalCitiesNav } from "@/components/regional-cities-nav";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { BAD_MODERNIZATION_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";
import { REGIONAL_PATHS } from "@/lib/service-regions";

const situations = [
  {
    title: "Das Bad soll zeitgemäß wirken",
    description:
      "Oberflächen, Sanitär und Licht passen nicht mehr zu Ihrem Alltag – Sie möchten einen klaren, ruhigen Gesamteindruck.",
  },
  {
    title: "Funktion und Nutzung sollen besser greifen",
    description:
      "Dusche, Waschplatz oder Stauraum sollen praktischer werden, ohne dass Entscheidungen isoliert getroffen werden.",
  },
  {
    title: "Mehrere Arbeiten gehören zusammen",
    description:
      "Fliesen, Sanitär und Elektrik greifen ineinander. Eine gemeinsame Abstimmung hält den Ablauf übersichtlich.",
  },
  {
    title: "Vor Einzug oder neuer Nutzung",
    description:
      "Das Bad soll vor einer neuen Phase im Haushalt modernisiert werden – mit verständlichen nächsten Schritten.",
  },
];

const coordinationTopics = [
  "gewünschte Nutzung im Alltag",
  "Raumaufteilung und Bewegungsflächen",
  "Sanitärobjekte",
  "Fliesen und Oberflächen",
  "Beleuchtung und Elektrik",
  "Waschplatz und Stauraum",
  "Dusche beziehungsweise Badewanne",
  "zeitliche Abstimmung der Arbeiten",
];

const processSteps = [
  {
    number: "01",
    title: "Vorhaben schildern",
    description:
      "Sie beschreiben, was sich im Bad verändern soll und was Ihnen wichtig ist.",
  },
  {
    number: "02",
    title: "Wünsche und Ausgangssituation abstimmen",
    description:
      "Gemeinsam ordnen wir den Umfang ein und klären offene Punkte.",
  },
  {
    number: "03",
    title: "Nächste Schritte koordinieren",
    description:
      "Leistungen und Reihenfolge werden passend zum Projekt abgestimmt.",
  },
  {
    number: "04",
    title: "Persönlich begleitet bleiben",
    description:
      "Während des Projekts haben Sie einen festen Ansprechpartner bei RENOMA.",
  },
];

const relatedServices = [
  {
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description: "Zur allgemeinen Leistungsseite mit Ablauf und Details.",
  },
  {
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description: "Flächen und Materialwirkung mit dem Bad abstimmen.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Licht und Anschlüsse in den Ablauf einbinden.",
  },
  {
    href: REGIONAL_PATHS.komplett.ludwigsburg,
    title: "Komplettsanierung in Ludwigsburg",
    description: "Wenn das Bad Teil eines größeren Vorhabens ist.",
  },
  {
    href: REGIONAL_PATHS.einsatzgebiet,
    title: "Einsatzgebiet",
    description: "Überblick über die Regionen, in denen RENOMA Projekte begleitet.",
  },
];

const faqs = [
  {
    question: "Begleitet RENOMA Badmodernisierungen in Ludwigsburg?",
    answer:
      "Ja. RENOMA begleitet Badprojekte in Ludwigsburg persönlich – von der ersten Einordnung bis zur koordinierten Umsetzung.",
  },
  {
    question:
      "Können mehrere Arbeiten im Badezimmer miteinander abgestimmt werden?",
    answer:
      "Ja. Gerade Sanitär, Oberflächen und Elektrik sollten gemeinsam betrachtet werden, damit Reihenfolge und Details zusammenpassen.",
  },
  {
    question: "Ist auch eine teilweise Modernisierung möglich?",
    answer:
      "Ja. Nicht jedes Bad muss vollständig erneuert werden. Der Umfang ergibt sich aus Zustand, Wunsch und sinnvoller Abstimmung.",
  },
  {
    question: "Kann ich Bilder meines aktuellen Badezimmers hochladen?",
    answer:
      "Ja. Über den Projektassistenten können Sie Bilder und vorhandene Unterlagen mitschicken.",
  },
  {
    question: "Wie beginnt die Planung?",
    answer:
      "Über den Projektassistenten schildern Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
  {
    question: "Wie wird geprüft, ob mein Wohnort zum Einsatzgebiet gehört?",
    answer:
      "Ob Ihr Projekt innerhalb unseres Einsatzgebiets liegt, klären wir direkt im ersten Austausch – ohne automatische Zusagen aus der Ferne.",
  },
  {
    question: "Gibt es eine Niederlassung in Ludwigsburg?",
    answer:
      "Nein. RENOMA begleitet Projekte beim Kunden vor Ort – ohne lokales Büro oder Niederlassung zu behaupten.",
  },
];

const REFERENCE_SLUG = "badezimmer-detailmodernisierung";

export function BadmodernisierungLudwigsburgPage() {
  const reference = getPublishedReferenceBySlug(REFERENCE_SLUG);
  const cover = reference ? getReferenceCover(reference) : null;
  const teaser = reference ? getReferenceTeaser(reference) : null;

  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              {
                label: "Badmodernisierung",
                href: "/leistungen/badmodernisierung",
              },
              { label: "Ludwigsburg" },
            ]}
          />
          <div className="mt-8 grid items-center gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-[0.18em] text-clay uppercase">
                Badmodernisierung in Ludwigsburg
              </p>
              <h1 className="mt-5 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Badmodernisierung in Ludwigsburg – persönlich begleitet.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Sie möchten Ihr Badezimmer modernisieren und wünschen sich einen
                klaren Ablauf mit einer festen Ansprechperson? RENOMA begleitet
                Badprojekte in Ludwigsburg persönlich – von den ersten
                Vorstellungen bis zur abgestimmten Umsetzung.
              </p>
              <p className="mt-5 text-sm font-medium tracking-[0.06em] text-muted">
                Persönlich begleitet · klar abgestimmt · feste Ansprechperson
              </p>
              <div className="mt-9 flex flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                  <Link
                    href={BAD_MODERNIZATION_FUNNEL_HREF}
                    className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                  >
                    Badprojekt starten
                  </Link>
                  <Link
                    href="/leistungen/badmodernisierung"
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Mehr über Badmodernisierung
                  </Link>
                </div>
                <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                  Sie schildern zunächst nur Ihr Vorhaben. Die nächsten Schritte
                  besprechen wir persönlich.
                </p>
              </div>
            </div>

            {cover && (
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-greige lg:rounded-[1.75rem]">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 80vw, 100vw"
                  className="object-cover"
                  style={{
                    objectPosition: cover.objectPosition ?? "center center",
                  }}
                />
              </div>
            )}
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="situationen-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="situationen-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Typische Ausgangssituationen
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Jedes Badprojekt ist anders. Häufig geht es darum, Gestaltung und
              Nutzung wieder in Einklang zu bringen.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {situations.map((item, index) => (
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
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="abstimmung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Was bei einer Badmodernisierung abgestimmt wird
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ohne Ferndiagnose: Die folgenden Punkte werden im konkreten
              Projekt gemeinsam betrachtet.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {coordinationTopics.map((item, index) => (
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
        aria-labelledby="begleitung-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="begleitung-heading"
                className="text-display-2 text-balance text-ink"
              >
                Persönlich begleitet in Ludwigsburg
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl space-y-5 lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA begleitet Badprojekte in Ludwigsburg persönlich – vom
                ersten Austausch bis zur koordinierten Umsetzung. Zuerst nehmen
                wir Ihre Wünsche und die vorhandene Situation auf und stimmen
                die nächsten Schritte mit Ihnen ab.
              </p>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Während des Projekts bleibt eine feste Ansprechperson. Ob Ihr
                konkretes Vorhaben angenommen wird, prüfen wir individuell im
                ersten Gespräch.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="einsatzgebiet-heading"
        className="py-20 sm:py-28"
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
              Ob Ihr Projekt in Ludwigsburg liegt, klären wir im ersten
              Austausch.
            </p>
            <p className="mt-4">
              <Link
                href={REGIONAL_PATHS.einsatzgebiet}
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                Einsatzgebiet ansehen
              </Link>
            </p>
          </Reveal>
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
              So begleiten wir Ihr Badprojekt
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

      {reference && cover && (
        <section
          aria-labelledby="referenz-heading"
          className="border-t border-line py-20 sm:py-28"
        >
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-greige">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, (min-width: 640px) 80vw, 100vw"
                    className="object-cover"
                    style={{
                      objectPosition: cover.objectPosition ?? "center center",
                    }}
                  />
                </div>
              </Reveal>
              <Reveal delayMs={50} className="lg:pt-4">
                <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
                  Einblick in ein umgesetztes Badezimmerprojekt
                </p>
                <h2
                  id="referenz-heading"
                  className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
                >
                  {reference.title}
                </h2>
                {teaser && (
                  <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                    {teaser}
                  </p>
                )}
                <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted">
                  Der Ort dieses Projekts ist hier nicht als Ludwigsburg
                  ausgewiesen – der Einblick zeigt die Qualität der Umsetzung.
                </p>
                <div className="mt-9">
                  <Link
                    href={`/referenzen/${reference.slug}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-7 py-3 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Projekt ansehen
                  </Link>
                </div>
              </Reveal>
            </div>
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
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delayMs={index * 35}>
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
        context="bad"
        currentPath="/leistungen/badmodernisierung/ludwigsburg"
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Ihr neues Bad beginnt mit einer einfachen Anfrage.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Zeigen Sie uns, was Sie verändern möchten. Wir melden uns
              persönlich und besprechen die nächsten Schritte.
            </p>
            <p className="mt-5 text-sm font-medium tracking-[0.06em] text-muted">
              Persönlich begleitet · klar abgestimmt · feste Ansprechperson
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={BAD_MODERNIZATION_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Badprojekt starten
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
