import type { MetadataRoute } from "next";

import { CASE_STUDY_SLUGS } from "@/data/case-studies";
import { SITE_URL } from "@/data/site";

/*
 * Sitemap for the real, publicly accessible routes only: the home page
 * plus every project case study (derived from the same data the pages
 * are built from, so it can never list a slug that 404s).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CASE_STUDY_SLUGS.map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
