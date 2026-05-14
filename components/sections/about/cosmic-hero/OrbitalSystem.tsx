"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { CoreLogo } from "./CoreLogo";
import { OrbitNode } from "./OrbitNode";
import { pickLocalized } from "@/lib/i18n-fields";
import type { ServiceCategory } from "@/types/sanity";

type Props = {
  categories: ServiceCategory[];
  locale: string;
  coreLabel: string;
  ariaLabelTemplate: string;
};

type NodeLayout = {
  cat: ServiceCategory;
  name: string;
  blurb: string;
  angleDeg: number;
  radius: string;
  ringIndex: number;
};

const RADII = ["30vmin", "44vmin"];
const RING_ROTATION_BASE_SEC = 38;
const RING_ROTATION_STEP_SEC = 9;

export const OrbitalSystem = forwardRef<HTMLDivElement, Props>(
  function OrbitalSystem(
    { categories, locale, coreLabel, ariaLabelTemplate },
    ref,
  ) {
    const ringsRef = useRef<Array<HTMLDivElement | null>>([]);

    const nodes: NodeLayout[] = useMemo(() => {
      const safeCats = categories.length > 0 ? categories : [];
      const n = safeCats.length;
      if (n === 0) return [];

      const useTwoRings = n >= 5;
      const ringCount = useTwoRings ? 2 : 1;

      const out: NodeLayout[] = [];
      if (!useTwoRings) {
        safeCats.forEach((cat, i) => {
          const angle = (360 / n) * i - 90;
          out.push({
            cat,
            name: pickLocalized(cat, "name", locale) || `Service ${i + 1}`,
            blurb: pickLocalized(cat, "blurb", locale),
            angleDeg: angle,
            radius: RADII[0],
            ringIndex: 0,
          });
        });
      } else {
        const inner = Math.ceil(n / 2);
        const outer = n - inner;
        safeCats.slice(0, inner).forEach((cat, i) => {
          const angle = (360 / inner) * i - 90;
          out.push({
            cat,
            name: pickLocalized(cat, "name", locale) || `Service ${i + 1}`,
            blurb: pickLocalized(cat, "blurb", locale),
            angleDeg: angle,
            radius: RADII[0],
            ringIndex: 0,
          });
        });
        safeCats.slice(inner).forEach((cat, i) => {
          const angle = (360 / outer) * i - 90 + 180 / outer;
          out.push({
            cat,
            name:
              pickLocalized(cat, "name", locale) || `Service ${inner + i + 1}`,
            blurb: pickLocalized(cat, "blurb", locale),
            angleDeg: angle,
            radius: RADII[1],
            ringIndex: 1,
          });
        });
      }
      void ringCount;
      return out;
    }, [categories, locale]);

    const ringCount = nodes.length >= 5 ? 2 : 1;

    useEffect(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const tweens: gsap.core.Tween[] = [];
      ringsRef.current.forEach((el, i) => {
        if (!el) return;
        const dir = i % 2 === 0 ? 1 : -1;
        const dur = RING_ROTATION_BASE_SEC + i * RING_ROTATION_STEP_SEC;
        const t = gsap.to(el, {
          rotate: 360 * dir,
          duration: dur,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
        tweens.push(t);
      });
      return () => {
        tweens.forEach((t) => t.kill());
      };
    }, [nodes.length]);

    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-label="Service orbit system"
      >
        {Array.from({ length: ringCount }).map((_, i) => {
          const radius = RADII[i] ?? RADII[RADII.length - 1];
          return (
            <div
              key={`ring-${i}`}
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gyd-line)]"
              style={{
                width: `calc(${radius} * 2)`,
                height: `calc(${radius} * 2)`,
                borderColor: "rgba(241,90,36,0.18)",
              }}
            />
          );
        })}

        {Array.from({ length: ringCount }).map((_, i) => (
          <div
            key={`spin-${i}`}
            ref={(el) => {
              ringsRef.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0"
          >
            {nodes
              .filter((node) => node.ringIndex === i)
              .map((node, j) => (
                <OrbitNode
                  key={node.cat._key ?? `${i}-${j}`}
                  name={node.name}
                  blurb={node.blurb}
                  iconHint={node.cat.iconHint}
                  index={j}
                  angleDeg={node.angleDeg}
                  radius={node.radius}
                  counterRotationDurationSec={
                    RING_ROTATION_BASE_SEC + i * RING_ROTATION_STEP_SEC
                  }
                  counterRotationDirection={i % 2 === 0 ? -1 : 1}
                  ariaLabel={ariaLabelTemplate.replace("{name}", node.name)}
                />
              ))}
          </div>
        ))}

        <div className="pointer-events-auto relative z-10">
          <CoreLogo coreLabel={coreLabel} />
        </div>
      </div>
    );
  },
);
