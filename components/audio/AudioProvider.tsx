"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CowSound {
  _key: string;
  url?: string;
}

interface AudioContextValue {
  volume: number;
  muted: boolean;
  sounds: CowSound[];
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setSounds: (s: CowSound[]) => void;
  playRandomMoo: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

const STORAGE_KEY_VOLUME = "gyd-audio-volume";
const STORAGE_KEY_MUTED = "gyd-audio-muted";
const DEFAULT_VOLUME = 0.7;

export function AudioProvider({ children }: { children: ReactNode }) {
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [sounds, setSounds] = useState<CowSound[]>([]);
  const lastPlayedIndexRef = useRef<number>(-1);
  const lastPlayTimeRef = useRef<number>(0);
  const PLAY_THROTTLE_MS = 180;

  // Restore prefs from localStorage
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY_VOLUME);
      const m = window.localStorage.getItem(STORAGE_KEY_MUTED);
      if (v !== null) {
        const parsed = parseFloat(v);
        if (!Number.isNaN(parsed)) setVolumeState(Math.max(0, Math.min(1, parsed)));
      }
      if (m === "true") setMuted(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — silently keep defaults
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    try {
      window.localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY_MUTED, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const playRandomMoo = useCallback(() => {
    if (muted || volume <= 0) return;
    const playable = sounds.filter((s) => !!s.url);
    if (playable.length === 0) return;

    // Throttle rapid-fire clicks so sounds don't stack into mush
    const now = Date.now();
    if (now - lastPlayTimeRef.current < PLAY_THROTTLE_MS) return;
    lastPlayTimeRef.current = now;

    // Avoid repeating the same sound consecutively when we have at least 2
    let idx = Math.floor(Math.random() * playable.length);
    if (playable.length > 1 && idx === lastPlayedIndexRef.current) {
      idx = (idx + 1) % playable.length;
    }
    lastPlayedIndexRef.current = idx;

    const url = playable[idx].url;
    if (!url) return;
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      void audio.play().catch(() => {
        // Browser may block autoplay; user gesture path should be fine
      });
    } catch {
      /* ignore */
    }
  }, [muted, volume, sounds]);

  return (
    <AudioCtx.Provider
      value={{
        volume,
        muted,
        sounds,
        setVolume,
        toggleMute,
        setSounds,
        playRandomMoo,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used inside <AudioProvider>");
  }
  return ctx;
}
