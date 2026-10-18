import Image from "next/image";

/*
 * Zolt — durable job scheduling and execution.
 *
 * Refined mark: the blocky rounded zig-zag ("Z" of stepped plates) kept
 * as-is, flattened into one warm-ivory silhouette on a transparent
 * background. It reads as engineered, structured flow — jobs moving
 * through ordered stages — with only a faint tonal edge, no plate, no
 * glossy 3D. No text, no glow.
 */
export default function ZoltIcon() {
  return (
    <Image
      src="/images/zolt-mark.png"
      alt=""
      width={28}
      height={28}
      aria-hidden="true"
    />
  );
}
