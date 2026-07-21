import type { MetadataRoute } from "next";
import { getPublishedReferences } from "@/lib/references-data";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Indexable public URLs only. Funnel (/projekt-starten) is intentionally
 * omitted — it is reachable but noindex. lastModified is omitted when no
 * trustworthy per-entry dates exist in the data model.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/leistungen/badmodernisierung`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/impressum`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/datenschutz`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const referenceEntries: MetadataRoute.Sitemap = getPublishedReferences().map(
    (reference) => ({
      url: `${siteUrl}/referenzen/${reference.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticEntries, ...referenceEntries];
}
