import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      // Stamped at build time, so it reflects the deploy that changed the page.
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
