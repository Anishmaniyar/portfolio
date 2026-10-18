import { WRITING_POSTS } from "../data/writing";

/*
 * Writing section: compact, typography-only list of articles.
 * Server Component (static, data-driven). Data lives in
 * `src/data/writing.ts`; an empty array shows a restrained placeholder
 * instead of invented posts.
 *
 * No icon library is installed, so the external-link indicator is a
 * small inline monochrome SVG (currentColor).
 */

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="writing-ext"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function WritingSection() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="scroll-mt-24"
    >
      <h2 id="writing-heading">Writing</h2>

      {WRITING_POSTS.length === 0 ? (
        <p className="writing-empty">Writing soon.</p>
      ) : (
        <ul className="writing-list">
          {WRITING_POSTS.map((post) => (
            <li key={post.id} className="writing-row">
              <div className="writing-top">
                <h3 className="writing-title">
                  {post.href ? (
                    <a
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="writing-link"
                      data-cuelume-hover=""
                      data-cuelume-emphasis="subtle"
                    >
                      <span>{post.title}</span>
                      <ExternalIcon />
                    </a>
                  ) : (
                    <span>{post.title}</span>
                  )}
                </h3>
                {post.date ? (
                  <span className="writing-date">{post.date}</span>
                ) : null}
              </div>
              <p className="writing-desc">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
