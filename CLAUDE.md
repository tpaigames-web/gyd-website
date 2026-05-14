@AGENTS.md

# GYD Marketing — Claude Code Guidelines

本文档约束 Claude 在本项目里的所有写代码 / 改代码行为。命中任一硬性禁令的产出都必须撤回重做。

## 项目概览

- **栈**：Next.js 16.2.6 (App Router, Turbopack) + React 19.2 + TypeScript 5
- **样式**：Tailwind v4 + 自定义 CSS 变量（见 [DESIGN.md](DESIGN.md) §2）
- **动画**：GSAP 3.15 + ScrollTrigger 主力，Lenis 1.3 平滑滚动，Framer Motion 12（仅 BrandNameStory 等少数 whileInView 场景）
- **内容**：Sanity CMS（next-sanity），所有文案/类目通过 GROQ 查询拉取
- **i18n**：next-intl 4，路由 `[locale]`，zh/en 两语言，文案分两源——
  - Sanity 字段：`{name}Zh / {name}En`，用 `pickLocalized()` 取
  - 静态文案：`messages/{locale}.json`，用 `useTranslations` / `getTranslations` 取
- **3D**：Three.js + React Three Fiber 已装但当前未使用
- **CMS Studio**：独立 sanity-studio 工程，跑在 :3333

主源文档（必读再动手）：
- **DESIGN.md** — 设计 token、配色、字体、动画规格（**最高优先级**，写组件前必读）
- **AGENTS.md** — Next.js 16 破坏性变更警告
- **MASTER_BRIEF.md**（在 ../docs/）— 文案主源

---

## CRITICAL — 硬性禁令

以下规则为绝对禁令，违反任何一条都可能导致构建失败、视觉破图或数据丢失。

### NEVER: 编辑未读过的文件

```
NEVER edit a file you haven't read in this session.
WHY: 凭记忆或幻觉修改文件，改出来的内容和实际代码对不上。
本次 cosmic-hero 已经踩过——handRef 残留导致 ReferenceError, 整个 about 页 500。
轻则 Type error 阻塞 Vercel build, 重则覆盖正在编辑的工作。
```

### NEVER: 画蛇添足

```
NEVER add features, refactors, or "improvements" beyond what was asked.
WHY: 一个小修改不需要顺手把旁边也重做一遍。
额外的改动引入额外的风险, 用户没有预期这些变化, review 时容易漏过。
```
- 不要加没被要求的东西
- 不要为不可能发生的情况做预防, 只在真正需要的边界做校验
- 三行重复内容好过一个过早的抽象

### NEVER: 润色或隐瞒

```
NEVER embellish results or hide what you didn't do.
WHY: 说"看起来没问题"不等于验证过。用户信任你的汇报来做决策。
```
- 做过的步骤就说做过, 没做过的就说没做过
- 不要暗示"已验证"但其实只是改了代码没打开浏览器看
- 事情确实做好了, 也不要加一堆没必要的免责声明

### NEVER: 甩锅思考

```
NEVER write "根据你的调查结果去处理" to a sub-agent.
WHY: 这等于把判断也甩出去。要自己先消化信息做出判断,
再给子任务明确方向: 要做什么、为什么、已经排除了什么。
```

### NEVER: 绕过设计系统

```
NEVER hardcode colors / spacing / fonts in components.
WHY: 项目签名动效是滚动到 88% 触发 body.flash-done 切换主题色,
硬编码 hex 不会跟着翻, 整页视觉裂开。
```
- 颜色用 `var(--gyd-bg)` / `var(--gyd-accent)` 等 CSS 变量（见 [DESIGN.md](DESIGN.md) §2）
- 字号用 `clamp()` 流式响应, 别写死 px
- 间距走 Tailwind 标准刻度, 别 `[12.3px]` 这种奇数值

### NEVER: 在 server component 里写 'use client' 副作用

```
NEVER mix server + client logic in one file.
WHY: Next.js App Router 严格区分两者。useState/useRef/useEffect 必须在 'use client'文件;
Sanity fetch / getTranslations / setRequestLocale 必须在 server 文件。
```
- 模式：server wrapper（拉数据 + 拼 props）→ `'use client'` 子件（拿 props 做交互）
- 参考: `AboutCosmicHero.tsx` (server) → `CosmicHeroClient.tsx` (client)

