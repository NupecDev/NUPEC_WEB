'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';
import type { CategoryProductCard } from '@/components/sections/products/CategoryProductGrid/client';

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

type Props = {
  lang: string;
  products: CategoryProductCard[];
  categorySlug: string;
  species: 'canino' | 'felino';
};

export default function ProductRelatedClient({ lang, products, categorySlug, species }: Props) {
  const t = useTranslations('productPage.related');
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';

  if (products.length === 0) return null;

  return (
    <section className="service-section alternat-2 sp-related canine-products cat-products p_relative pt_80 pb_80">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        <div className="row clearfix">
          {products.map((product) => {
            const primary =
              (product.lifeStage && LIFE_STAGE_COLOR[product.lifeStage]) ??
              CATEGORY_COLOR[categorySlug] ??
              '#78BE20';

            return (
              <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 canine-product-col wow fadeInUp">
                <div className="service-block-two canine-product-block">
                  <div className="inner-box">
                    <div className="canine-product-block__stripe" style={{ background: primary }} />

                    <div className="canine-product-block__img-wrap">
                      {product.image?.asset ? (
                        <Image
                          src={urlFor(product.image).width(200).height(200).url()}
                          alt={product.image.alt ?? product.name}
                          width={200}
                          height={200}
                          className="canine-product-block__img"
                        />
                      ) : (
                        <div
                          className="canine-product-block__bag-ph"
                          style={{ borderColor: primary, color: primary }}
                        >
                          <span className="canine-product-block__bag-brand">NUPEC</span>
                          <span className="canine-product-block__bag-name">{product.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="canine-product-block__body">
                      <h3 className="canine-product-block__name" style={{ color: primary }}>
                        {product.name}
                      </h3>
                      {product.tagline && (
                        <p className="canine-product-block__desc">{product.tagline}</p>
                      )}
                    </div>

                    <div className="canine-product-block__footer">
                      <Link
                        href={`/${lang}/${speciesBase}/${categorySlug}/${product.slug}`}
                        className="canine-product-block__cta"
                      >
                        {t('cta')} <i className="icon-21" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt_30">
          <Link
            href={`/${lang}/${speciesBase}/${categorySlug}`}
            className="theme-btn btn-one"
          >
            <span>{t('viewAll')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
