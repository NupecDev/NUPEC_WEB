import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import ProductGridCaninaClient, { type ProductCard } from './client';

const CATEGORY_SLUGS = [
  'nutricion-diaria',
  'nutricion-especializada',
  'nutricion-clinica',
  'premios-funcionales',
  'suplementos',
  'alimentos-humedos',
] as const;

export default async function ProductGridCanina({ lang }: { lang: string }): Promise<JSX.Element> {
  const results = await Promise.all(
    CATEGORY_SLUGS.map((slug) =>
      client
        .fetch<ProductCard[]>(productsByCategoryQuery, {
          species: 'canino',
          categoria: slug,
          lang,
        })
        .then((products) => [slug, products] as const)
    )
  );

  const productsByCategory = Object.fromEntries(results);

  return <ProductGridCaninaClient lang={lang} productsByCategory={productsByCategory} />;
}
