# GYD Marketing Website 🚀

> 专业的营销代理官网，基于 Next.js 16 + Sanity CMS + Framer Motion

一个功能完整、性能优化、易于扩展的现代化营销网站框架。

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f?logo=sanity)](https://www.sanity.io/)

## ✨ 特性

- 🎨 **现代化设计** - Tailwind CSS 4 + shadcn/ui 组件库
- 🎬 **流畅动画** - Framer Motion + GSAP + Lenis 平滑滚动
- 📝 **内容管理** - Sanity CMS 强大的无头 CMS
- 🌍 **多语言支持** - 中英文双语 (next-intl)
- 🌓 **主题切换** - Light/Dark 模式
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **性能优化** - 图片优化、代码分割、懒加载
- 🔍 **SEO 友好** - 结构化数据、元标签优化
- 🐮 **交互式吉祥物** - 55 帧牛吉祥物动画
- 🎯 **TypeScript** - 完整的类型支持

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd gyd-website
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=hpckm0n1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-here
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问:
- 网站: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## 📚 文档

- **[快速开始指南](./QUICKSTART.md)** - 5 分钟快速上手
- **[完整框架文档](./FRAMEWORK.md)** - 详细的技术文档
- **[使用示例](./EXAMPLES.md)** - 代码示例和最佳实践

## 📁 项目结构

```
gyd-website/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 多语言路由
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── animation/        # 动画组件
│   ├── sections/         # 页面区块
│   ├── layout/           # 布局组件
│   └── ui/               # UI 基础组件
├── lib/                   # 工具函数
│   ├── sanity/           # Sanity 集成
│   └── utils.ts          # 通用工具
├── types/                 # TypeScript 类型
├── hooks/                 # React Hooks
├── sanity/               # Sanity CMS
│   ├── schemas/          # 内容模型
│   └── structure.ts      # Studio 配置
└── public/               # 静态资源
```

## 🎬 动画系统

### 预制动画

```tsx
import { fadeInUp, staggerContainer, hoverLift } from "@/types/animation";
import { motion } from "framer-motion";

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  淡入上移
</motion.div>
```

### 滚动触发

```tsx
import { AnimatedSection } from "@/components";

<AnimatedSection variant="fadeInUp" delay={0.2}>
  滚动到视口时自动触发动画
</AnimatedSection>
```

### 牛吉祥物动画

```tsx
import { BullMascotAnimation } from "@/components";

<BullMascotAnimation
  config={{
    frameCount: 55,
    framePath: "/cow-frames/",
    scrollRange: [0, 0.5]
  }}
/>
```

## 🎨 组件库

### Service Card

```tsx
import { ServiceCard } from "@/components";

<ServiceCard service={service} locale={locale} index={0} />
```

### CTA Section

```tsx
import { CTASection } from "@/components";

<CTASection
  title="准备开始您的项目了吗?"
  buttonText="立即联系"
  buttonLink="/contact"
  locale={locale}
  variant="gradient"
/>
```

### 更多组件

查看 [EXAMPLES.md](./EXAMPLES.md) 获取完整的组件示例。

## 🌍 多语言

使用 `pickLocalized` 工具自动选择语言:

```tsx
import { pickLocalized } from "@/lib/i18n-fields";

const title = pickLocalized(service, "title", locale);
// 自动返回 titleZh 或 titleEn
```

## 🖼️ 图片优化

```tsx
import { urlForImage, getImageUrl } from "@/lib/sanity/image";

// 基础用法
const url = urlForImage(image).width(800).url();

// 优化选项
const optimized = getImageUrl(image, {
  width: 800,
  quality: 90,
  format: "webp"
});
```

## 🔧 技术栈

### 核心框架
- **Next.js 16** - React 服务端渲染框架
- **React 19** - UI 库
- **TypeScript 5** - 类型安全

### CMS & 数据
- **Sanity** - 无头 CMS
- **@sanity/client** - API 客户端

### 动画
- **Framer Motion** - React 动画库
- **GSAP** - JavaScript 动画库
- **Lenis** - 平滑滚动

### UI & 样式
- **Tailwind CSS 4** - 原子化 CSS
- **shadcn/ui** - 组件库
- **next-themes** - 主题切换
- **lucide-react** - 图标

### 国际化
- **next-intl** - i18n 方案

## 📦 构建部署

### 构建

```bash
npm run build
npm start
```

### Vercel 部署

1. 推送到 GitHub
2. 连接 Vercel
3. 添加环境变量
4. 自动部署 ✅

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License

---

**由 GYD Marketing 团队用 ❤️ 打造**

- 📧 Email: contact@gyd.com
- 🌐 Website: https://gyd.com
- 📱 WhatsApp: +60 123 456 789
