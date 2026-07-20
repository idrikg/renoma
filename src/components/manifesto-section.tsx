import { Container } from "@/components/container";

export function ManifestoSection() {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-display-2 text-balance text-ink">
            Wir glauben, dass Renovieren{" "}
            <span className="text-sage-deep">Vorfreude auslösen darf.</span>
          </p>
          <p className="text-display-3 mt-8 text-balance text-ink">
            Wir glauben, dass aus vielen Entscheidungen ein klarer Weg
            werden kann.
          </p>
          <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-muted mx-auto sm:text-lg">
            Wir glauben, dass jedes Renovierungsprojekt einen persönlichen
            Ansprechpartner verdient, der zuhört, mitdenkt und sich
            kümmert.
          </p>
          <p className="mt-12 text-base leading-relaxed text-ink sm:text-lg">
            Deshalb begleiten wir Sie.
          </p>
          <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg">
            Persönlich.
            <br />
            Gemeinsam.
            <br />
            Von der ersten Idee bis zu Ihrem neuen Zuhause.
          </p>
        </div>
      </Container>
    </section>
  );
}
