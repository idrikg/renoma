import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { BAD_MODERNIZATION_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";
import { REGIONAL_PATHS } from "@/lib/service-regions";

const scopeOptions = [
  {
    title: "Gezielte Teilsanierung",
    description:
      "Einzelne Elemente wie Waschbecken, Armaturen oder Fliesenbereiche sollen erneuert werden – der Rest bleibt vorerst unverändert.",
  },
  {
    title: "Umfassende Neugestaltung",
    description:
      "Raum, Sanitär und Oberflächen sollen grundlegend modernisiert werden – mit abgestimmtem Gesamtbild.",
  },
  {
    title: "Funktion vor Optik",
    description:
      "Der Fokus liegt auf besserer Nutzung: mehr Stauraum, barrierefreierer Zugang oder praktischere Anordnung.",
  },
  {
    title: "Gestaltung vor Funktion",
    description:
      "Materialien, Farben und Lichtführung sollen einen klareren, zeitgemäßeren Eindruck schaffen.",
  },
];

const layoutTopics = [
  "Dusche versus Badewanne – oder beides",
  "Waschplatz und Spiegelzone",
  "Bewegungsflächen bei kleinen Bädern",
  "Türanschlag und Öffnungsrichtung",
  "Stauraum und Einbauschränke",
  "Gäste-WC versus Hauptbad",
  "Morgenroutine und Beleuchtung",
  "Barrierefreiheit und Komfort",
];

const surfaceTopics = [
  {
    title: "Fliesen und Wandoberflächen",
    description:
      "Format, Farbe und Verlegemuster prägen den Raumeindruck und sollten mit Sanitär und Licht abgestimmt werden.",
  },
  {
    title: "Sanitärobjekte und Armaturen",
    description:
      "WC, Waschbecken, Dusche und Armaturen beeinflussen Anschlüsse, Höhen und die tägliche Nutzung.",
  },
  {
    title: "Beleuchtung und Elektrik",
    description:
      "Spiegellicht, indirekte Beleuchtung und Steckdosen gehören früh in die Planung – nicht erst am Ende.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Ausgangssituation schildern",
    description:
      "Sie beschreiben Ihr Bad, Ihre Wünsche und was sich verändern soll.",
  },
  {
    number: "02",
    title: "Umfang und Prioritäten klären",
    description:
      "Gemeinsam ordnen wir ein, ob eine Teilsanierung reicht oder mehr sinnvoll ist.",
  },
  {
    number: "03",
    title: "Maßnahmen abstimmen",
    description:
      "Oberflächen, Sanitär und Elektrik werden passend zum Projekt koordiniert.",
  },
  {
    number: "04",
    title: "Persönlich begleitet umsetzen",
    description:
      "RENOMA bleibt während des Projekts Ihr fester Ansprechpartner in Heilbronn.",
  },
];

const relatedServices = [
  {
    href: REGIONAL_PATHS.komplett.heilbronn,
    title: "Komplettsanierung in Heilbronn",
    description: "Wenn das Bad Teil eines größeren Vorhabens ist.",
  },
  {
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description: "Zur allgemeinen Leistungsseite mit Ablauf und Details.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Licht und Anschlüsse in den Ablauf einbinden.",
  },
  {
    href: REGIONAL_PATHS.einsatzgebiet,
    title: "Einsatzgebiet",
    description: "Wo RENOMA Projekte begleitet.",
  },
];

const faqs = [
  {
    question: "Begleitet RENOMA Badmodernisierungen in Heilbronn?",
    answer:
      "Ja. Heilbronn gehört zu unseren bestätigten Einsatzgebieten. RENOMA begleitet Badprojekte dort persönlich – von der ersten Vorstellung bis zur koordinierten Umsetzung.",
  },
  {
    question: "Reicht eine Teilsanierung oder braucht es mehr?",
    answer:
      "Das hängt vom Zustand, Ihren Wünschen und der sinnvollen Abstimmung ab. Im Austausch klären wir, welcher Umfang für Ihr Bad passt.",
  },
  {
    question: "Wie wird die Raumaufteilung besprochen?",
    answer:
      "Gemeinsam betrachten wir Nutzung, Bewegungsflächen und Anordnung – besonders bei kompakten Badezimmern.",
  },
  {
    question: "Werden Oberflächen, Sanitär und Beleuchtung gemeinsam geplant?",
    answer:
      "Ja. Diese Bereiche hängen voneinander ab. Eine frühe Abstimmung vermeidet spätere Korrekturen.",
  },
  {
    question: "Kann ich Bilder meines Badezimmers hochladen?",
    answer:
      "Ja. Über den Projektassistenten können Sie Bilder und vorhandene Unterlagen mitschicken.",
  },
  {
    question: "Gibt es eine Niederlassung in Heilbronn?",
    answer:
      "Nein. RENOMA begleitet Projekte beim Kunden vor Ort – ohne lokales Büro oder Niederlassung zu behaupten.",
  },
  {
    question: "Wie starte ich ein Badprojekt?",
    answer:
      "Über den Projektassistenten schildern Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
];

const REFERENCE_SLUG = "bad-01";

export function BadmodernisierungHeilbronnPage() {
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
              { label: "Heilbronn" },
            ]}
          />
          <div className="mt-8 grid items-center gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-[0.18em] text-clay uppercase">
                Badmodernisierung in Ihrer Region
              </p>
              <h1 className="mt-5 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Badmodernisierung in Heilbronn – klar geplant.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ein Badezimmer soll nicht nur moderner aussehen, sondern auch
                besser zu den täglichen Abläufen passen. RENOMA begleitet
                Badprojekte in Heilbronn von der ersten Vorstellung bis zu den
                abgestimmten nächsten Schritten.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                <Link
                  href={BAD_MODERNIZATION_FUNNEL_HREF}
                  className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                >
                  Badprojekt in Heilbronn starten
                </Link>
                <Link
                  href="/leistungen/badmodernisierung"
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Mehr über Badmodernisierung
                </Link>
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
        aria-labelledby="umfang-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="umfang-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Teilmodernisierung oder umfassende Veränderung
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Nicht jedes Bad braucht eine Komplettsanierung. Der passende Umfang
              ergibt sich aus Zustand, Wunsch und sinnvoller Abstimmung.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {scopeOptions.map((item, index) => (
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
        aria-labelledby="raumaufteilung-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="raumaufteilung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Raumaufteilung und tägliche Nutzung
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ein Bad funktioniert erst dann gut, wenn Anordnung und Alltag
              zusammenpassen. Diese Aspekte werden im Projekt betrachtet.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {layoutTopics.map((item, index) => (
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
        aria-labelledby="oberflaechen-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="oberflaechen-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Oberflächen, Sanitär und Beleuchtung
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Diese drei Bereiche prägen den Raum am stärksten und sollten
              gemeinsam geplant werden.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {surfaceTopics.map((item, index) => (
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
                Persönliche Begleitung in Heilbronn
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl space-y-5 lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA begleitet Badprojekte in Heilbronn persönlich – vom
                ersten Austausch bis zur koordinierten Umsetzung. Zuerst nehmen
                wir Ihre Wünsche und die vorhandene Situation auf und stimmen
                die nächsten Schritte mit Ihnen ab.
              </p>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ob Ihr konkretes Vorhaben angenommen wird, prüfen wir individuell
                im ersten Gespräch.
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
              Ablauf Ihres Badprojekts
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
                  Der Ort dieses Projekts ist hier nicht als Heilbronn ausgewiesen
                  – der Einblick zeigt die Qualität der Umsetzung.
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
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
              Ihr Bad in Heilbronn – Schritt für Schritt geplant.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Teilen Sie uns Ihre Vorstellungen mit. RENOMA meldet sich persönlich
              und bespricht die nächsten Schritte.
            </p>
            <div className="mt-10">
              <Link
                href={BAD_MODERNIZATION_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Badprojekt in Heilbronn starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
