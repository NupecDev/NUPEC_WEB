'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function AboutHero() {
  const t = useTranslations('nosotros.hero');
  const params = useParams();
  const lang = params.lang as string;

  return (
    /*
      Mismo patrón que BannerHeroes: banner-section p_relative con bg-layer full-bleed.
      Reutiliza el asset de about ya presente en el template en vez de subir uno nuevo.
    */
    <section className="banner-section about-hero p_relative">
      <div
        className="bg-layer"
        style={{ backgroundImage: 'url(/assets/images/resource/about-3.jpg)' }}
      />
      <div className="about-hero__overlay" />

      <div className="auto-container">
        <div className="content-box p_relative z_5">
          <span className="title-text p_relative d_block">{t('eyebrow')}</span>
          <h2 className="p_relative d_block">{t('title')}</h2>
          <p>{t('description')}</p>
          <div className="btn-box mt_30">
            <Link href={`/${lang}/nutricion-canina`} className="theme-btn btn-two">
              <span>{t('cta')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
