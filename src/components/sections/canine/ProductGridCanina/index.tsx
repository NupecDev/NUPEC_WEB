import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { categoryIntrosBySpeciesQuery } from '@/lib/sanity/queries';
import CategoryIntroClient, { type CategoryIntro } from './client';

export default async function CategoryIntroCanina({ lang }: { lang: string }): Promise<JSX.Element> {
  const categories = await client.fetch<CategoryIntro[]>(categoryIntrosBySpeciesQuery, {
    species: 'canino',
    lang,
  });

  return <CategoryIntroClient lang={lang} categories={categories} />;
}
