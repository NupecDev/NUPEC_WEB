import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { allActiveProductSlugsQuery, allCategorySlugsQuery } from "@/lib/sanity/queries";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

type ProductSlugRow = { species: "canino" | "felino"; categoria: string; slug: string };
type CategorySlugRow = { species: "canino" | "felino"; slug: string };

const SPECIES_PATH: Record<"canino" | "felino", string> = {
  canino: "nutricion-canina",
  felino: "nutricion-felina",
};

const STATIC_PATHS = [
  "/",
  "/nutricion-canina",
  "/nutricion-felina",
  "/nosotros",
  "/conciencia",
  "/contacto",
  "/encuentra-tu-alimento",
];

function alternatesFor(pathWithoutLocale: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(pathWithoutLocale, locale);
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    client.fetch<ProductSlugRow[]>(allActiveProductSlugsQuery),
    client.fetch<CategorySlugRow[]>(allCategorySlugsQuery),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: localizedUrl(path, routing.defaultLocale),
      alternates: { languages: alternatesFor(path) },
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    });
  }

  for (const category of categories) {
    const path = `/${SPECIES_PATH[category.species]}/${category.slug}`;
    entries.push({
      url: localizedUrl(path, routing.defaultLocale),
      alternates: { languages: alternatesFor(path) },
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const product of products) {
    const path = `/${SPECIES_PATH[product.species]}/${product.categoria}/${product.slug}`;
    entries.push({
      url: localizedUrl(path, routing.defaultLocale),
      alternates: { languages: alternatesFor(path) },
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return entries;
}
