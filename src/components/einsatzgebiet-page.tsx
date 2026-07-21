import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceBreadcrumbs } from "@/components/service-breadcrumbs";
import {
  BAD_MODERNIZATION_FUNNEL_HREF,
  KOMPLETTSANIERUNG_FUNNEL_HREF,
} from "@/components/project-assistant/funnel-preset";
import { REGIONAL_PATHS } from "@/lib/service-regions";
import { serviceCards } from "@/lib/service-pages";

type RegionLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

const regionBlocks: {
  id: string;
  title: string;
  description: string;
  links: RegionLink[];
}[] = [
  {
    id: "ludwigsburg",
    title: "Ludwigsburg",
    description:
      "In Ludwigsburg begleitet RENOMA Badmodernisierungen und umfassende Sanierungsprojekte persönlich – von den ersten Vorstellungen bis zur abgestimmten Umsetzung.",
    links: [
      {
        href: REGIONAL_PATHS.bad.ludwigsburg,
        label: "Badmodernisierung in Ludwigsburg",
      },
      {
        href: REGIONAL_PATHS.komplett.ludwigsburg,
        label: "Komplettsanierung in Ludwigsburg",
      },
    ],
  },
  {
    id: "remseck-am-neckar",
    title: "Remseck am Neckar",
    description:
      "Auch Projekte in Remseck am Neckar gehören zum regionalen Einsatzgebiet von RENOMA. Umfang, Lage und die nächsten sinnvollen Schritte klären wir persönlich im ersten Austausch.",
    links: [
      {
        href: BAD_MODERNIZATION_FUNNEL_HREF,
        label: "Badprojekt in Remseck starten",
        variant: "primary",
      },
      {
        href: "/leistungen/badmodernisierung",
        label: "Mehr über Badmodernisierung",
        variant: "secondary",
      },
      {
        href: KOMPLETTSANIERUNG_FUNNEL_HREF,
        label: "Sanierungsprojekt in Remseck starten",
        variant: "primary",
      },
      {
        href: "/leistungen/komplettsanierung",
        label: "Mehr über Komplettsanierung",
        variant: "secondary",
      },
    ],
  },
  {
    id: "stuttgart",
    title: "Stuttgart",
    description:
      "In Stuttgart begleitet RENOMA Badmodernisierungen und Komplettsanierungen persönlich – mit klarer Abstimmung und nachvollziehbaren nächsten Schritten.",
    links: [
      {
        href: REGIONAL_PATHS.bad.stuttgart,
        label: "Badmodernisierung in Stuttgart",
      },
      {
        href: REGIONAL_PATHS.komplett.stuttgart,
        label: "Komplettsanierung in Stuttgart",
      },
    ],
  },
  {
    id: "heilbronn",
    title: "Heilbronn",
    description:
      "In Heilbronn begleitet RENOMA Badprojekte und umfassende Sanierungen beim Kunden. Ob und wie wir Ihr Vorhaben begleiten können, klären wir persönlich im ersten Austausch.",
    links: [
      {
        href: REGIONAL_PATHS.bad.heilbronn,
        label: "Badmodernisierung in Heilbronn",
      },
      {
        href: REGIONAL_PATHS.komplett.heilbronn,
        label: "Komplettsanierung in Heilbronn",
      },
    ],
  },
  {
    id: "waiblingen",
    title: "Waiblingen",
    description:
      "In Waiblingen begleitet RENOMA vor allem Badmodernisierungen persönlich. Größere Gesamtvorhaben können Sie über die allgemeine Komplettsanierung anfragen.",
    links: [
      {
        href: REGIONAL_PATHS.bad.waiblingen,
        label: "Badmodernisierung in Waiblingen",
      },
      {
        href: "/leistungen/komplettsanierung",
        label: "Komplettsanierung allgemein",
      },
    ],
  },
];
const checkSteps = [
  {
    title: "Vorhaben schildern",
    description:
      "Sie beschreiben, was sich verändern soll und welche Punkte Ihnen wichtig sind.",
  },
  {
    title: "PLZ und Ort angeben",
    description:
      "Im Projektassistenten geben Sie Ihre Postleitzahl und den Ort wie gewohnt an.",
  },
  {
    title: "Umfang und Lage prüfen",
    description:
      "RENOMA ordnet Projektart und Lage persönlich ein – ohne feste Kilometergrenze.",
  },
  {
    title: "Persönliche Rückmeldung",
    description:
      "Sie erhalten eine klare Rückmeldung zu den nächsten Schritten. Angrenzende Orte können je nach Projekt ebenfalls möglich sein.",
  },
];

