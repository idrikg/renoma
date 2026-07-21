import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import {
  getDetailImages,
  getPublishedReferenceBySlug,
  getReferenceCover,
  getReferenceHighlights,
  getReferenceTeaser,
} from "@/lib/references-data";

const REFERENCE_SLUG = "badezimmer-detailmodernisierung";

const scopeAreas = [
  "Planung der gewünschten Raumwirkung",
  "Wand- und Bodenflächen",
  "Fliesenarbeiten",
  "Waschplatz und Sanitärelemente",
  "Dusche beziehungsweise Badewannenbereich",
  "Ablagen, Nischen und Übergänge",
  "Beleuchtung und funktionale Details",
  "Abstimmung einzelner Materialien und Oberflächen",
  "sorgfältige Ausführung von Anschlüssen und Kanten",
];

const processSteps = [
  {
    number: "01",
    title: "Vorstellungen mitteilen",
    description:
      "Sie erzählen uns, was Sie verändern möchten und welche Wünsche Ihnen wichtig sind.",
  },
  {
    number: "02",
    title: "Projekt gemeinsam einordnen",
    description:
      "Wir schauen uns Ihre Angaben persönlich an und besprechen die möglichen nächsten Schritte.",
  },
  {
    number: "03",
    title: "Umsetzung vorbereiten",
    description:
      "Gestaltung, Leistungen und Ausführungsdetails werden passend zum Projekt abgestimmt.",
  },
  {
    number: "04",
    title: "Persönlich begleitet bleiben",
    description: "Während des Projekts haben Sie einen festen Ansprechpartner.",
  },
];

const trustPoints = [
  "persönlicher Ansprechpartner",
  "klare Abstimmung",
  "Begleitung vom ersten Gespräch an",
];

const faqs = [
  {
    question: "Muss ein Badezimmer immer vollständig erneuert werden?",
    answer:
      "Nicht zwingend. Je nach Zustand, Wunsch und Umfang können sowohl vollständige Modernisierungen als auch gezielte Veränderungen sinnvoll sein.",
  },
  {
    question: "Kann ich Bilder oder einen Grundriss mitschicken?",
    answer:
      "Ja. Bilder, Grundrisse und vorhandene Unterlagen helfen dabei, das Vorhaben besser einzuordnen.",
  },
  {
    question: "Wann sollte ich RENOMA kontaktieren?",
    answer:
      "Am besten sobald erste Vorstellungen bestehen. Das Projekt muss zu diesem Zeitpunkt noch nicht vollständig geplant sein.",
  },
  {
    question: "Was passiert nach meiner Anfrage?",
    answer:
      "RENOMA prüft die Angaben persönlich und meldet sich, um die möglichen nächsten Schritte zu besprechen.",
  },
];

/**
 * Server-rendered Badmodernisierung service page. Reference imagery and
 * copy pull from the published project data — no invented project facts.
 */
