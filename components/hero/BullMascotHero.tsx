"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import { useBullFrames } from "@/hooks/useBullFrames";
import { BullCanvas, type BullCanvasHandle } from "./BullCanvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SPARK_COUNT = 18;

export function BullMascotHero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  marqueeText = "GROW YOUR DREAM",
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  marqueeText?: string;
}) {
  // Build marquee content: repeat the text 4x with separators so xPercent: -50
  // results in seamless loop (we shift by half of doubled content).
  const marqueeLoop = `${marqueeText} · ${marqueeText} · ${marqueeText} · ${marqueeText} · `;
  useLenis();
  const { frames, loadedCount, totalCount } = useBullFrames();

  const heroRef = useRef<HTMLElement>(null);
  const mascotWrapRef = useRef<HTMLDivElement>(null);
  const canvasHandleRef = useRef<BullCanvasHandle>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Build spark elements once
  useEffect(() => {
    const container = sparksRef.current;
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < SPARK_COUNT; i++) {
      const s = document.createElement("div");
      s.className =
        "absolute left-1/2 top-1/2 size-2 -ml-1 -mt-1 rounded-full pointer-events-none";
      if (i % 3 === 0) s.style.background = "#FFFFFF";
      else if (i % 3 === 1) s.style.background = "#FFD9A8";
      else s.style.background = "#F15A24";
      s.style.opacity = "0";
      s.style.transform = "translate(0,0) scale(0.4)";
      container.appendChild(s);
    }
  }, []);

  // Draw first frame ASAP
  useEffect(() => {
    if (loadedCount > 0) canvasHandleRef.current?.drawFrame(0);
  }, [loadedCount]);

  // GSAP master timeline
  useEffect(() => {
    if (!heroRef.current) return;
    // Wait for at least 30% frames to be loaded so scrub doesn't show blank
    if (loadedCount < Math.ceil(totalCount * 0.3)) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 30,
      });
      gsap.set([ringRef.current, glowRef.current], { autoAlpha: 0, scale: 0.2 });

      const sparksEls = Array.from(
        sparksRef.current?.children ?? [],
      ) as HTMLElement[];

      let sparksFired = false;
      const fireSparks = () => {
        sparksEls.forEach((s, i) => {
          const ang =
            (i / sparksEls.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          const dist = 220 + Math.random() * 180;
          gsap.fromTo(
            s,
            { x: 0, y: 0, opacity: 0, scale: 0.4 },
            {
              x: Math.cos(ang) * dist,
              y: Math.sin(ang) * dist,
              opacity: 1,
              scale: 1.6 + Math.random() * 1.2,
              duration: 0.7 + Math.random() * 0.4,
              ease: "power2.out",
            },
          );
          gsap.to(s, {
            opacity: 0,
            duration: 0.6,
            delay: 0.4 + Math.random() * 0.3,
            ease: "power2.in",
          });
        });
      };
      const resetSparks = () => {
        sparksEls.forEach((s) => {
          gsap.set(s, { x: 0, y: 0, opacity: 0, scale: 0.4 });
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Frame flipbook
            const idx = Math.max(
              0,
              Math.min(totalCount - 1, Math.round(p * (totalCount - 1))),
            );
            canvasHandleRef.current?.drawFrame(idx);
            // Sparks
            if (p > 0.85 && !sparksFired) {
              fireSparks();
              sparksFired = true;
            }
            if (p < 0.8 && sparksFired) {
              sparksFired = false;
              resetSparks();
            }
            // Theme flip
            if (p >= 0.88) {
              if (!document.body.classList.contains("flash-done")) {
                document.body.classList.add("flash-done");
              }
            } else if (p < 0.85) {
              if (document.body.classList.contains("flash-done")) {
                document.body.classList.remove("flash-done");
              }
            }
          },
        },
      });

      tl
        // 0 → 0.85: bull drifts right (leaves room for title on left)
        .to(
          mascotWrapRef.current,
          { x: "20vw", duration: 0.85, ease: "power1.inOut" },
          0,
        )
        // 0 → 0.85: marquee sweeps right → left
        .fromTo(
          marqueeRef.current,
          { xPercent: 0 },
          { xPercent: -50, duration: 0.85, ease: "none" },
          0,
        )
        // 0.65 → 0.82: lens ring charges
        .to(
          ringRef.current,
          {
            autoAlpha: 1,
            scale: 3.2,
            rotate: 180,
            duration: 0.17,
            ease: "power2.out",
          },
          0.65,
        )
        // 0.72 → 0.86: lens glow blooms
        .to(
          glowRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power2.out" },
          0.72,
        )
        // 0.85 → 0.88: FLASH bursts
        .to(
          flashRef.current,
          { opacity: 1, duration: 0.03, ease: "power2.in" },
          0.85,
        )
        // 0.88 → 1.0: flash fades, lens ring/glow fade, title reveals
        .to(
          flashRef.current,
          { opacity: 0, duration: 0.12, ease: "power2.out" },
          0.88,
        )
        .to(
          [ringRef.current, glowRef.current],
          { autoAlpha: 0, duration: 0.1, ease: "power2.out" },
          0.88,
        )
        .to(
          [titleRef.current, subtitleRef.current, ctaRef.current],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.12,
            stagger: 0.03,
            ease: "power2.out",
          },
          0.88,
        );
    }, heroRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("flash-done");
    };
  }, [loadedCount, totalCount]);

  const loadingPct = Math.round((loadedCount / totalCount) * 100);
  const minLoaded = loadedCount >= Math.ceil(totalCount * 0.3);

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ background: "var(--gyd-bg, #E8E0D0)", color: "var(--gyd-fg, #3A2B1E)" }}
    >
      {/* Marquee background (big orange letters scrolling) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap text-[18vh] font-black"
          style={{
            color: "var(--gyd-accent, #F15A24)",
            opacity: 0.45,
          }}
        >
          {marqueeLoop}
        </div>
      </div>

      {/* Mascot stage */}
      <div
        ref={mascotWrapRef}
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-[min(80vw,80vh)] -translate-x-1/2 -translate-y-1/2"
      >
        <BullCanvas ref={canvasHandleRef} framesRef={frames} />
        {/* Lens glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(241,90,36,0.55) 0%, rgba(241,90,36,0) 60%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Lens ring */}
        <div
          ref={ringRef}
          className="pointer-events-none absolute top-1/2 left-1/2 size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ borderColor: "var(--gyd-accent, #F15A24)" }}
        />
      </div>

      {/* Sparks origin (at viewport center) */}
      <div
        ref={sparksRef}
        className="pointer-events-none absolute top-1/2 left-1/2 z-[15] size-0"
      />

      {/* Flash overlay */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-20 bg-white opacity-0"
      />

      {/* Hero text content */}
      <div className="relative z-30 container mx-auto flex h-screen items-end px-4 pb-20">
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="mb-6 text-5xl font-black tracking-tight md:text-7xl"
            style={{ opacity: 0 }}
          >
            {title}
          </h1>
          <p
            ref={subtitleRef}
            className="mb-8 max-w-2xl text-lg md:text-xl"
            style={{ opacity: 0, color: "var(--gyd-muted, #9B9486)" }}
          >
            {subtitle}
          </p>
          <a
            ref={ctaRef}
            href={ctaLink}
            className="inline-block rounded-full px-8 py-4 font-bold transition-transform hover:scale-105"
            style={{
              opacity: 0,
              background: "var(--gyd-accent, #F15A24)",
              color: "var(--gyd-bg, #E8E0D0)",
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* Loading indicator (dev/UX helper) */}
      {!minLoaded && (
        <div
          aria-live="polite"
          className="fixed right-4 bottom-4 z-50 rounded bg-black/80 px-3 py-1 text-sm text-white"
        >
          Loading bull… {loadingPct}%
        </div>
      )}
    </section>
  );
}
