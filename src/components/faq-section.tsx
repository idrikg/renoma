import { Container } from "@/components/container";

const faqs = [
  {
    question: "Was kostet das Erstgespräch?",
    answer:
      "Nichts. Wir hören uns Ihr Projekt an, bevor über irgendetwas gesprochen wird, das Sie etwas kostet.",
  },
  {
    question: "Muss ich schon genaue Pläne haben?",
    answer:
      "Nein. Eine Idee reicht. Die Konkretisierung ist Teil unserer gemeinsamen Arbeit.",
  },
  {
    question: "Übernehmen Sie auch die Koordination der Handwerker?",
    answer:
      "Ja, vollständig. Sie sprechen mit uns – wir sprechen mit allen Gewerken.",
  },
  {
    question: "Wie schnell bekomme ich eine Rückmeldung?",
    answer: "Schnellstmöglich, persönlich – nicht automatisiert.",
  },
  {
    question: "Was, wenn sich meine Vorstellungen während des Projekts ändern?",
    answer:
      "Das ist normal und passiert häufig. Wir passen den Plan an, ohne dass Sie den Überblick verlieren.",
  },
  {
    question: "Ist RENOMA eine Vermittlungsplattform?",
    answer:
      "Nein. RENOMA ist kein Vergleichsportal. Sie haben einen persönlichen Ansprechpartner, der Ihr Projekt begleitet und die beteiligten Fachbetriebe koordiniert.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Häufige Fragen.
          </h2>
          <div className="divide-y divide-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5 first:pt-0">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-clay">
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
  );
}
