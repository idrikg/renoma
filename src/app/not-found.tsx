import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            404
          </p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
            Diese Seite konnten wir nicht finden.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Die aufgerufene Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/"
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
            >
              Zur Startseite
            </Link>
            <Link
              href="/projekt-starten"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              Projekt starten
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
