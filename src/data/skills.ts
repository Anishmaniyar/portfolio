/*
 * Centralized skills data for the Skills section.
 *
 * Verification (nothing invented — every item is confirmed by the
 * portfolio, its projects, or their repos):
 * - TypeScript / JavaScript: repo languages (Zolt, Ascend, Cruor) +
 *   this portfolio (Next.js + TypeScript).
 * - React, Prisma: Cruor repo topics.
 * - Next.js, Tailwind CSS: this portfolio's package.json.
 * - Node.js, Express: Zolt package.json deps, Ascend/Cruor topics.
 * - PostgreSQL: Zolt `pg` + `node-pg-migrate` deps, Cruor topics.
 * - Redis, BullMQ: Zolt `ioredis` + `bullmq` deps, Cruor topics.
 * - Docker, Swagger: Cruor repo topics.
 * - Vercel: live deployments (ascend-aptitude.vercel.app,
 *   cruor-drops.vercel.app).
 * - Git / GitHub: this repo + linked profiles.
 * - pnpm: this repo's packageManager field.
 * - Vitest: Zolt devDependencies.
 * - Zod: Zolt dependencies.
 * - ESLint: this repo + Zolt devDependencies.
 * - Prettier: shared configs in Zolt / Ascend / Cruor.
 *
 * Deliberately omitted (not supported by the above): shadcn/ui,
 * Motion, MongoDB, AWS, Linux.
 *
 * `brand` is the technology's recognizable brand color, shown only on
 * hover/focus. Icons stay monochrome otherwise. White is used for
 * brands whose official mark on dark backgrounds is white
 * (Next.js, Express, Prisma, GitHub, Vercel). BullMQ has no published
 * brand icon; its site-accent cyan is used (bullmq.io hero).
 *
 * To edit: change this file only. Items in `extra` / MORE_CATEGORIES
 * are revealed by the "See more" control.
 */

import type { TechId } from "./projects";

export type SkillId =
  | "typescript"
  | "javascript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "nodejs"
  | "express"
  | "postgresql"
  | "prisma"
  | "redis"
  | "bullmq"
  | "docker"
  | "vercel"
  | "git"
  | "github"
  | "pnpm"
  | "vitest"
  | "eslint"
  | "prettier"
  | "zod"
  | "swagger";

export interface Skill {
  id: SkillId;
  name: string;
  brand: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "language",
    label: "Language",
    skills: [
      { id: "typescript", name: "TypeScript", brand: "#3178C6" },
      { id: "javascript", name: "JavaScript", brand: "#F7DF1E" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: "react", name: "React", brand: "#61DAFB" },
      { id: "nextjs", name: "Next.js", brand: "#FFFFFF" },
      { id: "tailwind", name: "Tailwind CSS", brand: "#38BDF8" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { id: "nodejs", name: "Node.js", brand: "#5FA04E" },
      { id: "express", name: "Express.js", brand: "#FFFFFF" },
      { id: "postgresql", name: "PostgreSQL", brand: "#4169E1" },
      { id: "prisma", name: "Prisma", brand: "#FFFFFF" },
      { id: "redis", name: "Redis", brand: "#DC382D" },
      { id: "bullmq", name: "BullMQ", brand: "#5CE1E6" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    skills: [
      { id: "docker", name: "Docker", brand: "#2496ED" },
      { id: "vercel", name: "Vercel", brand: "#FFFFFF" },
    ],
  },
  {
    id: "workflow",
    label: "Workflow",
    skills: [
      { id: "git", name: "Git", brand: "#F05032" },
      { id: "github", name: "GitHub", brand: "#FFFFFF" },
      { id: "pnpm", name: "pnpm", brand: "#F69220" },
      { id: "vitest", name: "Vitest", brand: "#6E9F18" },
      { id: "eslint", name: "ESLint", brand: "#4B32C3" },
      { id: "prettier", name: "Prettier", brand: "#F7B93E" },
    ],
  },
  {
    id: "validation-docs",
    label: "Validation & docs",
    skills: [
      { id: "zod", name: "Zod", brand: "#408AFF" },
      { id: "swagger", name: "Swagger", brand: "#85EA2D" },
    ],
  },
];

/*
 * Brand colors for the Work-section tech icons, mirroring the Skills
 * hover treatment. White is used for brands whose official mark on
 * dark backgrounds is white. BullMQ has no published brand color;
 * its site-accent cyan is used (bullmq.io hero).
 */
export const TECH_BRANDS: Record<TechId, string> = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  nodejs: "#5FA04E",
  express: "#FFFFFF",
  postgresql: "#4169E1",
  redis: "#DC382D",
  bullmq: "#5CE1E6",
  prisma: "#FFFFFF",
  react: "#61DAFB",
  docker: "#2496ED",
};