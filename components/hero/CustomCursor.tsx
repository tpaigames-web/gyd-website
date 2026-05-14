"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onEnter = () => cursor.classList.add("cursor-big");
    const onLeave = () => cursor.classList.remove("cursor-big");

    window.addEventListener("mousemove", onMove);
    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] -ml-2 -mt-2 hidden size-4 rounded-full bg-[var(--gyd-accent,#ff5b1f)] mix-blend-difference transition-[width,height] duration-200 md:block"
    />
  );
}
