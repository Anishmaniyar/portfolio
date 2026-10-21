"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import {
  RESUME_HREF,
  SOCIAL_PROFILES,
  type SocialProfile,
} from "../data/social";

/* Monochrome brand icons (24x24, currentColor). No icon library installed. */

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[14px] w-[14px] shrink-0"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

const ICONS: Record<SocialProfile["id"], () => React.ReactElement> = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
};

const CARD_WIDTH = 400;
const CLOSE_MS = 180;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ConnectRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<SocialProfile | null>(null);
  const [shown, setShown] = useState(false);
  const [geom, setGeom] = useState({ left: 0, arrow: 0 });
  const [github, setGithub] = useState<{
    avatar?: string;
    bio?: string | null;
    repos?: number;
  } | null>(null);
  const [githubAvatarOk, setGithubAvatarOk] = useState(true);

  // Live GitHub profile (avatar, bio, repo count). Anything missing or
  // failed falls back to the static config — the card never breaks.
  useEffect(() => {    fetch("https://api.github.com/users/Anishmaniyar")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setGithub({
          avatar:
            typeof data.avatar_url === "string" ? data.avatar_url : undefined,
          bio: typeof data.bio === "string" ? data.bio : null,
          repos:
            typeof data.public_repos === "number"
              ? data.public_repos
              : undefined,
        });
      })
      .catch(() => {});
  }, []);

  const githubMeta =
    github && typeof github.repos === "number"
      ? `${github.repos} public repositories`
      : undefined;

  const measure = useCallback((anchor: HTMLElement) => {
    const row = rowRef.current;
    if (!row) return null;
    const rowBox = row.getBoundingClientRect();
    const box = anchor.getBoundingClientRect();
    const width = Math.min(CARD_WIDTH, rowBox.width);
    const center = box.left - rowBox.left + box.width / 2;
    const left = Math.max(0, Math.min(center - width / 2, rowBox.width - width));
    const arrow = Math.max(20, Math.min(center - left, width - 20));
    return { left, arrow };
  }, []);

  const open = useCallback(
    (profile: SocialProfile, anchor: HTMLElement | null) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      if (anchor) {
        anchorRef.current = anchor;
        const g = measure(anchor);
        if (g) setGeom(g);
      }
      setActive(profile);
      if (prefersReducedMotion()) {
        setShown(true);
      } else {
        requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      }
    },
    [measure],
  );

  const close = useCallback(() => {
    if (prefersReducedMotion()) {
      setActive(null);
      setShown(false);
      return;
    }
    setShown(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_MS);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onResize = () => {
      if (anchorRef.current) {
        const g = measure(anchorRef.current);
        if (g) setGeom(g);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, measure]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <div
      ref={rowRef}
      className="relative"
      onMouseLeave={close}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          close();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <p className="text-muted connect-text">
        Find me on{" "}
        <span className="connect-icons">
          {SOCIAL_PROFILES.map((profile, index) => {
            const Icon = ICONS[profile.id];
            const isLast = index === SOCIAL_PROFILES.length - 1;
            return (
              <span key={profile.id} className="whitespace-nowrap">
                <a
                  href={profile.href}
                  aria-label={`${profile.label} profile`}
                  className="connect-link"
                  data-cuelume-tap=""
                  data-cuelume-hover=""
                  data-cuelume-emphasis="subtle"
                  style={{ "--brand": profile.brand } as CSSProperties}
                  onMouseEnter={(event) => open(profile, event.currentTarget)}
                  onFocus={(event) => open(profile, event.currentTarget)}
                  onClick={(event) => {
                    // Keyboard activation follows the link; touch taps toggle.
                    if (event.detail === 0) return;
                    if (window.matchMedia("(hover: none)").matches) {
                      if (active?.id !== profile.id) {
                        event.preventDefault();
                        open(profile, event.currentTarget);
                      }
                    }
                  }}
                >
                  <Icon />
                </a>
                {isLast ? ", " : " "}
              </span>
            );
          })}
        </span>
        or grab my{" "}
        <a
          href={RESUME_HREF}
          data-cuelume-tap=""
          data-cuelume-hover=""
          data-cuelume-emphasis="subtle"
          className="inline-flex translate-y-[2px] items-center gap-1"
        >
          <FileIcon />
          Resume
        </a>
        .
      </p>

      {active && (
        <div className="absolute inset-x-0 bottom-full z-20 pb-3">
          <div
            className={`connect-popover relative w-[min(400px,100%)] rounded-[20px] p-5 transition-all duration-200 motion-reduce:transition-none ${
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ marginLeft: geom.left }}
          >
            <div className="flex items-center gap-4">
              <Image
                src={
                  active.id === "github" &&
                  github?.avatar &&
                  githubAvatarOk
                    ? github.avatar
                    : "/images/profile.png"
                }
                alt={active.name ?? "Anish"}
                width={136}
                height={136}
                onError={() => setGithubAvatarOk(false)}
                className="h-[68px] w-[68px] shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="text-[15px] font-medium text-foreground">
                  {active.name ?? "Anish"}
                </div>
                {active.handle ? (
                  <div className="text-tertiary mt-0.5 text-[13px]">
                    {active.handle}
                  </div>
                ) : null}
                <div className="text-muted mt-1 text-[13px] leading-[20px]">
                  {active.id === "github" && github?.bio
                    ? github.bio
                    : active.description}
                </div>
                {(() => {
                  const text =
                    active.id === "github" ? githubMeta : active.meta;
                  return text ? (
                    <div className="text-tertiary mt-1 text-[13px]">{text}</div>
                  ) : null;
                })()}
              </div>
            </div>
            <span
              aria-hidden="true"
              style={{ left: geom.arrow - 7 }}
              className="connect-popover-arrow absolute -bottom-[7px] h-3.5 w-3.5 rotate-45"
            />
          </div>
        </div>
      )}
    </div>
  );
}
