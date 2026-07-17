'use client';

import { useTranslations } from 'next-intl';

export default function AboutPolicy() {
  const t = useTranslations('nosotros.policy');

  return (
    /*
      Banda oscura de ancho completo, mismo tono que el panel azul de
      ConcienciaCTA (var(--theme-color)) para mantener consistencia de marca.
    */
    <section className="about-policy p_relative">
      <div className="auto-container">
        <div className="sec-title mb_25 text-center">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>
        <div className="about-policy__text">
          <p>{t('body')}</p>
          <p className="mt_15">{t('bodyTwo')}</p>
        </div>
      </div>
    </section>
  );
}
