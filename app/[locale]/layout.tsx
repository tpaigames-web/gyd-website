import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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

export const metadata: Metadata = {
  title: {
    default: "GYD Marketing | 管一点营销",
    template: "%s | GYD Marketing",
  },
  description:
    "GYD Marketing(管一点营销)— 新鲜不一样的全马营销代理。新山起家,服务全马中小企业与大企业。Marketing agency in Iskandar Puteri, Johor.",
  keywords: [
    "marketing agency",
    "outsource marketing",
    "营销",
    "小红书服务",
    "营销管理",
    "博主服务",
    "申请蓝勾",
    "小红书",
    "Facebook",
    "Instagram",
    "新山营销公司",
    "马来西亚营销公司",
    "johor bahru marketing agency",
    "johor bahru outsource marketing",
    "GYD Marketing",
    "管一点营销",
  ],
  authors: [{ name: "GYD Marketing" }],
  openGraph: {
    type: "website",
    siteName: "GYD Marketing",
    title: "GYD Marketing | 管一点营销",
    description:
      "新鲜不一样的全马营销代理。新山起家,服务全马中小企业与大企业。",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GYD Marketing | 管一点营销",
    description: "新鲜不一样的全马营销代理",
  },
};

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
