'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function BannerHeroes() {
  const t = useTranslations('canine.banner');
  const params = useParams();
  const lang = params.lang as string;

  return (
    /*
      Reutiliza banner-section p_relative con .bg-layer (igual que Hero del home)
      El bg-layer tiene transition scale 8000ms en CSS del template (Ken Burns)
    */
    <section className="banner-section canine-banner p_relative">
      <div
        className="bg-layer"
        style={{ backgroundImage: 'url(/assets/images/banner/canine-heroes.jpg)' }}
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
              href={`/${lang}/nutricion-canina`}
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
