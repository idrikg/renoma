import { Container } from "@/components/container";

const benefits = [
  {
    title: "Ein Ansprechpartner",
    description: "Sie müssen nicht mehreren Handwerkern hinterhertelefonieren.",
  },
  {
    title: "Ein klarer Weg",
    description:
      "Sie wissen, was als Nächstes passiert und welche Entscheidungen anstehen.",
  },
  {
    title: "Ihre Wünsche im Mittelpunkt",
    description:
      "Ihre Vorstellungen gehen nicht zwischen verschiedenen Gewerken verloren.",
  },
  {
    title: "Mehr Zeit für Ihr Leben",
    description:
      "Während wir Ihr Projekt begleiten, behalten Sie Zeit für Arbeit, Familie und alles, was Ihnen wichtig ist.",
  },
  {
    title: "Erfahrung, auf die Sie zurückgreifen können",
    description:
      "Sie profitieren von eingespielten Abläufen und einem erfahrenen Netzwerk, ohne diese Erfahrungen selbst sammeln zu müssen.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-y border-line bg-paper-dim py-24 sm:py-32">
      <Container>
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Was sich für Sie ändert.
          </h2>
        </div>
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title}>
              <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
