'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ContactMap() {
  const t = useTranslations('contacto.info');
  const tFooter = useTranslations('footer');

  return (
    /*
      Adaptado de GoogleMapSection (home1) del template: mismo google-map-section,
      con el iframe apuntando a la planta NUPEC en El Marqués, Querétaro.
    */
    <section className="google-map-section">
      <div className="map-inner">
        <iframe
          src="https://www.google.com/maps?q=Avenida+de+las+Fuentes+14,+Fracc.+Industrial+Bernardo+Quintana,+El+Marqués,+Querétaro,+76240&output=embed"
          height={570}
          style={{ border: 0, width: '100%' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="content-box">
        <div className="inner-box">
          <h3>{t('hoursTitle')}</h3>
          <div className="content-inner">
            <ul className="schedule-list clearfix">
              <li>{t('hoursText')}</li>
            </ul>
            <h4>{t('locationTitle')}:</h4>
            <ul className="info-list clearfix">
              <li>
                <i className="icon-46" />
                {tFooter('email')}: <Link href={`mailto:${tFooter('email')}`}>{tFooter('email')}</Link>
              </li>
              <li>
                <i className="icon-35" />
                {t('phoneTitle')}: <Link href={`tel:${tFooter('phone').replace(/[^\d+]/g, '')}`}>{tFooter('phone')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
