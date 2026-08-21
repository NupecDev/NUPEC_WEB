'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { urlFor } from '@/lib/sanity/client';

type Props = {
  category: { name: string; slug: string; excerpt?: string; complementaryText?: string };
  species: 'canino' | 'felino';
  bannerImage?: { asset: { _ref: string } };
  accentColor?: string;
};

export default function ProductBenefitsBanner({ category, species, bannerImage, accentColor }: Props) {
  const t = useTranslations('productPage.benefitsBanner');
  const params = useParams();
  const lang = params.lang as string;
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const bgImage = bannerImage?.asset
    ? urlFor(bannerImage).width(1920).url()
    : '/assets/images/banner/canine-heroes.jpg';

  return (
    <section
      className="banner-section canine-banner sp-benefits-banner p_relative"
      style={accentColor ? ({ '--product-accent': accentColor } as CSSProperties) : undefined}
    >
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="canine-banner__overlay" />

      <div className="auto-container">
        <div className="content-box p_relative z_5">
          <span className="canine-banner__eyebrow">{category.name}</span>
          <h2 className="canine-banner__title">{category.excerpt || t('genericTitle')}</h2>
          <p className="canine-banner__desc">{category.complementaryText || t('genericDesc')}</p>
          <div className="btn-box mt_30">
            <Link
              href={`/${lang}/${speciesBase}/${category.slug}`}
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
