/*
 * Centralized social profile data for the Connect row.
 *
 * TODO: fill in your real profile URLs and handles.
 * Nothing here is displayed until you add it — no usernames,
 * follower counts, or stats are invented.
 */

export interface SocialProfile {
  id: "github" | "x" | "linkedin" | "leetcode";
  label: string;
  /** Full profile URL. Replace "#" once known. */
  href: string;
  /** Shown under your name in the hover card. Leave "" until known. */
  handle: string;
  /** Card display name override. Defaults to "Anish" when omitted. */
  name?: string;
  /** Static description. GitHub prefers its live bio, falling back to this. */
  description: string;
  /** Optional second line in the hover card. Leave unset until known. */
  meta?: string;
  /** Brand color shown on icon hover. White for monochrome marks. */
  brand: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Anishmaniyar",
    handle: "Anishmaniyar",
    description: "Projects, experiments, and code.",
    brand: "#FFFFFF",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/Anishdotcom",
    handle: "@Anishdotcom",
    description: "Building in public and sharing what I'm learning.",
    brand: "#FFFFFF",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anish-maniyar/",
    handle: "Anish Maniyar",
    name: "Anish Maniyar",
    description: "Backend engineering and my professional journey.",
    brand: "#0A66C2",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/isagi_yoichi11026/",
    handle: "isagi_yoichi11026",
    description: "Data structures, algorithms, and problem solving.",
    brand: "#FFA116",
  },
];

/** Served from `public/resume.pdf` — add the file to enable the link. */
export const RESUME_HREF = "/resume.pdf";
