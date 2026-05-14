import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PagePlaceholder
      title={locale === "en" ? "Contact" : "联系我们"}
      hint={locale === "en" ? "[Content placeholder — coming soon]" : "[内容占位 — 等客户提供]"}
    />
  );
}
