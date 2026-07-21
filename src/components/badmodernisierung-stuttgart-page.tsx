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

const changeGoals = [
  {
    title: "Mehr Helligkeit und Ruhe",
    description:
      "Dunkle Fliesen, gedämpftes Licht oder eine gedrängte Anordnung sollen einem klareren, freundlicheren Gesamteindruck weichen.",
  },
  {
    title: "Bessere Nutzung im Alltag",
    description:
      "Dusche, Waschplatz oder Stauraum sollen praktischer werden – ohne dass jede Entscheidung isoliert getroffen wird.",
  },
  {
    title: "Sanitär und Oberflächen erneuern",
    description:
      "Bestandsteile wirken veraltet oder unpraktisch. Sie möchten Materialien und Ausstattung zeitgemäß abstimmen.",
  },
  {
    title: "Vor einer neuen Lebensphase",
    description:
      "Das Bad soll vor Einzug, Umzug oder veränderter Nutzung fit gemacht werden – mit nachvollziehbaren nächsten Schritten.",
  },
];

const designFunctionTopics = [
  "Lichtführung und Beleuchtungszonen",
  "Waschplatz und Stauraum",
  "Dusche, Badewanne oder Kombination",
  "Bewegungsflächen und Türanschläge",
  "Materialwirkung von Fliesen und Oberflächen",
  "Barrierefreie oder komfortablere Nutzung",
  "Lüftung und Feuchteschutz im Ablauf",
  "Anschlüsse für Elektrik und Sanitär",
];

const coordinationPoints = [
  {
    title: "Reihenfolge der Gewerke",
    description:
      "Fliesen, Sanitär und Elektrik greifen ineinander. Eine gemeinsame Planung vermeidet spätere Korrekturen.",
  },
  {
    title: "Materialien früh abstimmen",
    description:
      "Farben, Formate und Sanitärobjekte beeinflussen sich gegenseitig – früh klären spart Umwege.",
  },
  {
    title: "Nutzung während der Arbeiten",
    description:
      "Ob das Bad teilweise nutzbar bleibt oder komplett gesperrt wird, hängt vom Umfang ab und wird projektbezogen besprochen.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Vorhaben beschreiben",
    description:
      "Sie schildern Ausgangssituation, Wünsche und was sich im Bad verändern soll.",
  },
  {
    number: "02",
    title: "Umfang gemeinsam einordnen",
    description:
      "Gemeinsam klären wir, welche Maßnahmen zusammengehören und welche Priorität sie haben.",
  },
  {
    number: "03",
    title: "Schritte und Reihenfolge abstimmen",
    description:
      "Die beteiligten Arbeiten werden passend zum Projekt koordiniert und zeitlich eingeordnet.",
  },
  {
    number: "04",
    title: "Begleitung bis zur Umsetzung",
    description:
      "Während des Projekts bleibt RENOMA Ihr fester Ansprechpartner – ohne Zwischenwege.",
  },
];

const relatedServices = [
  {
    href: REGIONAL_PATHS.komplett.stuttgart,
    title: "Komplettsanierung in Stuttgart",
    description: "Wenn das Bad Teil eines größeren Vorhabens ist.",
  },
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
    href: REGIONAL_PATHS.einsatzgebiet,
    title: "Einsatzgebiet",
    description: "Wo RENOMA Projekte begleitet – und wie die Prüfung abläuft.",
  },
];

