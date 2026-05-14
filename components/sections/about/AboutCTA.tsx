import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pickLocalized } from "@/lib/i18n-fields";
import type { AboutPage } from "@/types/sanity";

export function AboutCTA({
  page,
  locale,
}: {
  page: AboutPage | null;
  locale: string;
}) {
  if (page?.ctaEnabled === false) return null;

  const title = pickLocalized(page, "ctaTitle", locale);
  const buttonText = pickLocalized(page, "ctaButtonText", locale);
  const buttonLink = page?.ctaButtonLink || "/contact";

  if (!title && !buttonText) return null;

  return (
    <section className="py-[clamp(80px,16vh,180px)]">
      <div className="container mx-auto px-4 text-center">
        {title && (
          <h2 className="mx-auto mb-8 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h2>
        )}
        {buttonText && (
          <Link
            href={buttonLink}
            className={buttonVariants({ size: "lg" })}
            style={{
              background: "var(--gyd-accent)",
              color: "var(--gyd-bg)",
            }}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
