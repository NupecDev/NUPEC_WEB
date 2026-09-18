import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity/client';
import { categoryBySlugQuery } from '@/lib/sanity/queries';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, localizedUrl } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
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

export const dynamic = 'force-dynamic';

const VALID_SLUGS = [
  'nutricion-diaria',
  'nutricion-especializada',
  'nutricion-clinica',
  'premios-funcionales',
  'suplementos',
  'alimentos-humedos',
];

type CategoryStat = {
  value: string;
  label: string | null;
  description: string | null;
};

type CategoryData = {
  _id: string;
  name: string;
  slug: string;
  species: 'felino' | 'felino';
  description: string | null;
  excerpt: string | null;
  familyImage: { asset: { _ref: string }; alt?: string } | null;
  bannerImage: { asset: { _ref: string } } | null;
  stats: CategoryStat[] | null;
  seo?: { metaTitle?: string; metaDescription?: string; canonicalOverride?: string | null; noIndex?: boolean | null };
  faq?: { question: string; answer: string }[] | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; categoria: string }>;
}): Promise<Metadata> {
  const { lang, categoria } = await params;

  if (!VALID_SLUGS.includes(categoria)) return {};

  const category = await client.fetch<CategoryData | null>(categoryBySlugQuery, {
    slug: categoria,
    species: 'felino',
    lang,
  });

  if (!category) return {};

  const image = category.bannerImage
    ? urlFor(category.bannerImage).width(1200).height(630).url()
    : undefined;

  return buildMetadata({
    locale: lang as Locale,
    pathWithoutLocale: `/nutricion-felina/${categoria}`,
    seo: category.seo,
    fallbackTitle: `${category.name} para gatos`,
    fallbackDescription: category.excerpt ?? category.description ?? undefined,
    image: image ? { url: image, alt: category.name } : undefined,
  });
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
    species: 'felino',
    lang,
  });

  if (!category) notFound();

  const isClinical = categoria === 'nutricion-clinica';
  const isSimple = categoria === 'premios-funcionales';

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'NUPEC', url: localizedUrl('/', lang as Locale) },
      { name: 'Nutrición felina', url: localizedUrl('/nutricion-felina', lang as Locale) },
      { name: category.name, url: localizedUrl(`/nutricion-felina/${categoria}`, lang as Locale) },
    ]),
    faqJsonLd(
      (category.faq ?? [])
        .filter((item) => item.question && item.answer)
        .map((item) => ({ question: item.question, answer: item.answer }))
    ),
  ].filter(Boolean);

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryHero
        categoryName={category.name}
        categoryDescription={category.description}
        categoryExcerpt={category.excerpt}
        species="felino"
        categorySlug={categoria}
        bannerImage={category.bannerImage}
        stats={category.stats}
      />

      {isClinical ? (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
            stats={category.stats}
          />
          <ClinicalProductGrid lang={lang} categorySlug={categoria} species="felino" />
          <SanurenStudies />
          {/* <ClinicalDecisionTree /> */}
          {/* <ClinicalTransitionGuide /> */}
          <ClinicalScientificBacking />
          <VetResources resources={[]} productName={category.name} />
          <OtherCategories currentCategorySlug={categoria} species="felino" />
        </>
      ) : isSimple ? (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
            stats={category.stats}
          />
          <CategoryProductGrid lang={lang} species="felino" categorySlug={categoria} />
          <OtherCategories currentCategorySlug={categoria} species="felino" />
        </>
      ) : (
        <>
          <CategoryAbout
            categoryName={category.name}
            categoryDescription={category.description}
            categorySlug={categoria}
            familyImage={category.familyImage}
            stats={category.stats}
          />
          <CategoryProductGrid lang={lang} species="felino" categorySlug={categoria} />
          <CategoryFeatures categorySlug={categoria} />
          <CategoryWizardCTA />
          <OtherCategories currentCategorySlug={categoria} species="felino" />
        </>
      )}
    </PageLayout>
  );
}
