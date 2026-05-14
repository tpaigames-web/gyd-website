"use client";

import { useEffect } from "react";
import { useAudio } from "./AudioProvider";

/**
 * Plays a random moo on ANY click anywhere on the page.
 * Skips clicks inside elements (or descendants of elements) marked with
 * `data-sound-skip` — typically the volume control itself, so adjusting
 * audio settings doesn't trigger a sound and feel chaotic.
 */
export function GlobalClickSound() {
  const { playRandomMoo } = useAudio();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest("[data-sound-skip]")) return;
      playRandomMoo();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [playRandomMoo]);

  return null;
}
