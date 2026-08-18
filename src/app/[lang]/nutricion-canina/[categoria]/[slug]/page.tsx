import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { productBySlugQuery } from '@/lib/sanity/queries';
import PageLayout from '@/components/layout/PageLayout';

// Standard product components
import ProductHero, { type ProductHeroData } from '@/components/sections/products/ProductHero';
import ProductKeyBenefits from '@/components/sections/products/ProductKeyBenefits';
import ProductDescription from '@/components/sections/products/ProductDescription';
import ProductKibble from '@/components/sections/products/ProductKibble';
import ProductFeedingGuide from '@/components/sections/products/ProductFeedingGuide';
import ProductGuaranteedAnalysis from '@/components/sections/products/ProductGuaranteedAnalysis';
import ProductBenefitsBanner from '@/components/sections/products/ProductBenefitsBanner';
import CategoryWizardCTA from '@/components/sections/products/CategoryWizardCTA';
import ProductRelated from '@/components/sections/products/ProductRelated';
import ProductHighTech, { type HighTechItem } from '@/components/sections/products/ProductHighTech';

// Clinical-only components
import ClinicalFeedingGuide from '@/components/sections/products/ClinicalFeedingGuide';
import ClinicalIndications, { type ClinicalIndicationItem } from '@/components/sections/products/ClinicalIndications';
import MechanismOfAction, { type MechanismStep } from '@/components/sections/products/MechanismOfAction';
import ClinicalTransitionGuide, { type TransitionGuideData } from '@/components/sections/products/ClinicalTransitionGuide';
import ClinicalCases, { type ClinicalCaseData } from '@/components/sections/products/ClinicalCases';
import VetResources, { type TechnicalResource } from '@/components/sections/products/VetResources';
import ClinicalProductGrid from '@/components/sections/products/ClinicalProductGrid';
import ClinicalDifferentiators from '@/components/sections/products/ClinicalDifferentiators';
import IngredientShowcase, { type IngredientItem } from '@/components/sections/products/IngredientShowcase';

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#78BE20',
  'nutricion-especializada': '#E35205',
  'nutricion-clinica':       '#C4262E',
  'premios-funcionales':     '#78BE20',
  'suplementos':             '#E8A200',
  'alimentos-humedos':       '#0085CA',
};

const LIFE_STAGE_COLOR: Record<string, string> = {
  cachorro: '#0085CA',
  adulto:   '#78BE20',
  senior:   '#54301A',
};

type GuaranteedAnalysisItem = {
  label: string;
  value: string;
  min?: boolean;
};

type KeyBenefitItem = {
  icon: string;
  description: string;
};

