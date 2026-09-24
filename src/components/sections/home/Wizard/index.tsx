'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { withBrandMark } from '@/components/ui/BrandText';

export default function Wizard() {
  const t = useTranslations('home.wizard');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="about-section sec-pad p_relative" style={{ background: '#fff' }}>
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          {/* Left: text + CTAs */}
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-block-one">
              <div className="content-box">
                <div className="sec-title mb_15">
                  <h2>{t('title')}</h2>
                </div>
                <div className="text-box mb_30 pb_30">
                  <p>{withBrandMark(t('description'))}</p>
                </div>
                <div className="btn-box" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link href={`/${lang}/encuentra-tu-alimento`} className="theme-btn btn-one">
                    <span>{t('ctaPrimary')}</span>
                  </Link>
                  <Link href={`/${lang}/nutricion-canina`} className="theme-btn btn-two">
                    <span>{t('ctaSecondary')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: breeds image */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <figure className="image">
              <Image
                src="/assets/images/resource/WizzardBreeds.png"
                alt={t('imageAlt')}
                width={1408}
                height={768}
                sizes="(max-width: 991px) 100vw, 50vw"
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
