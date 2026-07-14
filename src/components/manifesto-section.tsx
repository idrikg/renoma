import { Container } from "@/components/container";

export function ManifestoSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center text-2xl font-medium leading-[1.5] tracking-tight text-ink sm:text-3xl">
          <p>
            Wir glauben, dass niemand seine Abende damit verbringen sollte,
            Handwerkern hinterherzutelefonieren.
          </p>
          <p className="mt-8">
            Wir glauben, dass ein Zuhause Vorfreude auslösen sollte. Nicht
            Baustress.
          </p>
          <p className="mt-8">
            Wir glauben, dass jedes Renovierungsprojekt einen persönlichen
            Ansprechpartner verdient.
          </p>
          <p className="mt-10 text-muted">
            Deshalb kümmern wir uns.
            <br />
            Gemeinsam mit Ihnen.
            <br />
            Von der ersten Idee bis zu Ihrem neuen Zuhause.
          </p>
        </div>
      </Container>
    </section>
  );
}
