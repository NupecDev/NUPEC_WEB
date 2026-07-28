import PageLayout from '@/components/layout/PageLayout';
import ConcienciaHero from '@/components/sections/conciencia/ConcienciaHero';
import ConcienciaTerapias from '@/components/sections/conciencia/ConcienciaTerapias';
import ConcienciaLoboMexicano from '@/components/sections/conciencia/ConcienciaLoboMexicano';
import ConcienciaRescate from '@/components/sections/conciencia/ConcienciaRescate';
import ConcienciaComercioNacional from '@/components/sections/conciencia/ConcienciaComercioNacional';

export default function ConcienciaPage() {
  return (
    <PageLayout>
      <ConcienciaHero />
      <ConcienciaTerapias />
      {/* <ConcienciaLoboMexicano />
      <ConcienciaRescate /> */}
      <ConcienciaComercioNacional />
    </PageLayout>
  );
}
