/*
 * Centralized writing data for the Writing section.
 *
 * Add published articles here — the component renders whatever is in
 * this array. Nothing is invented: leave it empty until real posts
 * exist and the section shows the "Writing soon." placeholder.
 *
 * `href` must be the real, working article URL. `date` is optional and
 * shown as-is (e.g. "Aug 2026"). `description` is a single line.
 */

export interface WritingPost {
  id: string;
  title: string;
  /** One-line summary. */
  description: string;
  /** Optional publication date, shown as written (e.g. "Aug 2026"). */
  date?: string;
  /** Optional external article URL. Omit when there is no live post. */
  href?: string;
}

export const WRITING_POSTS: WritingPost[] = [];
