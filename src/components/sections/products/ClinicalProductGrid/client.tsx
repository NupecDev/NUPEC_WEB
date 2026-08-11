'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';

export type ClinicalProductCard = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  color?: string;
  image?: { asset: { _ref: string }; alt: string };
  indications?: string[];
};

type Props = {
  lang: string;
  products: ClinicalProductCard[];
  categorySlug: string;
  species: 'canino' | 'felino';
};

const DEFAULT_COLOR = '#1B365D';

export default function ClinicalProductGridClient({ lang, products, categorySlug, species }: Props) {
  const t = useTranslations('clinical.grid');
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';

  return (
    <section id="productos" className="clin-grid p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: '#0085CA' }} />
            <div>
              <span className="section-eyebrow">{t('title')}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="clin-grid__empty">
            <p>{t('sinProductos')}</p>
          </div>
        ) : (
          <div className="clin-grid__cards">
            {products.map((product) => {
              const color = product.color || DEFAULT_COLOR;
              return (
                <article key={product._id} className="clin-grid__card">
                  <div className="canine-product-block__stripe" style={{ background: color }} />

                  {/* Rx badge */}
                  <div className="clin-grid__rx-badge" style={{ color }}>
                    {t('rxLabel')}
                  </div>

                  {/* Image / bag placeholder */}
                  {product.image?.asset ? (
                    <div className="clin-grid__bag clin-grid__bag--img">
                      <Image
                        src={urlFor(product.image).width(320).height(400).fit('max').url()}
                        alt={product.image.alt}
                        width={160}
                        height={200}
                        className="clin-grid__bag-img"
                      />
                    </div>
                  ) : (
                    <div className="clin-grid__bag" style={{ borderColor: color, color }}>
                      <div className="clin-grid__bag-brand">NUPEC</div>
                      <div className="clin-grid__bag-circle" style={{ background: 'rgba(0,0,0,0.04)', border: `2px solid ${color}` }}>
                        <span>{product.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Name + pathology */}
                  <div className="clin-grid__meta">
                    <h3 className="clin-grid__name" style={{ color }}>{product.name}</h3>
                    {product.tagline && <p className="clin-grid__patho">{product.tagline}</p>}
                  </div>

                  {/* Bullets */}
                  {product.indications && product.indications.length > 0 && (
                    <ul className="clin-grid__bullets" style={{ '--clin-accent': color } as CSSProperties}>
                      {product.indications.slice(0, 3).map((label, i) => (
                        <li key={i}>{label}</li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/${lang}/${speciesBase}/${categorySlug}/${product.slug}`}
                    className="clin-grid__cta"
                    style={{ color }}
                  >
                    {t('viewCard')} <i className="icon-22" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
