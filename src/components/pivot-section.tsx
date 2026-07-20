import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export function PivotSection() {
  return (
    <section className="bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-lg text-center">
          <p className="text-display-1 text-balance text-paper">Wir kümmern uns.</p>
          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-paper/60 sm:mt-7 sm:text-lg">
            Um Ihr Projekt.
            <br />
            Um die Abstimmung.
            <br />
            Um den Weg zu Ihrem neuen Zuhause.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
