import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export function PositioningStatement() {
  return (
    <section id="warum-renoma" className="scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-display-2 text-balance text-ink">
              Wir stehen auf Ihrer Seite.
            </h2>
          </Reveal>
          <Reveal delayMs={50} className="max-w-xl lg:pt-3">
            <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
              RENOMA begleitet Ihr Renovierungsprojekt persönlich. Wir
              koordinieren die passenden Fachbetriebe, behalten den Ablauf im
              Blick und sorgen dafür, dass Ihre Wünsche während des gesamten
              Projekts im Mittelpunkt bleiben.
            </p>
            <p className="text-display-3 mt-8 text-balance border-l-2 border-clay pl-6 text-ink italic">
              Wir kümmern uns um Ihr Renovierungsprojekt, als wäre es unser
              eigenes.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
