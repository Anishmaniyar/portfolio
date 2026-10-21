import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../../data/case-studies";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProjectActions from "./ProjectActions";

/*
 * Shared case-study layout. Sections render only when the data
 * supports them — repo/live buttons appear only when verified URLs
 * are set, and the hero visual is a clearly-marked placeholder until
 * a real asset is added at public/images/work/<slug>.png.
 */

function HeroVisual({ study }: { study: CaseStudy }) {
  if (study.heroImage) {
    return (
      <div className="cs-visual">
        <Image
          src={study.heroImage}
          alt={`${study.name} product screenshot`}
          width={1400}
          height={788}
          priority
        />
      </div>
    );
  }
  return (
    <div className="cs-visual cs-visual-empty" aria-hidden="true">
      Product visual coming soon — add public/images/work/{study.slug}.png
    </div>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article>
      <Link href="/#work" className="cs-back" data-cuelume-navigate="">
        <span aria-hidden="true">←</span> Work
      </Link>

      <header className="cs-hero">
        <div className="cs-hero-top">
          <div className="cs-hero-main">
            <h1>{study.name}</h1>
            <p className="cs-tagline">{study.tagline}</p>
          </div>
          {study.repo || study.live ? (
            <ProjectActions repo={study.repo} live={study.live} />
          ) : null}
        </div>
      </header>

      <HeroVisual study={study} />

      <section aria-labelledby={`${study.slug}-problem-solution`}>
        <h2 id={`${study.slug}-problem-solution`}>Problem &amp; Solution</h2>
        <div className="cs-highlight">
          <h3>Problem</h3>
          <p className="cs-body">{study.problem}</p>
        </div>
        <div className="cs-highlight">
          <h3>Solution</h3>
          <p className="cs-body">{study.solution}</p>
        </div>
      </section>

      <section aria-labelledby={`${study.slug}-architecture`}>
        <h2 id={`${study.slug}-architecture`}>Architecture</h2>
        <ArchitectureDiagram images={study.architectureImages} />
        <p className="cs-body">{study.flow}</p>
      </section>

      <section aria-labelledby={`${study.slug}-decisions`}>
        <h2 id={`${study.slug}-decisions`}>Engineering Decisions</h2>
        {study.highlights.map((h) => (
          <div key={h.title} className="cs-highlight">
            <h3>{h.title}</h3>
            <p className="cs-body">{h.body}</p>
          </div>
        ))}
      </section>

      {study.testing ? (
        <section aria-labelledby={`${study.slug}-testing`}>
          <h2 id={`${study.slug}-testing`}>Testing &amp; Results</h2>
          <p className="cs-body">{study.testing}</p>
        </section>
      ) : null}

      {study.challenges ? (
        <section aria-labelledby={`${study.slug}-challenges`}>
          <h2 id={`${study.slug}-challenges`}>Challenges &amp; Learnings</h2>
          <p className="cs-body">{study.challenges}</p>
        </section>
      ) : null}

      {study.limitations && study.limitations.length > 0 ? (
        <section aria-labelledby={`${study.slug}-limitations`}>
          <h2 id={`${study.slug}-limitations`}>Limitations &amp; next steps</h2>
          <ul className="cs-list">
            {study.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="cs-footer">
        <span className="cs-nav">
          <Link href={`/work/${study.next.slug}`} data-cuelume-navigate="">
            Next project: {study.next.name} →
          </Link>
          <Link href="/#work" data-cuelume-navigate="">
            Back to Work
          </Link>
        </span>
      </footer>
    </article>
  );
}
