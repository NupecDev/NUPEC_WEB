import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import CategoryProductGridClient, { type CategoryProductCard } from './client';

type Props = {
  lang: string;
  species: 'canino' | 'felino';
  categorySlug: string;
};

export default async function CategoryProductGrid({ lang, species, categorySlug }: Props): Promise<JSX.Element> {
  const products = await client.fetch<CategoryProductCard[]>(productsByCategoryQuery, {
    species,
    categoria: categorySlug,
    lang,
  });

  return <CategoryProductGridClient lang={lang} products={products} categorySlug={categorySlug} species={species} />;
}
