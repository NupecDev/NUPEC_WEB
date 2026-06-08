'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';

export type CategoryProductCard = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  image?: { asset: { _ref: string }; alt: string };
  lifeStage?: 'cachorro' | 'adulto' | 'senior';
  breedSize?: 'mini' | 'pequena' | 'mediana' | 'grande' | 'todas';
};

type Props = {
  lang: string;
  products: CategoryProductCard[];
  categorySlug: string;
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

const BREED_SIZE_COLOR: Record<string, string> = {
  mini:    '#ECB3CB',
  pequena: '#0085CA',
};

const LIFE_STAGE_ORDER = ['cachorro', 'adulto', 'senior'];

function getPrimary(product: CategoryProductCard, categorySlug: string): string {
  if (product.lifeStage && LIFE_STAGE_COLOR[product.lifeStage]) return LIFE_STAGE_COLOR[product.lifeStage];
  return CATEGORY_COLOR[categorySlug] ?? '#78BE20';
}

function getSecondary(product: CategoryProductCard): string | undefined {
  if (!product.breedSize) return undefined;
  return BREED_SIZE_COLOR[product.breedSize];
}

type Group = {
  lifeStage: string | null;
  breedSizeLabel: string | null;
  products: CategoryProductCard[];
};

function groupProducts(products: CategoryProductCard[]): Group[] {
  const hasLifeStage = products.some((p) => p.lifeStage);
  const hasBreedSize = products.some((p) => p.breedSize && p.breedSize !== 'todas');

  if (!hasLifeStage && !hasBreedSize) {
    return [{ lifeStage: null, breedSizeLabel: null, products }];
  }

  const map = new Map<string, CategoryProductCard[]>();

  for (const product of products) {
    const ls = product.lifeStage ?? 'general';
    const bs = product.breedSize && product.breedSize !== 'todas' ? product.breedSize : 'todas';
    const key = `${ls}::${bs}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(product);
  }

  const groups: Group[] = [];

  // Sort by lifeStage order then breedSize
  const sortedKeys = Array.from(map.keys()).sort((a, b) => {
    const [lsA, bsA] = a.split('::');
    const [lsB, bsB] = b.split('::');
    const lsOrder = LIFE_STAGE_ORDER.indexOf(lsA) - LIFE_STAGE_ORDER.indexOf(lsB);
    if (lsOrder !== 0) return lsOrder;
    return bsA.localeCompare(bsB);
  });

  for (const key of sortedKeys) {
    const [ls, bs] = key.split('::');
    groups.push({
      lifeStage: ls === 'general' ? null : ls,
      breedSizeLabel: bs === 'todas' ? null : bs,
      products: map.get(key)!,
    });
  }

  return groups;
}

function GroupLabel({ lifeStage, breedSizeLabel, t }: { lifeStage: string | null; breedSizeLabel: string | null; t: ReturnType<typeof useTranslations> }) {
  if (!lifeStage && !breedSizeLabel) return null;

  const ls = lifeStage ? t(`lifeStage.${lifeStage}`) : null;
  const bs = breedSizeLabel ? t(`breedSize.${breedSizeLabel}`) : null;

  const label = [ls, bs].filter(Boolean).join(' · ');
  const color = lifeStage ? (LIFE_STAGE_COLOR[lifeStage] ?? '#0085CA') : '#0085CA';

  return (
    <div className="cat-products__group-label" style={{ borderColor: color }}>
      <span style={{ color }}>{label}</span>
    </div>
  );
}

export default function CategoryProductGridClient({ lang, products, categorySlug, species }: Props) {
  const t = useTranslations('categoryPage.products');
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';

  const groups = groupProducts(products);

  return (
    <section id="productos" className="service-section alternat-2 p_relative canine-products cat-products">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        {products.length === 0 ? (
          <div className="canine-products__empty">
            <p>{t('sinProductos')}</p>
          </div>
        ) : (
          <>
            {groups.map((group, gi) => (
              <div key={gi} className="cat-products__group">
                <GroupLabel lifeStage={group.lifeStage} breedSizeLabel={group.breedSizeLabel} t={t} />
                <div className="row clearfix">
                  {group.products.map((product) => {
                    const primary = getPrimary(product, categorySlug);
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
                                href={`/${lang}/${speciesBase}/${categorySlug}/${product.slug}`}
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
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
