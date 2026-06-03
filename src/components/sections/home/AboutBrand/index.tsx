'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ITEMS = [
  { numKey: 'r01', titleKey: 't01', descKey: 'd01', linkKey: 'l01', href: '/nosotros' },
  { numKey: 'r02', titleKey: 't02', descKey: 'd02', linkKey: 'l02', href: '/nosotros' },
  { numKey: 'r03', titleKey: 't03', descKey: 'd03', linkKey: 'l03', href: '/nosotros' },
] as const;

export default function AboutBrand() {
  const t = useTranslations('home.science');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="about-section sec-pad p_relative">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-8.png)' }}
      />
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          {/* Left: numbered items */}
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-block-one">
              <div className="content-box">
                <div className="sec-title mb_30">
                  <span className="sub-title mb_5">{t('subtitle')}</span>
                  <h2>{t('title')}</h2>
                  <p>{t('description')}</p>
                </div>

                {ITEMS.map(({ numKey, titleKey, descKey, linkKey, href }) => (
                  <div key={numKey} className="working-block-one mb_25">
                    <div className="inner-box" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <div style={{ minWidth: '48px' }}>
                        <span style={{ fontSize: '32px', fontWeight: 700, color: '#1a5fa8', lineHeight: 1 }}>{t(numKey)}</span>
                      </div>
                      <div>
                        <h4 style={{ marginBottom: '8px' }}>{t(titleKey)}</h4>
                        <p style={{ marginBottom: '8px' }}>{t(descKey)}</p>
                        <Link href={`/${lang}${href}`} style={{ color: '#1a5fa8', fontWeight: 600, textDecoration: 'none' }}>
                          {t(linkKey)} <i className="icon-22" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image + badge */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-block-one">
              <div className="image-box p_relative">
                <div className="shape">
                  <div className="shape-1" style={{ backgroundImage: 'url(/assets/images/shape/shape-9.png)' }} />
                  <div className="shape-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-10.png)' }} />
                </div>
                <figure className="image">
                  <Image
                    src="/assets/images/resource/about-1.jpg"
                    alt="Equipo científico NUPEC"
                    width={523}
                    height={399}
                    priority
                  />
                </figure>
                <div className="text-box">
                  <div
                    className="image-shape"
                    style={{ backgroundImage: 'url(/assets/images/shape/shape-7.png)' }}
                  />
                  <h2>{t('years')}</h2>
                  <span>{t('yearsLabel')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
