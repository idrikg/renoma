import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { FASSADE_AUSSEN_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";

const occasions = [
  {
    title: "Fassade wirkt verwittert oder nicht mehr zeitgemäß",
    description:
      "Oberflächen, Farbe oder der Gesamteindruck sollen den Charakter des Hauses klarer und ruhiger zeigen.",
  },
  {
    title: "Eingang und Außenflächen sollen neu gestaltet werden",
    description:
      "Zugang, Wege oder Terrasse sollen besser zur Nutzung und zum Gebäude passen.",
  },
  {
    title: "Fenster, Türen und Fassade sollen zusammenwirken",
    description:
      "Anschlüsse, Farben und Reihenfolge werden gemeinsam betrachtet – nicht isoliert.",
  },
  {
    title: "Mehrere Außenmaßnahmen brauchen Koordination",
    description:
      "Wenn Fassade, Zugang und befestigte Flächen zusammenhängen, hilft ein abgestimmter Ablauf.",
  },
];

const facadeTopics = [
  "Gestaltung und Farbwirkung",
  "Oberflächen und Anschlussbereiche",
  "Zusammenhang mit Fenstern und Türen",
  "mögliche energetische Maßnahmen nur als prüfungsbedürftiges Thema",
];

const outdoorTopics = [
  "Hauszugang und Stufen",
  "Wege und Übergänge",
  "Terrassen und befestigte Flächen",
  "Material- und Farbkonzept",
  "Nutzung und Pflege im Alltag",
];

const relatedServices = [
  {
    href: "/leistungen/fenster-tueren",
    title: "Fenster & Türen",
    description: "Anschlüsse und Gestaltung mit der Fassade abstimmen.",
  },
  {
    href: "/leistungen/komplettsanierung",
    title: "Komplettsanierung",
    description: "Außenmaßnahmen im Gesamtvorhaben einordnen.",
  },
  {
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description: "Innenflächen klar vom Außenbereich trennen.",
  },
];

const faqs = [
  {
    question:
      "Welche Bereiche können bei einer Außenmodernisierung berücksichtigt werden?",
    answer:
      "Je nach Vorhaben Fassade, Eingang, Wege, Terrassen und weitere befestigte Außenflächen. Der konkrete Zuschnitt entsteht aus Gebäude und Ihren Zielen.",
  },
  {
    question: "Können Fassade, Fenster und Türen gemeinsam abgestimmt werden?",
    answer:
      "Ja. Gerade Anschlüsse, Farben und die zeitliche Reihenfolge sollten zusammen betrachtet werden.",
  },
  {
    question:
      "Können auch Eingang, Wege oder Terrasse Teil des Projekts sein?",
    answer:
      "Ja, sofern sie zum Vorhaben gehören. Sie werden klar vom Innenausbau getrennt geplant.",
  },
  {
    question: "Wie wird der bestehende Zustand beurteilt?",
    answer:
      "Immer projektbezogen und vor Ort durch geeignete Fachleute. Aus der Ferne gibt es keine bauphysikalischen oder Abdichtungsdiagnosen.",
  },
  {
    question: "Sind energetische Maßnahmen oder Förderungen möglich?",
    answer:
      "Ob und welche energetischen Maßnahmen sinnvoll oder förderfähig sind, muss projektbezogen geprüft werden. Pauschale Einspar- oder Förderversprechen gibt es nicht.",
  },
  {
    question: "Wie beginnt eine Anfrage für den Außenbereich?",
    answer:
      "Über den Projektassistenten beschreiben Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und begleitet die nächsten Schritte.",
  },
];

export function FassadeAussenbereichPage() {
  const facadeReference = getPublishedReferenceBySlug("fassade-01");
  const cover = facadeReference ? getReferenceCover(facadeReference) : null;

  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Fassade & Außenbereich" },
            ]}
          />
          <div className="mt-8 grid items-center gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-[0.18em] text-clay uppercase">
                Fassade &amp; Außenbereich
              </p>
              <h1 className="mt-5 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Fassade und Außenbereich – der erste Eindruck Ihres Zuhauses.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Fassade, Eingang und Außenflächen prägen den Charakter einer
                Immobilie. RENOMA begleitet die Modernisierung und sorgt dafür,
                dass Gestaltung und einzelne Maßnahmen sinnvoll zusammenpassen.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                <Link
                  href={FASSADE_AUSSEN_FUNNEL_HREF}
                  className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                >
                  Außenprojekt starten
                </Link>
                <Link
                  href="/leistungen"
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Alle Leistungen
                </Link>
              </div>
            </div>

            {cover && facadeReference && (
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
        aria-labelledby="anlaesse-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="anlaesse-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Mögliche Anlässe
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {occasions.map((item, index) => (
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
        aria-labelledby="fassade-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="fassade-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Fassade
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ob und welche energetischen Maßnahmen sinnvoll oder förderfähig
              sind, muss projektbezogen geprüft werden. Pauschale Einsparungen
              oder Förderzusagen gibt es nicht.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {facadeTopics.map((item, index) => (
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
        aria-labelledby="aussen-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="aussen-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Eingang, Wege und Außenflächen
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {outdoorTopics.map((item, index) => (
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
        aria-labelledby="fenster-heading"
        className="py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="fenster-heading"
                className="text-display-2 text-balance text-ink"
              >
                Abstimmung mit Fenstern und Türen
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Farben, Anschlüsse und die Reihenfolge der Arbeiten sollten
                gemeinsam betrachtet werden. Details dazu finden Sie unter{" "}
                <Link
                  href="/leistungen/fenster-tueren"
                  className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Fenster &amp; Türen
                </Link>
                .
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
            {[
              {
                number: "01",
                title: "Zustand und Wünsche aufnehmen",
                description:
                  "Sie beschreiben Fassade, Zugang und die gewünschte Wirkung.",
              },
              {
                number: "02",
                title: "Bereiche und Zusammenhänge abstimmen",
                description:
                  "Maßnahmen, Anschlüsse und Reihenfolge werden eingeordnet.",
              },
              {
                number: "03",
                title: "Geeignete Umsetzung koordinieren",
                description:
                  "RENOMA stimmt mit geeigneten Fachbetrieben ab und hält den Überblick.",
              },
              {
                number: "04",
                title: "Projekt persönlich begleiten",
                description:
                  "Sie haben einen festen Ansprechpartner während des Vorhabens.",
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

      {facadeReference && cover && (
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
                  Referenzprojekt
                </p>
                <h2
                  id="referenz-heading"
                  className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
                >
                  {facadeReference.title}
                </h2>
                <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {getReferenceTeaser(facadeReference)}
                </p>
                <div className="mt-9">
                  <Link
                    href={`/referenzen/${facadeReference.slug}`}
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
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-3">
            {relatedServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delayMs={index * 35}>
                  <Link
                    href={service.href}
                    className="group block border-t border-line pt-6 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper-dim"
                  >
                    <h3 className="text-xl font-medium text-ink transition-colors group-hover:text-ink-soft">
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

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Zeigen Sie uns, was sich außen verändern soll.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Erzählen Sie von Fassade, Eingang oder Außenflächen. Wir begleiten
              die nächsten Schritte persönlich.
            </p>
            <div className="mt-10">
              <Link
                href={FASSADE_AUSSEN_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Außenprojekt starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
