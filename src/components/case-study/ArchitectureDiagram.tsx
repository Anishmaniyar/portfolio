import Image from "next/image";
import type { ArchitectureImage } from "../../data/case-studies";

/*
 * Architecture visuals: renders only the author's own system-design
 * PNGs. No generated boxes/arrows.
 */

export default function ArchitectureDiagram({
  images,
}: {
  images?: ArchitectureImage[];
}) {
  if (!images || images.length === 0) return null;
  return (
    <div className="cs-arch-figures">
      {images.map((image) => (
        <figure key={image.src} className="cs-arch-figure">
          <a
            href={image.src}
            target="_blank"
            rel="noreferrer"
            className="cs-arch-link"
            aria-label={`Open ${image.alt} full size`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 720px) 100vw, 720px"
            />
          </a>
          <figcaption className="cs-arch-caption">
            {image.caption} — click to expand
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
