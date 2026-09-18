import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import FoodFinder from '@/components/sections/wizard/FoodFinder';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

const TITLE: Record<Locale, string> = {
  es: 'Encuentra tu alimento ideal',
  en: 'Find your ideal food',
  fr: 'Trouvez votre aliment idéal',
};

const DESCRIPTION: Record<Locale, string> = {
  es: 'Responde unas preguntas y descubre el alimento NUPEC ideal para tu perro o gato según su etapa de vida, tamaño y necesidades especiales.',
  en: 'Answer a few questions and discover the ideal NUPEC food for your dog or cat based on their life stage, size and special needs.',
  fr: 'Répondez à quelques questions et découvrez l\'aliment NUPEC idéal pour votre chien ou chat selon son stade de vie, sa taille et ses besoins spéciaux.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  return buildMetadata({
    locale,
    pathWithoutLocale: '/encuentra-tu-alimento',
    fallbackTitle: TITLE[locale],
    fallbackDescription: DESCRIPTION[locale],
  });
}

export default function EncuentraTuAlimentoPage() {
  return (
    <PageLayout>
      <FoodFinder />
    </PageLayout>
  );
}
