import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://renoma.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projekt-starten", "/impressum", "/datenschutz"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "yearly",
    priority: route === "" ? 1 : route === "/projekt-starten" ? 0.9 : 0.3,
  }));
}
