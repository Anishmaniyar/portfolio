"use client";

import type { CSSProperties } from "react";
import { play } from "cuelume";
import {
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
  type SkillId,
} from "../data/skills";
import { BRAND_PATHS } from "./brand-icons";

/*
 * Skills section: compact table-like list, category label on the left,
 * icon + name items on the right. Icons use the technology's real brand
 * logo (see ./brand-icons), muted monochrome by default; hover/focus
 * reveals the brand color on both the logo and the name and lifts the
 * item ~1px. Client Component (hover sounds need handlers).
 *
 * No icon library is installed in this repo, so the official brand
 * silhouettes are inlined as single paths (currentColor) — no images, no
 * new dependencies. Names are always visible text, so icons stay
 * decorative (aria-hidden) and each row also carries a title tooltip.
 */

function SkillIcon({ id }: { id: SkillId }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={BRAND_PATHS[id]} />
    </svg>
  );
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <li
      className="skill-item"
      tabIndex={0}
      title={skill.name}
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
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24">
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
