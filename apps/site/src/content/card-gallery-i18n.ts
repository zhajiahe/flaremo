import type { SupportedLocale } from "@/lib/seo";

/**
 * Share-card gallery copy. The five preview images live in
 * apps/site/public/showcase/ and are rendered as a browsing strip; the
 * heading explains the plugin model in one breath so the section doubles as
 * the landing page for the plugin system.
 */

export type CardGalleryContent = {
  badge: string;
  heading: string;
  subtitle: string;
  cards: Array<{ name: string; caption: string }>;
  cta: string;
  ctaHref: string;
};

const CONTENT: Record<SupportedLocale, CardGalleryContent> = {
  en: {
    badge: "Plugins",
    heading: "Cards are plugins. Make them yours.",
    subtitle:
      "Five cards built in, open to anyone: install packs from the directory, upload your own, choose and order what your instance offers. Document cards are pure JSON layouts; sandbox cards run your own HTML/CSS/JS — both without network access.",
    cards: [
      { name: "Plain", caption: "The note, quiet on paper." },
      { name: "Daily", caption: "The date as the hero." },
      { name: "Ticket", caption: "A keepsake with a barcode strip." },
      { name: "Postcard", caption: "A watercolor horizon, drawn in SVG." },
      { name: "Postmark", caption: "A sandbox card that draws with canvas." },
    ],
    cta: "Read the plugin guide",
    ctaHref: "/docs/plugins",
  },
  zh: {
    badge: "插件",
    heading: "卡片即插件，随你塑造。",
    subtitle:
      "内置五张卡片，向所有人开放：从目录安装、上传自己的包、挑选与排序实例展示的卡片。document 卡是纯 JSON 排版文档；sandbox 卡运行你自己的 HTML/CSS/JS——两者都没有网络访问。",
    cards: [
      { name: "素白", caption: "安静的一张纸。" },
      { name: "日签", caption: "让日期当主角。" },
      { name: "票根", caption: "带条码的纪念票。" },
      { name: "明信片", caption: "用 SVG 画出的水彩地平线。" },
      { name: "邮戳", caption: "用 canvas 手绘的沙箱卡。" },
    ],
    cta: "阅读插件指南",
    ctaHref: "/docs/plugins",
  },
};

export const CARD_IMAGES = [
  "/showcase/card-plain.png",
  "/showcase/card-daily.png",
  "/showcase/card-ticket.png",
  "/showcase/card-postcard.png",
  "/showcase/card-stamp.png",
] as const;

export function getCardGalleryContent(
  locale: SupportedLocale,
): CardGalleryContent {
  return CONTENT[locale] ?? CONTENT.en;
}
