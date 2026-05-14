import { getTranslations } from "next-intl/server";
import { CosmicHeroClient } from "./CosmicHeroClient";
import type { AboutPage, ServiceCategory } from "@/types/sanity";

type Props = {
  page: AboutPage | null;
  locale: string;
};

const FALLBACK_CATEGORIES: ServiceCategory[] = [
  { _key: "fb-brand", nameZh: "品牌策略", nameEn: "Brand", iconHint: "B" },
  { _key: "fb-content", nameZh: "内容创意", nameEn: "Content", iconHint: "C" },
  { _key: "fb-social", nameZh: "社交营销", nameEn: "Social", iconHint: "S" },
  { _key: "fb-ads", nameZh: "广告投放", nameEn: "Ads", iconHint: "A" },
  { _key: "fb-offline", nameZh: "线下体验", nameEn: "Offline", iconHint: "O" },
];

export async function AboutCosmicHero({ page, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "AboutCosmic" });

  const categories =
    page?.categories && page.categories.length > 0
      ? page.categories
      : FALLBACK_CATEGORIES;

  const dotChipLabels = (t.raw("dotChips") as string[]) ?? [];

  return (
    <CosmicHeroClient
      categories={categories}
      locale={locale}
      dotChipLabels={dotChipLabels}
      coreLabel={t("coreLabel")}
      finalCaptionLine1={t("finalCaptionLine1")}
      finalCaptionLine2={t("finalCaptionLine2")}
      introHeadline={t("introHeadline")}
      introSubline={t("introSubline")}
      serviceAriaTemplate={t("serviceCtaAria", { name: "{name}" })}
    />
  );
}
