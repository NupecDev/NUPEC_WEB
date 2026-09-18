import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactInfo from '@/components/sections/contact/ContactInfo';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';
import ContactMap from '@/components/sections/contact/ContactMap';
import { client } from '@/lib/sanity/client';
import { pageSeoByIdQuery } from '@/lib/sanity/queries';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type PageSeoData = {
  seo?: { metaTitle?: string; metaDescription?: string; canonicalOverride?: string | null; noIndex?: boolean | null };
  faq?: { question: string; answer: string }[] | null;
};

const TITLE: Record<Locale, string> = {
  es: 'Contacto',
  en: 'Contact',
  fr: 'Contact',
};

const DESCRIPTION: Record<Locale, string> = {
  es: 'Ponte en contacto con NUPEC. Resolvemos tus dudas sobre nuestros productos de nutrición premium para perros y gatos.',
  en: 'Get in touch with NUPEC. We answer your questions about our premium nutrition products for dogs and cats.',
  fr: 'Contactez NUPEC. Nous répondons à vos questions sur nos produits de nutrition premium pour chiens et chats.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'contacto',
    lang,
  });

  return buildMetadata({
    locale,
    pathWithoutLocale: '/contacto',
    seo: page?.seo,
    fallbackTitle: TITLE[locale],
    fallbackDescription: DESCRIPTION[locale],
  });
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'contacto',
    lang,
  });

  const jsonLd = faqJsonLd(
    (page?.faq ?? [])
      .filter((item) => item.question && item.answer)
      .map((item) => ({ question: item.question, answer: item.answer }))
  );

  return (
    <PageLayout>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContactHero />
      <ContactInfo />
      <ContactFormSection />
      <ContactMap />
    </PageLayout>
  );
}
