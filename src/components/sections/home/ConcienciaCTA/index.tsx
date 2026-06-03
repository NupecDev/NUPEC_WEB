'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function ConcienciaCTA() {
  const t = useTranslations('home.cta');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="cta-section p_relative" style={{ overflow: 'hidden' }}>
      <div className="row clearfix" style={{ margin: 0 }}>
        {/* Left: image with overlay */}
        <div
          className="col-lg-6 col-md-12"
          style={{
            minHeight: '360px',
            background: `url(/assets/images/resource/about-1.jpg) center/cover no-repeat`,
            position: 'relative',
            padding: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 40, 80, 0.55)',
            }}
          />
        </div>

        {/* Right: blue panel */}
        <div
          className="col-lg-6 col-md-12"
          style={{
            background: '#1a5fa8',
            padding: '60px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span
            className="sub-title"
            style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '12px', display: 'block' }}
          >
            {t('subtitle')}
          </span>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>{t('title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>{t('description')}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href={`/${lang}/conciencia`} className="theme-btn btn-two" style={{ borderColor: '#fff', color: '#fff' }}>
              <span>{t('button')}</span>
            </Link>
            <Link href={`/${lang}/contacto`} className="theme-btn btn-two" style={{ borderColor: '#fff', color: '#fff' }}>
              <span>{t('buttonTwo')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
