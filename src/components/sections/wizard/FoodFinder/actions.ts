'use server';

import { client } from '@/lib/sanity/client';
import {
  COMPLEMENTARY_CATEGORIES,
  wizardAvailableSpecialNeedsQuery,
  wizardComplementaryQuery,
  wizardExactMatchQuery,
} from '@/lib/sanity/queries';
import type { Species, SpecialNeed, WizardAnswers, WizardProductResult } from './types';

export type WizardResults = {
  exactMatches: WizardProductResult[];
  complementary: WizardProductResult[];
};

export async function fetchWizardResults(
  answers: WizardAnswers,
  lang: string
): Promise<WizardResults> {
  const params = {
    species: answers.species,
    lang,
    lifeStage: answers.lifeStage,
    breedSize: answers.breedSize,
    specialNeed: answers.specialNeed,
    complementaryCategories: COMPLEMENTARY_CATEGORIES,
  };

  const [exactMatches, complementary] = await Promise.all([
    client.fetch<WizardProductResult[]>(wizardExactMatchQuery, params),
    client.fetch<WizardProductResult[]>(wizardComplementaryQuery, params),
  ]);

  const exactIds = new Set(exactMatches.map((p) => p._id));

  return {
    exactMatches,
    complementary: complementary.filter((p) => !exactIds.has(p._id)),
  };
}

export async function fetchAvailableSpecialNeeds(species: Species): Promise<SpecialNeed[]> {
  const result = await client.fetch<(SpecialNeed | null)[]>(wizardAvailableSpecialNeedsQuery, {
    species,
  });
  return result.filter((need): need is SpecialNeed => need !== null);
}
