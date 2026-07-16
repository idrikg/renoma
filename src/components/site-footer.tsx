import Link from "next/link";
import { Container } from "@/components/container";
import { getContactEmail, legalConfig } from "@/lib/legal-config";

export function SiteFooter() {
  const contactEmail = getContactEmail();
  const serviceArea = process.env.SERVICE_AREA?.trim();

  return (
    <footer className="border-t border-line py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[15px] font-medium tracking-[0.14em] text-ink">
              RENOMA
            </p>
            <p className="mt-2 text-sm text-muted">Wir stehen auf Ihrer Seite.</p>
            <p className="mt-3 max-w-sm text-sm text-muted">{legalConfig.brandNotice}</p>
          </div>
          <nav
            aria-label="Rechtliches"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
          >
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
            >
              {contactEmail}
            </a>
            <Link
              href="/impressum"
              className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
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
