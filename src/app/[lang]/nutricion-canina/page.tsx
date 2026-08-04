import PageLayout from '@/components/layout/PageLayout';
import HeroCanina from '@/components/sections/canine/HeroCanina';
import TabsCanina from '@/components/sections/canine/TabsCanina';
import FormulaHighTech from '@/components/sections/canine/FormulaHighTech';
import ProductGridCanina from '@/components/sections/canine/ProductGridCanina';
import ExpertsCanina from '@/components/sections/canine/ExpertsCanina';
import BannerHeroes from '@/components/sections/canine/BannerHeroes';
import ScienceStats from '@/components/sections/canine/ScienceStats';
import { CaninaTabProvider } from '@/components/sections/canine/CaninaTabContext';

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
