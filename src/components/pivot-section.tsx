import { Container } from "@/components/container";

export function PivotSection() {
  return (
    <section className="bg-ink py-28 sm:py-32">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-display-1 text-paper">Wir kümmern uns.</p>
          <p className="mx-auto mt-7 max-w-sm text-lg leading-relaxed text-paper/60">
            Um Ihr Projekt.
            <br />
            Um die Abstimmung.
            <br />
            Um den Weg zu Ihrem neuen Zuhause.
          </p>
        </div>
      </Container>
    </section>
  );
}
