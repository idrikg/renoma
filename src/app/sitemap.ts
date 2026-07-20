import type { MetadataRoute } from "next";
import { getPublishedReferences } from "@/lib/references-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://renoma-zuhause.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projekt-starten", "/impressum", "/datenschutz"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "yearly",
    priority: route === "" ? 1 : route === "/projekt-starten" ? 0.9 : 0.3,
  }));

  const referenceEntries: MetadataRoute.Sitemap = getPublishedReferences().map(
    (reference) => ({
      url: `${siteUrl}/referenzen/${reference.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticEntries, ...referenceEntries];
}
