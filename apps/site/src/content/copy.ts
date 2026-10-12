import { type Locale, normalizeLocale, type SupportedLocale } from "@/lib/seo";

export type HomeContent = {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  statMemos: string;
  statPhotos: string;
  statServers: string;
  statUptime: string;
  featuresBadge: string;
  featuresHeading: string;
  featuresSubtitle: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  comparisonBadge: string;
  comparisonHeading: string;
  comparisonSubtitle: string;
  comparisonRows: Array<{
    label: string;
    cloudflare: string;
    nas: string;
    vps: string;
  }>;
  screenshotsHeading: string;
  screenshotsSubtitle: string;
  faqBadge: string;
  faqHeading: string;
  faqItems: Array<{
    q: string;
    a: string;
  }>;
  ctaBadge: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButton: string;
};

/** Keep locale modules out of the entry chunk; the route loader only fetches
 *  the copy needed by the current statically rendered page. */
const HOME_LOADERS: Record<SupportedLocale, () => Promise<HomeContent>> = {
  en: () => import("./home/en").then(({ EN_HOME }) => EN_HOME),
  zh: () => import("./home/zh").then(({ ZH_HOME }) => ZH_HOME),
};

export function loadHomeContent(locale: Locale): Promise<HomeContent> {
  return HOME_LOADERS[normalizeLocale(locale)]();
}
