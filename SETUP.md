# GYD Marketing 网站 — 装备完成后的下一步

> 这份文档列出 **本地装备(Next.js + 依赖 + 多语言骨架)已完成**之后,你还要自己做的事:开外部账号、拿 API key、填 `.env.local`、初始化 Sanity Studio。

---

## ✅ 已经替你装好的(本地代码)

- `gyd-website/` Next.js 16 + React 19 + TypeScript + Tailwind v4
- Phase 1 所有 npm 依赖(next-intl, framer-motion, lucide-react, sanity 客户端, three.js)
- shadcn/ui 已初始化 + 10 个组件(button, input, textarea, card, dialog, form, sonner, dropdown-menu, table, label, skeleton)
- next-intl 多语言路由(中/英)就绪:`i18n/`、`messages/`、`proxy.ts`
- App 路由迁移到 `app/[locale]/`,首页能根据 locale 渲染
- Sanity 客户端骨架:`lib/sanity/client.ts` + `queries.ts` + `types/sanity.ts`
- 基础组件骨架:`Header.tsx`、`Footer.tsx`、`LanguageSwitcher.tsx`
- 联系表单 API 路由占位:`app/api/contact/route.ts`
- `.env.local.example` 模板

---

## 🔑 你要自己开的账号(全免费版,按顺序做)

### 1. GitHub(代码托管)

- 注册:https://github.com/join (如已有跳过)
- 操作:新建私有 repo `gyd-website`
- 把本地项目推上去:
  ```bash
  cd gyd-website
  git remote add origin https://github.com/<你的用户名>/gyd-website.git
  git branch -M main
  git push -u origin main
  ```

### 2. Sanity(CMS 后台)

- 注册:https://www.sanity.io/login (用 GitHub 登录最快)
- 创建项目:
  - 进入 https://www.sanity.io/manage → Create new project
  - 名字:`gyd-cms`
  - Dataset:`production`
- 拿到 **Project ID** 后填到 `.env.local`:
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=<上面的 ID>
  ```
- 创建 API Token(API → Tokens → Add API token):
  - 一个 Editor token 填 `SANITY_API_TOKEN=`
  - 一个 Viewer token 填 `SANITY_API_READ_TOKEN=`(Draft Mode 用)

### 3. Sanity Studio 子项目(本地 + 部署后台)

> Sanity Studio 是给客户改内容的后台,代码跟主站分开。

- 在 `gyd-website/` **同级**目录跑:
  ```bash
  cd ..
  npm create sanity@latest -- --project <项目 ID> --dataset production --template clean --typescript --output-path ./sanity-studio
  ```
- 装好后 `cd sanity-studio && npm run dev`,在 `localhost:3333` 看到后台
- Schema 内容按 `ADMIN_PANEL_PLAN.md` Step 2-4 写

### 4. Vercel(部署)

- 注册:https://vercel.com/signup (用 GitHub 登录)
- Import Project → 选刚 push 的 `gyd-website` repo
- Environment Variables 把 `.env.local` 里的内容粘进去
- Deploy → 拿到 `xxx.vercel.app` 临时域名
- **Phase 1 验收前用 Hobby 免费版,正式上线让客户升 Pro $20/月**

### 5. 联系表单(二选一,Phase 1 推荐 Formspree)

**Formspree(推荐 Phase 1,零代码)**
- 注册:https://formspree.io/register
- 新建一个 Form → 填客户邮箱(`hq@gydmarketing.co`)收提交
- 拿到 Form ID(`xrgjnbqv` 这种)填 `.env.local`:
  ```
  NEXT_PUBLIC_FORMSPREE_FORM_ID=xxx
  ```

**Resend(Phase 2 业务量起来再换)**
- 注册:https://resend.com/signup
- 验证发件域名(需要客户的 DNS 权限)
- 拿 API key 填 `RESEND_API_KEY=`

### 6. Supabase(Phase 2 用,Phase 1 可推迟)

- 注册:https://supabase.com/dashboard/sign-in
- 创建项目 `gyd-marketing`,选最近区域(Singapore)
- Settings → API 拿 URL + anon key + service role,填 `.env.local`
- Phase 1 上线前**至少**跑一遍 migration 001(profiles 表),为 Phase 2 预留

### 7. Google Analytics + Search Console(Phase 1 上线前)

- GA4:https://analytics.google.com → 创建属性 → 拿 G-XXXX measurement ID
- Search Console:https://search.google.com/search-console → 验证域名 → 提交 sitemap
- 上线前再做,现在跳过

---

## 📝 填完 `.env.local` 后

```bash
cp .env.local.example .env.local
# 用编辑器打开 .env.local,把上面 1-6 拿到的 key 填进去
```

---

## 🚀 启动开发环境

```bash
cd gyd-website
npm run dev
```

- 主站:http://localhost:3000 → 自动重定向到 http://localhost:3000/zh
- 切换语言:点右上角按钮,或直接访问 http://localhost:3000/en

---

## 📦 给客户(GYD)的素材交付清单

按 PROJECT_PLAN.md 第 1013-1023 行,客户需要提供:

1. Logo 文件(.ai / .svg / .pdf)
2. 公司中英文介绍(200-500 字)
3. 服务清单(每个名称 + 1-3 句描述)
4. 团队成员资料(姓名 + 职位 + 简介 + 照片)
5. 客户好评(至少 3 条 + 客户名/公司)
6. 办公环境照(3-5 张)
7. 品牌色 HEX
8. FAQ(至少 5 个问答)
9. 域名 GoDaddy 账号(交付时用)
10. Microsoft 365 MX 记录截图(配邮件用)

**收到前,代码里所有占位都用 `[xxx - 等客户提供]` 格式,方便 search & replace。**

---

## 🎯 下一步开发(收到 Sanity 项目 ID 后)

1. 在 Sanity Studio 写 schema(按 ADMIN_PANEL_PLAN.md Step 2-4)
2. 把 schema 里的 `siteSettings`、`homepage` 文档建一份
3. 在主站调 `lib/sanity/queries.ts` 渲染真实数据
4. 写各个页面占位(`about`、`services`、`team`、`contact` 等)
5. 接 Visual Editing(Presentation Tool),让客户点击网站直接改

---

**装备状态**:Phase 1 本地骨架 ✅ 完成。等你开完账号填 `.env.local` 就能开发业务。
