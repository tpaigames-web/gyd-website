import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

// SEO guide §2.1: 马来西亚多语言站点用 zh-MY / en-MY / x-default
const LOCALE_TO_HREFLANG: Record<string, string> = {
  zh: "zh-MY",
  en: "en-MY",
};

// OpenGraph locale 格式: 大区-地区 (符合 OG 协议)
const LOCALE_TO_OG: Record<string, string> = {
  zh: "zh_MY",
  en: "en_MY",
};

type BuildMetadataArgs = {
  locale: string;
  /** 相对路径(不含 locale 前缀)。首页传 "/" */
  path: string;
  title: string;
  description: string;
  /** 可选 OG 图覆盖。默认走 Next.js 全局 opengraph-image */
  image?: string;
  /** 是否阻止索引(用于 staging/未上线页) */
  noindex?: boolean;
};

/**
 * 统一构造 page metadata: title / description / canonical / hreflang / OG / Twitter。
 * 所有 page.tsx 的 generateMetadata 都应该走这个工厂。
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex,
}: BuildMetadataArgs): Metadata {
  const pathSegment = path === "/" ? "" : path;
  const canonical = `${SITE_URL}/${locale}${pathSegment}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const tag = LOCALE_TO_HREFLANG[l] ?? l;
    languages[tag] = `${SITE_URL}/${l}${pathSegment}`;
  }
  // x-default 指向默认 locale (zh)
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${pathSegment}`;

  const ogLocale = LOCALE_TO_OG[locale] ?? "zh_MY";
  const alternateLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => LOCALE_TO_OG[l] ?? "en_MY");

  return {
    // absolute 绕过 root layout 的 title.template (i18n 已含 GYD Marketing 后缀)
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "GYD Marketing",
      title,
      description,
      url: canonical,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
