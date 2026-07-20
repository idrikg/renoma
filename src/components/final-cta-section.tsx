import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-display-2 text-balance text-ink">
            Erzählen Sie uns, was Sie verändern möchten.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Wir schauen uns Ihr Vorhaben persönlich an und besprechen gemeinsam
            die nächsten Schritte.
          </p>
          <div className="mt-9 flex justify-center sm:mt-10">
            <Link
              href="/projekt-starten"
              className="flex w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Projekt starten
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">Persönlich. Klar. An Ihrer Seite.</p>
        </Reveal>
      </Container>
    </section>
  );
}
