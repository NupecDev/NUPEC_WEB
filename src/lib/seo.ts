import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://nupec.com";

export const SITE_NAME = "NUPEC";

const OG_LOCALE: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
  fr: "fr_FR",
};

/** Construye la URL absoluta de una ruta (sin locale) para un locale dado. */
export function localizedUrl(pathWithoutLocale: string, locale: Locale) {
  const path = pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale
    : `/${pathWithoutLocale}`;
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

/**
 * Genera `alternates.canonical` + `alternates.languages` (hreflang) para las
 * 3 locales del sitio, dada la ruta actual sin el segmento de locale.
 * Ej: buildAlternates("/nutricion-canina/nutricion-diaria/receta-x", "es")
 */
export function buildAlternates(
  pathWithoutLocale: string,
  currentLocale: Locale,
  canonicalOverride?: string | null
) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(pathWithoutLocale, locale);
  }
  // x-default apunta al locale por defecto del sitio
  languages["x-default"] = localizedUrl(pathWithoutLocale, routing.defaultLocale);

  return {
    canonical: canonicalOverride || localizedUrl(pathWithoutLocale, currentLocale),
    languages,
  };
}

/**
 * Arma un Metadata de Next.js a partir del `seo` opcional ya resuelto en el
 * idioma actual (metaTitle/metaDescription como GROQ los proyecta con
 * `seo.metaTitle[$lang]`), con fallback a título/descripción de contenido,
 * más canonical + hreflang + Open Graph/Twitter.
 */
export function buildMetadata(params: {
  locale: Locale;
  pathWithoutLocale: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalOverride?: string | null;
    noIndex?: boolean | null;
  } | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  image?: { url: string; alt?: string } | null;
  noIndex?: boolean;
}): Metadata {
  const {
    locale,
    pathWithoutLocale,
    seo,
    fallbackTitle,
    fallbackDescription,
    image,
    noIndex,
  } = params;

  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;
  const alternates = buildAlternates(pathWithoutLocale, locale, seo?.canonicalOverride);
  const resolvedNoIndex = seo?.noIndex ?? noIndex;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates,
    robots: resolvedNoIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: image ? [{ url: image.url, alt: image.alt || title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

// ── JSON-LD ──────────────────────────────────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/img/logo.png`,
    sameAs: [] as string[],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productJsonLd(params: {
  name: string;
  description?: string;
  image?: string;
  url: string;
  sku?: string;
  brand?: string;
}) {
  const { name, description, image, url, sku, brand } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? [image] : undefined,
    url,
    sku,
    brand: {
      "@type": "Brand",
      name: brand || SITE_NAME,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
