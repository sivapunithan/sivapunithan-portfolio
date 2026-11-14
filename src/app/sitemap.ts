import type { MetadataRoute } from "next";
import { navigation, projects, siteConfig } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl(siteConfig.domain);
  const lastModified = new Date();

  return [
    ...navigation.map((item) => ({
      url: item.href === "/" ? siteUrl : `${siteUrl}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
