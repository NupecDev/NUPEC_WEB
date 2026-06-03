'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ICONS = ['icon-28', 'icon-29', 'icon-15', 'icon-30'] as const;

export default function ExpertsCanina() {
  const t = useTranslations('canine.experts');
  const params = useParams();
  const lang = params.lang as string;

  const items = ['digestibilidad', 'palatabilidad', 'investigacion', 'calidad'] as const;

  return (
    /*
      chooseus-style-two: navy bg equivalente
      chooseus-block-one .inner-box:hover → icon-box fill animado via ::before
      ya definido en chooseus.css — no se toca
    */
    <section className="chooseus-style-two canine-experts p_relative pt_100 pb_100">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          {/* Columna izquierda: título + descripción + CTA */}
          <div className="col-lg-5 col-md-12 col-sm-12 title-column">
            <div className="sec-title mb_40">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </div>
            <Link
              href={`/${lang}/nosotros`}
              className="theme-btn btn-two"
            >
              <span>{t('cta')}</span>
            </Link>
          </div>

          {/* Columna derecha: 4 bloques chooseus-block-one en grid 2×2 */}
          <div className="col-lg-7 col-md-12 col-sm-12 content-column">
            <div className="row clearfix">
              {items.map((item, i) => (
                <div key={item} className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      {/*
                        .icon-box: posición absoluta izquierda, fondo secondary-color
                        :hover → .icon-box::before height 0→100% (theme-color fill)
                        + .count-text background cambia a secondary-color
                      */}
                      <div className="icon-box">
                        <div className="icon">
                          <i className={ICONS[i]} />
                        </div>
                        <span className="count-text">0{i + 1}</span>
                      </div>
                      <h3>{t(`${item}Title`)}</h3>
                      <p>{t(`${item}Desc`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
