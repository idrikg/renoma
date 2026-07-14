"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#warum-renoma", label: "Warum RENOMA" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#ablauf", label: "So begleiten wir Sie" },
  { href: "#ueber-renoma", label: "Über RENOMA" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink outline-none focus-visible:ring-2 focus-visible:ring-clay"
      >
        <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6"
        >
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-6 shadow-sm"
        >
          <nav aria-label="Hauptnavigation" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink outline-none hover:bg-paper-dim focus-visible:ring-2 focus-visible:ring-clay"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/projekt-starten"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ink px-5 py-3 text-center text-base font-medium text-paper outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              Projekt starten
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
