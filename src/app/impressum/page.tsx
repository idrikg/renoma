import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von RENOMA gemäß § 5 TMG / § 5 DDG.",
};

/**
 * PLACEHOLDER CONTENT — do not launch publicly with bracketed values.
 * Replace every [PLATZHALTER] with the real, legally accurate business
 * details before this site goes live. See MVP-SCOPE.md.
 */
export default function ImpressumPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Impressum
          </h1>

          <div className="mt-4 rounded-xl border border-clay-soft bg-paper-dim px-5 py-4 text-sm leading-relaxed text-muted">
            Dieses Impressum enthält Platzhalter und ist nicht
            veröffentlichungsfähig. Alle Felder in eckigen Klammern müssen
            vor dem öffentlichen Launch durch die echten Unternehmensdaten
            ersetzt werden.
          </div>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink">
            <section>
              <h2 className="text-base font-medium text-muted">
                Angaben gemäß § 5 TMG / § 5 DDG
              </h2>
              <p className="mt-2">
                [FIRMENNAME GmbH]
                <br />
                [STRASSE UND HAUSNUMMER]
                <br />
                [PLZ ORT]
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Vertreten durch</h2>
              <p className="mt-2">[NAME DER GESCHÄFTSFÜHRUNG]</p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Kontakt</h2>
              <p className="mt-2">
                Telefon: [TELEFONNUMMER]
                <br />
                E-Mail: [E-MAIL-ADRESSE]
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Registereintrag</h2>
              <p className="mt-2">
                Eintragung im Handelsregister.
                <br />
                Registergericht: [REGISTERGERICHT]
                <br />
                Registernummer: [HANDELSREGISTERNUMMER]
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Umsatzsteuer-ID</h2>
              <p className="mt-2">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz: [USt-IdNr.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-2">
                [NAME]
                <br />
                [ANSCHRIFT WIE OBEN]
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">
                EU-Streitschlichtung
              </h2>
              <p className="mt-2">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="underline underline-offset-4 hover:text-clay"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
