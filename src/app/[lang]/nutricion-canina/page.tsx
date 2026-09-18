import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import HeroCanina from '@/components/sections/canine/HeroCanina';
import TabsCanina from '@/components/sections/canine/TabsCanina';
import FormulaHighTech from '@/components/sections/canine/FormulaHighTech';
import ProductGridCanina from '@/components/sections/canine/ProductGridCanina';
import ExpertsCanina from '@/components/sections/canine/ExpertsCanina';
import BannerHeroes from '@/components/sections/canine/BannerHeroes';
import ScienceStats from '@/components/sections/canine/ScienceStats';
import { CaninaTabProvider } from '@/components/sections/canine/CaninaTabContext';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

const TITLE: Record<Locale, string> = {
  es: 'Nutrición canina premium para perros',
  en: 'Premium canine nutrition for dogs',
  fr: 'Nutrition canine premium pour chiens',
};

const DESCRIPTION: Record<Locale, string> = {
  es: 'Descubre las líneas de alimento NUPEC para perros: nutrición diaria, especializada, clínica, premios funcionales, suplementos y alimentos húmedos.',
  en: 'Discover NUPEC dog food lines: daily nutrition, specialized, clinical, functional treats, supplements and wet food.',
  fr: 'Découvrez les gammes d\'aliments NUPEC pour chiens : nutrition quotidienne, spécialisée, clinique, friandises fonctionnelles, compléments et aliments humides.',
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
    pathWithoutLocale: '/nutricion-canina',
    fallbackTitle: TITLE[locale],
    fallbackDescription: DESCRIPTION[locale],
  });
}

export default async function NutricionCaninaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <PageLayout>
      <HeroCanina />
      <CaninaTabProvider>
        <TabsCanina />
        <ProductGridCanina lang={lang} />
        <FormulaHighTech />
      </CaninaTabProvider>
      <ExpertsCanina />
      <BannerHeroes lang={lang} />
      <ScienceStats />
    </PageLayout>
  );
}
