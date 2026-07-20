import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/container";
import { legalConfig, getContactEmail } from "@/lib/legal-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Website RENOMA — betrieben von GOGO Natursteine & Fliesen.",
  alternates: {
    canonical: "/impressum",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  const contactEmail = getContactEmail();

  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Impressum
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Rechtlicher Betreiber dieser Website ist {legalConfig.operatorName}. RENOMA
            ist keine eigenständige Firma, sondern eine Marke der {legalConfig.operatorName}.
          </p>

          <p className="mt-6 text-[15px] font-medium leading-relaxed text-ink">
            {legalConfig.contractNotice}
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink">
            <section>
              <h2 className="text-base font-medium text-muted">
                Angaben gemäß § 5 TMG / § 5 DDG
              </h2>
              <p className="mt-2">
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
              <h2 className="text-base font-medium text-muted">Vertreten durch</h2>
              <p className="mt-2">{legalConfig.ownerName} (Inhaber)</p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Kontakt</h2>
              <p className="mt-2">
                Telefon:{" "}
                <a
                  href={`tel:${legalConfig.phoneInternational.replace(/\s/g, "")}`}
                  className="underline underline-offset-4 hover:text-clay"
                >
                  {legalConfig.phone}
                </a>
                <br />
                E-Mail:{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-4 hover:text-clay"
                >
                  {contactEmail}
                </a>
              </p>
            </section>

            {legalConfig.vatId && (
              <section>
                <h2 className="text-base font-medium text-muted">
                  Umsatzsteuer-Identifikationsnummer
                </h2>
                <p className="mt-2">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
                  {legalConfig.vatId}
                </p>
              </section>
            )}

            <section>
              <h2 className="text-base font-medium text-muted">Aufsichtsbehörde</h2>
              <p className="mt-2">
                {legalConfig.supervisoryAuthority.name}
                <br />
                {legalConfig.supervisoryAuthority.address}
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">
                Berufshaftpflichtversicherung
              </h2>
              <p className="mt-2">
                Versicherungsgesellschaft: {legalConfig.liabilityInsurance.insurer}
                <br />
                {legalConfig.liabilityInsurance.address}
                <br />
                Räumlicher Geltungsbereich: {legalConfig.liabilityInsurance.scope}
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-2">
                {legalConfig.ownerName}
                <br />
                {legalConfig.streetAddress}
                <br />
                {legalConfig.postalCode} {legalConfig.city}
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Haftung für Inhalte</h2>
              <p className="mt-2 text-muted">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
                8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
                entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
                entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Haftung für Links</h2>
              <p className="mt-2 text-muted">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
                Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
                von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">Urheberrecht</h2>
              <p className="mt-2 text-muted">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
                sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
                werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
                wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-base font-medium text-muted">EU-Streitschlichtung</h2>
              <p className="mt-2 text-muted">
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
              <p className="mt-3 text-muted">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
