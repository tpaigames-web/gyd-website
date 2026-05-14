import Image from "next/image";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity/client";
import { pickLocalized } from "@/lib/i18n-fields";
import type { Homepage } from "@/types/sanity";

export function HomepageHero({
  homepage,
  locale,
}: {
  homepage: Homepage | null;
  locale: string;
}) {
  const t = useTranslations("Hero");

  const title = pickLocalized(homepage, "heroTitle", locale, t("title"));
  const subtitle = pickLocalized(homepage, "heroSubtitle", locale, t("subtitle"));
  const ctaText = pickLocalized(homepage, "heroCTAText", locale, t("cta"));
  const ctaLink = homepage?.heroCTALink ?? "/contact";

  if (homepage?.heroEnabled === false) return null;

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      {homepage?.heroBackgroundType === "image" && homepage.heroImage && (
        <Image
          src={urlFor(homepage.heroImage).width(1920).height(1080).url()}
          alt=""
          fill
          priority
          className="object-cover"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
          {subtitle}
        </p>
        <Link href={ctaLink} className={buttonVariants({ size: "lg" })}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
