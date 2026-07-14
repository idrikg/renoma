import { Container } from "@/components/container";

export function RealitySection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            Renovieren sollte kein Vollzeitjob sein.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Verschiedene Gewerke. Unterschiedliche Termine. Viele
            Entscheidungen.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Sie können all das selbst koordinieren.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            Oder Sie übergeben den Weg zu Ihrem neuen Zuhause einem Partner,
            der sich darum kümmert.
          </p>
        </div>
      </Container>
    </section>
  );
}
