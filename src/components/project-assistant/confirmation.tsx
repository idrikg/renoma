import Link from "next/link";

export function Confirmation() {
  return (
    <div role="status" aria-live="polite" className="text-center">
      <h1 className="text-display-2 text-ink">Willkommen bei RENOMA.</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Vielen Dank für Ihr Vertrauen.
        <br />
        Ab jetzt stehen wir auf Ihrer Seite.
        <br />
        Ihr persönlicher Ansprechpartner meldet sich schnellstmöglich bei
        Ihnen.
      </p>
      <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-line bg-paper-dim px-6 py-5 text-left">
        <p className="text-sm font-medium tracking-[0.04em] text-muted uppercase">
          Was jetzt passiert
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink">
          Wir sehen uns Ihre Angaben persönlich an und melden uns über den
          von Ihnen gewählten Kontaktweg. Sie müssen bis dahin nichts
          weiter tun.
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-block rounded-sm text-[15px] font-medium text-muted underline underline-offset-4 outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-clay"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
