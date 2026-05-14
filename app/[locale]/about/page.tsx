import { setRequestLocale } from "next-intl/server";
import { getAboutPage } from "@/lib/sanity/fetch";
import { AboutCosmicHero } from "@/components/sections/about/cosmic-hero/AboutCosmicHero";
import { BrandNameStory } from "@/components/sections/about/BrandNameStory";
import { PhilosophyQuotes } from "@/components/sections/about/PhilosophyQuotes";
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
      <AboutCosmicHero page={page} locale={locale} />
      <BrandNameStory page={page} locale={locale} />
      <PhilosophyQuotes page={page} locale={locale} />
      <AboutCTA page={page} locale={locale} />
    </main>
  );
}
