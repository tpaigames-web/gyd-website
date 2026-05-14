import { pickLocalized } from "@/lib/i18n-fields";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { AboutPage, ServiceCategory } from "@/types/sanity";

/**
 * 4-category overview grid. Each card = a service angle; click → /services.
 * Numbered ①②③④ markers tie into the brand's "数字标记" pattern (DESIGN.md §4.5).
 */
export function ServiceCategoriesGrid({
  page,
  locale,
}: {
  page: AboutPage | null;
  locale: string;
}) {
  if (page?.categoriesEnabled === false) return null;

  const categories = page?.categories ?? [];
  if (categories.length === 0) return null;

  const title = pickLocalized(page, "categoriesTitle", locale);
  const subtitle = pickLocalized(page, "categoriesSubtitle", locale);

  const numerals = ["①", "②", "③", "④", "⑤", "⑥"];

  return (
    <section className="border-b border-[var(--gyd-line)] py-[clamp(80px,16vh,180px)]">
      <div className="container mx-auto px-4">
        <p className="text-[var(--gyd-muted)] mb-4 text-sm font-semibold tracking-widest uppercase">
          <span className="text-[var(--gyd-accent)]">●</span>{" "}
          {title || "What we do"}
        </p>
        {subtitle && (
          <h2 className="mb-12 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {subtitle}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat: ServiceCategory, idx: number) => {
            const name = pickLocalized(cat, "name", locale);
            const blurb = pickLocalized(cat, "blurb", locale);
            return (
              <Link
                key={cat._key}
                href="/services"
                className="group block focus:outline-none"
                aria-label={name}
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-[var(--gyd-accent)] mb-4 text-3xl leading-none">
                      {numerals[idx] ?? "•"}
                    </div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight">
                      {name}
                    </h3>
                    <p className="text-[var(--gyd-muted)] text-sm leading-relaxed">
                      {blurb}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
