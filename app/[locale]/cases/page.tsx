import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const revalidate = 10;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return buildMetadata({
    locale,
    path: "/cases",
    title: t("cases.title"),
    description: t("cases.description"),
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PagePlaceholder
      title={locale === "en" ? "Cases" : "成功案例"}
      hint={
        locale === "en"
          ? "[Cases listing & detail pages coming next session]"
          : "[案例列表 + 详情页 — 下一波建,数据已在 Sanity]"
      }
    />
  );
}
