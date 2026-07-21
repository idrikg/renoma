import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { KOMPLETTSANIERUNG_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import { sharedProcessSteps } from "@/lib/service-pages";

const whenMakesSense = [
  {
    title: "Mehrere Räume oder Bereiche hängen zusammen",
    description:
      "Wenn Veränderungen im Bad, in der Küche, an Böden oder an der Elektrik ineinandergreifen, lohnt sich eine gemeinsame Planung.",
  },
  {
    title: "Die Reihenfolge der Arbeiten entscheidet mit",
    description:
      "Manche Schritte müssen vor anderen erfolgen. Eine klare Abfolge verhindert doppelte Arbeiten und unnötige Unterbrechungen.",
  },
  {
    title: "Sie möchten einen festen Ansprechpartner",
    description:
      "Statt viele Einzelentscheidungen allein zu koordinieren, begleitet Sie RENOMA durch den gesamten Prozess.",
  },
];

const possibleAreas = [
  "Innenräume und Oberflächen",
  "Bad und Sanitär",
  "Küche",
  "Böden, Wände und Decken",
  "Fenster und Türen",
  "Elektroarbeiten und Beleuchtung",
  "Fassade und Außenbereiche, sofern Teil des Vorhabens",
  "weitere Maßnahmen, die zum Gesamtbild gehören",
];

const faqs = [
  {
    question: "Muss eine Komplettsanierung alles auf einmal umfassen?",
    answer:
      "Nicht zwingend. Entscheidend ist, welche Bereiche zusammengehören und in welcher Reihenfolge sie sinnvoll umgesetzt werden. Der konkrete Umfang entsteht aus Ihrem Vorhaben.",
  },
  {
    question: "Kann ich mit einer Teilmaßnahme starten?",
    answer:
      "Ja. Manche Projekte beginnen mit einem klaren ersten Schritt und werden später erweitert. Wichtig ist, dass der Einstieg zum Gesamtkontext passt.",
  },
  {
    question: "Wie unterscheidet sich das von einer einzelnen Modernisierung?",
    answer:
      "Bei einer Komplettsanierung stehen Abstimmung und Reihenfolge mehrerer Leistungen im Mittelpunkt. Einzelmaßnahmen können ebenfalls begleitet werden – der Rahmen ist dann enger gefasst.",
  },
  {
    question: "Wie beginnt die Anfrage?",
    answer:
      "Über den Projektassistenten schildern Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
];

const relatedServices = [
  {
    href: "/leistungen/innenrenovierung",
    title: "Innenrenovierung",
    description: "Innenräume und Oberflächen im Gesamtvorhaben abstimmen.",
  },
  {
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description: "Material und Verlegung in den Ablauf einbinden.",
  },
  {
    href: "/leistungen/fassade-aussenbereich",
    title: "Fassade & Außenbereich",
    description: "Außenmaßnahmen mit dem Gesamtprojekt verbinden.",
  },
  {
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description: "Wenn das Bad Teil Ihrer Gesamterneuerung ist.",
  },
  {
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description: "Anschlüsse und Beleuchtung im Gesamtablauf abstimmen.",
  },
  {
    href: "/leistungen/fenster-tueren",
    title: "Fenster & Türen",
    description: "Austausch und Modernisierung mit dem Gesamtprojekt verbinden.",
  },
];

export function KomplettsanierungPage() {
  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Komplettsanierung" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Komplettsanierung
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Komplettsanierung – klar geplant und persönlich begleitet.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Wenn mehrere Bereiche Ihres Zuhauses zusammen erneuert werden
            sollen, braucht es Überblick, Reihenfolge und Abstimmung. RENOMA
            begleitet Ihr Gesamtvorhaben persönlich und hält die nächsten
            Schritte verständlich.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={KOMPLETTSANIERUNG_FUNNEL_HREF}
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Projekt starten
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
              Nicht jedes größere Vorhaben ist automatisch eine
              Komplettsanierung. Entscheidend ist, ob mehrere Maßnahmen
              inhaltlich und zeitlich zusammengehören.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {whenMakesSense.map((item, index) => (
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
              Der konkrete Zuschnitt hängt von Ihrem Zuhause und Ihren Zielen
              ab. Häufig spielen unter anderem folgende Themen eine Rolle.
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
                So begleitet RENOMA das Projekt
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Bei einer Komplettsanierung geht es weniger um einzelne
                Entscheidungen isoliert voneinander – und mehr um den
                Zusammenhang. RENOMA hilft dabei, Anforderungen zu bündeln,
                Prioritäten zu setzen und die Umsetzung nachvollziehbar zu
                koordinieren.
              </p>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Sie behalten einen festen Ansprechpartner. Offene Fragen,
                Abstimmungen zwischen Leistungen und der Blick auf den
                Gesamtablauf bleiben an einer Stelle.
              </p>
            </Reveal>
          </div>
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
              Typischer Ablauf
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {sharedProcessSteps.map((step, index) => (
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
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Einzelne Bereiche können Teil Ihrer Komplettsanierung sein – oder
              auch für sich stehen.
            </p>
          </Reveal>
          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service, index) => (
              <li key={service.href}>
                <Reveal delayMs={index * 40}>
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
                    <span className="mt-5 inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 group-hover:decoration-clay">
                      Mehr erfahren
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="region-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="region-heading"
                className="text-display-2 text-balance text-ink"
              >
                Komplettsanierung in Ihrer Region
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Für ausgewählte Städte finden Sie Hinweise zum Einsatzgebiet und
                zur persönlichen Begleitung auf den regionalen Seiten.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                <li>
                  <Link
                    href="/leistungen/komplettsanierung/ludwigsburg"
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Ludwigsburg &amp; Remseck
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leistungen/komplettsanierung/stuttgart"
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Stuttgart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leistungen/komplettsanierung/heilbronn"
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Heilbronn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/einsatzgebiet"
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Einsatzgebiet ansehen
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
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
              Möchten Sie mehrere Bereiche gemeinsam angehen?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Schildern Sie Ihr Vorhaben. Wir ordnen den Umfang ein und
              besprechen die nächsten Schritte persönlich.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={KOMPLETTSANIERUNG_FUNNEL_HREF}
                className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
              >
                Projekt starten
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                Zurück zur Leistungsübersicht
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
