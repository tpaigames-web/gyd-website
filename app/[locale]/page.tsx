import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("Hero");
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
    </main>
  );
}
