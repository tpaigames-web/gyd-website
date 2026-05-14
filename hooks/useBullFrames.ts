"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 55;
const FRAME_START = 0;

export function useBullFrames() {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = FRAME_START; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/cow-frames/cow_${String(i).padStart(2, "0")}.png`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        console.warn("Failed to load frame", i);
      };
      frames[i] = img;
    }

    framesRef.current = frames;
  }, []);

  return { frames: framesRef, loadedCount, totalCount: FRAME_COUNT };
}
