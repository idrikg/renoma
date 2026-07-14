import { Container } from "@/components/container";

export function ManifestoSection() {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-display-3 text-ink">
            Wir glauben, dass niemand seine Abende damit verbringen sollte,
            Handwerkern hinterherzutelefonieren.
          </p>
          <p className="text-display-3 mt-10 text-ink">
            Wir glauben, dass ein Zuhause Vorfreude auslösen sollte.{" "}
            <em className="text-clay not-italic">Nicht Baustress.</em>
          </p>
          <p className="text-display-3 mt-10 text-ink">
            Wir glauben, dass jedes Renovierungsprojekt einen persönlichen
            Ansprechpartner verdient.
          </p>
          <p className="mt-14 text-lg leading-relaxed text-muted">
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
