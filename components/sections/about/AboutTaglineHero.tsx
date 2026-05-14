import { pickLocalized } from "@/lib/i18n-fields";
import type { AboutPage } from "@/types/sanity";

/**
 * Tagline hero: large text with chosen words highlighted in brand orange.
 * Each "highlight" word in the localised highlights array gets wrapped in
 * a span with --gyd-accent color.
 */
export function AboutTaglineHero({
  page,
  locale,
}: {
  page: AboutPage | null;
  locale: string;
}) {
  const tagline = pickLocalized(page, "tagline", locale);
  if (!tagline) return null;

  const highlights = (
    locale === "en"
      ? page?.taglineHighlightsEn ?? page?.taglineHighlights
      : page?.taglineHighlights
  ) ?? [];

  // Build segments: split tagline by every highlight word, keep the delimiters.
  const segments = splitWithHighlights(tagline, highlights);

  return (
    <section className="relative overflow-hidden border-b border-[var(--gyd-line)] py-[clamp(80px,16vh,180px)]">
      <div className="container mx-auto px-4">
        <p className="mx-auto max-w-4xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl lg:text-6xl">
          {segments.map((seg, i) =>
            seg.isHighlight ? (
              <span key={i} className="text-[var(--gyd-accent)]">
                {seg.text}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}

function splitWithHighlights(text: string, highlights: string[]) {
  if (!highlights || highlights.length === 0) {
    return [{ text, isHighlight: false }];
  }
  // Build regex of all highlight words (escape regex chars).
  const escaped = highlights
    .filter(Boolean)
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return [{ text, isHighlight: false }];

  const re = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(re);
  return parts
    .filter((p) => p !== "")
    .map((p) => ({
      text: p,
      isHighlight: highlights.includes(p),
    }));
}
