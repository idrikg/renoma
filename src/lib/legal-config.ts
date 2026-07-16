/**
 * Verified legal entity data for RENOMA (brand) and GOGO Natursteine & Fliesen
 * (operator). Sources: https://www.gogo-natursteine.de/impressum (retrieved
 * for launch preparation). Do not invent fields marked TODO.
 */

export const legalConfig = {
  brandName: "RENOMA",
  brandNotice: "RENOMA ist eine Marke der GOGO Natursteine & Fliesen.",
  contractNotice:
    "RENOMA ist eine Marke der GOGO Natursteine & Fliesen. Sämtliche Verträge über Renovierungs-, Sanierungs- und Handwerksleistungen werden ausschließlich mit der GOGO Natursteine & Fliesen abgeschlossen.",
  operatorName: "GOGO Natursteine & Fliesen",
  ownerName: "Gürkan Gürses",
  streetAddress: "Frankfurter Straße 25",
  postalCode: "71634",
  city: "Ludwigsburg",
  country: "Deutschland",
  /** Public RENOMA contact; GOGO business phone from official Impressum. */
  phone: "07141 918500",
  phoneInternational: "+49 7141 918500",
  contactEmail: "kontakt@renoma-zuhause.de",
  /** Only set once officially confirmed. Must not be displayed otherwise. */
  vatId: undefined as string | undefined,
  supervisoryAuthority: {
    name: "Stadt Ludwigsburg",
    address: "Wilhelmstraße, 71636 Ludwigsburg",
  },
  liabilityInsurance: {
    insurer: "VHV Versicherung",
    address: "VHV Platz 1, 30177 Hannover",
    scope: "Deutschland, EU, weltweit",
  },
  /** Art. 13 DSGVO contact for privacy requests — same public RENOMA inbox. */
  privacyContactEmail: "kontakt@renoma-zuhause.de",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://renoma-zuhause.de",
} as const;

export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || legalConfig.contactEmail;
}

export function formatOperatorAddress(): string {
  return `${legalConfig.streetAddress}, ${legalConfig.postalCode} ${legalConfig.city}, ${legalConfig.country}`;
}
