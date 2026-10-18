/*
 * Single source of truth for the site's public identity and metadata.
 *
 * Consumed by `app/layout.tsx`, `app/work/[slug]/page.tsx`,
 * `app/robots.ts`, and `app/sitemap.ts`, so the production origin,
 * name, and title never drift between files. Everything here is
 * factual — no invented experience, metrics, or claims.
 */

/** Production origin (used by metadataBase, canonical URLs, robots, sitemap). */
export const SITE_URL = "https://anish-maniyar.vercel.app";

export const SITE_NAME = "Anish Maniyar";

/** Browser-tab / default page title. */
export const SITE_TITLE = SITE_NAME;

/**
 * Meta description. Names the backend focus (durable PostgreSQL-backed
 * systems) and the three featured projects, exactly as described in
 * `src/data/case-studies.ts`.
 */
export const SITE_DESCRIPTION =
  "Backend Engineer building durable PostgreSQL-backed systems: Zolt (postgres-backed job scheduling), Ascend (aptitude practice API), and Cruor (blood-donation lifecycle).";

/** Shared Open Graph / Twitter preview image (1200×630, in /public). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
} as const;
