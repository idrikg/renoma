import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { ELEKTRIK_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import { sharedProcessSteps } from "@/lib/service-pages";

const occasions = [
  {
    title: "Renovierung bestehender Räume",
    description:
      "Wenn Wände, Böden oder Sanitärräume verändert werden, lohnt sich oft auch ein Blick auf Steckdosen, Schalter und Leitungswege.",
  },
  {
    title: "Mehr Komfort im Alltag",
    description:
      "Zusätzliche Anschlüsse, bessere Beleuchtung oder klarere Schaltungen können den Alltag spürbar erleichtern.",
  },
  {
    title: "Abstimmung mit weiteren Gewerken",
    description:
      "Elektroarbeiten greifen häufig in Bad, Küche oder Gesamtplanung ein – und sollten deshalb früh mitgedacht werden.",
  },
];

const possibleScopes = [
  "Bestandsaufnahme und Einordnung vorhandener Installationen",
  "Planung von Steckdosen, Schaltern und Anschlüssen",
  "Beleuchtung und Lichtführung in Abstimmung mit dem Raum",
  "vorbereitende Arbeiten im Rahmen einer Renovierung",
  "Abstimmung mit Bad-, Küchen- oder Gesamtsanierung",
  "Koordination der Umsetzung durch qualifizierte Fachbetriebe",
];

const faqs = [
  {
    question: "Wann sollte die Elektrik im Rahmen einer Renovierung geprüft werden?",
    answer:
      "Am besten früh – idealerweise bevor Oberflächen endgültig geschlossen werden. So lassen sich sinnvolle Anpassungen noch ohne unnötigen Mehraufwand berücksichtigen. Eine konkrete Beurteilung erfolgt immer vor Ort durch entsprechend qualifizierte Fachleute.",
  },
  {
    question: "Können Elektroarbeiten mit anderen Maßnahmen abgestimmt werden?",
    answer:
      "Ja. Gerade bei Bad, Küche oder einer Komplettsanierung ist die Abstimmung wichtig, damit Reihenfolge und Anschlüsse zusammenpassen.",
  },
  {
    question: "Können vorhandene Steckdosen und Anschlüsse neu geplant werden?",
    answer:
      "Oft ja – abhängig vom Bestand und vom gewünschten Nutzen. Welche Änderungen sinnvoll und zulässig sind, wird im konkreten Projekt geklärt.",
  },
  {
    question: "Wie beginnt die Anfrage?",
    answer:
      "Über den Projektassistenten beschreiben Sie Ihr Vorhaben. RENOMA prüft die Angaben persönlich und begleitet die weiteren Schritte.",
  },
];

export function ElektroarbeitenPage() {
  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Elektroarbeiten" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Elektroarbeiten
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Elektroarbeiten, die zum gesamten Projekt passen.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Steckdosen, Beleuchtung und Anschlüsse wirken unsichtbar – und
            entscheiden mit über Komfort und Ablauf. RENOMA begleitet und
            koordiniert Elektroarbeiten im Rahmen Ihrer Renovierung oder
            Sanierung und stimmt sie mit den übrigen Maßnahmen ab.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={ELEKTRIK_FUNNEL_HREF}
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
        aria-labelledby="anlaesse-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="anlaesse-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Typische Anlässe für Elektroarbeiten
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {occasions.map((item, index) => (
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
              Mögliche Leistungsbereiche
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Der Umfang richtet sich nach Bestand und Ziel. RENOMA hilft bei
              der Einordnung und koordiniert die Umsetzung mit entsprechend
              qualifizierten Fachbetrieben.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {possibleScopes.map((item, index) => (
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="abstimmung-heading"
                className="text-display-2 text-balance text-ink"
              >
                Abstimmung mit anderen Renovierungsarbeiten
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Elektroarbeiten stehen selten für sich allein. In Bad und Küche
                entscheiden Anschlüsse mit über die Nutzbarkeit. Bei einer{" "}
                <Link
                  href="/leistungen/komplettsanierung"
                  className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Komplettsanierung
                </Link>{" "}
                beeinflusst die Elektrik oft den gesamten Zeitplan.
              </p>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Deshalb begleitet RENOMA die Abstimmung zwischen den beteiligten
                Leistungen – damit Anforderungen früh sichtbar werden und die
                Umsetzung in einer sinnvollen Reihenfolge erfolgt.
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
              Ablauf mit RENOMA
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
              Sollen Elektroarbeiten Teil Ihres Projekts werden?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Beschreiben Sie kurz, worum es geht. Wir ordnen das Vorhaben ein
              und begleiten die nächsten Schritte.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={ELEKTRIK_FUNNEL_HREF}
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
