import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import AboutHero from '@/components/sections/about/AboutHero';
import AboutOrigin from '@/components/sections/about/AboutOrigin';
import AboutTimeline from '@/components/sections/about/AboutTimeline';
import AboutWhatWeDo from '@/components/sections/about/AboutWhatWeDo';
import AboutStats from '@/components/sections/about/AboutStats';
import AboutPolicy from '@/components/sections/about/AboutPolicy';
import ConcienciaCTA from '@/components/sections/home/ConcienciaCTA';
import { client } from '@/lib/sanity/client';
import { pageSeoByIdQuery } from '@/lib/sanity/queries';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type PageSeoData = {
  seo?: { metaTitle?: string; metaDescription?: string; canonicalOverride?: string | null; noIndex?: boolean | null };
  faq?: { question: string; answer: string }[] | null;
};

const TITLE: Record<Locale, string> = {
  es: 'Sobre nosotros',
  en: 'About us',
  fr: 'À propos de nous',
};

const DESCRIPTION: Record<Locale, string> = {
  es: 'Conoce la historia de NUPEC, nuestro origen, misión y compromiso con la nutrición premium para perros y gatos hecha en México.',
  en: 'Learn about NUPEC\'s history, origin, mission and commitment to premium nutrition for dogs and cats made in Mexico.',
  fr: 'Découvrez l\'histoire de NUPEC, notre origine, notre mission et notre engagement envers une nutrition premium pour chiens et chats fabriquée au Mexique.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'nosotros',
    lang,
  });

  return buildMetadata({
    locale,
    pathWithoutLocale: '/nosotros',
    seo: page?.seo,
    fallbackTitle: TITLE[locale],
    fallbackDescription: DESCRIPTION[locale],
  });
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'nosotros',
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
