"use client";

import { useEffect } from "react";
import { useAudio, type CowSound } from "./AudioProvider";

export function AudioSourceLoader({ sounds }: { sounds: CowSound[] }) {
  const { setSounds } = useAudio();
  useEffect(() => {
    setSounds(sounds ?? []);
  }, [sounds, setSounds]);
  return null;
}
