import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default handleI18nRouting;

export const config = {
  // 排除: api, _next, _vercel, 含点的文件路径, 以及 Next.js metadata 文件
  // 约定 (opengraph-image / twitter-image / icon / apple-icon)。这些应该
  // 在 app root 直接服务,不要被 i18n 重定向到 /{locale}/...
  matcher: [
    '/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
};
