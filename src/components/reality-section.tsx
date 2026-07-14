import { Container } from "@/components/container";

export function RealitySection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <h2 className="text-display-2 text-ink">
            Renovieren sollte kein Vollzeitjob sein.
          </h2>
          <div className="max-w-md space-y-5 text-lg leading-relaxed text-muted lg:pt-3">
            <p>Verschiedene Gewerke. Unterschiedliche Termine. Viele Entscheidungen.</p>
            <p>Sie können all das selbst koordinieren.</p>
            <p className="text-ink">
              Oder Sie übergeben den Weg zu Ihrem neuen Zuhause einem
              Partner, der sich darum kümmert.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