### DO NOT: 用过时 API

```
DO NOT use Next.js patterns from training data without verifying.
WHY: 项目用 Next.js 16, 跟你训练时见过的可能不一样。
params 现在是 Promise, headers/cookies/draftMode 现在 async, etc.
```
必要时读 `node_modules/next/dist/docs/` 验证当前 API。

---

## Mandatory Coding Rules

### 1. 颜色 / 字体 / 间距走 token

```tsx
// WRONG
<div style={{ background: "#F15A24" }} />
<p className="text-[24.3px]" />

// CORRECT
<div className="bg-[var(--gyd-accent)]" />
<p style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }} />
```

### 2. 文件命名

- 组件：PascalCase（`CosmicHeroClient.tsx`, `OrbitNode.tsx`）
- Hooks：camelCase + `use` 前缀（`useLenis.ts`, `useBullFrames.ts`）
- 工具函数：camelCase（`pickLocalized.ts`, `i18n-fields.ts`）
- 路由 segment：kebab-case（`/about`, `/cases`）
- 所有文件名英文

### 3. Server / Client 边界

```tsx
// app/[locale]/about/page.tsx       — server, 拉 Sanity
// components/sections/about/X.tsx   — server wrapper, pickLocalized 后传 props
// components/.../XClient.tsx        — 'use client', useRef/GSAP/事件
```

### 4. i18n 取值

```tsx
// Sanity 字段
const title = pickLocalized(page, "title", locale);  // 自动取 titleZh 或 titleEn

// 静态文案 (server)
const t = await getTranslations({ locale, namespace: "AboutCosmic" });
const headline = t("introHeadline");

// 静态文案 (client)
const t = useTranslations("Navigation");
```

### 5. 路由跳转

```tsx
// WRONG — 不走 locale 前缀
import Link from "next/link";

// CORRECT — 自动加 locale 前缀
import { Link } from "@/i18n/navigation";
<Link href="/services" />  // → /zh/services 或 /en/services
```

### 6. GSAP 动画

- 客户端注册：`if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);`
- 用 `gsap.context()` 包裹, return 时 `ctx.revert()` 清理
- 平滑滚动调 `useLenis()` 一次, 它已经把 Lenis 同步给 ScrollTrigger
- pin 区配 `matchMedia` 分桌面/移动端阈值（见 CosmicHeroClient.tsx）
- 任何 infinite tween 都要在 prefers-reduced-motion 下跳过

### 7. CSS 属性必须是合法 CSSProperties

```tsx
// WRONG — Vercel TS 严格模式拒收
style={{ WebkitUserDrag: "none" as never }}

// CORRECT — 用 HTML 属性或合法 CSS
<img draggable={false} />
```

### 8. ref 与组件 props 类型严格

`forwardRef` / 自定义组件接受 `style` / `className` 时类型声明完整, 不然 props 透传断链。

### 9. Sanity 数据可能为空

```tsx
const categories = page?.categories ?? FALLBACK_CATEGORIES;
const title = pickLocalized(page, "title", locale, "默认值");
```

### 10. ScrollTrigger 在 flex-col 父容器里要给 section 显式宽度

```tsx
// WRONG — pin-spacer 测到 width:0
<section className="relative min-h-screen">

// CORRECT
<section className="relative w-full min-h-screen">
```

---

## 架构层级

