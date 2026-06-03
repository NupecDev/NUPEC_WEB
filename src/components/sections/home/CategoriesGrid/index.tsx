'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const CATEGORIES = [
  { key: 'daily', slug: 'nutricion-diaria', icon: 'icon-18', img: '/assets/images/service/service-1.jpg' },
  { key: 'specialized', slug: 'nutricion-especializada', icon: 'icon-19', img: '/assets/images/service/service-2.jpg' },
  { key: 'clinical', slug: 'nutricion-clinica', icon: 'icon-20', img: '/assets/images/service/service-3.jpg' },
  { key: 'treats', slug: 'premios-funcionales', icon: 'icon-18', img: '/assets/images/service/service-1.jpg' },
  { key: 'supplements', slug: 'suplementos', icon: 'icon-19', img: '/assets/images/service/service-2.jpg' },
  { key: 'wet', slug: 'alimentos-humedos', icon: 'icon-20', img: '/assets/images/service/service-3.jpg' },
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
                        <i className={icon} />
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
