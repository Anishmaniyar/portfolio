import Image from "next/image";

/*
 * Cruor — blood donation and hospital inventory coordination.
 *
 * Refined mark: the original interlocking tri-arc — three tapered hooks
 * sweeping around a shared center — kept as-is, but flattened into one
 * warm-ivory silhouette on a transparent background. The heavy tile and
 * extruded shading from the source asset are dropped so the symbol sits
 * directly on the Work section's dark rounded container with only a
 * faint tonal edge, no bright plate behind it. No text, no glow.
 */
export default function CruorIcon() {
  return (
    <Image
      src="/images/cruor-mark.png"
      alt=""
      width={28}
      height={28}
      aria-hidden="true"
    />
  );
}