```
app/                          # Next.js App Router 入口
  [locale]/                   # i18n segment
    layout.tsx                # 全局 layout（Header/Footer）
    {route}/page.tsx          # 路由页 (server component)
components/
  layout/                     # Header / Footer / LanguageSwitcher / VolumeControl
  hero/                       # 首页 Hero (BullMascotHero + BullCanvas)
  sections/
    {page}/                   # 按页面分组的 section 组件
      cosmic-hero/            # 单个 section 的子组件目录
        XServer.tsx           # server wrapper (无 'use client')
        XClient.tsx           # 'use client', 持 ref / GSAP / 事件
        XLeaf.tsx             # 叶子展示组件
  ui/                         # 通用 UI (Button, Card, ...) — shadcn 风格 CVA
hooks/                        # 客户端 hooks (useLenis, useBullFrames, ...)
lib/
  sanity/                     # client.ts, fetch.ts, queries.ts
  i18n-fields.ts              # pickLocalized
i18n/
  routing.ts                  # locales 列表
  navigation.ts               # createNavigation -> Link, redirect, ...
  request.ts                  # getRequestConfig
messages/                     # zh.json / en.json
types/sanity.ts               # AboutPage, ServiceCategory, ...
public/                       # 静态资源
```

### 数据流

```
Sanity Studio (sanity-studio/)
       ↓ publish
Sanity CDN
       ↓ groq queries (lib/sanity/queries.ts)
fetch.ts  (server only, ISR revalidate: 10s)
       ↓ AboutPage object
{Page}.tsx (server, await getAboutPage)
       ↓ pickLocalized + props
{Section}Server.tsx
       ↓ 序列化 props
{Section}Client.tsx ('use client', GSAP/状态)
       ↓ DOM
浏览器
```

---

## 会话管理

- **会话开始时**：
  - 读最近 3-5 条 `git log --oneline` 了解上下文
  - 涉及视觉/动画的任务先读 [DESIGN.md](DESIGN.md) 对应小节
  - 涉及内容字段的任务先看 [types/sanity.ts](types/sanity.ts) 类型定义
- **完成任务后**：用一句话写本次改了什么、为什么（commit message 就是天然记录）
- **遇到不确定的 API**：先读 `node_modules/next/dist/docs/` 或源码, 不要凭训练数据猜

---

## Git 提交约定

- **格式**：`{type}({scope}): 中文说明`
  - `type`：feat / fix / refactor / docs / style / chore / perf
  - `scope`：受影响的模块（about / about/cosmic / nav / sanity / i18n / hero ...）
- **示例**（项目已有 commit）：
  - `feat(about): cosmic hero 滚动揭示动画 - "一点点 → 整个宇宙"`
  - `fix(about/cosmic): 移除非法 CSS 属性 WebkitUserDrag, Vercel build 通过`
  - `feat(nav): 按客户指定顺序重排导航 + 加 /cases 页`
- 一条 commit 一件事, 跨模块的大改拆多个 commit
- 改完先 `npx tsc --noEmit` 本地过一遍类型检查再 push（Vercel 严格模式会比 dev 更挑剔）

---

## 验证流程

写完代码必须做的最小验证（覆盖 dev / build 两条路径）：

1. **本地 dev**：preview_start → 打开对应页, 视觉 + console error 双确认
2. **类型检查**：`npx tsc --noEmit`（Vercel build 也会跑, 提前拦截）
3. **i18n 双向**：`/zh/{path}` 和 `/en/{path}` 都看一眼
4. **响应式**：preview_resize 桌面 (1280) + 移动 (375) 各确认一次
5. **prefers-reduced-motion**：DevTools Rendering 强制 reduce, 确认无滚动绑定崩页

---

## 常见陷阱（已踩过的雷）

| 坑 | 教训 |
|---|---|
| `WebkitUserDrag: "none"` | 不是合法 React CSSProperties, dev 通过 prod 死。改用 `draggable={false}` |
| section 无 `w-full` | flex-col 父容器下 ScrollTrigger pin-spacer 测到 width:0, 子元素 left:50% = 0 全跑左边 |
| `gsap.set(autoAlpha:0)` 后未在 scrub timeline 中显式恢复 | 元素永久隐形, 用户看不到初始态 |
| `handRef` 删除后忘了清引用 | Fast Refresh 失败, 整页 500 |
| 直接 `window.scrollTo()` | Lenis 不拦截, ScrollTrigger 不更新, 看起来 pin 失效（其实只是测试问题）|
| header 64px 偏移导致 section 中心 ≠ viewport 中心 | section 加 `-mt-16` 拉上去, 同时把 intro 文案下移避开 sticky header |
