import { Container } from "@/components/container";

const steps = [
  {
    number: "01",
    title: "Sie erzählen uns von Ihrem Zuhause.",
    description:
      "Wir hören zu, was Sie verändern möchten und was Ihnen dabei wichtig ist.",
  },
  {
    number: "02",
    title: "Gemeinsam entsteht ein klarer Plan.",
    description:
      "Wir strukturieren das Projekt, die passenden Gewerke und die nächsten Entscheidungen.",
  },
  {
    number: "03",
    title: "Wir kümmern uns um den Weg.",
    description:
      "Wir koordinieren Kommunikation, Termine und den vereinbarten Ablauf.",
  },
  {
    number: "04",
    title: "Sie bleiben informiert.",
    description: "Sie wissen jederzeit, was gerade passiert und was als Nächstes folgt.",
  },
  {
    number: "05",
    title: "Sie freuen sich auf das Ergebnis.",
    description:
      "Wir begleiten das Projekt, bis Ihr neues Zuhause Gestalt annimmt.",
  },
];

export function ProcessSection() {
  return (
    <section id="ablauf" className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            So begleiten wir Ihr Projekt.
          </h2>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-line pt-6">
              <span className="text-sm font-medium tracking-[0.1em] text-clay">
                {step.number}
              </span>
              <h3 className="mt-3 text-xl font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
