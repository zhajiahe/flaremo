import type { SupportedLocale } from "@/lib/seo";

export const STAT_TITLES: Record<
  SupportedLocale,
  { servers: string; ownership: string }
> = {
  en: { servers: "0 Servers", ownership: "100% Yours" },
  zh: { servers: "0 台服务器", ownership: "100% 自主" },
};

export const COMP_HEADERS: Record<
  SupportedLocale,
  { nas: string; vps: string }
> = {
  en: { nas: "Home NAS / Homelab", vps: "Traditional VPS Cloud" },
  zh: { nas: "家用 NAS / 软路由", vps: "传统 VPS 云主机" },
};

export const COMP_DIMENSIONS: Record<SupportedLocale, string> = {
  en: "Dimension",
  zh: "对比维度",
};
