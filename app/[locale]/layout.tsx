import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata, SITE_URL } from "@/lib/seo/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/interactive/WhatsAppButton";
import { CustomCursor } from "@/components/hero/CustomCursor";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioSourceLoader } from "@/components/audio/AudioSourceLoader";
import { GlobalClickSound } from "@/components/audio/GlobalClickSound";
import { getSiteSettings } from "@/lib/sanity/fetch";
import "../globals.css";

const LOCAL_COW_SOUNDS = [
  { _key: "local-1", url: "/sounds/cow_01.mp3" },
  { _key: "local-2", url: "/sounds/cow_02.mp3" },
  { _key: "local-3", url: "/sounds/cow_03.mp3" },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ISR: re-fetch siteSettings (Footer / WhatsApp / Sound) at most every 10s
export const revalidate = 10;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });

  const base = buildMetadata({
    locale,
    path: "/",
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  });

  // root layout 额外 metadata: metadataBase + title template + keywords + icons
  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    keywords: [
      "marketing agency",
      "outsource marketing",
      "JB marketing agency",
      "Johor Bahru marketing agency",
      "Iskandar Puteri marketing",
      "小红书代运营",
      "新山营销公司",
      "马来西亚营销公司",
      "JB 广告公司",
      "GYD Marketing",
      "管一点营销",
    ],
    authors: [{ name: "GYD Marketing" }],
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const cowSounds =
    settings?.cowSounds && settings.cowSounds.length > 0
      ? settings.cowSounds
      : LOCAL_COW_SOUNDS;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <AudioProvider>
            <AudioSourceLoader sounds={cowSounds} />
            <Header />
            {children}
            <Footer />
            <WhatsAppButton />
            <CustomCursor />
            <GlobalClickSound />
          </AudioProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
