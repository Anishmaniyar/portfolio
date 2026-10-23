import Link from "next/link";
import { LATEST_WRITING_POSTS } from "../data/writing";

/*
 * Writing section: compact, typography-only list of the latest articles.
 * Server Component (static, data-driven). Data lives in
 * `src/data/writing.ts`; an empty array shows a restrained placeholder
 * instead of invented posts.
 */

export default function WritingSection() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="scroll-mt-24"
    >
      <h2 id="writing-heading">Writing</h2>

      {LATEST_WRITING_POSTS.length === 0 ? (
        <p className="writing-empty">Writing soon.</p>
      ) : (
        <>
          <ul className="writing-list">
            {LATEST_WRITING_POSTS.map((post) => (
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
                        {post.title}
                      </a>
                    ) : (
                      <span>{post.title}</span>
                    )}
                  </h3>
                  {post.date || post.readingTime ? (
                    <div className="writing-meta">
                      {post.date ? <span>{post.date}</span> : null}
                      {post.readingTime ? (
                        <span>{post.readingTime}</span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/blogs"
            className="writing-view-all"
            data-cuelume-navigate=""
            data-cuelume-hover=""
            data-cuelume-emphasis="subtle"
          >
            View all blogs
          </Link>
        </>
      )}
    </section>
  );
}
