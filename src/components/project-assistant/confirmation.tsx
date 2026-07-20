import Link from "next/link";
import { Check } from "lucide-react";
import { hasPublishedReferences } from "@/lib/references-data";

const STATUS_STEPS = [
  "Anfrage eingegangen",
  "Persönliche Prüfung",
  "Kontaktaufnahme",
  "Gemeinsame Projektplanung",
];

const NEXT_STEPS = [
  {
    title: "Persönliche Prüfung",
    text: "Wir schauen uns Ihre Angaben individuell an und prüfen, welche nächsten Schritte für Ihr Projekt sinnvoll sind.",
  },
  {
    title: "Persönliche Kontaktaufnahme",
    text: "Ein Ansprechpartner von RENOMA meldet sich telefonisch oder per E-Mail bei Ihnen.",
  },
  {
    title: "Gemeinsame Projektplanung",
    text: "Anschließend besprechen wir gemeinsam die passende Vorgehensweise für Ihr Renovierungsprojekt.",
  },
];

export function Confirmation() {
  const showReferencesCta = hasPublishedReferences();

  return (
    <div role="status" aria-live="polite" className="text-center">
      <div
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-soft-sage"
      >
        <Check className="h-6 w-6 text-sage-deep" strokeWidth={2.5} />
      </div>

      <h1 className="text-display-2 mt-6 text-ink">Vielen Dank für Ihr Vertrauen.</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Ihre Projektanfrage ist erfolgreich bei RENOMA eingegangen.
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Wir prüfen Ihre Angaben nun persönlich und melden uns zeitnah bei Ihnen.
      </p>

      {/* Status stepper: stacked rows on mobile, connected horizontal steps
          from sm upward. Only the first step is visually complete — the
          others are upcoming, never implied as already in progress. */}
      <ol
        aria-label="Ihr Anfragestatus"
        className="mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-start sm:gap-0"
      >
        {STATUS_STEPS.map((label, index) => {
          const isDone = index === 0;
          const isFirst = index === 0;
          const isLast = index === STATUS_STEPS.length - 1;
          return (
            <li
              key={label}
              className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-3"
            >
              <div className="flex items-center sm:w-full">
                <span
                  aria-hidden="true"
                  className={`hidden h-px flex-1 sm:block ${isFirst ? "bg-transparent" : "bg-line"}`}
                />
                <span
                  className={
                    isDone
                      ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-deep text-paper"
                      : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm font-medium text-muted"
                  }
                >
                  {isDone ? (
                    <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`hidden h-px flex-1 sm:block ${isLast ? "bg-transparent" : "bg-line"}`}
                />
              </div>
              <span
                className={`text-sm font-medium sm:text-center ${isDone ? "text-ink" : "text-muted"}`}
              >
                {label}
                {isDone && <span className="sr-only"> — abgeschlossen</span>}
              </span>
            </li>
          );
        })}
      </ol>

      <section
        aria-labelledby="was-passiert-heading"
        className="mt-12 rounded-2xl border border-line bg-paper p-6 text-left sm:p-8"
      >
        <h2 id="was-passiert-heading" className="text-lg font-medium text-ink sm:text-xl">
          Was passiert als Nächstes?
        </h2>
        <ol className="mt-6 flex flex-col gap-6">
          {NEXT_STEPS.map((item, index) => (
            <li key={item.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-clay/30 text-sm font-medium text-clay">
                {index + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-medium text-ink">{item.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-line pt-5 text-[15px] text-muted">
          Bis dahin brauchen Sie nichts weiter zu tun.
        </p>
      </section>

      <section
        aria-labelledby="unterlagen-heading"
        className="mt-6 rounded-2xl border border-line bg-paper-dim p-6 text-left sm:p-8"
      >
        <h2 id="unterlagen-heading" className="text-lg font-medium text-ink sm:text-xl">
          Haben Sie noch Unterlagen, Bilder oder Grundrisse zu Ihrem Projekt?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Antworten Sie einfach auf unsere Bestätigungsmail oder senden Sie die
          Unterlagen an{" "}
          <a
            href="mailto:kontakt@renoma-zuhause.de"
            className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
          >
            kontakt@renoma-zuhause.de
          </a>
          .
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
        >
          Zur Startseite
        </Link>
        {showReferencesCta && (
          <Link
            href="/#referenzen"
            className="inline-flex w-full items-center justify-center rounded-full border border-line px-7 py-3.5 text-[15px] font-medium text-ink outline-none transition-colors hover:border-clay hover:text-clay focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
          >
            Referenzen ansehen
          </Link>
        )}
      </div>
    </div>
  );
}
