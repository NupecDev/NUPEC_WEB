import PageLayout from '@/components/layout/PageLayout';
import AboutHero from '@/components/sections/about/AboutHero';
import AboutOrigin from '@/components/sections/about/AboutOrigin';
import AboutTimeline from '@/components/sections/about/AboutTimeline';
import AboutWhatWeDo from '@/components/sections/about/AboutWhatWeDo';
import AboutStats from '@/components/sections/about/AboutStats';
import AboutPolicy from '@/components/sections/about/AboutPolicy';
import ConcienciaCTA from '@/components/sections/home/ConcienciaCTA';

export default function NosotrosPage() {
  return (
    <PageLayout>
      <AboutHero />
      <AboutOrigin />
      <AboutTimeline />
      <AboutWhatWeDo />
      <AboutStats />
      <AboutPolicy />
      <ConcienciaCTA />
    </PageLayout>
  );
}
