import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { FENSTER_TUEREN_FUNNEL_HREF } from "@/components/project-assistant/funnel-preset";
import { sharedProcessSteps } from "@/lib/service-pages";

const reasons = [
  {
    title: "Funktion und Alltag",
    description:
      "Schwergängige Fenster, undichte Stellen oder Türen, die nicht mehr zum Alltag passen, machen den Austausch oft spürbar sinnvoll.",
  },
  {
    title: "Gestaltung und Gesamteindruck",
    description:
      "Fenster und Türen prägen Fassade und Innenräume. Eine Modernisierung kann den Charakter Ihres Zuhauses ruhig und klar erneuern.",
  },
  {
    title: "Komfort und Sicherheit",
    description:
      "Neben der Optik können Bedienkomfort, Schließtechnik und der Schutz vor Wind und Wetter eine Rolle spielen – ohne pauschale Versprechen.",
  },
];

const windowTopics = [
  "Austausch und Modernisierung vorhandener Fenster",
  "Material- und Gestaltungsauswahl passend zum Haus",
  "Bedienkomfort und Alltagstauglichkeit",
  "Abstimmung von Öffnungsarten und Teilungen",
  "Übergänge zu Laibung, Fassade und Innenraum",
];

const doorTopics = [
  "Haustüren und Wohnungseingangstüren",
  "Innentüren in Abstimmung mit Raumwirkung und Boden",
  "Funktion, Sicherheit und Bedienkomfort",
  "Material- und Farbwahl im Gesamtkontext",
  "saubere Einbindung in den Bauablauf",
];

const faqs = [
  {
    question: "Wann lohnt sich der Austausch von Fenstern?",
    answer:
      "Wenn Bedienung, Dichtigkeit, Sicherheit oder die Gestaltung nicht mehr zu Ihrem Alltag und Zuhause passen. Ob ein Austausch im konkreten Fall sinnvoll ist, hängt vom Bestand und Ihren Zielen ab und wird im Gespräch eingeordnet.",
  },
  {
    question: "Können Fenster und Türen gemeinsam geplant werden?",
    answer:
      "Ja. Oft wirken sie gemeinsam auf Fassade und Innenräume. Eine gemeinsame Betrachtung hilft, Material, Farbe und Ablauf abzustimmen.",
  },
  {
    question: "Werden die Arbeiten mit weiteren Sanierungsmaßnahmen abgestimmt?",
    answer:
      "Auf Wunsch ja – zum Beispiel mit einer Fassadenmaßnahme oder einer Komplettsanierung. So bleiben Reihenfolge und Übergänge im Blick.",
  },
  {
    question: "Wie läuft die erste Anfrage ab?",
    answer:
      "Sie schildern Ihr Vorhaben über den Projektassistenten. RENOMA prüft die Angaben persönlich und meldet sich zu den nächsten Schritten.",
  },
];

export function FensterTuerenPage() {
  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Fenster & Türen" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Fenster &amp; Türen
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Fenster und Türen, die zu Ihrem Zuhause passen.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Ob Austausch, Modernisierung oder abgestimmte Neuplanung: RENOMA
            begleitet die Modernisierung von Fenstern und Türen – von den ersten
            Anforderungen bis zur koordinierten Umsetzung.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link
              href={FENSTER_TUEREN_FUNNEL_HREF}
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
        aria-labelledby="gruende-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="gruende-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Gründe für eine Modernisierung
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {reasons.map((item, index) => (
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
        aria-labelledby="fenster-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="fenster-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Fenster
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Fenster verbinden Innenraum und Außenbild. Eine gute Lösung
              berücksichtigt Nutzung, Gestaltung und den Übergang zur Fassade –
              ohne unbelegte Einsparversprechen.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {windowTopics.map((item, index) => (
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
        aria-labelledby="tueren-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="tueren-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Haus-, Wohnungs- und Innentüren
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Türen steuern Wege, Privatsphäre und den ersten Eindruck. Ob
              Eingang oder Innenraum – die Auswahl sollte zu Nutzung und
              Gestaltung passen.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {doorTopics.map((item, index) => (
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
        className="py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="abstimmung-heading"
                className="text-display-2 text-balance text-ink"
              >
                Abstimmung mit Fassade und Innenausbau
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Fenster und Türen sitzen an der Schnittstelle zwischen Außenbild
                und Innenraum. Bei einer{" "}
                <Link
                  href="/leistungen/komplettsanierung"
                  className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Komplettsanierung
                </Link>{" "}
                oder parallel laufenden Innenarbeiten hilft eine gemeinsame
                Planung, Übergänge und Termine sauber zu halten.
              </p>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA begleitet diese Abstimmung und koordiniert die Umsetzung
                im Gesamtablauf.
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
              Möchten Sie Fenster oder Türen modernisieren?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Erzählen Sie uns von Ihrem Vorhaben. Wir schauen uns die Angaben
              persönlich an und begleiten die nächsten Schritte.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={FENSTER_TUEREN_FUNNEL_HREF}
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
