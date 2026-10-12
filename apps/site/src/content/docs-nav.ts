import type { DocGroup } from "@/lib/docs-source.generated";
import {
  getLocalizedPath,
  type Locale,
  normalizeLocale,
  type SupportedLocale,
} from "@/lib/seo";

export type DocNavGroup = {
  id: DocGroup;
  label: string;
};

const GROUPS_BY_LOCALE: Record<SupportedLocale, Record<DocGroup, string>> = {
  en: {
    start: "Get started",
    concept: "Architecture and concepts",
    compatibility: "Compatibility and ecosystem",
    agent: "Agent integrations",
    reference: "Reference",
  },
  zh: {
    start: "开始",
    concept: "架构与概念",
    compatibility: "兼容与生态",
    agent: "Agent 集成",
    reference: "参考",
  },
};

export function getDocNavGroups(locale: Locale): DocNavGroup[] {
  const norm = normalizeLocale(locale);
  const labels = GROUPS_BY_LOCALE[norm] || GROUPS_BY_LOCALE.en;
  const order: DocGroup[] = [
    "start",
    "concept",
    "compatibility",
    "agent",
    "reference",
  ];
  return order.map((id) => ({ id, label: labels[id] }));
}

export function docPath(slug: string, locale: Locale): string {
  return getLocalizedPath(`/docs/${slug}`, locale);
}
