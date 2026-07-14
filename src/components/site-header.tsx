import Link from "next/link";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";

const navLinks = [
  { href: "#warum-renoma", label: "Warum RENOMA" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#ablauf", label: "So begleiten wir Sie" },
  { href: "#ueber-renoma", label: "Über RENOMA" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/0 bg-paper/80 backdrop-blur-md transition-colors">
      <Container className="relative flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-[0.14em] text-ink"
        >
          RENOMA
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 sm:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Link
            href="/projekt-starten"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Projekt starten
          </Link>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
