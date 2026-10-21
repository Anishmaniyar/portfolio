import AvatarStack from "../components/AvatarStack";
import ConnectRow from "../components/ConnectRow";
import QuoteSection from "../components/QuoteSection";
import SkillsSection from "../components/SkillsSection";
import SiteFooter from "../components/SiteFooter";
import ThemeToggle from "../components/ThemeToggle";
import WorkSection from "../components/WorkSection";
import WritingSection from "../components/WritingSection";
import RailToc from "../components/ui/rail-toc";
import { CONTACT_EMAIL, MEDIUM_HREF } from "../data/social";

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className="verified-badge shrink-0"
    >
      <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* Only sections that exist on this page, in page order. Experience,
   Open Source, and Highlights are omitted until those sections
   are built. */
const TOC_ITEMS = [
  { id: "about", label: "About" },
  { id: "connect", label: "Socials" },
  { id: "work", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <RailToc items={TOC_ITEMS} title="INDEX" className="home-rail" />
      <main className="flex w-full flex-1 flex-col px-6">
        <div className="pt-16 pb-16">
          <header id="top" className="flex flex-wrap items-center gap-4">
            <AvatarStack />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1>Anish</h1>
                <VerifiedBadge />
              </div>
              <div className="text-muted mt-1">Backend Engg</div>
            </div>
            <ThemeToggle />
          </header>

          <section
            id="about"
            aria-label="About"
            className="about-section scroll-mt-24"
          >
            <div className="about-text">
              <p>FAFO builder — I&apos;d rather build and break things.</p>
              <p>Into system design and the stuff that breaks in prod.</p>
              <p>
                Reach me via email{" "}
                <a
                  href={`https://mail.google.com/mail/u/0/?fs=1&to=${CONTACT_EMAIL}&tf=cm`}
                  aria-label="Email me"
                  className="about-link"
                  data-cuelume-tap=""
                  data-cuelume-hover=""
                  data-cuelume-emphasis="subtle"
                >
                  <MailIcon />
                </a>
                . Read my blogs on Medium{" "}
                <a
                  href={MEDIUM_HREF}
                  aria-label="Read my blogs on Medium"
                  className="about-link"
                  data-cuelume-tap=""
                  data-cuelume-hover=""
                  data-cuelume-emphasis="subtle"
                >
                  <MediumIcon />
                </a>
                .
              </p>
            </div>
          </section>

          <section
            id="connect"
            aria-label="Connect"
            className="connect-section scroll-mt-24"
          >
            <ConnectRow />
          </section>

          <WorkSection />

          <SkillsSection />

          <WritingSection />

          <QuoteSection />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
