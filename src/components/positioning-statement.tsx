import { Container } from "@/components/container";

export function PositioningStatement() {
  return (
    <section id="warum-renoma" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Wir stehen auf Ihrer Seite.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            RENOMA begleitet Ihr Renovierungsprojekt persönlich. Wir
            koordinieren die passenden Fachbetriebe, behalten den Ablauf im
            Blick und sorgen dafür, dass Ihre Wünsche während des gesamten
            Projekts im Mittelpunkt bleiben.
          </p>
          <p className="mt-6 text-lg font-medium leading-relaxed text-ink">
            Wir kümmern uns um Ihr Renovierungsprojekt, als wäre es unser
            eigenes.
          </p>
        </div>
      </Container>
    </section>
  );
}
