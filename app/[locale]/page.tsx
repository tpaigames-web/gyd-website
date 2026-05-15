import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getHomepage, getServices, getFeaturedTestimonials } from "@/lib/sanity/fetch";
import { pickLocalized } from "@/lib/i18n-fields";
import { buildMetadata } from "@/lib/seo/metadata";
import { BullMascotHero } from "@/components/hero/BullMascotHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

// ISR: refetch Sanity at most every 10 seconds. After velyn publishes a
// change, refreshing the page within ~10s shows it live.
export const revalidate = 10;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [homepage, t] = await Promise.all([
    getHomepage(),
    getTranslations({ locale, namespace: "Seo" }),
  ]);
  const title = pickLocalized(homepage, "seoTitle", locale, t("home.title"));
  const description = pickLocalized(
    homepage,
    "seoDescription",
    locale,
    t("home.description"),
  );
  return buildMetadata({ locale, path: "/", title, description });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homepage, services, testimonials, t] = await Promise.all([
    getHomepage(),
    getServices(),
    getFeaturedTestimonials(),
    getTranslations("Hero"),
  ]);

  const title = pickLocalized(homepage, "heroTitle", locale, t("title"));
  const subtitle = pickLocalized(homepage, "heroSubtitle", locale, t("subtitle"));
  const ctaText = pickLocalized(homepage, "heroCTAText", locale, t("cta"));
  const ctaLink = homepage?.heroCTALink ?? "/contact";
  const marqueeText = pickLocalized(
    homepage,
    "heroMarqueeText",
    locale,
    "GROW YOUR DREAM",
  );

  return (
    <main className="flex flex-col">
      <BullMascotHero
        title={title}
        subtitle={subtitle}
        ctaText={ctaText}
        ctaLink={ctaLink}
        marqueeText={marqueeText}
      />
      <ServicesSection
        homepage={homepage}
        fallbackServices={services}
        locale={locale}
      />
      <TestimonialsSection
        homepage={homepage}
        fallbackTestimonials={testimonials}
        locale={locale}
      />
    </main>
  );
}
