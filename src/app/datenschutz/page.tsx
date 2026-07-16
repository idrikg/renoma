import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/container";
import { formatOperatorAddress, getContactEmail, legalConfig } from "@/lib/legal-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Website RENOMA — betrieben von GOGO Natursteine & Fliesen.",
};

export default function DatenschutzPage() {
  const contactEmail = getContactEmail();
  const operatorAddress = formatOperatorAddress();

  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Datenschutzerklärung
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {legalConfig.brandNotice} Diese Erklärung beschreibt, welche personenbezogenen
            Daten auf {legalConfig.siteUrl} verarbeitet werden — ausschließlich im
            technisch erforderlichen Umfang.
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink">
            <section>
              <h2 className="text-lg font-medium text-ink">1. Verantwortlicher</h2>
              <p className="mt-2 text-muted">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p className="mt-3">
                {legalConfig.ownerName}
                <br />
                {legalConfig.operatorName}
                <br />
                {legalConfig.streetAddress}
                <br />
                {legalConfig.postalCode} {legalConfig.city}
                <br />
                {legalConfig.country}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                2. Hosting und Server-Logfiles
              </h2>
              <p className="mt-2 text-muted">
                Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina,
                CA 91723, USA („Vercel“) gehostet. Beim Aufruf der Website werden
                automatisch Server-Logfiles erzeugt. Dabei können insbesondere folgende
                Daten verarbeitet werden:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>aufgerufene URL und HTTP-Statuscode</li>
                <li>Browsertyp und -version</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
              </ul>
              <p className="mt-3 text-muted">
                <strong className="font-medium text-ink">Rechtsgrundlage:</strong> Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und
                stabilen Betrieb der Website).
              </p>
              <p className="mt-3 text-muted">
                <strong className="font-medium text-ink">Speicherdauer:</strong> Die
                Logdaten werden von Vercel nur so lange gespeichert, wie dies für den
                Betrieb und die Sicherheit der Website erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                3. Kontaktformular und Projekt-Funnel
              </h2>
              <p className="mt-2 text-muted">
                Über den Projekt-Assistenten unter{" "}
                <a href="/projekt-starten" className="underline underline-offset-4 hover:text-clay">
                  /projekt-starten
                </a>{" "}
                können Sie uns eine Projektanfrage übermitteln. Dabei werden
                insbesondere folgende personenbezogene Daten verarbeitet:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>gewählte Renovierungsbereiche</li>
                <li>Angaben zum Objekt (Postleitzahl, Ort, Objektart, optional Fläche und Baujahr)</li>
                <li>gewünschter Projektstart und Investitionsrahmen</li>
                <li>Vorname, Nachname, E-Mail-Adresse</li>
                <li>optional Telefonnummer und bevorzugter Kontaktweg</li>
                <li>optionale Freitext-Wünsche</li>
                <li>Anzahl ausgewählter Bilder (ohne Übermittlung der Bilddateien selbst)</li>
              </ul>
              <p className="mt-3 text-muted">
                Optional ausgewählte Bilder werden ausschließlich lokal in Ihrem Browser
                zur Vorschau gehalten und nicht an unsere Server übertragen.
              </p>
              <p className="mt-3 text-muted">
                <strong className="font-medium text-ink">Rechtsgrundlage:</strong> Art. 6
                Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. Durchführung vorvertraglicher
                Maßnahmen auf Ihre Anfrage hin) sowie Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an einer effizienten Bearbeitung von Anfragen).
              </p>
              <p className="mt-3 text-muted">
                <strong className="font-medium text-ink">Speicherdauer:</strong> Wir
                speichern Anfragedaten nur so lange, wie dies zur Bearbeitung Ihres
                Anliegens sowie zur Erfüllung gesetzlicher Aufbewahrungspflichten
                erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">4. Formularübermittlung</h2>
              <p className="mt-2 text-muted">
                Die im Projekt-Funnel eingegebenen Daten werden über eine Server Action
                (serverseitige Verarbeitung) an unseren Server übermittelt, dort validiert
                und zur Bearbeitung Ihrer Anfrage weiterverwendet. Die Verarbeitung
                erfolgt auf der Infrastruktur von Vercel.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">
                5. Session Storage
              </h2>
              <p className="mt-2 text-muted">
                Damit Ihre Eingaben im Projekt-Funnel bei einem versehentlichen Neuladen
                der Seite innerhalb derselben Browser-Sitzung nicht verloren gehen,
                speichern wir Ihre bisherigen Formulardaten temporär im{" "}
                <strong className="font-medium text-ink">sessionStorage</strong> Ihres
                Browsers. Der Speicher wird beim Schließen des Browser-Tabs oder -Fensters
                gelöscht. Es werden keine Bilddateien im sessionStorage gespeichert.
              </p>
              <p className="mt-3 text-muted">
                <strong className="font-medium text-ink">Rechtsgrundlage:</strong> Art. 6
                Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer nutzerfreundlichen
                Formularführung).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">6. E-Mail-Versand (Resend)</h2>
              <p className="mt-2 text-muted">
                Zur Bearbeitung Ihrer Anfrage versenden wir E-Mails über Resend, Inc.
                (USA). Dabei werden:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>eine interne Benachrichtigung an unsere hinterlegte Geschäfts-E-Mail-Adresse versendet</li>
                <li>eine Bestätigungs-E-Mail an die von Ihnen angegebene Adresse versendet</li>
              </ul>
              <p className="mt-3 text-muted">
                Resend verarbeitet die für den Versand erforderlichen Daten (insbesondere
                Name, E-Mail-Adresse und Inhalt der Anfrage) in unserem Auftrag. Mit
                Resend wird — soweit erforderlich — ein Auftragsverarbeitungsvertrag
                gemäß Art. 28 DSGVO abgeschlossen bzw. über Standardverträge abgedeckt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">7. Ihre Rechte</h2>
              <p className="mt-2 text-muted">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
                personenbezogenen Daten:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
                <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-ink">8. Kontakt</h2>
              <p className="mt-2 text-muted">
                Für Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie
                uns unter:
              </p>
              <p className="mt-3">
                {legalConfig.operatorName}
                <br />
                {legalConfig.streetAddress}
                <br />
                {legalConfig.postalCode} {legalConfig.city}
                <br />
                E-Mail:{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-4 hover:text-clay"
                >
                  {contactEmail}
                </a>
                <br />
                Telefon: {legalConfig.phone}
              </p>
              <p className="mt-3 text-muted">
                Stand dieser Datenschutzerklärung: Juli 2026
                <br />
                Verantwortlicher: {legalConfig.operatorName}, {operatorAddress}
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
