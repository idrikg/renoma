import { hasPublishedReferences } from "@/lib/references-data";

export type NavLink = { href: string; label: string };

/**
 * Homepage section anchors. Always use root-prefixed hashes (`/#…`) so
 * links resolve correctly from any route (e.g. `/referenzen/bad-01`),
 * not as relative hashes that stay on the current page.
 */
const allNavLinks: NavLink[] = [
  { href: "/#warum-renoma", label: "Warum RENOMA" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/#referenzen", label: "Referenzen" },
  { href: "/#ablauf", label: "So begleiten wir Sie" },
  { href: "/#ueber-renoma", label: "Über RENOMA" },
];

/**
 * "Referenzen" only appears once there is at least one authentic,
 * published reference to show — a nav item that anchors to an empty or
 * absent section is a broken experience, not a placeholder.
 */
export function getNavLinks(): NavLink[] {
  if (hasPublishedReferences()) return allNavLinks;
  return allNavLinks.filter((link) => link.href !== "/#referenzen");
}
