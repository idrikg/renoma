import Link from "next/link";
import { Container } from "@/components/container";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-display-2 text-ink">
            Sie freuen sich auf Ihr neues Zuhause.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Wir kümmern uns um den Weg dorthin.
          </p>
          <div className="mt-10">
            <Link
              href="/projekt-starten"
              className="inline-flex rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Projekt starten
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">Persönlich. Klar. An Ihrer Seite.</p>
        </div>
      </Container>
    </section>
  );
}
