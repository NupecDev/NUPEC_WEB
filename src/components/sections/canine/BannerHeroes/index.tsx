import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { client, urlFor } from '@/lib/sanity/client';
import { randomBannerProductsQuery } from '@/lib/sanity/queries';

type BannerProduct = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  color?: string;
  image?: { asset: { _ref: string }; alt?: string };
  bannerImage?: { asset: { _ref: string } };
  category: { name: string; slug: string };
};

const NUPEC_BLUE = '#0085CA';

type Props = {
  lang: string;
  species?: 'canino' | 'felino';
};

export default async function BannerHeroes({ lang, species = 'canino' }: Props) {
  const t = await getTranslations(species === 'felino' ? 'feline.banner' : 'canine.banner');
  const speciesBase = species === 'felino' ? 'nutricion-felina' : 'nutricion-canina';
  const fallbackImage =
    species === 'felino'
      ? '/assets/images/banner/feline-heroes.jpg'
      : '/assets/images/banner/canine-heroes.jpg';

  const products = await client.fetch<BannerProduct[]>(
    randomBannerProductsQuery,
    { species, lang },
    { next: { revalidate: 0 } },
  );

  const product = products.length > 0
    ? products[Math.floor(Math.random() * products.length)]
    : null;

  const bannerImageSource = product?.bannerImage ?? product?.image;
  const bannerImage = bannerImageSource ? urlFor(bannerImageSource).width(1920).url() : fallbackImage;
  const href = product
    ? `/${lang}/${speciesBase}/${product.category.slug}/${product.slug}`
    : `/${lang}/${speciesBase}`;
  const accentColor = product?.color ?? NUPEC_BLUE;

  return (
    /*
      Reutiliza banner-section p_relative con .bg-layer (igual que Hero del home)
      El bg-layer tiene transition scale 8000ms en CSS del template (Ken Burns)
    */
    <section
      className="banner-section canine-banner p_relative"
      style={{ '--product-accent': accentColor } as CSSProperties}
    >
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      {/* Overlay gradiente: azul NUPEC → color destacado del producto */}
      <div className="canine-banner__overlay" />

      <div className="auto-container">
        <div className="canine-banner__layout p_relative z_5">
          <div className="canine-banner__text-col">
            <span className="canine-banner__eyebrow">
              {product ? product.category.name : t('eyebrow')}
            </span>
            <h2 className="canine-banner__title">{product ? product.name : t('title')}</h2>
            <p className="canine-banner__desc">
              {product ? (product.tagline ?? '') : t('description')}
            </p>
            <div className="btn-box mt_30">
              <Link href={href} className="theme-btn btn-two">
                <span>{t('cta')}</span>
              </Link>
            </div>
          </div>

          {product?.image?.asset && (
            <div className="canine-banner__img-wrap">
              <Image
                src={urlFor(product.image).width(640).url()}
                alt={product.image.alt ?? product.name}
                width={320}
                height={320}
                className="canine-banner__img"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
