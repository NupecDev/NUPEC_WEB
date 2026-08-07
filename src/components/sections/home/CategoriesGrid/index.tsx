'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const CATEGORIES = [
  { key: 'daily', slug: 'nutricion-diaria', icon: '/assets/images/service/npc-home-packages-1.png', img: '/assets/images/resource/Nutricion_Diaria.png'},
  { key: 'specialized', slug: 'nutricion-especializada', icon: '/assets/images/service/service-2.png', img: '/assets/images/resource/Nutricion_Especializada.png' },
  { key: 'clinical', slug: 'nutricion-clinica', icon:'', img: '/assets/images/resource/Nutricion_clinica.png' },
  { key: 'treats', slug: 'premios-funcionales', icon:'', img: '/assets/images/resource/Premios_Funcionales.png' },
  { key: 'supplements', slug: 'suplementos', icon: '/assets/images/service/service-5.png', img: '/assets/images/service/service-2.jpg' },
  { key: 'wet', slug: 'alimentos-humedos', icon: '/assets/images/service/service-6.png', img: '/assets/images/resource/Humedos.png' },
] as const;

export default function CategoriesGrid() {
  const t = useTranslations('home.categories');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="service-section p_relative">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />
      <div className="auto-container">
        <div className="sec-title mb_60">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="row clearfix">
          {CATEGORIES.map(({ key, slug, icon, img }) => (
            <div key={slug} className="col-lg-4 col-md-6 col-sm-12">
              <div className="service-block-one">
                <div className="inner-box">
                  <figure className="image-box">
                    <Image src={img} alt={t(key)} width={416} height={358} />
                  </figure>
                  <div className="lower-content">
                    <div className="inner">
                      <div className="icon-box">
                        <Image src={icon} alt="" width={90} height={90} />
                      </div>
                      <h3>
                        <Link href={`/${lang}/nutricion-canina/${slug}`}>{t(key)}</Link>
                      </h3>
                      <p>{t(`${key}Desc`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
