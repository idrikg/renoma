import Link from "next/link";
import { Container } from "@/components/container";
import { getContactEmail, legalConfig } from "@/lib/legal-config";
import { serviceCards } from "@/lib/service-pages";

export function SiteFooter() {
  const contactEmail = getContactEmail();
  const serviceArea = process.env.SERVICE_AREA?.trim();

  return (
    <footer className="border-t border-line py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <p className="text-[15px] font-medium tracking-[0.14em] text-ink">
              RENOMA
            </p>
            <p className="mt-2 text-sm text-muted">Wir stehen auf Ihrer Seite.</p>
            <p className="mt-3 text-sm text-muted">{legalConfig.brandNotice}</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Leistungen" className="min-w-0 sm:min-w-[16rem]">
              <p className="text-sm font-medium tracking-[0.08em] text-ink uppercase">
                Leistungen
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-muted sm:grid-cols-2">
                {serviceCards.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Rechtliches">
              <p className="text-sm font-medium tracking-[0.08em] text-ink uppercase">
                Kontakt
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <Link
                    href="/impressum"
                    className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/datenschutz"
                    className="rounded-sm outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {serviceArea && (
          <p className="mt-10 text-sm text-muted">Servicegebiet: {serviceArea}</p>
        )}
      </Container>
    </footer>
  );
}
