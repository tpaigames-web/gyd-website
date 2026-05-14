"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";

type Props = {
  name: string;
  blurb?: string;
  iconHint?: string;
  index: number;
  angleDeg: number;
  radius: string;
  counterRotationDurationSec: number;
  counterRotationDirection: 1 | -1;
  ariaLabel: string;
};

export function OrbitNode({
  name,
  iconHint,
  index,
  angleDeg,
  radius,
  counterRotationDurationSec,
  counterRotationDirection,
  ariaLabel,
}: Props) {
  const counterRotateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRotateRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const tween = gsap.to(counterRotateRef.current, {
      rotate: 360 * counterRotationDirection,
      duration: counterRotationDurationSec,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, [counterRotationDurationSec, counterRotationDirection]);

  return (
    <div
      className="orbit-node pointer-events-none absolute top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(calc(-1 * ${radius})) rotate(${-angleDeg}deg)`,
      }}
      data-orbit-index={index}
    >
      <div ref={counterRotateRef} className="will-change-transform">
        <Link
          href="/services"
          aria-label={ariaLabel}
          className="pointer-events-auto group relative flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 shadow-md ring-1 ring-[var(--gyd-line)] backdrop-blur transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gyd-accent)]"
        >
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--gyd-accent)] text-xs font-black text-white"
          >
            {iconHint?.charAt(0).toUpperCase() ||
              name.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-bold tracking-tight text-[var(--gyd-fg)]">
            {name}
          </span>
        </Link>
      </div>
    </div>
  );
}
