"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";

/* Plain pfp-* classes from globals.css (see the note there on why). */

/*
 * Square photo stack. The active portrait renders upright on top while
 * four background photos peek out from behind and spread slightly on
 * hover. No motion library is installed, so easing is pure CSS.
 *
 * NOTE — intended asset paths (not yet in this repo):
 *   main portrait -> /images/profile.png
 *   backgrounds   -> /images/avatars/avatar-1.png … avatar-4.png
 * Until those files are added, the existing photographs below are
 * used so nothing renders broken. Swap the `src` values only.
 */
const GALLERY = [
  { src: "/images/profile-image.jpg", alt: "Anish" },
  { src: "/images/avatars/morales.jpg", alt: "Miles Morales" },
  { src: "/images/avatars/spider-gwen.jpg", alt: "Spider-Gwen" },
  { src: "/images/avatars/spidey.jpg", alt: "Spidey" },
  { src: "/images/avatars/spider-man.jpg", alt: "Spider-Man" },
];

const POS_CLASSES = [
  "pfp-pos0",
  "pfp-pos1",
  "pfp-pos2",
  "pfp-pos3",
  "pfp-pos4",
];

export default function AvatarStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const active = GALLERY[activeIndex];

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsExpanded(false);
  };

  return (
    <>
      {/* Collapsed PFP stack. Disappears entirely when expanded. */}
      <div className="pfp-stage" onKeyDown={closeOnEscape}>
        {!isExpanded ? (
          GALLERY.map((image, index) =>
            index === activeIndex ? (
              <button
                key={image.src}
                type="button"
                onClick={() => setIsExpanded(true)}
                aria-expanded={false}
                aria-label="Expand avatar collection"
                data-cuelume-open=""
                data-cuelume-emphasis="subtle"
                className="pfp-slot pfp-main"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={120}
                  priority
                  className="pfp-pic"
                />
              </button>
            ) : (
              <div
                key={image.src}
                aria-hidden="true"
                className={`pfp-slot pfp-bg-slot ${POS_CLASSES[index]}`}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={120}
                  height={120}
                  className="pfp-pic-bg"
                />
              </div>
            ),
          )
        ) : (
          /* Expanded main image only. Starts plain, scales/fades in. */
          <button
            key={active.src}
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-expanded={true}
            aria-label="Collapse avatar collection"
            data-cuelume-close=""
            data-cuelume-emphasis="subtle"
            className="pfp-slot pfp-main"
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={120}
              height={120}
              priority
              className="pfp-pic"
            />
          </button>
        )}
      </div>

      {/* Expanded gallery: straight images, active one excluded.
          Clicking a thumb makes it the new main image. */}
      {isExpanded && (
        <div className="pfp-tray-wrap" onKeyDown={closeOnEscape}>
          <ul className="pfp-tray">
            {GALLERY.map((image, index) => {
              if (index === activeIndex) return null;
              return (
                <li key={image.src} className="pfp-tray-item">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${image.alt} as the profile picture`}
                    data-cuelume-select=""
                    data-cuelume-emphasis="subtle"
                    className="pfp-thumb-btn"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={208}
                      height={208}
                      className="pfp-thumb"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
