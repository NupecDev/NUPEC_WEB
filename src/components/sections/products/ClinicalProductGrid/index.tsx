import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { clinicalProductsByCategoryQuery } from '@/lib/sanity/queries';
import ClinicalProductGridClient, { type ClinicalProductCard } from './client';

type Props = {
  lang: string;
  categorySlug: string;
  species: 'canino' | 'felino';
};

export default async function ClinicalProductGrid({ lang, categorySlug, species }: Props): Promise<JSX.Element> {
  const products = await client.fetch<ClinicalProductCard[]>(clinicalProductsByCategoryQuery, {
    species,
    categoria: categorySlug,
    lang,
  });

  return <ClinicalProductGridClient lang={lang} products={products} categorySlug={categorySlug} species={species} />;
}
