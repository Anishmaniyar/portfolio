import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/site";

/*
 * robots.txt for the production origin. Everything the site exposes is
 * public, so indexing is allowed site-wide and no path is disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
