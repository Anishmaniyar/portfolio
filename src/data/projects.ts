/*
 * Centralized project data for the Work section.
 *
 * Sources (all grounded, nothing invented):
 * - Names, descriptions, live URLs, topics, and languages come from the
 *   public GitHub repos: github.com/Anishmaniyar/{Zolt,Ascend,Cruor}.
 * - Zolt tech: package.json deps (bullmq, ioredis, express, pg,
 *   node-pg-migrate, zod) + TypeScript as the repo language.
 * - Ascend tech: repo topics (express, javascript, nodejs, prisma).
 * - Cruor tech: repo topics (typescript, react, nodejs, express,
 *   postgresql, prisma-orm, docker, …).
 *
 * To edit or add a project, change this file only — no component
 * changes needed. `href` is the primary "View more" destination:
 * the live site when one exists, otherwise the repository.
 */

export type TechId =
  | "typescript"
  | "javascript"
  | "nodejs"
  | "express"
  | "postgresql"
  | "redis"
  | "bullmq"
  | "prisma"
  | "react"
  | "docker";

export const TECH_LABELS: Record<TechId, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  nodejs: "Node.js",
  express: "Express",
  postgresql: "PostgreSQL",
  redis: "Redis",
  bullmq: "BullMQ",
  prisma: "Prisma",
  react: "React",
  docker: "Docker",
};

export interface Project {
  id: "zolt" | "ascend" | "cruor";
  name: string;
  /** Short factual description (repo description, name prefix trimmed). */
  description: string;
  /** Primary "View more" destination: live site if one exists, else repo. */
  href: string;
  /** Repository URL (kept so the link target is easy to switch). */
  repo: string;
  /** Live site URL, when one exists. */
  live?: string;
  /** Technologies actually used (subset shown as icons, no names). */
  tech: TechId[];
}

export const PROJECTS: Project[] = [
  {
    id: "zolt",
    name: "Zolt",
    description: "Job scheduling and execution with durable PostgreSQL state.",
    href: "/work/zolt",
    repo: "https://github.com/Anishmaniyar/Zolt",
    tech: ["typescript", "nodejs", "express", "postgresql", "redis", "bullmq"],
  },
  {
    id: "ascend",
    name: "Ascend",
    description:
      "Backend-focused aptitude preparation platform for placement and interview practice.",
    href: "/work/ascend",
    repo: "https://github.com/Anishmaniyar/Ascend",
    live: "https://ascend-aptitude.vercel.app",
    tech: ["javascript", "nodejs", "express", "prisma"],
  },
  {
    id: "cruor",
    name: "Cruor",
    description:
      "Blood donation and hospital inventory platform for donor engagement, blood traceability, and cross-hospital coordination.",
    href: "/work/cruor",
    repo: "https://github.com/Anishmaniyar/Cruor",
    live: "https://cruor-drop.vercel.app/",
    tech: ["typescript", "react", "nodejs", "express", "postgresql", "prisma"],
  },
];
