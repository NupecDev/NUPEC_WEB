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
  color?: string;
  image?: { asset: { _ref: string }; alt: string };
  lifeStage?: ('cachorro' | 'adulto' | 'senior')[];
  breedSize?: ('mini' | 'pequena' | 'mediana' | 'grande' | 'todas')[];
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

const LIFE_STAGE_ORDER = ['cachorro', 'adulto', 'senior'];

function getPrimary(product: CategoryProductCard, categorySlug: string): string {
  if (product.color) return product.color;
  const stage = product.lifeStage?.[0];
  if (stage && LIFE_STAGE_COLOR[stage]) return LIFE_STAGE_COLOR[stage];
  return CATEGORY_COLOR[categorySlug] ?? '#78BE20';
}

type Group = {
  lifeStage: string | null;
  products: CategoryProductCard[];
};

// breedSize se omite en este nivel de clasificación (queda disponible en Sanity para el wizard).
function groupProducts(products: CategoryProductCard[]): Group[] {
  const hasLifeStage = products.some((p) => p.lifeStage && p.lifeStage.length > 0);

  if (!hasLifeStage) {
    return [{ lifeStage: null, products }];
  }

  const map = new Map<string, CategoryProductCard[]>();

  for (const product of products) {
    const stages = product.lifeStage && product.lifeStage.length > 0 ? product.lifeStage : ['general'];

    // Product appears once per lifeStage it belongs to
    for (const ls of stages) {
      if (!map.has(ls)) map.set(ls, []);
      map.get(ls)!.push(product);
    }
  }

  const groups: Group[] = [];

  const sortedKeys = Array.from(map.keys()).sort(
    (a, b) => LIFE_STAGE_ORDER.indexOf(a) - LIFE_STAGE_ORDER.indexOf(b)
  );

  for (const key of sortedKeys) {
    groups.push({
      lifeStage: key === 'general' ? null : key,
      products: map.get(key)!,
    });
  }

  return groups;
}

function GroupLabel({ lifeStage, t }: { lifeStage: string | null; t: ReturnType<typeof useTranslations> }) {
  if (!lifeStage) return null;

  const label = t(`lifeStage.${lifeStage}`);
  const color = LIFE_STAGE_COLOR[lifeStage] ?? '#0085CA';

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
                <GroupLabel lifeStage={group.lifeStage} t={t} />
                <div className="row clearfix">
                  {group.products.map((product) => {
                    const primary = getPrimary(product, categorySlug);
                    return (
                      <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 canine-product-col">
                        <div className="service-block-two canine-product-block">
                          <div className="inner-box">
                            <div
                              className="canine-product-block__stripe"
                              style={{ background: primary }}
                            />

                            <div className="canine-product-block__img-wrap">
                              {product.image?.asset ? (
                                <Image
                                  src={urlFor(product.image).width(320).url()}
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
