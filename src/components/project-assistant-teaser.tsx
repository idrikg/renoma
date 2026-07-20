import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export function ProjectAssistantTeaser() {
  return (
    <section className="section-handoff border-t border-line bg-paper-dim py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-md">
            <h2 className="text-xl font-medium text-ink sm:text-2xl">
              Erzählen Sie uns von Ihrem Projekt.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Ein paar Angaben genügen. Danach schauen wir uns Ihr Vorhaben
              persönlich an und melden uns bei Ihnen.
            </p>
          </div>
          <Link
            href="/projekt-starten"
            className="flex w-full shrink-0 items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim sm:w-auto"
          >
            Projekt starten
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
