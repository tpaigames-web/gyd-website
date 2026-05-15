import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return buildMetadata({
    locale,
    path: "/faq",
    title: t("faq.title"),
    description: t("faq.description"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PagePlaceholder
      title={locale === "en" ? "FAQ" : "常见问题"}
      hint={locale === "en" ? "[Content placeholder — coming soon]" : "[内容占位 — 等客户提供]"}
    />
  );
}
