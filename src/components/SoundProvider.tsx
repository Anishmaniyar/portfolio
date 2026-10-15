"use client";

import { useEffect } from "react";
import { bind } from "cuelume";

/*
 * Wires Cuelume's delegated sound bindings once for the whole
 * document. `bind()` is idempotent, SSR-safe, and keeps working
 * across client-side route changes. No audio files involved —
 * everything is synthesized live with Web Audio.
 */

export default function SoundProvider() {
  useEffect(() => bind(), []);
  return null;
}
