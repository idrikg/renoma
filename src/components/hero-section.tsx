import Link from "next/link";
import { Container } from "@/components/container";

const trustStatements = [
  "Persönlicher Ansprechpartner",
  "Wir stehen auf Ihrer Seite",
  "Erfahrenes Handwerkernetzwerk",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
      <Container>
        <div className="max-w-3xl">
          <p className="animate-fade-up text-sm font-medium tracking-[0.18em] text-clay uppercase">
            RENOMA
          </p>
          <h1 className="animate-fade-up animate-delay-1 mt-6 text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Ihr Renovierungsprojekt.
          </h1>
          <p className="animate-fade-up animate-delay-1 mt-4 max-w-xl text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
            Ihr Zuhause verdient Vorfreude statt Baustress.
          </p>
          <p className="animate-fade-up animate-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Sie freuen sich auf Ihr neues Zuhause.
            <br />
            Wir kümmern uns um den Weg dorthin.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/projekt-starten"
              className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Projekt starten
            </Link>
            <a
              href="#referenzen"
              className="text-[15px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-clay"
            >
              Referenzen ansehen
            </a>
          </div>
          <ul className="animate-fade-up animate-delay-3 mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            {trustStatements.map((statement) => (
              <li key={statement} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-clay" />
                {statement}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
