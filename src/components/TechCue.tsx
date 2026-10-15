"use client";

import { play } from "cuelume";
import type { CSSProperties, ReactNode } from "react";

/*
 * A technology icon list item with sound: subtle `tap` on click
 * (via the delegated binding) and a subtle `select` on hover.
 * Hover sounds fire often by nature, so they use the stripped-back
 * `subtle` arrangement. Icons stay visual-only; names come from
 * `tip` (tooltip) or adjacent text for assistive tech.
 */

export default function TechCue({
  tip,
  brand,
  children,
}: {
  tip?: string;
  brand?: string;
  children: ReactNode;
}) {
  return (
    <li
      tabIndex={0}
      data-tip={tip}
      data-cuelume-tap=""
      data-cuelume-emphasis="subtle"
      style={brand ? ({ "--brand": brand } as CSSProperties) : undefined}
      onMouseEnter={() => {
        play("select", { emphasis: "subtle" });
      }}
    >
      {children}
    </li>
  );
}
