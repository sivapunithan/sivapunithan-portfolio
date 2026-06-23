import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(siteConfig.domain),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
