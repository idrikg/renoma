import { Container } from "@/components/container";

export function PivotSection() {
  return (
    <section className="bg-ink py-32 sm:py-40">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-4xl font-medium tracking-tight text-paper sm:text-5xl">
            Wir kümmern uns.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-paper/60">
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
