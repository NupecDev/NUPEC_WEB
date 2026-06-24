'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';
import { useCaninaTab } from '../CaninaTabContext';

export type ProductCard = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  color?: string;
  image?: { asset: { _ref: string }; alt: string };
  lifeStage?: 'cachorro' | 'adulto' | 'senior';
  breedSize?: 'mini' | 'pequena' | 'mediana' | 'grande' | 'todas';
};

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#78BE20',
  'nutricion-especializada': '#E35205',
  'nutricion-clinica':       '#C4262E',
  'premios-funcionales':     '#78BE20',
  'suplementos':             '#E8A200',
  'alimentos-humedos':       '#0085CA',
};

function getPrimary(product: ProductCard, categorySlug: string): string {
  if (product.color) return product.color;
  if (product.lifeStage === 'cachorro') return '#0085CA';
  if (product.lifeStage === 'senior')   return '#54301A';
  if (product.lifeStage === 'adulto')   return '#78BE20';
  return CATEGORY_COLOR[categorySlug] ?? '#78BE20';
}

function getSecondary(product: ProductCard): string | undefined {
  if (product.breedSize === 'mini')    return '#ECB3CB';
  if (product.breedSize === 'pequena') return '#0085CA';
  return undefined;
}

type Props = {
  lang: string;
  productsByCategory: Record<string, ProductCard[]>;
};

export default function ProductGridCaninaClient({ lang, productsByCategory }: Props) {
  const t = useTranslations('canine.products');

  const { activeCategory } = useCaninaTab();
  const products = productsByCategory[activeCategory] ?? [];

  return (
    <section className="service-section alternat-2 p_relative canine-products">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p className="canine-products__eyebrow">{t('eyebrow')}</p>
        </div>

        {products.length === 0 ? (
          <div className="canine-products__empty">
            <p>{t('sinProductos')}</p>
          </div>
        ) : (
          <div className="row clearfix">
            {products.map((product) => {
              const primary   = getPrimary(product, activeCategory);
              const secondary = getSecondary(product);
              return (
                <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 canine-product-col">
                  <div className="service-block-two canine-product-block">
                    <div className="inner-box">
                      <div
                        className="canine-product-block__stripe"
                        style={{
                          background: secondary
                            ? `linear-gradient(90deg, ${primary} 50%, ${secondary} 50%)`
                            : primary,
                        }}
                      />

                      <div className="canine-product-block__img-wrap">
                        {product.image?.asset ? (
                          <Image
                            src={urlFor(product.image).width(200).height(200).url()}
                            alt={product.image.alt}
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
                        
                          href={`/${lang}/nutricion-canina/${activeCategory}/${product.slug}`}
                          className="canine-product-block__cta"
                        >
                          {t('verProducto')} <i className="icon-22" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="canine-products__cat-cta-wrap">
          <Link
            href={`/${lang}/nutricion-canina/${activeCategory}`}
            className="theme-btn btn-one"
          >
            {t('verCategoria')} <i className="icon-22" />
          </Link>
        </div>
      </div>
    </section>
  );
}
