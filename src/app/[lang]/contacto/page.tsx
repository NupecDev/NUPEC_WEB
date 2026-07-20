import PageLayout from '@/components/layout/PageLayout';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactInfo from '@/components/sections/contact/ContactInfo';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';
import ContactMap from '@/components/sections/contact/ContactMap';

export default function ContactoPage() {
  return (
    <PageLayout>
      <ContactHero />
      <ContactInfo />
      <ContactFormSection />
      <ContactMap />
    </PageLayout>
  );
}
