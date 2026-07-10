'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type Props = {
  species?: 'canino' | 'felino';
};

export default function HeroCanina({ species = 'canino' }: Props) {
  const t = useTranslations(species === 'felino' ? 'feline.hero' : 'canine.hero');
  const params = useParams();
  const lang = params.lang as string;
  const speciesBase = species === 'felino' ? 'nutricion-felina' : 'nutricion-canina';
  const heroImage =
    species === 'felino'
      ? '/assets/images/banner/feline-hero.jpg'
      : '/assets/images/banner/canine-hero.jpg';

  return (
    <>
      {/* Subnav contextual — estilo page-title strip */}
      <div className="canine-subnav">
        <div className="auto-container">
          <div className="canine-subnav__inner">
            <div className="canine-subnav__bar" />
            {/* <span className="canine-subnav__title">{t('subnav')}</span> */}
            {/* <span className="canine-subnav__breadcrumb">
              {t('breadHome')} · {t('breadNutricion')} · <strong>{t('breadCanina')}</strong>
            </span> */}
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

      {/* Hero — banner-style-two con bg-layer + overlay izquierdo */}
      <section className="banner-style-two canine-hero p_relative">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Overlay degradado izquierda */}
        <div className="canine-hero__overlay" />

        <div className="auto-container">
          <div className="content-box p_relative z_5">
              <img src="/assets/images/logos/logo-white.jpg" alt="" width="203" height="40"/>
            <div className="canine-hero__title-row">
              <div className="canine-hero__accent-bar" />
              <div>
                <h1 className="canine-hero__h1">{t('title')}</h1>
                <p className="canine-hero__desc">{t('description')}</p>
              </div>
            </div>

            <div className="btn-box mt_30">
              <Link href={`/${lang}/${speciesBase}/nutricion-diaria`} className="theme-btn btn-two">
                <span>{t('cta')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
