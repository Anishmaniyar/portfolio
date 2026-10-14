import AvatarStack from "../components/AvatarStack";

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="#1D9BF0" />
      <path
        d="M4.9 8.3 7.1 10.5 11.3 6"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        <div className="pt-24 pb-16">
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
            <h2>About</h2>
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
        </div>
      </main>
    </div>
  );
}
