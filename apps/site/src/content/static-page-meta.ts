import type { SupportedLocale } from "@/lib/seo";

export type RouteMeta = {
  /** Route path with :param placeholders resolved, e.g. /docs/deploy */
  path: string;
  locale: SupportedLocale;
  title: string;
  description: string;
  ogType?: "website" | "article";
  jsonLd?: unknown;
};

export const STATIC_PAGE_META: Record<
  SupportedLocale,
  {
    homeTitle: string;
    homeDesc: string;
    docsTitle: string;
    docsDesc: string;
  }
> = {
  en: {
    homeTitle: "FlareMo - Cloudflare-Native Personal Knowledge System",
    homeDesc:
      "A personal note system that runs 24/7 on a free Cloudflare account. D1 + R2 + Better Auth + Memos-compatible API.",
    docsTitle: "Documentation",
    docsDesc:
      "FlareMo documentation overview: deployment, architecture, compatibility, agent integrations, and reference.",
  },
  zh: {
    homeTitle: "FlareMo - Cloudflare 原生个人知识库",
    homeDesc:
      "一个免费 Cloudflare 账号就能 24 小时在线的个人记录系统。D1 + R2 + Better Auth + Memos 兼容 API。",
    docsTitle: "文档总览",
    docsDesc: "FlareMo 文档总览：部署、架构、兼容矩阵、Agent 集成与参考。",
  },
};
