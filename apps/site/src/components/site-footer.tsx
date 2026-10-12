import { Link } from "@tanstack/react-router";
import { SiteMark } from "@/components/site-mark";
import {
  getLocalizedPath,
  type Locale,
  normalizeLocale,
  type SupportedLocale,
} from "@/lib/seo";

type SiteFooterProps = {
  locale: Locale;
};

const FOOTER_TEXT: Record<
  SupportedLocale,
  {
    tagline: string;
    productHeading: string;
    docsHeading: string;
    projectHeading: string;
    home: string;
    docsOverview: string;
    deployment: string;
    architecture: string;
    release: string;
    requirements: string;
  }
> = {
  en: {
    tagline: "Free tier · Always-on · Your data, your rules",
    productHeading: "Product",
    docsHeading: "Docs",
    projectHeading: "Project",
    home: "Home",
    docsOverview: "Docs overview",
    deployment: "Deployment",
    architecture: "Architecture",
    release: "Release process",
    requirements: "Requirements",
  },
  zh: {
    tagline: "免费账号 · 24 小时在线 · 数据归你所有",
    productHeading: "产品",
    docsHeading: "文档",
    projectHeading: "项目",
    home: "首页",
    docsOverview: "文档总览",
    deployment: "部署指南",
    architecture: "架构设计",
    release: "发版规则",
    requirements: "需求梳理",
  },
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const norm = normalizeLocale(locale);
  const text = FOOTER_TEXT[norm];

  const productLinks = [{ to: getLocalizedPath("/", norm), label: text.home }];
  const docsLinks = [
    { to: getLocalizedPath("/docs", norm), label: text.docsOverview },
    { to: getLocalizedPath("/docs/deploy", norm), label: text.deployment },
    {
      to: getLocalizedPath("/docs/architecture-notes", norm),
      label: text.architecture,
    },
  ];
  const projectLinks = [
    { to: getLocalizedPath("/docs/release", norm), label: text.release },
    {
      to: getLocalizedPath("/docs/product-requirements", norm),
      label: text.requirements,
    },
  ];

  return (
    <footer className="border-t border-line/60 bg-paper transition-colors duration-200">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_2fr]">
        <div className="space-y-4">
          <SiteMark />
          <p className="max-w-xs text-sm text-mist leading-relaxed">
            {text.tagline}
          </p>

          <p className="text-xs text-fog">
            © {new Date().getFullYear()} FlareMo · Open Source with AGPL-3.0
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn heading={text.productHeading} items={productLinks} />
          <FooterColumn heading={text.docsHeading} items={docsLinks} />
          <FooterColumn heading={text.projectHeading} items={projectLinks} />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
        {heading}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              className="text-sm text-mist transition-colors hover:text-ink"
              to={item.to}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
