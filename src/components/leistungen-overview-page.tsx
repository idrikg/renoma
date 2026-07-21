import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import { serviceCards, sharedProcessSteps } from "@/lib/service-pages";

const projectScopes = [
  {
    title: "Einzelmaßnahme",
    description:
      "Ein klar abgegrenzter Bereich – zum Beispiel ein Bad, Fenster oder gezielte Elektroarbeiten.",
  },
  {
    title: "Mehrere verbundene Arbeiten",
    description:
      "Maßnahmen, die sich gegenseitig beeinflussen und in einer sinnvollen Reihenfolge geplant werden sollten.",
  },
  {
    title: "Umfassendes Gesamtprojekt",
    description:
      "Mehrere Bereiche Ihres Zuhauses gehören zusammen und brauchen eine abgestimmte Gesamtkoordination.",
  },
];

export function LeistungenOverviewPage() {
  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[
              { label: "Startseite", href: "/" },
              { label: "Leistungen" },
            ]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Leistungen
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Was möchten Sie in Ihrem Zuhause verändern?
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Von einzelnen Modernisierungsmaßnahmen bis zum umfassenden
            Sanierungsprojekt: RENOMA begleitet Sie persönlich, koordiniert die
            nächsten Schritte und bleibt während des Projekts Ihr fester
            Ansprechpartner.
          </p>
          <div className="mt-9">
            <Link
              href="/projekt-starten"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Projekt starten
            </Link>
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="leistungsuebersicht-heading"
        className="py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="leistungsuebersicht-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Unsere Leistungsbereiche
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Wählen Sie den Bereich, der am besten zu Ihrem Vorhaben passt.
              Jede Seite erklärt den Ablauf und den Einstieg in die persönliche
              Begleitung.
            </p>
          </Reveal>

          <ul className="mt-12 grid list-none gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {serviceCards.map((service, index) => {
              const isLastOddInThree =
                serviceCards.length % 3 === 1 &&
                index === serviceCards.length - 1;
              const isLastOddInTwo =
                serviceCards.length % 2 === 1 &&
                index === serviceCards.length - 1;
              return (
                <li
                  key={service.slug}
                  className={[
                    isLastOddInTwo ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none" : "",
                    isLastOddInThree ? "lg:col-start-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Reveal delayMs={Math.min(index * 35, 140)}>
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col border-t border-line pt-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                    >
                      <h3 className="text-xl font-medium text-ink transition-colors group-hover:text-ink-soft sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
                        {service.description}
                      </p>
                      <span className="mt-6 inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors group-hover:decoration-clay">
                        Mehr erfahren
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="orientierung-heading"
        className="border-y border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="orientierung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Welcher Umfang passt zu Ihrem Vorhaben?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Nicht jedes Projekt braucht denselben Rahmen. Eine kurze
              Einordnung hilft, den richtigen Einstieg zu finden.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {projectScopes.map((scope, index) => (
              <Reveal key={scope.title} delayMs={index * 40}>
                <li className="border-t border-line pt-6">
                  <h3 className="text-xl font-medium text-ink">{scope.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {scope.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="region-heading"
        className="border-t border-line bg-paper-dim py-16 sm:py-20"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="region-heading"
              className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
            >
              Regionale Schwerpunkte
            </h2>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              Für ausgewählte Leistungen gibt es ergänzende Seiten zum
              Einsatzgebiet Ludwigsburg und Remseck am Neckar.
            </p>
            <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10">
              <li>
                <Link
                  href="/leistungen/badmodernisierung/ludwigsburg"
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Badmodernisierung in Ludwigsburg und Remseck
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen/komplettsanierung/ludwigsburg"
                  className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Komplettsanierung in Ludwigsburg und Remseck
                </Link>
              </li>
            </ul>
          </Reveal>
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
              So begleiten wir Ihr Projekt
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

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Ihr Projekt beginnt mit einer einfachen Anfrage.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Erzählen Sie uns, was Sie verändern möchten. Wir schauen uns Ihr
              Vorhaben persönlich an.
            </p>
            <div className="mt-10">
              <Link
                href="/projekt-starten"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Projekt starten
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
