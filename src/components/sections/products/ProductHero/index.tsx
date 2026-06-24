'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { urlFor } from '@/lib/sanity/client';

export type ProductHeroData = {
  name: string;
  tagline?: string;
  color?: string;
  lifeStage?: 'cachorro' | 'adulto' | 'senior';
  breedSize?: string;
  presentations?: string[];
  image?: { asset: { _ref: string }; alt: string };
  category: { name: string; slug: string };
  species: 'canino' | 'felino';
};

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#78BE20',
  'nutricion-especializada': '#E35205',
  'nutricion-clinica':       '#C4262E',
  'premios-funcionales':     '#78BE20',
  'suplementos':             '#E8A200',
  'alimentos-humedos':       '#0085CA',
};

const LIFE_STAGE_COLOR: Record<string, string> = {
  cachorro: '#0085CA',
  adulto:   '#78BE20',
  senior:   '#54301A',
};

export default function ProductHero({ product }: { product: ProductHeroData }) {
  const t = useTranslations('productPage.hero');
  const params = useParams();
  const lang = params.lang as string;

  const speciesBase = product.species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const accentColor =
    product.color ??
    (product.lifeStage && LIFE_STAGE_COLOR[product.lifeStage]) ??
    CATEGORY_COLOR[product.category.slug] ??
    '#78BE20';

  return (
    <>
      {/* Subnav contextual — igual que CategoryHero */}
      <div className="canine-subnav">
        <div className="auto-container">
          <div className="canine-subnav__inner">
            <div className="canine-subnav__bar" />
            <div className="canine-subnav__switcher">
              <Link
                href={`/${lang}/nutricion-canina`}
                className={`canine-subnav__switch${product.species === 'canino' ? ' canine-subnav__switch--active' : ''}`}
              >
                {t('switchCanina')}
              </Link>
              <Link
                href={`/${lang}/nutricion-felina`}
                className={`canine-subnav__switch${product.species === 'felino' ? ' canine-subnav__switch--active' : ''}`}
              >
                {t('switchFelina')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="banner-style-two canine-hero sp-hero p_relative">
        <div
          className="bg-layer"
          style={{ backgroundImage: 'url(/assets/images/banner/nodes.png)' }}
          
        />
        <div className="canine-hero__overlay" 
        style={{ backgroundImage: 'url(https://nupec.com/wp-content/uploads/2018/12/npc-bk-producto-cachorro.jpg)' }}
        />

        <div className="auto-container">
          <div className="sp-hero__layout p_relative z_5">
            {/* Left: text */}
            <div className="sp-hero__left">
              <div className="cat-hero__breadcrumb">
                <Link href={`/${lang}`}>{t('breadHome')}</Link>
                <span> · </span>
                <Link href={`/${lang}/${speciesBase}`}>
                  {product.species === 'canino' ? t('switchCanina') : t('switchFelina')}
                </Link>
                <span> · </span>
                <Link href={`/${lang}/${speciesBase}/${product.category.slug}`}>
                  {product.category.name}
                </Link>
                <span> · </span>
                <strong>{product.name}</strong>
              </div>

              <div className="canine-hero__title-row mt_20">
                <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
                <div>
                  {product.lifeStage && (
                    <span className="sp-hero__stage-tag" style={{ background: accentColor }}>
                      {t(`lifeStage.${product.lifeStage}`)}
                      {product.breedSize && product.breedSize !== 'todas'
                        ? ` · ${t(`breedSize.${product.breedSize}`)}`
                        : ''}
                    </span>
                  )}
                  <h1 className="canine-hero__h1">{product.name}</h1>
                  {product.tagline && (
                    <p className="canine-hero__desc">{product.tagline}</p>
                  )}
                </div>
              </div>

              {/* Presentations */}
              {product.presentations && product.presentations.length > 0 && (
                <div className="sp-hero__presentations mt_20">
                  <span className="sp-hero__pres-label">{t('presentations')}</span>
                  <div className="sp-hero__pres-list">
                    {product.presentations.map((p) => (
                      <span key={p} className="sp-hero__pres-chip" style={{ borderColor: accentColor, color: accentColor }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="btn-box mt_30">
                <Link href="#descripcion" className="theme-btn btn-two">
                  <span>{t('ctaDetails')}</span>
                </Link>
                <Link
                  href={`/${lang}/${speciesBase}/${product.category.slug}`}
                  className="theme-btn btn-one ml_15"
                >
                  <span>{t('ctaBack')}</span>
                </Link>
              </div>
            </div>

            {/* Right: product image */}
            <div className="sp-hero__img-wrap">
              {product.image?.asset ? (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.image.alt ?? product.name}
                  width={400}
                  height={400}
                  className="sp-hero__img"
                  priority
                />
              ) : (
                <div
                  className="sp-hero__img-ph"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <span className="sp-hero__img-ph-brand">NUPEC</span>
                  <span className="sp-hero__img-ph-name">{product.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
