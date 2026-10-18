import Image from "next/image";

/*
 * Ascend — aptitude preparation for placements and interviews.
 *
 * Refined mark: the overlapping ribbon forms — two rounded, flowing
 * plates that interlock and fold through each other — kept as-is, cut
 * out on a transparent background with only the reference's soft tonal
 * shading (gentle highlight to shadow) left in. Motion, layered depth,
 * no text, no glow, no hard 3D.
 */
export default function AscendIcon() {
  return (
    <Image
      src="/images/ascend-mark.png"
      alt=""
      width={28}
      height={28}
      aria-hidden="true"
    />
  );
}
