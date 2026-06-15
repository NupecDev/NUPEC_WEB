'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type CategoryHeroProps = {
  categoryName: string;
  categoryDescription: string | null;
  categoryExcerpt: string | null;
  species: 'canino' | 'felino';
  categorySlug: string;
};

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#0085CA',
  'nutricion-especializada': '#0085CA',
  'nutricion-clinica':       '#0085CA',
  'premios-funcionales':     '#0085CA',
  'suplementos':             '#0085CA',
  'alimentos-humedos':       '#0085CA',
};

const CATEGORY_STATS: Record<string, { formulas: string; digestibility: string; stages: string }> = {
  'nutricion-diaria':        { formulas: '09', digestibility: '92%', stages: '3' },
  'nutricion-especializada': { formulas: '12', digestibility: '91%', stages: '3' },
  'nutricion-clinica':       { formulas: '08', digestibility: '93%', stages: '2' },
  'premios-funcionales':     { formulas: '06', digestibility: '90%', stages: '2' },
  'suplementos':             { formulas: '05', digestibility: '95%', stages: '3' },
  'alimentos-humedos':       { formulas: '10', digestibility: '90%', stages: '3' },
};

export default function CategoryHero({ categoryName, categoryDescription, categoryExcerpt, species, categorySlug }: CategoryHeroProps) {
  const t = useTranslations('categoryPage.hero');
  const params = useParams();
  const lang = params.lang as string;

  const accentColor = CATEGORY_COLOR[categorySlug] ?? '#1B365D';
  const stats = CATEGORY_STATS[categorySlug] ?? { formulas: '—', digestibility: '—', stages: '—' };
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const speciesLabel = species === 'canino' ? t('switchCanina') : t('switchFelina');

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
          style={{ backgroundImage: 'url(/assets/images/banner/canine-hero.jpg)' }}
        />
        <div className="canine-hero__overlay" />

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
            <div className="cat-hero__stats">
              <div className="cat-hero__stat">
                <span className="cat-hero__stat-num" style={{ color: accentColor }}>{stats.formulas}</span>
                <span className="cat-hero__stat-label">{t('statFormulas')}</span>
              </div>
              <div className="cat-hero__stat-divider" />
              <div className="cat-hero__stat">
                <span className="cat-hero__stat-num" style={{ color: accentColor }}>{stats.digestibility}</span>
                <span className="cat-hero__stat-label">{t('statDigestibility')}</span>
              </div>
              <div className="cat-hero__stat-divider" />
              <div className="cat-hero__stat">
                <span className="cat-hero__stat-num" style={{ color: accentColor }}>{stats.stages}</span>
                <span className="cat-hero__stat-label">{t('statStages')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
