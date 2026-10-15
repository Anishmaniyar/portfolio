"use client";

import type { CSSProperties } from "react";
import { play } from "cuelume";
import {
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
  type SkillId,
} from "../data/skills";

/*
 * Skills section: compact table-like list, category label on the left,
 * icon + name items on the right. Icons are muted monochrome by
 * default; hover/focus shows the brand color, brightens the name, and
 * lifts the item ~2px. Client Component (hover sounds need handlers).
 *
 * No icon library is installed in this repo, so marks are small inline
 * monochrome SVGs (currentColor) — no images, no new dependencies.
 * Names are always visible text, so icons are decorative (aria-hidden).
 */

function SkillIcon({ id }: { id: SkillId }) {
  const stroke = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const;

  const mono = (text: string, fontSize = 9) => (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );

  switch (id) {
    case "typescript":
      return mono("TS");
    case "javascript":
      return mono("JS");
    case "express":
      return mono("Ex", 10);
    case "github":
      return mono("GH", 8);
    case "pnpm":
      return mono("pn", 9);
    case "eslint":
      return mono("ES", 9);
    case "react":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
    case "nextjs":
      // Ringed N mark.
      return (
        <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="currentColor"
          >
            N
          </text>
        </svg>
      );
    case "tailwind":
      // Twin-wave mark.
      return (
        <svg {...stroke}>
          <path d="M3 9c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4-1" />
          <path d="M5 15c2-2.5 4-2.5 6 0s4 2.5 6 0 2.5-1.7 3.5-1.2" />
        </svg>
      );
    case "nodejs":
      return (
        <svg {...stroke}>
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
        </svg>
      );
    case "postgresql":
      return (
        <svg {...stroke}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "prisma":
      return (
        <svg {...stroke}>
          <path d="M12 4 20 19H4L12 4z" />
        </svg>
      );
    case "redis":
      return (
        <svg {...stroke}>
          <path d="M12 3 3 8l9 5 9-5-9-5z" />
          <path d="m3 12.5 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "bullmq":
      return (
        <svg {...stroke}>
          <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
          <path d="M10 6h10" />
          <path d="M10 12h10" />
          <path d="M10 18h10" />
        </svg>
      );
    case "docker":
      return (
        <svg {...stroke}>
          <path d="M7 8V5h10v3" />
          <rect x="3" y="8" width="18" height="9" rx="1" />
          <path d="M9 8v9" />
          <path d="M15 8v9" />
        </svg>
      );
    case "vercel":
      // Solid triangle mark.
      return (
        <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="12 5 20 19 4 19" fill="currentColor" />
        </svg>
      );
    case "git":
      // Branch mark.
      return (
        <svg {...stroke}>
          <line x1="6" x2="6" y1="3" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case "vitest":
      // V mark.
      return (
        <svg {...stroke}>
          <path d="M5 4l7 16 7-16" />
        </svg>
      );
    case "prettier":
      // Asterisk mark.
      return (
        <svg {...stroke}>
          <path d="M12 4v16" />
          <path d="M5 8l14 8" />
          <path d="M19 8L5 16" />
        </svg>
      );
    case "zod":
      // Z mark.
      return (
        <svg {...stroke}>
          <path d="M6 5h12L6 19h12" />
        </svg>
      );
    case "swagger":
      // S-curve mark.
      return (
        <svg {...stroke}>
          <path d="M17 6.5c-1.8-1.3-4.2-1.7-6-1C7.7 6.3 6 8 6.4 10c.5 2.4 4.8 2 6.3 3.4 1.4 1.4.4 3.8-2.4 4.7-1.9.6-4.2.2-6-1" />
        </svg>
      );
  }
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <li
      className="skill-item"
      tabIndex={0}
      data-cuelume-tap=""
      data-cuelume-emphasis="subtle"
      style={{ "--brand": skill.brand } as CSSProperties}
      onMouseEnter={() => {
        play("select", { emphasis: "subtle" });
      }}
    >
      <SkillIcon id={skill.id} />
      <span>{skill.name}</span>
    </li>
  );
}

function CategoryRow({ category }: { category: SkillCategory }) {
  return (
    <li className="skill-row">
      <span className="skill-cat">{category.label}</span>
      <ul className="skill-items" aria-label={`${category.label} skills`}>
        {category.skills.map((skill) => (
          <SkillItem key={skill.id} skill={skill} />
        ))}
      </ul>
    </li>
  );
}

export default function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading">
      <div className="skills-head">
        <h2 id="skills-heading">Skills</h2>
      </div>

      <ul className="skills-table">
        {SKILL_CATEGORIES.map((category) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
}
