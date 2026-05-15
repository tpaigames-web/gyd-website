import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAboutPage } from "@/lib/sanity/fetch";
import { pickLocalized } from "@/lib/i18n-fields";
import { buildMetadata } from "@/lib/seo/metadata";
import { AboutCosmicHero } from "@/components/sections/about/cosmic-hero/AboutCosmicHero";
import { BrandNameStory } from "@/components/sections/about/BrandNameStory";
import { PhilosophyQuotes } from "@/components/sections/about/PhilosophyQuotes";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const revalidate = 10;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [page, t] = await Promise.all([
    getAboutPage(),
    getTranslations({ locale, namespace: "Seo" }),
  ]);
  const title = pickLocalized(page, "seoTitle", locale, t("about.title"));
  const description = pickLocalized(
    page,
    "seoDescription",
    locale,
    t("about.description"),
  );
  return buildMetadata({ locale, path: "/about", title, description });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getAboutPage();

  return (
    <main className="flex flex-col">
      <AboutCosmicHero page={page} locale={locale} />
      <BrandNameStory page={page} locale={locale} />
      <PhilosophyQuotes page={page} locale={locale} />
      <AboutCTA page={page} locale={locale} />
    </main>
  );
}
