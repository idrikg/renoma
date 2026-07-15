import Link from "next/link";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { getNavLinks } from "@/lib/nav-links";

export function SiteHeader() {
  const navLinks = getNavLinks();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-[0.14em] text-ink outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
        >
          RENOMA
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/projekt-starten"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Projekt starten
          </Link>
        </div>

        <MobileNav links={navLinks} />
      </Container>
    </header>
  );
}
