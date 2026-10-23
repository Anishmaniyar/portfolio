/*
 * Centralized writing data shared by the home Writing section and the
 * dedicated /blogs page.
 *
 * Newest articles go first. The home page renders only the latest few
 * (`LATEST_WRITING_POSTS`); /blogs renders the full list.
 *
 * Nothing here is invented. `href` is the real, working article URL.
 * `date` is shown as written (e.g. "Oct 23, 2026"). `description` is a
 * single line. `readingTime` is optional and omitted when unavailable.
 */

export interface WritingPost {
  id: string;
  title: string;
  /** One-line summary. */
  description?: string;
  /** Optional publication date, shown as written (e.g. "Oct 23, 2026"). */
  date?: string;
  /** Optional reading time, shown as written (e.g. "8 min read"). */
  readingTime?: string;
  /** External article URL. */
  href?: string;
}

export const WRITING_POSTS: WritingPost[] = [
  {
    id: "rate-limiting-explained",
    title: "Rate Limiting Explained: From Beginner to Production",
    description:
      "A practical guide for backend developers, from fundamentals to production decisions.",
    date: "Oct 23, 2026",
    readingTime: "15 min read",
    href: "https://medium.com/@anishmaniyar4/rate-limiting-explained-from-beginner-to-production-4abc544f0079",
  },
];

/** The latest articles shown on the home page. */
export const LATEST_WRITING_POSTS = WRITING_POSTS.slice(0, 3);
