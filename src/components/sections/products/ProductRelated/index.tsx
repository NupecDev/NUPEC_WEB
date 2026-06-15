import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { CategoryProductCard } from '@/components/sections/products/CategoryProductGrid/client';
import ProductRelatedClient from './client';

type Props = {
  lang: string;
  species: 'canino' | 'felino';
  categorySlug: string;
  currentSlug: string;
};

export default async function ProductRelated({ lang, species, categorySlug, currentSlug }: Props): Promise<JSX.Element> {
  const all = await client.fetch<CategoryProductCard[]>(productsByCategoryQuery, {
    species,
    categoria: categorySlug,
    lang,
  });

  const related = all.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <ProductRelatedClient
      lang={lang}
      products={related}
      categorySlug={categorySlug}
      species={species}
    />
  );
}
