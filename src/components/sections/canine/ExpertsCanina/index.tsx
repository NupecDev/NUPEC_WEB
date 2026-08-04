'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ICONS = ['icon-20', 'icon-53', 'icon-15', 'icon-30'] as const;

type Props = {
  species?: 'canino' | 'felino';
};

export default function ExpertsCanina({ species = 'canino' }: Props) {
  const t = useTranslations(species === 'felino' ? 'feline.experts' : 'canine.experts');
  const params = useParams();
  const lang = params.lang as string;

  const items = ['digestibilidad', 'ingredientes', 'investigacion', 'calidad'] as const;

  return (
    <>
      {/*
        chooseus-style-two: navy bg equivalente
        chooseus-block-one .inner-box:hover → icon-box fill animado via ::before
        ya definido en chooseus.css — no se toca
      */}
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

            {/* Columna derecha: 4 bloques chooseus-block-one en grid 2×2, cada uno enlaza a su página de respaldo científico */}
            <div className="col-lg-7 col-md-12 col-sm-12 content-column">
              <div className="row clearfix">
                {items.map((item, i) => (
                  <div key={item} className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                    <div className="chooseus-block-one">
                      <a
                        href={t(`${item}Href`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inner-box"
                      >
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
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        Digestibilidad: content-block-one / image-block-one del template
        (mismo patrón que AboutOrigin), texto izquierda + diagrama derecha.
      */}
      <section className="about-section canine-digestibility sec-pad p_relative">
        <div className="auto-container">
          <div className="row clearfix align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-block-one">
                <div className="content-box">
                  <div className="sec-title mb_25">
                    {/* <span className="sub-title mb_5">{t('digestibility.eyebrow')}</span> */}
                    <h2>{t('digestibility.title')}</h2>
                  </div>
                  <div className="text-box">
                    <p>{t('digestibility.description')}</p>
                  </div>
                  {/* <a
                    href={t('digestibility.href')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn btn-two"
                  >
                    <span>{t('digestibility.cta')}</span>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image-block-one">
                <div className="image-box p_relative canine-digestibility__diagram">
                  <Image
                    src="/assets/images/resource/npc-ico-sabias.png"
                    alt={t('digestibility.title')}
                    width={523}
                    height={399}
                  />
                  {/* <div className="canine-digestibility__stat canine-digestibility__stat--ingested">
                    <span className="canine-digestibility__value">{t('digestibility.ingestedValue')}</span>
                    <span className="canine-digestibility__label">{t('digestibility.ingestedLabel')}</span>
                  </div>
                  <div className="canine-digestibility__stat canine-digestibility__stat--utilized">
                    <span className="canine-digestibility__value">{t('digestibility.utilizedValue')}</span>
                    <span className="canine-digestibility__label">{t('digestibility.utilizedLabel')}</span>
                  </div>
                  <div className="canine-digestibility__stat canine-digestibility__stat--excreted">
                    <span className="canine-digestibility__value">{t('digestibility.excretedValue')}</span>
                    <span className="canine-digestibility__label">{t('digestibility.excretedLabel')}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        Válvula Única: mismo patrón content-block-one / image-block-one,
        invertido — imagen/video izquierda, texto derecha.
      */}
      <section className="about-section canine-valve sec-pad p_relative">
        <div className="auto-container">
          <div className="row clearfix align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column order-lg-1">
              <div className="image-block-one">
                <div className="image-box p_relative">
                  <Image
                    src="/assets/images/resource/npc-ico-valvula.svg"
                    alt={t('valve.title')}
                    width={523}
                    height={399}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column order-lg-2">
              <div className="content-block-one">
                <div className="content-box">
                  <div className="sec-title mb_25">
                    <span className="sub-title mb_5">{t('valve.subtitle')}</span>
                    <h2>{t('valve.title')}</h2>
                  </div>
                  <div className="text-box">
                    <p>{t('valve.description')}</p>
                  </div>
                  {/* <a
                    href={t('valve.href')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn btn-two"
                  >
                    <span>{t('valve.cta')}</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
