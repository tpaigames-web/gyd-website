import { pickLocalized } from "@/lib/i18n-fields";
import type { AboutPage } from "@/types/sanity";

/**
 * Two-quote philosophy section. Quotes come from the homepage doc
 * (projected by aboutPageQuery), so editing homepage philosophy
 * automatically updates the About page too — single source of truth.
 */
export function PhilosophyQuotes({
  page,
  locale,
}: {
  page: AboutPage | null;
  locale: string;
}) {
  if (page?.philosophyEnabled === false) return null;

  const title = pickLocalized(page, "philosophySectionTitle", locale);
  const philosophy = pickLocalized(page, "philosophyQuote", locale);
  const positioning = pickLocalized(page, "positioningQuote", locale);

  if (!philosophy && !positioning) return null;

  return (
    <section className="border-b border-[var(--gyd-line)] py-[clamp(80px,16vh,180px)]">
      <div className="container mx-auto px-4">
        <p className="text-[var(--gyd-muted)] mb-12 text-sm font-semibold tracking-widest uppercase">
          <span className="text-[var(--gyd-accent)]">●</span>{" "}
          {title || "Our Philosophy"}
        </p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {philosophy && (
            <blockquote className="border-l-4 border-[var(--gyd-accent)] pl-6">
              <p className="text-xl leading-relaxed font-semibold md:text-2xl">
                {philosophy}
              </p>
              <footer className="text-[var(--gyd-muted)] mt-4 text-sm">
                {locale === "en" ? "— Our philosophy" : "— 品牌理念"}
              </footer>
            </blockquote>
          )}

          {positioning && (
            <blockquote className="border-l-4 border-[var(--gyd-accent)] pl-6">
              <p className="text-xl leading-relaxed font-semibold md:text-2xl">
                {positioning}
              </p>
              <footer className="text-[var(--gyd-muted)] mt-4 text-sm">
                {locale === "en" ? "— Our positioning" : "— 品牌定位"}
              </footer>
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
}
