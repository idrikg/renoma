import Link from "next/link";
import { Container } from "@/components/container";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Sie freuen sich auf Ihr neues Zuhause.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Wir kümmern uns um den Weg dorthin.
          </p>
          <div className="mt-8">
            <Link
              href="/projekt-starten"
              className="inline-flex rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Projekt starten
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">Persönlich. Klar. An Ihrer Seite.</p>
        </div>
      </Container>
    </section>
  );
}
