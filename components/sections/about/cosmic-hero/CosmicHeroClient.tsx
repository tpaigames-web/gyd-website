"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import { HandSVG } from "./HandSVG";
import { DotChip } from "./DotChip";
import { OrbitalSystem } from "./OrbitalSystem";
import type { ServiceCategory } from "@/types/sanity";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  categories: ServiceCategory[];
  locale: string;
  dotChipLabels: string[];
  coreLabel: string;
  finalCaptionLine1: string;
  finalCaptionLine2: string;
  introHeadline: string;
  introSubline: string;
  serviceAriaTemplate: string;
};

type ChipLayout = {
  label: string;
  startX: string;
  startY: string;
  rotate: number;
};

function buildChipLayouts(labels: string[], count: number): ChipLayout[] {
  const slots: Array<{ x: string; y: string; r: number }> = [
    { x: "-32vw", y: "-22vh", r: -8 },
    { x: "28vw", y: "-26vh", r: 6 },
    { x: "-36vw", y: "8vh", r: -4 },
    { x: "32vw", y: "12vh", r: 7 },
    { x: "-22vw", y: "26vh", r: -10 },
    { x: "22vw", y: "28vh", r: 5 },
    { x: "-8vw", y: "-30vh", r: -3 },
    { x: "6vw", y: "30vh", r: 4 },
  ];
  return labels.slice(0, count).map((label, i) => ({
    label,
    startX: slots[i % slots.length].x,
    startY: slots[i % slots.length].y,
    rotate: slots[i % slots.length].r,
  }));
}

export function CosmicHeroClient({
  categories,
  locale,
  dotChipLabels,
  coreLabel,
  finalCaptionLine1,
  finalCaptionLine2,
  introHeadline,
  introSubline,
  serviceAriaTemplate,
}: Props) {
  useLenis();

  const sectionRef = useRef<HTMLElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handWrapRef = useRef<HTMLDivElement>(null);
  const pinholeRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const bgFlashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(stage1Ref.current, { autoAlpha: 0 });
        gsap.set(handWrapRef.current, { autoAlpha: 0 });
        gsap.set(galaxyRef.current, { autoAlpha: 1, scale: 1 });
        gsap.set(captionRef.current, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(galaxyRef.current, { autoAlpha: 0, scale: 1.4 });
      gsap.set(captionRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(pinholeRef.current, { autoAlpha: 0, scale: 0 });
      gsap.set(handWrapRef.current, { autoAlpha: 1, scale: 1 });
      gsap.set(introTextRef.current, { autoAlpha: 1, y: 0 });
      dotRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: 1, scale: 1 });
      });

      const idleDotTweens: gsap.core.Tween[] = [];
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const dy = 6 + (i % 4) * 2;
        const dur = 2.4 + (i % 5) * 0.3;
        const t = gsap.to(el, {
          y: `+=${dy}`,
          duration: dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        idleDotTweens.push(t);
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: isMobile ? "+=140%" : "+=200%",
              pin: true,
              pinSpacing: true,
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;
                if (p >= 0.88) {
                  document.body.classList.add("cosmic-night");
                } else {
                  document.body.classList.remove("cosmic-night");
                }
              },
            },
          });

          tl.to(
            introTextRef.current,
            { autoAlpha: 0, y: -10, duration: 0.12, ease: "power2.in" },
            0.28,
          )
            .to(
              dotRefs.current.filter(Boolean) as HTMLDivElement[],
              {
                x: 0,
                y: 0,
                scale: 0.25,
                autoAlpha: 0,
                duration: 0.3,
                stagger: 0.025,
                ease: "power2.in",
              },
              0.3,
            )
            .to(
              handWrapRef.current,
              { scale: 1.18, duration: 0.3, ease: "power2.inOut" },
              0.32,
            )
            .to(
              pinholeRef.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.18,
                ease: "back.out(2)",
              },
              0.48,
            )

            .to(
              pinholeRef.current,
              { scale: 90, duration: 0.22, ease: "power2.in" },
              0.62,
            )
            .to(
              handWrapRef.current,
              {
                scale: 5.5,
                autoAlpha: 0,
                duration: 0.22,
                ease: "power2.in",
              },
              0.62,
            )
            .to(
              bgFlashRef.current,
              { autoAlpha: 1, duration: 0.05, ease: "power2.in" },
              0.82,
            )
            .to(
              bgFlashRef.current,
              { autoAlpha: 0, duration: 0.12, ease: "power2.out" },
              0.87,
            )

            .to(
              galaxyRef.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.15,
                ease: "power2.out",
              },
              0.85,
            )
            .to(
              captionRef.current,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.14,
                ease: "power2.out",
              },
              0.9,
            );

          return () => {
            tl.kill();
          };
        },
      );

      return () => {
        idleDotTweens.forEach((t) => t.kill());
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("cosmic-night");
    };
  }, []);

  const chips = buildChipLayouts(dotChipLabels, 8);

  return (
    <section
      ref={sectionRef}
      className="cosmic-hero relative -mt-16 min-h-screen overflow-hidden"
      style={{
        background: "var(--gyd-bg, #E8E0D0)",
        color: "var(--gyd-fg, #3A2B1E)",
      }}
      aria-label="About hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,230,212,0.7) 0%, rgba(255,230,212,0) 60%)",
        }}
      />

      <div
        ref={bgFlashRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-white"
        style={{ opacity: 0 }}
      />

      <div
        ref={introTextRef}
        className="pointer-events-none absolute top-[14vh] left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 px-6 text-center"
      >
        <h2 className="text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
          {introHeadline}
        </h2>
        <p className="mt-3 text-base text-[var(--gyd-muted)] md:text-lg">
          {introSubline}
        </p>
      </div>

      <div ref={stage1Ref} className="absolute inset-0 z-10">
        <div
          ref={dotsContainerRef}
          className="pointer-events-none absolute top-1/2 left-1/2 size-0"
        >
          {chips.map((chip, i) => (
            <DotChip
              key={`chip-${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              label={chip.label}
              style={{
                left: chip.startX,
                top: chip.startY,
                transform: `translate(-50%, -50%) rotate(${chip.rotate}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={handWrapRef}
        className="pointer-events-none absolute top-1/2 right-[4vw] z-20 -translate-y-1/2"
        style={{ width: "min(46vw, 50vh)", height: "min(46vw, 50vh)" }}
      >
        <HandSVG className="block size-full object-contain" />
      </div>

      <div
        ref={pinholeRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-30 rounded-full bg-[var(--gyd-accent)]"
        style={{
          width: "14px",
          height: "14px",
          transform: "translate(-50%, -50%)",
          boxShadow:
            "0 0 24px 8px rgba(241,90,36,0.55), 0 0 64px 16px rgba(241,90,36,0.25)",
        }}
      />

      <div ref={galaxyRef} className="absolute inset-0 z-25">
        <OrbitalSystem
          categories={categories}
          locale={locale}
          coreLabel={coreLabel}
          ariaLabelTemplate={serviceAriaTemplate}
        />
      </div>

      <div
        ref={captionRef}
        className="pointer-events-none absolute bottom-[8vh] left-1/2 z-30 w-full max-w-3xl -translate-x-1/2 px-6 text-center"
      >
        <p className="text-2xl font-bold tracking-tight md:text-4xl">
          {finalCaptionLine1}
        </p>
        <p className="mt-2 text-sm text-[var(--gyd-muted)] md:text-base">
          {finalCaptionLine2}
        </p>
      </div>
    </section>
  );
}
