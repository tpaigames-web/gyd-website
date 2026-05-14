"use client";

import { Volume, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

export function VolumeControl() {
  const { volume, muted, sounds, setVolume, toggleMute } = useAudio();
  const Icon = muted || volume === 0 ? VolumeX : Volume;
  const effectiveVolume = muted ? 0 : volume;

  // Hide entirely if there are no sounds available — keeps Header clean before
  // velyn uploads any audio. The hook is still mounted (AudioProvider parent).
  if (sounds.length === 0) return null;

  return (
    <div data-sound-skip className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "取消静音" : "静音"}
        title={muted ? "取消静音" : "静音"}
        className="hover:text-primary rounded p-1 transition-colors"
      >
        <Icon className="size-5" />
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={effectiveVolume}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          setVolume(v);
          if (v > 0 && muted) toggleMute();
        }}
        aria-label="音量"
        className="hidden h-1 w-20 cursor-pointer appearance-none rounded bg-muted accent-primary md:block"
      />
    </div>
  );
}
