'use client';

import { useTranslations } from 'next-intl';

const STAT_KEYS = ['years', 'market', 'plants'] as const;
const ICONS = ['icon-37', 'icon-38', 'icon-39'] as const;

export default function AboutStats() {
  const t = useTranslations('nosotros.stats');

  return (
    /*
      Mismo patrón que ScienceStats: funfact-section con fondo blanco y
      funfact-block-two, reutilizando chooseus.css sin modificarlo.
    */
    <section className="funfact-section about-stats p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_60 text-center">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="inner-container">
          <div className="row clearfix">
            {STAT_KEYS.map((key, i) => (
              <div key={key} className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                <div className="funfact-block-two">
                  <div className="inner-box">
                    <div className="icon-box">
                      <i className={ICONS[i]} />
                    </div>
                    <div className="count-outer">
                      {t(`${key}Num`)}
                    </div>
                    <p>{t(`${key}Label`)}</p>
                    <span className="canine-science__sub">{t(`${key}Desc`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
