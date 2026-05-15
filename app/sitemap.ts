import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/sanity/fetch";
import { SITE_URL } from "@/lib/seo/metadata";

// 主路由(去 locale 前缀)。每条会乘以 locales 数量生成 zh + en 两份。
const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/cases", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.flatMap((route) =>
    routing.locales.map((locale) => {
      const url = `${SITE_URL}/${locale}${route.path === "/" ? "" : route.path}`;
      // hreflang 多语言互指 (SEO guide §2.1)
      const languages: Record<string, string> = {};
      for (const l of routing.locales) {
        const tag = l === "zh" ? "zh-MY" : "en-MY";
        languages[tag] = `${SITE_URL}/${l}${route.path === "/" ? "" : route.path}`;
      }
      languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${route.path === "/" ? "" : route.path}`;
      return {
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      };
    }),
  );

  // 博客详情页(目前无 /blog/[slug] 路由,但先把 Sanity 里已发布的文章拉出来,
  // 等 detail 页加上即可生效。如果 fetch 失败则静默跳过,不阻塞 sitemap)
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts.flatMap((post) =>
      routing.locales.map((locale) => ({
        url: `${SITE_URL}/${locale}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    );
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
