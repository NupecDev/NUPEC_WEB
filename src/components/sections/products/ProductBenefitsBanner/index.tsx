'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { urlFor } from '@/lib/sanity/client';

type Props = {
  productName: string;
  lifeStage?: string[];
  categorySlug: string;
  species: 'canino' | 'felino';
  bannerImage?: { asset: { _ref: string } };
};

const LIFE_STAGE_I18N_KEY: Record<string, string> = {
  cachorro: 'puppy',
  adulto:   'adult',
  senior:   'senior',
};

export default function ProductBenefitsBanner({ productName, lifeStage, categorySlug, species, bannerImage }: Props) {
  const t = useTranslations('productPage.benefitsBanner');
  const params = useParams();
  const lang = params.lang as string;
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const primaryLifeStage = lifeStage?.[0];
  const stageKey = primaryLifeStage ? LIFE_STAGE_I18N_KEY[primaryLifeStage] ?? 'generic' : 'generic';
  const bgImage = bannerImage?.asset
    ? urlFor(bannerImage).width(1920).url()
    : '/assets/images/banner/canine-heroes.jpg';

  return (
    <section className="banner-section canine-banner sp-benefits-banner p_relative">
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="canine-banner__overlay" />

      <div className="auto-container">
        <div className="content-box p_relative z_5">
          <span className="canine-banner__eyebrow">{productName}</span>
          <h2 className="canine-banner__title">{t(`${stageKey}Title`)}</h2>
          <p className="canine-banner__desc">{t(`${stageKey}Desc`)}</p>
          <div className="btn-box mt_30">
            <Link
              href={`/${lang}/${speciesBase}/${categorySlug}`}
              className="theme-btn btn-two"
            >
              <span>{t('cta')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
