import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ConcienciaHero from '@/components/sections/conciencia/ConcienciaHero';
import ConcienciaTerapias from '@/components/sections/conciencia/ConcienciaTerapias';
import ConcienciaLoboMexicano from '@/components/sections/conciencia/ConcienciaLoboMexicano';
import ConcienciaRescate from '@/components/sections/conciencia/ConcienciaRescate';
import ConcienciaComercioNacional from '@/components/sections/conciencia/ConcienciaComercioNacional';
import { client } from '@/lib/sanity/client';
import { pageSeoByIdQuery } from '@/lib/sanity/queries';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type PageSeoData = {
  seo?: { metaTitle?: string; metaDescription?: string; canonicalOverride?: string | null; noIndex?: boolean | null };
  faq?: { question: string; answer: string }[] | null;
};

const TITLE: Record<Locale, string> = {
  es: 'Conciencia social NUPEC',
  en: 'NUPEC social awareness',
  fr: 'Conscience sociale NUPEC',
};

const DESCRIPTION: Record<Locale, string> = {
  es: 'Conoce las iniciativas de responsabilidad social de NUPEC: terapias asistidas, rescate animal y apoyo al comercio nacional.',
  en: 'Learn about NUPEC\'s social responsibility initiatives: assisted therapies, animal rescue and support for national trade.',
  fr: 'Découvrez les initiatives de responsabilité sociale de NUPEC : thérapies assistées, sauvetage animal et soutien au commerce national.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'conciencia',
    lang,
  });

  return buildMetadata({
    locale,
    pathWithoutLocale: '/conciencia',
    seo: page?.seo,
    fallbackTitle: TITLE[locale],
    fallbackDescription: DESCRIPTION[locale],
  });
}

export default async function ConcienciaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const page = await client.fetch<PageSeoData | null>(pageSeoByIdQuery, {
    pageId: 'conciencia',
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
      <ConcienciaHero />
      <ConcienciaTerapias />
      {/* <ConcienciaLoboMexicano />
      <ConcienciaRescate /> */}
      <ConcienciaComercioNacional />
    </PageLayout>
  );
}
