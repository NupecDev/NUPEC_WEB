'use client';

import { useTranslations } from 'next-intl';

export default function ConcienciaHero() {
  const t = useTranslations('conciencia.hero');

  return (
    /*
      Mismo patrón que AboutHero: banner-section p_relative con bg-layer full-bleed.
      Sin CTA de botón: esta página es un compendio de iniciativas, no una landing de venta.
    */
    <section className="banner-section about-hero p_relative">
      <div
        className="bg-layer"
        style={{ backgroundImage: 'url(/assets/images/resource/about-4.jpg)' }}
      />
      <div className="about-hero__overlay" />

      <div className="auto-container">
        <div className="content-box p_relative z_5">
          <span className="title-text p_relative d_block">{t('eyebrow')}</span>
          <h2 className="p_relative d_block">{t('title')}</h2>
          <p>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}
