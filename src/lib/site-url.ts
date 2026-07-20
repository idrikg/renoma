/**
 * Canonical production origin for metadata, sitemap, and robots.
 * Always Non-www HTTPS. Env may override host, but www is stripped and
 * the protocol is forced to https.
 */
export const PRODUCTION_SITE_URL = "https://renoma-zuhause.de";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_SITE_URL;
  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.replace(/^www\./i, "");
    if (!host) return PRODUCTION_SITE_URL;
    return `https://${host}`;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

/** Homepage document title (use absolute on `/` to avoid template doubling). */
export const homeTitle =
  "RENOMA | Persönliche Begleitung für Renovierungsprojekte";

export const homeDescription =
  "RENOMA begleitet Ihr Renovierungsprojekt persönlich – von der ersten Idee bis zur Umsetzung. Einfach, unkompliziert und mit einem festen Ansprechpartner.";
