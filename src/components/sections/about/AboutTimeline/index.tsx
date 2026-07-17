'use client';

import { useTranslations } from 'next-intl';

const MILESTONES = ['m01', 'm02', 'm03', 'm04', 'm05'] as const;

export default function AboutTimeline() {
  const t = useTranslations('nosotros.timeline');

  return (
    /*
      No existe un componente de timeline en el template Envato; se construye
      nuevo reutilizando únicamente sec-title y las variables de color del theme
      (--theme-color, --secondary-color) para mantener consistencia visual.
    */
    <section className="about-timeline sec-pad p_relative">
      <div className="auto-container">
        <div className="sec-title mb_60 text-center">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        <div className="about-timeline__track">
          {MILESTONES.map((key, i) => (
            <div
              key={key}
              className={`about-timeline__item wow fadeInUp ${i % 2 === 0 ? 'about-timeline__item--left' : 'about-timeline__item--right'}`}
              data-wow-delay={`${i * 100}ms`}
            >
              <div className="about-timeline__dot" />
              <div className="about-timeline__content">
                <span className="about-timeline__year">{t(`${key}Year`)}</span>
                <p className="about-timeline__text">{t(`${key}Text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
