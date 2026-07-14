import Link from "next/link";
import { Container } from "@/components/container";

export function ProjectAssistantTeaser() {
  return (
    <section className="border-t border-line bg-paper-dim py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Erzählen Sie uns von Ihrem Projekt.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Ein paar Angaben genügen. Danach schauen wir uns Ihr Vorhaben
            persönlich an und melden uns bei Ihnen.
          </p>
          <div className="mt-8">
            <Link
              href="/projekt-starten"
              className="inline-flex rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Projekt starten
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
