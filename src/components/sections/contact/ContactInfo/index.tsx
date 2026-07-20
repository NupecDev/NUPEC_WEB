'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const BLOCKS = [
  { key: 'location', icon: 'icon-23.svg', delay: '00ms' },
  { key: 'phone', icon: 'icon-25.svg', delay: '300ms' },
  { key: 'hours', icon: 'icon-24.svg', delay: '600ms' },
] as const;

export default function ContactInfo() {
  const t = useTranslations('contacto.info');

  return (
    /*
      Reutiliza contact-info-two / info-block-two del template (contact-info.css),
      sin modificar el CSS original.
    */
    <section className="contact-info-two centred">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-43.png)' }}
      />
      <div className="auto-container">
        <div className="row clearfix">
          {BLOCKS.map(({ key, icon, delay }) => (
            <div key={key} className="col-lg-4 col-md-6 col-sm-12 info-block">
              <div
                className="info-block-two wow fadeInUp animated"
                data-wow-delay={delay}
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <Image src={`/assets/images/icons/${icon}`} alt="Icon" width={50} height={50} priority />
                  </div>
                  <h3>{t(`${key}Title`)}</h3>
                  <p>{t(`${key}Text`)}</p>
                  {key === 'phone' && <p>{t('phoneAlt')}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