export function BadmodernisierungPage() {
  const reference = getPublishedReferenceBySlug(REFERENCE_SLUG);
  const cover = reference ? getReferenceCover(reference) : null;
  const teaser = reference ? getReferenceTeaser(reference) : null;
  const highlights = reference
    ? getReferenceHighlights(reference).slice(0, 3)
    : [];
  const detailImages = reference ? getDetailImages(reference).slice(0, 4) : [];
  const projectHref = `/referenzen/${REFERENCE_SLUG}`;

  return (
    <article>
      {/* A. Hero — no Reveal on first viewport */}
      <header className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <Container>
          <div className="grid items-center gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-[0.18em] text-clay uppercase">
                Badmodernisierung
              </p>
              <h1 className="mt-5 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Ein Badezimmer, das zu Ihrem Zuhause passt.
              </h1>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Ob vollständige Modernisierung oder gezielte Veränderung: RENOMA
                begleitet Ihr Badprojekt persönlich und sorgt für einen klaren,
                unkomplizierten Ablauf.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
                <Link
                  href="/projekt-starten"
                  className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
                >
                  Badprojekt starten
                </Link>
                {reference && (
                  <Link
                    href={projectHref}
                    className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Referenz ansehen
                  </Link>
                )}
              </div>
            </div>

            {cover && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-greige sm:aspect-[5/6] lg:aspect-[4/5] lg:rounded-[1.75rem]">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 80vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        </Container>
      </header>

      {/* B. Why bathroom modernization needs structure */}
      <section
        aria-labelledby="klarer-weg-heading"
        className="border-t border-line py-20 sm:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <h2
                id="klarer-weg-heading"
                className="text-display-2 text-balance text-ink"
              >
                Viele Entscheidungen. Ein klarer Weg.
              </h2>
            </Reveal>
            <Reveal delayMs={50} className="max-w-xl lg:pt-3">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Bei einer Badmodernisierung müssen Gestaltung, Funktion,
                Materialien und einzelne Ausführungsdetails zusammenspielen.
              </p>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                RENOMA hilft dabei, die einzelnen Entscheidungen zu strukturieren
                und das Vorhaben verständlich aufzubauen – damit aus vielen
                Einzelheiten ein klarer nächster Schritt wird.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* C. What RENOMA can accompany */}
      <section
        aria-labelledby="bereiche-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="bereiche-heading"
              className="text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
            >
              Was bei Ihrer Badmodernisierung wichtig werden kann.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Je nach Projekt können unter anderem folgende Bereiche
              berücksichtigt werden.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:mt-14">
            {scopeAreas.map((item, index) => (
              <Reveal key={item} delayMs={index * 30}>
                <li className="border-t border-line pt-5 text-[15px] leading-relaxed text-ink sm:text-base">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* D. Process */}
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
              So beginnt Ihr Badprojekt.
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

      {/* E. Real reference project */}
      {reference && cover && teaser && (
        <section
          aria-labelledby="referenz-heading"
          className="border-t border-line bg-paper-dim py-20 sm:py-28"
        >
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-greige sm:aspect-[5/6] lg:aspect-[4/5]">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, (min-width: 640px) 80vw, 100vw"
                    className="object-cover object-center"
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
                  {reference.title}
                </h2>
                <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {teaser}
                </p>
                {highlights.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-relaxed text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-9">
                  <Link
                    href={projectHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-7 py-3 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
                  >
                    Projekt ansehen
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* F. Detail images */}
      {detailImages.length > 0 && (
        <section
          aria-labelledby="details-heading"
          className="py-20 sm:py-28"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <h2
                id="details-heading"
                className="text-3xl font-medium tracking-tight text-ink sm:text-4xl"
              >
                Details, die den Unterschied machen.
              </h2>
            </Reveal>

            <div
              className={`mt-12 grid gap-6 sm:mt-14 sm:gap-8 ${
                detailImages.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {detailImages.map((image, index) => (
                <Reveal key={image.src} delayMs={index * 40}>
                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4] lg:aspect-[4/5]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* G. Trust */}
      <section
        aria-labelledby="vertrauen-heading"
        className="border-t border-line bg-paper-dim py-20 sm:py-28"
      >
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2
              id="vertrauen-heading"
              className="text-display-2 text-balance text-ink"
            >
              Wir kümmern uns. Einfach. Unkompliziert.
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Sie müssen nicht jede Entscheidung allein treffen. RENOMA begleitet
              Sie persönlich und hilft dabei, aus Ihren Vorstellungen einen
              klaren nächsten Schritt zu machen.
            </p>
            <ul className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="text-[15px] font-medium text-ink"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* H. FAQ — no structured data */}
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
                Häufige Fragen.
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

      {/* I. Closing CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Was möchten Sie in Ihrem Badezimmer verändern?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Erzählen Sie uns von Ihrem Vorhaben. Wir schauen uns Ihre Angaben
              persönlich an und melden uns bei Ihnen.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/projekt-starten"
                className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
              >
                Badprojekt starten
              </Link>
              <Link
                href="/#referenzen"
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                Weitere Projekte ansehen
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
