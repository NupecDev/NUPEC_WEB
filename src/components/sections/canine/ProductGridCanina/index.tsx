import type { JSX } from 'react';
import { client } from '@/lib/sanity/client';
import { categoryIntrosBySpeciesQuery } from '@/lib/sanity/queries';
import CategoryIntroClient, { type CategoryIntro } from './client';

type Props = {
  lang: string;
  species?: 'canino' | 'felino';
};

export default async function CategoryIntroCanina({ lang, species = 'canino' }: Props): Promise<JSX.Element> {
  const categories = await client.fetch<CategoryIntro[]>(categoryIntrosBySpeciesQuery, {
    species,
    lang,
  });

  return <CategoryIntroClient lang={lang} species={species} categories={categories} />;
}
