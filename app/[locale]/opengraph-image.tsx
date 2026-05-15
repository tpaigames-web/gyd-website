import { ImageResponse } from "next/og";

// SEO guide §2.1: 社交分享卡片标准尺寸
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GYD Marketing — JB Johor Bahru Marketing Agency";

// Next.js 按惯例发现此文件: 自动作用于 /{locale}/... 所有子路由的默认 OG 图。
// 路由示例: /zh/opengraph-image, /en/opengraph-image
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === "zh";
  const tagline = isZh
    ? "被看见 · 记住 · 喜爱"
    : "Seen · Remembered · Loved";
  const subline = isZh
    ? "JB 新山营销代理 · Iskandar Puteri"
    : "Johor Bahru Marketing Agency · Iskandar Puteri";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #F15A24 0%, #E8E0D0 100%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#3A2B1E",
        }}
      >
        {/* Top: brand wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#FAF6EF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 900,
              color: "#F15A24",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            g
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#FAF6EF",
              letterSpacing: "-0.5px",
            }}
          >
            GYD Marketing
          </div>
        </div>

        {/* Center: main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              fontSize: isZh ? "104px" : "96px",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#FAF6EF",
              letterSpacing: "-2px",
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#FAF6EF",
              opacity: 0.85,
              lineHeight: 1.3,
            }}
          >
            {subline}
          </div>
        </div>

        {/* Bottom: service tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {["BRAND", "CONTENT", "SOCIAL", "ADS", "OFFLINE"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(250,246,239,0.15)",
                color: "#FAF6EF",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                border: "2px solid rgba(250,246,239,0.4)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

