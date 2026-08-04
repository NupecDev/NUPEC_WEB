import PageLayout from '@/components/layout/PageLayout';
import HeroCanina from '@/components/sections/canine/HeroCanina';
import TabsCanina from '@/components/sections/canine/TabsCanina';
import FormulaHighTech from '@/components/sections/canine/FormulaHighTech';
import ProductGridCanina from '@/components/sections/canine/ProductGridCanina';
import ExpertsCanina from '@/components/sections/canine/ExpertsCanina';
import BannerHeroes from '@/components/sections/canine/BannerHeroes';
import ScienceStats from '@/components/sections/canine/ScienceStats';
import { CaninaTabProvider } from '@/components/sections/canine/CaninaTabContext';

export default async function NutricionFelinaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <PageLayout>
      <HeroCanina species="felino" />
      <CaninaTabProvider>
        <TabsCanina species="felino" />
        <ProductGridCanina lang={lang} species="felino" />
        <FormulaHighTech species="felino" />
      </CaninaTabProvider>
      <ExpertsCanina species="felino" />
      <BannerHeroes lang={lang} species="felino" />
      <ScienceStats species="felino" />
    </PageLayout>
  );
}
