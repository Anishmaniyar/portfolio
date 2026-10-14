"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";

/* Plain pfp-* classes from globals.css (see the note there on why). */

/*
 * Port of the original motion-based PFP stack. Rest/hover offsets, rotations
 * and z-order are copied 1:1 into AvatarStack.module.css (.pos0-.pos4);
 * springs are approximated with CSS easing (motion isn't installed here,
 * so no new dependency was added).
 *
 * Image mapping (original static imports don't exist in this repo):
 *   profileImg1 (2.jpg)  -> /images/profile-image.jpg
 *   profileImg2 (3.jpg)  -> /images/avatars/morales.jpg
 *   profileImg3 (4.jpg)  -> /images/avatars/spider-gwen.jpg
 *   profileImg4 (14.jpg) -> /images/avatars/spidey.jpg
 *   profileImg5 (15.jpg) -> /images/avatars/spider-man.jpg
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
                className="pfp-slot pfp-main"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={176}
                  height={176}
                  priority
                  className="pfp-pic"
                />
              </button>
            ) : (
              <div
                key={image.src}
                aria-hidden="true"
                className={`pfp-slot ${POS_CLASSES[index]}`}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={176}
                  height={176}
                  className="pfp-pic"
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
            className="pfp-slot pfp-main"
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={176}
              height={176}
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
                    className="pfp-thumb-btn"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={176}
                      height={176}
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
