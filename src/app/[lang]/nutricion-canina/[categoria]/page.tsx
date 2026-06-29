import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { categoryBySlugQuery } from '@/lib/sanity/queries';
import PageLayout from '@/components/layout/PageLayout';
import CategoryHero from '@/components/sections/products/CategoryHero';
import CategoryAbout from '@/components/sections/products/CategoryAbout';
import CategoryProductGrid from '@/components/sections/products/CategoryProductGrid';
import CategoryFeatures from '@/components/sections/products/CategoryFeatures';
import CategoryWizardCTA from '@/components/sections/products/CategoryWizardCTA';
import OtherCategories from '@/components/sections/products/OtherCategories';
import ClinicalProductGrid from '@/components/sections/products/ClinicalProductGrid';
import ClinicalDecisionTree from '@/components/sections/products/ClinicalDecisionTree';
import ClinicalTransitionGuide from '@/components/sections/products/ClinicalTransitionGuide';
import ClinicalScientificBacking from '@/components/sections/products/ClinicalScientificBacking';
import VetResources from '@/components/sections/products/VetResources';
import SanurenStudies from '@/components/sections/products/SanurenStudies';

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
  excerpt: string | null;
  familyImage: { asset: { _ref: string }; alt?: string } | null;
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

  const isClinical = categoria === 'nutricion-clinica';
  const isSimple = categoria === 'premios-funcionales';

  return (
    <PageLayout>
      <CategoryHero
        categoryName={category.name}
        categoryDescription={category.description}
        categoryExcerpt={category.excerpt}
        species="canino"
        categorySlug={categoria}
      />

      {isClinical ? (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
          />
          <ClinicalProductGrid lang={lang} categorySlug={categoria} species="canino" />
          <SanurenStudies />
          {/* <ClinicalDecisionTree /> */}
          {/* <ClinicalTransitionGuide /> */}
          <ClinicalScientificBacking />
          <VetResources resources={[]} productName={category.name} />
          <OtherCategories currentCategorySlug={categoria} species="canino" />
        </>
      ) : isSimple ? (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
          />
          <CategoryProductGrid lang={lang} species="canino" categorySlug={categoria} />
          <OtherCategories currentCategorySlug={categoria} species="canino" />
        </>
      ) : (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
          />
          <CategoryProductGrid lang={lang} species="canino" categorySlug={categoria} />
          <CategoryFeatures categorySlug={categoria} />
          <CategoryWizardCTA />
          <OtherCategories currentCategorySlug={categoria} species="canino" />
        </>
      )}
    </PageLayout>
  );
}
