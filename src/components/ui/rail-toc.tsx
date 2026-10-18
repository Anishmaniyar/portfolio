"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type RailTocItem = { id: string; label: string };

export type RailTocProps = React.ComponentProps<"nav"> & {
  items: RailTocItem[];
  /** Distance from the viewport top a section must cross to count as active. */
  offset?: number;
  title?: string;
};

/*
 * Section-navigation sidebar ("INDEX"): a quiet fixed list that tracks
 * the section currently in view. One passive scroll listener, no
 * observers duplicated elsewhere. Anchor semantics keep keyboard
 * navigation free; smooth scrolling respects prefers-reduced-motion.
 */

const RailToc = ({
  className,
  items,
  offset = 96,
  title = "INDEX",
  ...props
}: RailTocProps) => {
  const [active, setActive] = React.useState(-1);
  const activeRef = React.useRef(-1);
  const pinnedRef = React.useRef<number | null>(null);

  const measure = React.useCallback(() => {
    const anchor = window.scrollY + offset;
    let current = -1;
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(items[i].id);
      if (!el) continue;
      if (el.getBoundingClientRect().top + window.scrollY <= anchor + 1) {
        current = i;
      }
    }
    // A clicked item holds active state until the reader scrolls,
    // since the last section can't always scroll up to the anchor.
    if (pinnedRef.current !== null) current = pinnedRef.current;
    else if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      // At the very bottom the last section is always the one in view,
      // even when there isn't enough content below it to cross the anchor.
      current = items.length - 1;
    }
    if (current !== activeRef.current) {
      activeRef.current = current;
      setActive(current);
    }
  }, [items, offset]);

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (pinnedRef.current !== null) pinnedRef.current = null;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const select = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    const el = document.getElementById(items[index].id);
    if (!el) return;
    e.preventDefault();
    pinnedRef.current = index;
    activeRef.current = index;
    setActive(index);
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <nav
      data-slot="rail-toc"
      aria-label={title}
      className={cn("index-nav", className)}
      {...props}
    >
      <p data-slot="rail-toc-title" className="index-title" aria-hidden="true">
        {title}
      </p>
      <ul data-slot="rail-toc-list" className="index-list">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => select(e, i)}
                aria-current={isActive ? "location" : undefined}
                data-cuelume-hover=""
                data-cuelume-emphasis="subtle"
                className={cn("index-link", isActive && "is-active")}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { RailToc };
export default RailToc;
