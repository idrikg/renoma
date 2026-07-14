import { Container } from "@/components/container";

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
    <section className="border-y border-line bg-paper-dim py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Kundennutzen
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Was sich für Sie ändert.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
          {benefits.map((benefit) => (
            <div key={benefit.number} className="max-w-sm border-t border-line pt-6">
              <span className="text-sm font-medium tracking-[0.1em] text-clay">
                {benefit.number}
              </span>
              <h3 className="mt-3 text-lg font-medium text-ink">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* The fifth benefit closes the list deliberately, set apart from
            the 2x2 grid above rather than left dangling inside it. The
            oversized numeral gives it the weight of a conclusion. */}
        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-10 sm:mt-16 sm:flex-row sm:items-start sm:gap-10 sm:pt-12">
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
        </div>
      </Container>
    </section>
  );
}
