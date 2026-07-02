'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function HeroCanina() {
  const t = useTranslations('canine.hero');
  const params = useParams();
  const lang = params.lang as string;

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
              <Link href={`/${lang}/nutricion-canina`} className="canine-subnav__switch canine-subnav__switch--active">
                {t('switchCanina')}
              </Link>
              <Link href={`/${lang}/nutricion-felina`} className="canine-subnav__switch">
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
          style={{ backgroundImage: 'url(/assets/images/banner/canine-hero.jpg)' }}
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
              <Link href={`/${lang}/nutricion-canina/nutricion-diaria`} className="theme-btn btn-two">
                <span>{t('cta')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
