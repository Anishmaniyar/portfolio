import {
  PROJECTS,
  TECH_LABELS,
  type TechId,
} from "../data/projects";
import { TECH_BRANDS } from "../data/skills";
import Link from "next/link";
import TechCue from "./TechCue";
import { ProjectIcon } from "./project-icons";

/*
 * Work section: minimal, typography-focused project list.
 * Server Component (static content, no interactivity needed).
 *
 * Project marks are original layered SVG icons (warm ivory on the dark
 * container) from `./project-icons`; tech logos remain small inline
 * monochrome SVGs (currentColor). No icon library, no images, no new
 * dependencies.
 */

export function TechMark({ id }: { id: TechId }) {
  const label = TECH_LABELS[id];
  const stroke = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: "img",
    "aria-label": label,
  } as const;

  switch (id) {
    case "typescript":
    case "javascript":
    case "express":
      // Official marks are letterforms on a square.
      return (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          role="img"
          aria-label={label}
        >
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
            fontSize={id === "express" ? 10 : 9}
            fontWeight="700"
            fill="currentColor"
          >
            {id === "typescript" ? "TS" : id === "javascript" ? "JS" : "Ex"}
          </text>
        </svg>
      );
    case "nodejs":
      // Hexagon mark.
      return (
        <svg {...stroke}>
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
        </svg>
      );
    case "postgresql":
      // Database cylinder.
      return (
        <svg {...stroke}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "redis":
      // Stacked layers.
      return (
        <svg {...stroke}>
          <path d="M12 3 3 8l9 5 9-5-9-5z" />
          <path d="m3 12.5 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "bullmq":
      // Queue rows.
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
    case "prisma":
      // Triangle mark.
      return (
        <svg {...stroke}>
          <path d="M12 4 20 19H4L12 4z" />
        </svg>
      );
    case "react":
      // Atom mark.
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
    case "docker":
      // Container box.
      return (
        <svg {...stroke}>
          <path d="M7 8V5h10v3" />
          <rect x="3" y="8" width="18" height="9" rx="1" />
          <path d="M9 8v9" />
          <path d="M15 8v9" />
        </svg>
      );
  }
}

export default function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading">Work</h2>
      <ul className="work-list">
        {PROJECTS.map((project) => (
          <li key={project.id} className="work-row">
            <div className="work-logo" aria-hidden="true">
              <ProjectIcon id={project.id} />
            </div>
            <div className="work-main">
              <div className="work-top">
                <h3 className="work-name">{project.name}</h3>
                <Link
                  href={project.href}
                  aria-label={`Open ${project.name}`}
                  className="work-link"
                  data-cuelume-navigate=""
                  data-cuelume-hover=""
                  data-cuelume-emphasis="subtle"
                >
                  <span aria-hidden="true" className="work-arrow">
                    ↗
                  </span>
                </Link>
              </div>
              <p className="work-desc">{project.description}</p>
              <ul
                className="work-tech"
                aria-label={`${project.name} technology stack`}
              >
                {project.tech.map((tech) => (
                  <TechCue
                    key={tech}
                    tip={TECH_LABELS[tech]}
                    brand={TECH_BRANDS[tech]}
                  >
                    <TechMark id={tech} />
                  </TechCue>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
