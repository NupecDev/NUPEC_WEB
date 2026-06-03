import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/sections/home/Hero';
import CategoriesGrid from '@/components/sections/home/CategoriesGrid';
import VideoSection from '@/components/sections/home/VideoSection';
import Wizard from '@/components/sections/home/Wizard';
import AboutBrand from '@/components/sections/home/AboutBrand';
import BlogPreview from '@/components/sections/home/BlogPreview';
import ConcienciaCTA from '@/components/sections/home/ConcienciaCTA';

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <CategoriesGrid />
      <VideoSection />
      <Wizard />
      <AboutBrand />
      <BlogPreview />
      <ConcienciaCTA />
    </PageLayout>
  );
}
