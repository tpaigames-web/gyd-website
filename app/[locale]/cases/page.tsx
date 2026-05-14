import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const revalidate = 10;

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
