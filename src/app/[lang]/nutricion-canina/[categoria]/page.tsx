import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { categoryBySlugQuery } from '@/lib/sanity/queries';
import PageLayout from '@/components/layout/PageLayout';
import TabsCanina from '@/components/sections/canine/TabsCanina';
import CategoryHero from '@/components/sections/products/CategoryHero';
import CategoryAbout from '@/components/sections/products/CategoryAbout';
import CategoryProductGrid from '@/components/sections/products/CategoryProductGrid';
import CategoryFeatures from '@/components/sections/products/CategoryFeatures';
import CategoryWizardCTA from '@/components/sections/products/CategoryWizardCTA';
import OtherCategories from '@/components/sections/products/OtherCategories';

const VALID_SLUGS = [
  'nutricion-diaria',
  'nutricion-especializada',
  'nutricion-clinica',
  'premios-funcionales',
  'suplementos',
  'alimentos-humedos',
];

type CategoryData = {
  _id: string;
  name: string;
  slug: string;
  species: 'canino' | 'felino';
  description: string | null;
};

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ categoria: slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; categoria: string }>;
}) {
  const { lang, categoria } = await params;

  if (!VALID_SLUGS.includes(categoria)) notFound();

  const category = await client.fetch<CategoryData | null>(categoryBySlugQuery, {
    slug: categoria,
    lang,
  });

  if (!category) notFound();

  return (
    <PageLayout>
      <CategoryHero
        categoryName={category.name}
        categoryDescription={category.description}
        species="canino"
        categorySlug={categoria}
      />
      {/* <TabsCanina /> */}
      <CategoryAbout
        categoryName={category.name}
        categoryDescription={category.description}
        categorySlug={categoria}
      />
      <CategoryProductGrid lang={lang} species="canino" categorySlug={categoria} />
      <CategoryFeatures categorySlug={categoria} />
      <CategoryWizardCTA />
      <OtherCategories currentCategorySlug={categoria} species="canino" />
    </PageLayout>
  );
}