type ProductData = ProductHeroData & {
  _id: string;
  slug: string;
  color?: string;
  imageBack?: { asset: { _ref: string }; alt?: string };
  bannerImage?: { asset: { _ref: string } };
  benefitsBannerImage?: { asset: { _ref: string } };
  description?: string;
  ingredients?: string;
  warnings?: string;
  specialNeeds?: string[];
  technicalSheet?: { asset: { _ref: string } };
  feedingGuide?: {
    rows: { label?: string; weightRange: string; dailyAmount: string }[];
    notes?: string;
    secondaryTitle?: string;
    secondaryWeightColumnLabel?: string;
    secondaryColumnGroups?: {
      label?: string;
      subColumns?: { label?: string }[];
    }[];
    secondaryTableRows?: {
      weightLabel: string;
      values?: { grams?: string; cups?: string }[];
    }[];
    secondaryNotes?: string;
  } | null;
  guaranteedAnalysis?: GuaranteedAnalysisItem[];
  claims?: { icon?: string; invertColors?: boolean; text: string }[];
  highTech?: HighTechItem[];
  highTechTitleOverride?: string;
  keyBenefits?: KeyBenefitItem[];
  kibble?: {
    image?: { asset: { _ref: string }; alt?: string; isGif?: boolean };
    video?: { url: string; mimeType: string } | null;
    description?: string;
  };
  // Clinical fields
  clinicalIndications?: ClinicalIndicationItem[];
  mechanismOfAction?: MechanismStep[];
  clinicalCases?: ClinicalCaseData[];
  technicalResources?: TechnicalResource[];
  differentiators?: { icon: string; title: string; subtitle?: string; bullets?: { title: string; description: string }[] }[];
  ingredientHighlights?: IngredientItem[];
  transitionGuide?: TransitionGuideData | null;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; categoria: string; slug: string }>;
}) {
  const { lang, categoria, slug } = await params;

  const product = await client.fetch<ProductData | null>(productBySlugQuery, {
    species: 'canino',
    categoria,
    slug,
    lang,
  });

  if (!product) notFound();

  const accentColor =
    product.color ??
    (product.lifeStage?.[0] && LIFE_STAGE_COLOR[product.lifeStage[0]]) ??
    CATEGORY_COLOR[categoria] ??
    '#78BE20';

  const isClinical = categoria === 'nutricion-clinica';
  const isPremios = categoria === 'premios-funcionales';

  if (isClinical) {
    return (
      <PageLayout accentColor={accentColor}>
        {/* 1. Hero */}
        <ProductHero product={{ ...product, species: 'canino' }} />

                {/* 4. Análisis garantizado */}
        <ProductGuaranteedAnalysis
          guaranteedAnalysis={product.guaranteedAnalysis}
          accentColor={accentColor}
        />
        {/* 5. Descripción + ingredientes */}
        <ProductDescription
          name={product.name}
          description={product.description}
          ingredients={product.ingredients}
          warnings={product.warnings}
          claims={product.claims}
          presentations={product.presentations}
          technicalSheet={product.technicalSheet}
          image={product.image}
          imageBack={product.imageBack}
accentColor={accentColor}
        />
        {/* 2. Indicaciones clínicas — strip debajo del hero */}
        {product.clinicalIndications && product.clinicalIndications.length > 0 && (
          <ClinicalIndications
            indications={product.clinicalIndications}
            accentColor={accentColor}
          />
        )}
        {product.differentiators && product.differentiators.length > 0 && (
          <ClinicalDifferentiators
            items={product.differentiators}
            accentColor={accentColor}
          />
        )}
        {/* 3. Mecanismo de acción — pasos numerados */}
        {product.mechanismOfAction && product.mechanismOfAction.length > 0 && (
          <MechanismOfAction
            steps={product.mechanismOfAction}
            productName={product.name}
            accentColor={product.color}
          />
        )}

        {/* 3.5. Ingredientes activos — slider con respaldo científico */}
        {product.ingredientHighlights && product.ingredientHighlights.length > 0 && (
          <IngredientShowcase
            ingredients={product.ingredientHighlights}
            accentColor={accentColor}
          />
        )}

        {/* 6. Tabla de dosificación */}
        {product.feedingGuide && product.feedingGuide.rows && product.feedingGuide.rows.length > 0 && (
          <ClinicalFeedingGuide
            rows={product.feedingGuide.rows}
            notes={product.feedingGuide.notes ?? undefined}
            accentColor={accentColor}
          />
        )}

        {/* 7. Protocolo de transición recomendado */}
        <ClinicalTransitionGuide data={product.transitionGuide} accentColor={accentColor} />

        {/* 7. Casos clínicos */}
        {product.clinicalCases && product.clinicalCases.length > 0 && (
          <ClinicalCases
            cases={product.clinicalCases}
            productName={product.name}
            accentColor={accentColor}
          />
        )}

        {/* 8. Recursos técnicos para veterinarios */}
        {product.technicalResources && product.technicalResources.length > 0 && (
          <VetResources
            resources={product.technicalResources}
            productName={product.name}
            accentColor={accentColor}
          />
        )}

        {/* 9. Otros productos de la línea clínica */}
        <ClinicalProductGrid lang={lang} categorySlug={categoria} species="canino" />

        {/* 10. CTA veterinario */}
        {/* <CategoryWizardCTA /> */}
      </PageLayout>
    );
  }

  if (isPremios) {
    return (
      <PageLayout accentColor={accentColor}>
        <ProductHero product={{ ...product, species: 'canino' }} />

        <ProductDescription
          name={product.name}
          description={product.description}
          ingredients={product.ingredients}
          warnings={product.warnings}
          claims={product.claims}
          presentations={product.presentations}
          technicalSheet={product.technicalSheet}
          image={product.image}
          imageBack={product.imageBack}
accentColor={accentColor}
        />

        {/* Unidad individual (ej. sachet dentro del pack): solo si hay datos en Sanity */}
        <ProductKibble
          name={product.name}
          image={product.kibble?.image}
          video={product.kibble?.video}
          description={product.kibble?.description}
          accentColor={accentColor}
        />

        {product.highTech && product.highTech.length > 0 && (
          <ProductHighTech
            items={product.highTech}
            categoryName={product.category.name}
            accentColor={accentColor}
            species="canino"
            titleOverride={product.highTechTitleOverride}
          />
        )}

        <ProductKeyBenefits
          categorySlug={categoria}
          accentColor={accentColor}
          keyBenefits={product.keyBenefits}
        />

        <ProductGuaranteedAnalysis
          guaranteedAnalysis={product.guaranteedAnalysis}
          accentColor={accentColor}
        />

        <ProductBenefitsBanner
          productName={product.name}
          lifeStage={product.lifeStage}
          categorySlug={categoria}
          species="canino"
          bannerImage={product.benefitsBannerImage}
          accentColor={accentColor}
        />

        <ProductRelated
          lang={lang}
          species="canino"
          categorySlug={categoria}
          currentSlug={slug}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout accentColor={accentColor}>
      {/* 1. Hero: imagen, nombre, tagline, presentaciones, breadcrumb */}
      <ProductHero product={{ ...product, species: 'canino' }} />

      {/* 2. Descripción: imagen + texto + ingredientes + ficha técnica */}
      <ProductDescription
        name={product.name}
        description={product.description}
        ingredients={product.ingredients}
        warnings={product.warnings}
        claims={product.claims}
        presentations={product.presentations}
        technicalSheet={product.technicalSheet}
        image={product.image}
        imageBack={product.imageBack}
accentColor={accentColor}
      />

      {/* 2.5. Unidad individual (croqueta, sachet, etc.): solo si hay datos en Sanity */}
      <ProductKibble
        name={product.name}
        image={product.kibble?.image}
        video={product.kibble?.video}
        description={product.kibble?.description}
        accentColor={accentColor}
      />

      {/* 3. HighTech: grid de características técnicas */}
      {product.highTech && product.highTech.length > 0 && (
        <ProductHighTech
          items={product.highTech}
          categoryName={product.category.name}
          accentColor={accentColor}
          species="canino"
          titleOverride={product.highTechTitleOverride}
        />
      )}

      {/* 4. Beneficios Clave: 4 bloques funfact con iconos */}
      <ProductKeyBenefits
        categorySlug={categoria}
        accentColor={accentColor}
        keyBenefits={product.keyBenefits}
      />

      {/* 5. Guía de Alimentación: tabla + calculadora interactiva */}
      <ProductFeedingGuide feedingGuide={product.feedingGuide} accentColor={accentColor} />

      {/* 6. Análisis Garantizado: barras de progreso animadas */}
      <ProductGuaranteedAnalysis
        guaranteedAnalysis={product.guaranteedAnalysis}
        accentColor={accentColor}
      />

      {/* 7. Banner de beneficios con imagen hero */}
      <ProductBenefitsBanner
        productName={product.name}
        lifeStage={product.lifeStage}
        categorySlug={categoria}
        species="canino"
        bannerImage={product.benefitsBannerImage}
      />

      {/* 8. Encuentra NUPEC cerca de ti */}
      <CategoryWizardCTA />

      {/* 9. Productos relacionados */}
      <ProductRelated
        lang={lang}
        species="canino"
        categorySlug={categoria}
        currentSlug={slug}
      />
    </PageLayout>
  );
}
