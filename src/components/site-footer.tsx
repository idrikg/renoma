import Link from "next/link";
import { Container } from "@/components/container";

/**
 * Contact email and service area are real, customer-facing claims — they
 * must never show a fabricated value. Both only render if explicitly
 * configured via environment variables. If unset, we log a visible
 * development-time warning instead of guessing.
 */
function getFooterContactInfo() {
  const contactEmail = process.env.CONTACT_EMAIL;
  const serviceArea = process.env.SERVICE_AREA;

  if (process.env.NODE_ENV !== "production") {
    if (!contactEmail) {
      console.warn(
        "[site-footer] CONTACT_EMAIL is not set — the footer will omit the contact email rather than show an unverified placeholder."
      );
    }
    if (!serviceArea) {
      console.warn(
        "[site-footer] SERVICE_AREA is not set — the footer will omit the service area rather than show an unverified placeholder."
      );
    }
  }

  return { contactEmail, serviceArea };
}

export function SiteFooter() {
  const { contactEmail, serviceArea } = getFooterContactInfo();

  return (
    <footer className="border-t border-line py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[15px] font-medium tracking-[0.14em] text-ink">
              RENOMA
            </p>
            <p className="mt-2 text-sm text-muted">Wir stehen auf Ihrer Seite.</p>
          </div>
          <nav
            aria-label="Rechtliches"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
          >
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-clay"
              >
                {contactEmail}
              </a>
            )}
            <Link
              href="/impressum"
              className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-clay"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-clay"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
        {serviceArea && (
          <p className="mt-8 text-sm text-muted">Servicegebiet: {serviceArea}</p>
        )}
      </Container>
    </footer>
  );
}
