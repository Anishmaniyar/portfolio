import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { WRITING_POSTS } from "../../data/writing";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Deep dives on backend engineering, system design, and the things that break in production.",
  alternates: {
    canonical: "/blogs",
  },
};

/*
 * Blogs page: a minimal editorial index of every published article.
 * Data comes from the same `src/data/writing.ts` source as the home
 * Writing section, so titles, dates, and links never drift.
 */
export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <main className="flex w-full flex-1 flex-col px-6">
        <div className="pt-16 pb-16">
          <Link
            href="/"
            className="blogs-back"
            data-cuelume-navigate=""
            data-cuelume-hover=""
            data-cuelume-emphasis="subtle"
          >
            <span aria-hidden="true">←</span> home
          </Link>

          <header className="blogs-header">
            <h1>Blogs</h1>
          </header>

          <h1 className="blogs-topics-heading mt-5"># Engineering Topics</h1>

          <ul className="blogs-list">
            {WRITING_POSTS.map((post) => (
              <li key={post.id} className="blogs-row">
                <h2 className="blogs-title">
                  {post.href ? (
                    <a
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blogs-link"
                      data-cuelume-hover=""
                      data-cuelume-emphasis="subtle"
                    >
                      {post.title}
                    </a>
                  ) : (
                    <span>{post.title}</span>
                  )}
                </h2>

                {post.date || post.readingTime ? (
                  <div className="blogs-meta">
                    {post.date ? <span>{post.date}</span> : null}
                    {post.readingTime ? <span>{post.readingTime}</span> : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
