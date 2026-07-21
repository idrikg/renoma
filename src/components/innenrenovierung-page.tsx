import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { INNENRENOVIERUNG_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import { sharedProcessSteps } from "@/lib/service-pages";
import {
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";

const whenMakesSense = [
  {
    title: "Räume wirken nicht mehr zeitgemäß",
    description:
      "Oberflächen, Farben oder der Gesamteindruck passen nicht mehr zu Ihrem Alltag und Ihren Vorstellungen.",
  },
  {
    title: "Nutzung und Grundriss haben sich verändert",
    description:
      "Homeoffice, Familie oder neue Abläufe verlangen andere Raumaufteilungen und Übergänge.",
  },
  {
    title: "Mehrere Maßnahmen sollen zusammengehören",
    description:
      "Boden, Wände, Türen und Beleuchtung sollen nicht isoliert, sondern als abgestimmtes Ganzes modernisiert werden.",
  },
  {
    title: "Einzug oder Neuausrichtung der Immobilie",
    description:
      "Vor dem Einzug oder einer Neuvermietung sollen Innenräume klar, ruhig und nutzbar überarbeitet werden – ohne erfundene rechtliche Vorgaben.",
  },
];

const possibleAreas = [
  "Wände und Decken",
  "Bodenbeläge",
  "Türen und Übergänge",
  "Beleuchtung und Elektroplanung",
  "Trockenbau und Raumaufteilung",
  "abgestimmte Oberflächen und Materialien",
];

const scopeLevels = [
  {
    title: "Ein einzelner Raum",
    description:
      "Gezielte Modernisierung – zum Beispiel Wohnzimmer, Flur oder Arbeitszimmer – mit klarem Fokus auf Wirkung und Nutzung.",
  },
  {
    title: "Mehrere Innenräume",
    description:
      "Zusammenhängende Bereiche werden in Material, Farbe und Ablauf aufeinander abgestimmt.",
  },
  {
    title: "Teil einer Komplettsanierung",
    description:
      "Die Innenrenovierung ist eingebettet in ein größeres Gesamtvorhaben mit abgestimmter Reihenfolge.",
  },
];

const relatedServices = [
  {
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description: "Material und Verlegung mit den Innenräumen abstimmen.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Anschlüsse und Lichtführung in den Ablauf einbinden.",
  },
  {
    href: "/leistungen/fenster-tueren",
    title: "Fenster & Türen",
    description: "Übergänge und Raumwirkung gemeinsam betrachten.",
  },
  {
    href: "/leistungen/komplettsanierung",
    title: "Komplettsanierung",
    description: "Wenn Innen und weitere Bereiche zusammengehören.",
  },
];

const faqs = [
  {
    question: "Was gehört zu einer Innenrenovierung?",
    answer:
      "Typischerweise Oberflächen, Böden, Türen, teils Beleuchtung und weitere Ausbauarbeiten. Der konkrete Umfang ergibt sich aus Ihrem Vorhaben und dem Zustand der Räume.",
  },
  {
    question: "Können mehrere Räume gemeinsam geplant werden?",
    answer:
      "Ja. Gerade dann lohnt sich eine gemeinsame Material- und Ablaufabstimmung, damit Übergänge und Reihenfolge stimmig bleiben.",
  },
  {
    question:
      "Können Boden-, Wand- und Elektroarbeiten miteinander abgestimmt werden?",
    answer:
      "Ja. Diese Arbeiten greifen oft ineinander. RENOMA hilft dabei, Abhängigkeiten früh sichtbar zu machen und die Umsetzung zu koordinieren.",
  },
  {
    question: "Ist auch die Renovierung eines einzelnen Raumes möglich?",
    answer:
      "Ja. Auch gezielte Einzelräume können begleitet werden – mit demselben Anspruch an Klarheit und persönliche Abstimmung.",
  },
  {
    question: "Wie beginnt die Planung mit RENOMA?",
    answer:
      "Über den Projektassistenten beschreiben Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
  {
    question: "Können Bilder des aktuellen Zustands hochgeladen werden?",
    answer:
      "Ja. Bilder und vorhandene Unterlagen helfen dabei, die Ausgangssituation besser einzuordnen.",
  },
];

const INTERIOR_REFERENCE_SLUGS = ["kueche-01", "treppe-01"] as const;

export function InnenrenovierungPage() {
  const references = INTERIOR_REFERENCE_SLUGS.map((slug) =>
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
              { label: "Innenrenovierung" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Innenrenovierung
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Innenrenovierung, die zu Ihrem Zuhause passt.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Ob einzelne Räume oder mehrere miteinander verbundene Maßnahmen:
            RENOMA begleitet Ihre Innenrenovierung persönlich und sorgt dafür,
            dass die nächsten Schritte sinnvoll aufeinander abgestimmt werden.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={INNENRENOVIERUNG_FUNNEL_HREF}
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Innenprojekt starten
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              Alle Leistungen ansehen
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
              Wann eine Innenrenovierung sinnvoll sein kann
            </h2>
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
              Mögliche Bereiche
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              RENOMA begleitet und koordiniert – die konkrete Umsetzung erfolgt
              in Abstimmung mit geeigneten Fachbetrieben.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {possibleAreas.map((item, index) => (
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
        aria-labelledby="umfang-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="umfang-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Einzelner Raum oder mehrere Bereiche
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {scopeLevels.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40}>
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
        aria-labelledby="ablauf-heading"
        className="py-20 sm:py-28 lg:py-32"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="ablauf-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              So begleitet RENOMA
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Wünsche und Ausgangssituation aufnehmen",
                description:
                  "Sie schildern, welche Räume sich verändern sollen und was Ihnen wichtig ist.",
              },
              {
                number: "02",
                title: "Maßnahmen und Abhängigkeiten abstimmen",
                description:
                  "Gemeinsam klären wir, welche Arbeiten zusammengehören und in welcher Reihenfolge.",
              },
              {
                number: "03",
                title: "Umsetzung koordinieren",
                description:
                  "Leistungen und Details werden abgestimmt und mit geeigneten Betrieben koordiniert.",
              },
              {
                number: "04",
                title: "Persönliche Begleitung während des Projekts",
                description: sharedProcessSteps[3].description,
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
                Einblicke aus Innenprojekten
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ausgewählte veröffentlichte Projekte mit Innenräumen – jeweils
                mit ihrer eigenen Projektkategorie.
              </p>
            </Reveal>
            <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2">
              {references.map((reference, index) => {
                if (!reference) return null;
                const cover = getReferenceCover(reference);
                return (
                  <li key={reference.slug}>
                    <Reveal delayMs={index * 40}>
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
                        <p className="mt-2 text-[15px] leading-relaxed text-muted">
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
              Zeigen Sie uns, was Sie in Ihren Räumen verändern möchten.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Sie schildern uns Ihr Vorhaben. RENOMA begleitet Sie bei den
              nächsten Schritten.
            </p>
            <div className="mt-10">
              <Link
                href={INNENRENOVIERUNG_FUNNEL_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Innenprojekt starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
