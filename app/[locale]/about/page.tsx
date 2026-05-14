import { setRequestLocale } from "next-intl/server";
import { getAboutPage } from "@/lib/sanity/fetch";
import { AboutTaglineHero } from "@/components/sections/about/AboutTaglineHero";
import { BrandNameStory } from "@/components/sections/about/BrandNameStory";
import { PhilosophyQuotes } from "@/components/sections/about/PhilosophyQuotes";
import { ServiceCategoriesGrid } from "@/components/sections/about/ServiceCategoriesGrid";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const revalidate = 10;

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
      <AboutTaglineHero page={page} locale={locale} />
      <BrandNameStory page={page} locale={locale} />
      <PhilosophyQuotes page={page} locale={locale} />
      <ServiceCategoriesGrid page={page} locale={locale} />
      <AboutCTA page={page} locale={locale} />
    </main>
  );
}
