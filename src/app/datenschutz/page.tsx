import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von RENOMA gemäß Art. 13 DSGVO.",
};

/**
 * PLACEHOLDER CONTENT — do not launch publicly with bracketed values.
 * Replace every [PLATZHALTER] with real, legally reviewed content before
 * this site goes live. Consider having a lawyer or a service like
 * eRecht24 review the final text. See MVP-SCOPE.md.
 */
export default function DatenschutzPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Datenschutzerklärung
          </h1>

          <div className="mt-4 rounded-xl border border-clay-soft bg-paper-dim px-5 py-4 text-sm leading-relaxed text-muted">
            Diese Datenschutzerklärung enthält Platzhalter und ist nicht
            veröffentlichungsfähig. Alle Felder in eckigen Klammern müssen
            vor dem öffentlichen Launch durch die echten Angaben ersetzt
            und im Zweifel juristisch geprüft werden.
          </div>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-medium text-ink">
                1. Verantwortlicher
              </h2>
              <p className="mt-2 text-muted">
                Verantwortlicher im Sinne der DSGVO ist:
                <br />
                [FIRMENNAME GmbH], [STRASSE], [PLZ ORT], [E-MAIL-ADRESSE]
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                2. Erhebung und Verarbeitung von Daten über das Anfrageformular
              </h2>
              <p className="mt-2 text-muted">
                Wenn Sie unser Anfrageformular nutzen, verarbeiten wir die
                von Ihnen angegebenen Daten (Name, E-Mail-Adresse,
                optional Telefonnummer, Projektart und Nachricht)
                ausschließlich, um Ihre Anfrage zu bearbeiten und mit Ihnen
                über Ihr Projekt in Kontakt zu treten. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                effizienten Bearbeitung von Anfragen).
              </p>
              <p className="mt-3 text-muted">
                Die Übermittlung erfolgt technisch über den
                E-Mail-Dienstleister [RESEND / E-MAIL-DIENSTLEISTER
                EINTRAGEN], mit dem ein Auftragsverarbeitungsvertrag gemäß
                Art. 28 DSGVO besteht bzw. abzuschließen ist.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                3. Speicherdauer
              </h2>
              <p className="mt-2 text-muted">
                Wir speichern die im Rahmen einer Anfrage übermittelten
                Daten nur so lange, wie es zur Bearbeitung Ihrer Anfrage
                sowie zur Erfüllung gesetzlicher Aufbewahrungspflichten
                erforderlich ist. [KONKRETE FRIST ERGÄNZEN, FALLS BEKANNT]
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                4. Ihre Rechte
              </h2>
              <p className="mt-2 text-muted">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung
                und Einschränkung der Verarbeitung Ihrer Daten sowie ein
                Recht auf Datenübertragbarkeit und Widerspruch. Wenden Sie
                sich dazu an: [E-MAIL-ADRESSE].
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                5. Hosting
              </h2>
              <p className="mt-2 text-muted">
                Diese Website wird bei Vercel Inc. gehostet. Beim Besuch
                der Website verarbeitet Vercel technisch notwendige Daten
                (z. B. IP-Adresse) zur Auslieferung der Seite. [DETAILS
                ZUM HOSTING-ANBIETER UND ETWAIGEN COOKIES/ANALYTICS
                ERGÄNZEN, SOBALD FESTGELEGT]
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                6. Beschwerderecht
              </h2>
              <p className="mt-2 text-muted">
                Sie haben das Recht, sich bei einer
                Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
                personenbezogenen Daten durch uns zu beschweren.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
