import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

const firstRow = [
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
];

const secondRow = [
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

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="border-t border-line pt-6">
      <span className="text-sm font-medium tracking-[0.1em] text-clay">{number}</span>
      <h3 className="mt-3 text-xl font-medium text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="ablauf" className="scroll-mt-24 py-16 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            So begleiten wir Ihr Projekt.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-6">
          {firstRow.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 60} className="lg:col-span-2">
              <StepCard {...step} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-6">
          {secondRow.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 60} className="lg:col-span-3">
              <StepCard {...step} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
