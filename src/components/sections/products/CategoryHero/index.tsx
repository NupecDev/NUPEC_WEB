'use client';

import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { urlFor } from '@/lib/sanity/client';

type CategoryStat = {
  value: string;
  label: string | null;
  description: string | null;
};

type CategoryHeroProps = {
  categoryName: string;
  categoryDescription: string | null;
  categoryExcerpt: string | null;
  species: 'canino' | 'felino';
  categorySlug: string;
  bannerImage?: { asset: { _ref: string } } | null;
  stats?: CategoryStat[] | null;
};

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#0085CA',
  'nutricion-especializada': '#0085CA',
  'nutricion-clinica':       '#0085CA',
  'premios-funcionales':     '#0085CA',
  'suplementos':             '#0085CA',
  'alimentos-humedos':       '#0085CA',
};

export default function CategoryHero({ categoryName, categoryDescription, categoryExcerpt, species, categorySlug, bannerImage, stats }: CategoryHeroProps) {
  const t = useTranslations('categoryPage.hero');
  const params = useParams();
  const lang = params.lang as string;

  const accentColor = CATEGORY_COLOR[categorySlug] ?? '#1B365D';
  const heroStats = stats ?? [];
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const speciesLabel = species === 'canino' ? t('switchCanina') : t('switchFelina');
  const bgImage = bannerImage?.asset
    ? urlFor(bannerImage).width(1920).url()
    : '/assets/images/banner/canine-hero.jpg';

  return (
    <>
      {/* Subnav contextual */}
      <div className="canine-subnav">
        <div className="auto-container">
          <div className="canine-subnav__inner">
            <div className="canine-subnav__bar" />
            <div className="canine-subnav__switcher">
              <Link href={`/${lang}/nutricion-canina`} className={`canine-subnav__switch${species === 'canino' ? ' canine-subnav__switch--active' : ''}`}>
                {t('switchCanina')}
              </Link>
              <Link href={`/${lang}/nutricion-felina`} className={`canine-subnav__switch${species === 'felino' ? ' canine-subnav__switch--active' : ''}`}>
                {t('switchFelina')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="banner-style-two canine-hero cat-hero p_relative">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div
          className="canine-hero__overlay"
          style={{ '--product-accent': accentColor } as CSSProperties}
        />

        <div className="auto-container">
          <div className="cat-hero__layout p_relative z_5">
            {/* Left: title block */}
            <div className="cat-hero__left">
              {/* Breadcrumb */}
              <div className="cat-hero__breadcrumb">
                <Link href={`/${lang}`}>{t('breadHome')}</Link>
                <span> · </span>
                <Link href={`/${lang}/${speciesBase}`}>{speciesLabel}</Link>
                <span> · </span>
                <strong>{categoryName}</strong>
              </div>

              <div className="canine-hero__title-row mt_20">
                <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
                <div>
                  <h1 className="canine-hero__h1">{categoryName}</h1>
                  {categoryExcerpt && (
                    <h5 className="text-white">{categoryExcerpt}</h5>
                  )}
                </div>
              </div>

              <div className="btn-box mt_30">
                <Link href={`#productos`} className="theme-btn btn-two">
                  <span>{t('cta')}</span>
                </Link>
              </div>
            </div>

            {/* Right: stats */}
            {heroStats.length > 0 && (
              <div className="cat-hero__stats">
                {heroStats.map((stat, i) => (
                  <Fragment key={i}>
                    {i > 0 && <div className="cat-hero__stat-divider" />}
                    <div className="cat-hero__stat">
                      <span className="cat-hero__stat-num" style={{ color: accentColor }}>{stat.value}</span>
                      <span className="cat-hero__stat-label">{stat.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
