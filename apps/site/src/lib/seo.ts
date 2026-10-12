/**
 * SEO head builder for the marketing site. Returns the props for TanStack
 * Router's `head` directive: title, meta, link, script tags. Source of truth
 * for title/description/og/twitter/canonical/hreflang/json-ld.
 */

export const SUPPORTED_LOCALES = ["en", "zh"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = SupportedLocale | "zh-CN" | "en-US";

export function normalizeLocale(l?: string): SupportedLocale {
  return l?.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export type SeoInput = {
  /** Path without locale prefix, e.g. "/", "/docs/deploy". */
  path: string;
  locale: Locale;
  title: string;
  description: string;
  /** Open Graph type. Defaults to "website". */
  ogType?: "website" | "article";
  /** JSON-LD payload as a plain object. Will be serialized as a single graph. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Override the OG image. Defaults to https://flaremo.app/og-image.svg. */
  ogImage?: string;
  /** Article-specific publish/modified time. */
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  /** Whether this route should not be indexed. */
  noindex?: boolean;
};

export type SeoHead = {
  title: string;
  meta: Array<{ name?: string; property?: string; content: string }>;
  links: Array<{ rel: string; href: string; hreflang?: string }>;
  scripts: Array<{ type: string; children: string }>;
};

const SITE_NAME = "FlareMo";
const SITE_URL = "https://flaremo.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const LOCALE_PREFIX: Record<SupportedLocale, string> = {
  en: "",
  zh: "/zh",
};

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  zh: "简体中文",
};

/**
 * `dir` attribute for a locale. The supported UI languages are both LTR; the SSG shell
 * and the client-side locale sync must agree on this value.
 */
export function localeDirection(_locale: Locale): "ltr" | "rtl" {
  return "ltr";
}

/**
 * BCP-47 tag written to `<html lang>`. zh is advertised as zh-CN (the SSG shell
 * uses the same mapping); `:lang(zh)` still matches by prefix per RFC 4647.
 */
export function localeHtmlLang(locale: Locale): string {
  const norm = normalizeLocale(locale);
  return norm === "zh" ? "zh-CN" : norm;
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return first === "zh" || first === "zh-cn" ? "zh" : "en";
}

export function getPathWithoutLocale(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  for (const prefix of ["/zh-CN", "/en", "/zh"]) {
    if (clean === prefix) return "/";
    if (clean.startsWith(`${prefix}/`)) {
      return clean.slice(prefix.length) || "/";
    }
  }
  return clean;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const norm = normalizeLocale(locale);
  const clean = getPathWithoutLocale(path);
  const prefix = LOCALE_PREFIX[norm];
  if (clean === "/") {
    return prefix || "/";
  }
  return `${prefix}${clean}`;
}

export function localeHref(path: string, locale: Locale): string {
  const norm = normalizeLocale(locale);
  const cleanPath = getPathWithoutLocale(path);
  const targetPrefix = LOCALE_PREFIX[norm];
  if (cleanPath === "/") {
    return targetPrefix ? `${SITE_URL}${targetPrefix}/` : `${SITE_URL}/`;
  }
  return `${SITE_URL}${targetPrefix}${cleanPath}`;
}

function fullTitle(title: string, _locale: Locale): string {
  if (title === SITE_NAME) return title;
  return `${title} · ${SITE_NAME}`;
}

const OG_LOCALES: Record<SupportedLocale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

export function buildSeoHead(input: SeoInput): SeoHead {
  const {
    path,
    locale,
    title,
    description,
    ogType = "website",
    jsonLd,
    ogImage = DEFAULT_OG_IMAGE,
    articlePublishedTime,
    articleModifiedTime,
    noindex,
  } = input;

  const normLocale = normalizeLocale(locale);
  const canonical = localeHref(path, normLocale);

  const meta: SeoHead["meta"] = [
    { name: "description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:title", content: fullTitle(title, normLocale) },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: OG_LOCALES[normLocale] || "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle(title, normLocale) },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (ogType === "article") {
    if (articlePublishedTime) {
      meta.push({
        property: "article:published_time",
        content: articlePublishedTime,
      });
    }
    if (articleModifiedTime) {
      meta.push({
        property: "article:modified_time",
        content: articleModifiedTime,
      });
    }
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  } else {
    meta.push({ name: "robots", content: "index,follow" });
  }

  const links: SeoHead["links"] = [
    { rel: "canonical", href: canonical },
    { rel: "alternate", hreflang: "en", href: localeHref(path, "en") },
    { rel: "alternate", hreflang: "zh-CN", href: localeHref(path, "zh") },
    { rel: "alternate", hreflang: "x-default", href: localeHref(path, "en") },
  ];

  const scripts: SeoHead["scripts"] = [];
  if (jsonLd) {
    const graph = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@graph": graph,
        },
        null,
        0,
      ),
    });
  }

  return {
    title: fullTitle(title, normLocale),
    meta,
    links,
    scripts,
  };
}

export const SOFTWARE_APPLICATION_JSON_LD = {
  "@type": "SoftwareApplication",
  name: "FlareMo",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  description:
    "A Cloudflare-native personal knowledge system that runs on a free Cloudflare account with D1, R2, and Better Auth built in.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  author: {
    "@type": "Organization",
    name: "FlareMo",
    url: SITE_URL,
  },
};
