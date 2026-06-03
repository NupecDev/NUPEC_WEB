'use client';

import { useTranslations } from 'next-intl';

const STAT_KEYS = ['digestibilidad', 'estudios', 'ingredientes'] as const;
const ICONS = ['icon-37', 'icon-38', 'icon-39'] as const;

export default function ScienceStats() {
  const t = useTranslations('canine.science');

  return (
    /*
      funfact-section: fondo blanco en lugar del azul del template
      funfact-block-two .inner-box: padding-left 90px, icon-box absoluto izquierda
      count-outer: número grande en color theme
    */
    <section className="funfact-section canine-science p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_60 text-center">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="inner-container canine-science__inner">
          <div className="row clearfix">
            {STAT_KEYS.map((key, i) => (
              <div key={key} className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                <div className="funfact-block-two canine-science__block">
                  <div className="inner-box">
                    {/*
                      icon-box: posición absoluta left:0 top:0, font-size 80px
                      reutiliza la clase sin cambios de chooseus.css
                    */}
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
