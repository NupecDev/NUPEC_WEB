'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type Props = {
  species?: 'canino' | 'felino';
};

export default function BannerHeroes({ species = 'canino' }: Props) {
  const t = useTranslations(species === 'felino' ? 'feline.banner' : 'canine.banner');
  const params = useParams();
  const lang = params.lang as string;
  const speciesBase = species === 'felino' ? 'nutricion-felina' : 'nutricion-canina';
  const bannerImage =
    species === 'felino'
      ? '/assets/images/banner/feline-heroes.jpg'
      : '/assets/images/banner/canine-heroes.jpg';

  return (
    /*
      Reutiliza banner-section p_relative con .bg-layer (igual que Hero del home)
      El bg-layer tiene transition scale 8000ms en CSS del template (Ken Burns)
    */
    <section className="banner-section canine-banner p_relative">
      <div
        className="bg-layer"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      {/* Overlay oscuro izquierda */}
      <div className="canine-banner__overlay" />

      <div className="auto-container">
        <div className="content-box p_relative z_5">
          <span className="canine-banner__eyebrow">{t('eyebrow')}</span>
          <h2 className="canine-banner__title">{t('title')}</h2>
          <p className="canine-banner__desc">{t('description')}</p>
          <div className="btn-box mt_30">
            <Link
              href={`/${lang}/${speciesBase}`}
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