const faqs = [
  {
    question: "In welchen Städten begleitet RENOMA Projekte?",
    answer:
      "Zum regionalen Schwerpunkt gehören Ludwigsburg, Remseck am Neckar, Stuttgart, Waiblingen und Heilbronn. Weitere Orte prüfen wir projektbezogen.",
  },
  {
    question: "Ist RENOMA auch außerhalb der genannten Städte tätig?",
    answer:
      "Angrenzende Orte können je nach Umfang und Lage möglich sein. Ob das für Ihr Vorhaben gilt, klären wir im ersten Austausch.",
  },
  {
    question: "Begleitet RENOMA Projekte in Remseck am Neckar?",
    answer:
      "Ja. Remseck am Neckar gehört zum Einsatzgebiet. Umfang und nächste Schritte klären wir persönlich im ersten Austausch.",
  },
  {
    question: "Wie wird geprüft, ob mein Wohnort im Einsatzgebiet liegt?",
    answer:
      "Sie schildern Ihr Projekt und geben PLZ sowie Ort an. RENOMA prüft die Angaben persönlich und meldet sich zurück.",
  },
  {
    question: "Welche Renovierungs- und Sanierungsleistungen werden angeboten?",
    answer:
      "Unter anderem Badmodernisierung, Komplettsanierung, Innenrenovierung, Böden und Fliesen, Elektroarbeiten, Fenster und Türen sowie Fassade und Außenbereich.",
  },
  {
    question:
      "Muss sich das Projekt direkt in einer der genannten Städte befinden?",
    answer:
      "Nicht zwingend. Die genannten Städte sind der Schwerpunkt. Angrenzende Orte werden individuell geprüft – ohne Annahme-Garantie aus der Ferne.",
  },
];

export function EinsatzgebietPage() {
  return (
    <article>
      <header className="border-b border-line pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <ServiceBreadcrumbs
            items={[{ label: "Startseite", href: "/" }, { label: "Einsatzgebiet" }]}
          />
          <p className="mt-8 text-sm font-medium tracking-[0.18em] text-clay uppercase">
            Einsatzgebiet
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            RENOMA in Ludwigsburg, Stuttgart, Heilbronn und Umgebung.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            RENOMA begleitet Renovierungs- und Sanierungsprojekte direkt beim
            Kunden. Unser regionaler Schwerpunkt umfasst Ludwigsburg, Remseck am
            Neckar, Stuttgart, Waiblingen und Heilbronn. Ob Ihr konkretes Projekt
            innerhalb unseres Einsatzgebiets liegt, klären wir persönlich im
            ersten Austausch.
          </p>
          <div className="mt-9">
            <Link
              href="/projekt-starten"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Projekt starten
            </Link>
          </div>
        </Container>
      </header>

      <section
        aria-labelledby="schwerpunkte-heading"
        className="border-b border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="schwerpunkte-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Regionale Schwerpunkte
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              RENOMA begleitet Renovierungs- und Sanierungsprojekte in
              Ludwigsburg, Remseck am Neckar, Stuttgart, Heilbronn und
              Waiblingen. Auch Vorhaben in der angrenzenden Umgebung prüfen wir
              gerne persönlich.
            </p>
          </Reveal>
          <ul className="mt-14 grid list-none gap-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
            {regionBlocks.map((region, index) => (
              <li key={region.id} id={region.id}>
                <Reveal delayMs={index * 30}>
                  <div className="border-t border-line pt-7">
                    <h3 className="text-2xl font-medium text-balance text-ink">
                      {region.title}
                    </h3>
                    <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
                      {region.description}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {region.links.map((link) => (
                        <li key={link.href + link.label}>
                          {link.variant === "primary" ? (
                            <Link
                              href={link.href}
                              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <Link
                              href={link.href}
                              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="leistungen-heading"
        className="bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="leistungen-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Welche Projekte begleitet werden
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Die regionalen Schwerpunkte ergänzen die bestehenden Leistungen –
              damit Sie schneller den passenden Einstieg finden.
            </p>
          </Reveal>
          <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service, index) => (
              <li key={service.slug}>
                <Reveal delayMs={index * 25}>
                  <Link
                    href={service.href}
                    className="group block border-t border-line pt-5 outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-paper-dim"
                  >
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-ink-soft">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
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
        aria-labelledby="pruefung-heading"
        className="border-y border-line py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="pruefung-heading"
              className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              So wird das Einsatzgebiet geprüft
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Keine automatische Zusage und keine erfundenen Kilometergrenzen –
              die Einordnung erfolgt persönlich.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {checkSteps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35}>
                <li className="border-t border-line pt-6">
                  <span className="text-sm font-medium tracking-[0.1em] text-clay">
                    {String(index + 1).padStart(2, "0")}
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
        className="py-20 sm:py-28"
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
              Liegt Ihr Projekt in unserer Region?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Schildern Sie uns kurz Ihr Vorhaben und geben Sie Ihre
              Postleitzahl an. Wir prüfen persönlich, ob und wie wir Sie
              begleiten können.
            </p>
            <div className="mt-10">
              <Link
                href="/projekt-starten"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Projekt prüfen lassen
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
