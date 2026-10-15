import AvatarStack from "../components/AvatarStack";
import ConnectRow from "../components/ConnectRow";
import SkillsSection from "../components/SkillsSection";
import WorkSection from "../components/WorkSection";

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#D4D4D4"
      fillRule="evenodd"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black">
      <main className="flex w-full flex-1 flex-col px-6">
        <div className="pt-16 pb-16">
          <header className="flex flex-wrap items-center gap-4">
            <AvatarStack />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1>Anish</h1>
                <VerifiedBadge />
              </div>
              <div className="text-muted mt-1">
                20 · Obsession · FAFO Builder
              </div>
            </div>
            <div className="text-muted flex shrink-0 items-center gap-1.5">
              <EyeIcon />
              <span>0</span>
            </div>
          </header>

          <section aria-label="About" className="about-section">
            <div className="about-lead">Backend Engineer</div>
            <ul className="about-text">
              <li>
                I build software, explore ideas, and figure things out by
                shipping.
              </li>
              <li>
                I&apos;d rather build and break things than just talk about
                them.
              </li>
              <li>
                Currently building projects and working toward becoming a
                stronger engineer.
              </li>
            </ul>
          </section>

          <section aria-label="Connect" className="connect-section">
            <ConnectRow />
          </section>

          <WorkSection />

          <SkillsSection />
        </div>
      </main>
    </div>
  );
}
