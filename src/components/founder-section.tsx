import { Container } from "@/components/container";

export function FounderSection() {
  return (
    <section id="ueber-renoma" className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Persönlich begleitet.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            RENOMA wurde aus einer einfachen Überzeugung gegründet: Eine
            Renovierung sollte nicht daran scheitern, dass niemand den
            Überblick behält.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Deshalb begleiten wir Projekte persönlich, hören zu und kümmern
            uns darum, dass aus vielen einzelnen Aufgaben ein gemeinsamer
            Weg entsteht.
          </p>
        </div>
      </Container>
    </section>
  );
}
