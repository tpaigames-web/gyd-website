"use client";

import { motion } from "framer-motion";
import { pickLocalized } from "@/lib/i18n-fields";
import type { AboutPage } from "@/types/sanity";

/**
 * The brand name story: 3-block progressive reveal explaining
 * GYD Marketing (formal) → gyd · 管一点 (signature) → 管一点就好,管好营销就好 (philosophy).
 *
 * Uses Framer Motion `whileInView` so each line animates in as the user scrolls.
 */
export function BrandNameStory({
  page,
  locale,
}: {
  page: AboutPage | null;
  locale: string;
}) {
  if (page?.brandStoryEnabled === false) return null;

  const title = pickLocalized(page, "brandStoryTitle", locale);
  const formalName = page?.brandStoryFormalName ?? "GYD Marketing";
  const lowercaseMark = page?.brandStoryLowercaseMark ?? "gyd";
  const acronym = pickLocalized(page, "brandStoryAcronym", locale);
  const philosophy = pickLocalized(page, "brandStoryPhilosophy", locale);
  const note = pickLocalized(page, "brandStoryNote", locale);

  return (
    <section className="border-b border-[var(--gyd-line)] py-[clamp(80px,16vh,180px)]">
      <div className="container mx-auto px-4">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[var(--gyd-muted)] mb-8 text-sm font-semibold tracking-widest uppercase"
        >
          <span className="text-[var(--gyd-accent)]">●</span>{" "}
          {title || "Why gyd"}
        </motion.p>

        {/* Block 1: formal name */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-black leading-none tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
          }}
        >
          {formalName}
        </motion.h2>

        {/* Block 2: = gyd · 管一点 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-6 flex flex-wrap items-baseline gap-3 md:gap-6"
        >
          <span
            className="text-[var(--gyd-muted)]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            =
          </span>
          <span
            className="text-[var(--gyd-accent)] font-black lowercase"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            {lowercaseMark}
          </span>
          <span
            className="text-[var(--gyd-muted)]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            ·
          </span>
          <span
            className="font-bold"
            style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
          >
            {acronym}
          </span>
        </motion.div>

        {/* Block 3: philosophy line */}
        {philosophy && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-10 max-w-3xl text-2xl font-semibold leading-snug md:text-4xl"
          >
            {philosophy}
          </motion.p>
        )}

        {/* Optional supporting note */}
        {note && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="text-[var(--gyd-muted)] mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
          >
            {note}
          </motion.p>
        )}
      </div>
    </section>
  );
}