const faqs = [
  {
    question: "Begleitet RENOMA Badmodernisierungen in Stuttgart?",
    answer:
      "Ja. Stuttgart gehört zu unseren bestätigten Einsatzgebieten. RENOMA begleitet Badprojekte dort persönlich – von der ersten Einordnung bis zur koordinierten Umsetzung.",
  },
  {
    question: "Muss das gesamte Badezimmer erneuert werden?",
    answer:
      "Nicht zwingend. Ob eine Teilsanierung ausreicht oder eine umfassendere Veränderung sinnvoller ist, ergibt sich aus Zustand, Wunsch und sinnvoller Abstimmung der Arbeiten.",
  },
  {
    question: "Wie werden Gestaltung und Funktion zusammengeführt?",
    answer:
      "Im Austausch betrachten wir Nutzung, Raumaufteilung, Materialien und Sanitär gemeinsam – statt einzelne Entscheidungen nacheinander zu treffen.",
  },
  {
    question: "Können Fliesen, Sanitär und Elektrik gemeinsam geplant werden?",
    answer:
      "Ja. Gerade diese Bereiche hängen voneinander ab. Eine abgestimmte Reihenfolge hält den Ablauf übersichtlich.",
  },
  {
    question: "Kann ich Bilder meines aktuellen Badezimmers hochladen?",
    answer:
      "Ja. Über den Projektassistenten können Sie Bilder und vorhandene Unterlagen mitschicken.",
  },
  {
    question: "Gibt es eine Niederlassung in Stuttgart?",
    answer:
      "Nein. RENOMA begleitet Projekte beim Kunden vor Ort – ohne lokales Büro oder Niederlassung zu behaupten.",
  },
  {
    question: "Wie beginnt die Planung?",
    answer:
      "Über den Projektassistenten schildern Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
];

const REFERENCE_SLUG = "badezimmer-detailmodernisierung";

export function BadmodernisierungStuttgartPage() {
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
              { label: "Stuttgart" },
            ]}
          />
          <div className="mt-8 grid items-center gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-[0.18em] text-clay uppercase">
                Badmodernisierung in Ihrer Region
              </p>
              <h1 className="mt-5 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Badmodernisierung in Stuttgart – persönlich begleitet.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Sie möchten Ihr Badezimmer in Stuttgart modernisieren und wünschen
                sich einen nachvollziehbaren Ablauf? RENOMA nimmt Ihre Vorstellungen
                auf, stimmt die beteiligten Maßnahmen aufeinander ab und bleibt
                während des Projekts Ihr fester Ansprechpartner.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                <Link
                  href={BAD_MODERNIZATION_FUNNEL_HREF}
                  className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                >
                  Badprojekt in Stuttgart starten
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
        aria-labelledby="veraenderung-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="veraenderung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Was soll sich im Badezimmer verändern?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Jedes Badprojekt startet mit einer konkreten Ausgangssituation.
              Häufig geht es darum, Gestaltung und Alltag wieder zusammenzubringen.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {changeGoals.map((item, index) => (
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
        aria-labelledby="gestaltung-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="gestaltung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Gestaltung und Funktion gemeinsam betrachten
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ein modernes Bad wirkt erst dann stimmig, wenn Form und Nutzung
              zusammenpassen. Diese Punkte werden im Projekt gemeinsam betrachtet.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {designFunctionTopics.map((item, index) => (
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
        aria-labelledby="abstimmung-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="abstimmung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Mehrere Arbeiten sinnvoll abstimmen
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Badmodernisierungen umfassen selten nur eine einzelne Maßnahme.
              Eine klare Abstimmung hält den Ablauf nachvollziehbar.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {coordinationPoints.map((item, index) => (
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
                Projektbegleitung in Stuttgart
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl space-y-5 lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA begleitet Badprojekte in Stuttgart persönlich – vom
                ersten Austausch bis zur koordinierten Umsetzung. Zuerst nehmen
                wir Ihre Wünsche und die vorhandene Situation auf, stimmen die
                nächsten Schritte ab und halten den Überblick über die beteiligten
                Arbeiten.
              </p>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ob Ihr konkretes Vorhaben angenommen wird, prüfen wir individuell
                im ersten Gespräch – ohne automatische Zusagen aus der Ferne.
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
                  Der Ort dieses Projekts ist hier nicht als Stuttgart ausgewiesen
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
              Bereit für ein neues Badezimmer in Stuttgart?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Schildern Sie uns Ihre Vorstellungen – RENOMA meldet sich persönlich
              und bespricht die nächsten Schritte mit Ihnen.
            </p>
            <div className="mt-10">
              <Link
                href={BAD_MODERNIZATION_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Badprojekt in Stuttgart starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
