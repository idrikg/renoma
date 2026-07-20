import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

const benefits = [
  {
    number: "01",
    title: "Ein Ansprechpartner",
    description: "Sie müssen nicht mehreren Handwerkern hinterhertelefonieren.",
  },
  {
    number: "02",
    title: "Ein klarer Weg",
    description:
      "Sie wissen, was als Nächstes passiert und welche Entscheidungen anstehen.",
  },
  {
    number: "03",
    title: "Ihre Wünsche im Mittelpunkt",
    description:
      "Ihre Vorstellungen gehen nicht zwischen verschiedenen Gewerken verloren.",
  },
  {
    number: "04",
    title: "Mehr Zeit für Ihr Leben",
    description:
      "Während wir Ihr Projekt begleiten, behalten Sie Zeit für Arbeit, Familie und alles, was Ihnen wichtig ist.",
  },
];

const closingBenefit = {
  number: "05",
  title: "Erfahrung, auf die Sie zurückgreifen können",
  description:
    "Sie profitieren von eingespielten Abläufen und einem erfahrenen Netzwerk, ohne diese Erfahrungen selbst sammeln zu müssen.",
};

export function BenefitsSection() {
  return (
    <section className="section-handoff border-y border-line bg-paper-dim py-16 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Kundennutzen
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Was sich für Sie ändert.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-y-14">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.number} delayMs={index * 50} className="max-w-sm border-t border-line pt-6">
              <span className="text-sm font-medium tracking-[0.1em] text-clay">
                {benefit.number}
              </span>
              <h3 className="mt-3 text-lg font-medium text-ink">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={80} className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:mt-16 sm:flex-row sm:items-start sm:gap-10 sm:pt-12">
          <span className="shrink-0 text-4xl font-medium text-clay sm:text-5xl">
            {closingBenefit.number}
          </span>
          <div className="max-w-xl">
            <h3 className="text-xl font-medium text-ink sm:text-2xl">
              {closingBenefit.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {closingBenefit.description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
