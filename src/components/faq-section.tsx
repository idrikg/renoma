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
    <section id="faq" className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Häufige Fragen.
          </h2>
          <dl className="divide-y divide-line">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6 first:pt-0">
                <dt className="text-lg font-medium text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
