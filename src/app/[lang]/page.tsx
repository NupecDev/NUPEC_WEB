import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/sections/home/Hero';
import PromoBanner from '@/components/sections/home/PromoBanner';
import CategoriesGrid from '@/components/sections/home/CategoriesGrid';
import VideoSection from '@/components/sections/home/VideoSection';
import Wizard from '@/components/sections/home/Wizard';
import AboutBrand from '@/components/sections/home/AboutBrand';
import ConcienciaCTA from '@/components/sections/home/ConcienciaCTA';

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <PromoBanner />
      <CategoriesGrid />
      <VideoSection />
      <Wizard />
      <AboutBrand />
      <ConcienciaCTA />
    </PageLayout>
  );
}
