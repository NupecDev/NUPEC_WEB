'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Hero() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="banner-section p_relative">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-3.png)' }}
      />
      <div className="slide-item p_relative">
        <div className="pattern-layer">
          <div className="pattern-1" style={{ backgroundImage: 'url(/assets/images/shape/shape-1.png)' }} />
          <div className="pattern-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-2.png)' }} />
        </div>
        <div className="shape-layer">
          <div className="shape-1 float-bob-y" style={{ backgroundImage: 'url(/assets/images/shape/shape-3.png)' }} />
          <div className="shape-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-4.png)' }} />
          <div className="shape-3" style={{ backgroundImage: 'url(/assets/images/shape/shape-5.png)' }} />
          <div className="shape-4" style={{ backgroundImage: 'url(/assets/images/shape/shape-6.png)' }} />
        </div>

        <div className="auto-container">
          <div className="content-box p_relative d_block z_5">
            <span className="title-text p_relative d_block">{t('subtitle')}</span>
            <h2 className="p_relative d_block">{t('title')}</h2>
            <p>{t('description')}</p>
            <div className="btn-box">
              <Link href={`/${lang}/nutricion-canina`} className="theme-btn btn-two">
                <span>{t('cta')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="image-box">
          <figure className="image">
            <Image
              src="/assets/images/banner/banner-img-1.png"
              alt="NUPEC"
              width={711}
              height={700}
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
