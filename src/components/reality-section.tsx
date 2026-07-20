import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export function RealitySection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-display-2 text-balance text-ink">
              Aus vielen Schritten wird ein klarer Weg.
            </h2>
          </Reveal>
          <Reveal delayMs={50} className="max-w-md lg:pt-3">
            <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Eine Renovierung besteht aus vielen Entscheidungen, Gewerken
              und Terminen. Wir bringen alles zusammen, behalten den
              Überblick und begleiten Sie persönlich – damit Sie sich auf
              Ihr neues Zuhause freuen können.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
