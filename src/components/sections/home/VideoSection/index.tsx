'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const YT_PLACEHOLDER = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

const SIDEBAR_ARTICLES = [
  { key: 'article1', tag: 'Ciencia' },
  { key: 'article2', tag: 'Nutrición' },
  { key: 'article3', tag: 'Clínica' },
] as const;

export default function VideoSection() {
  const t = useTranslations('home.video');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="chooseus-section sec-pad p_relative" style={{ background: '#f5f9ff' }}>
      <div className="auto-container">
        {/* Header bar */}
        <div className="row clearfix align-items-center mb_40">
          <div className="col-lg-8 col-md-12">
            <div className="sec-title">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 text-right">
            <Link href={`/${lang}/blog`} className="theme-btn btn-two">
              <span>{t('viewAll')}</span>
            </Link>
          </div>
        </div>

        {/* Content: main video + sidebar */}
        <div className="row clearfix">
          {/* Main video */}
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="video-main p_relative" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={YT_PLACEHOLDER}
                  title={t('featured')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <div className="mt_15">
                <span className="sub-title" style={{ fontSize: '12px' }}>{t('featuredLabel')}</span>
                <h4 style={{ marginTop: '4px' }}>{t('featured')}</h4>
              </div>
            </div>
          </div>

          {/* Sidebar articles */}
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="video-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SIDEBAR_ARTICLES.map(({ key, tag }) => (
                <div key={key} className="news-block-one" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '80px', height: '60px', background: '#e0eaf5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="icon-59" style={{ fontSize: '20px', color: '#1a5fa8' }} />
                  </div>
                  <div>
                    <span className="sub-title" style={{ fontSize: '11px', textTransform: 'uppercase', background: '#1a5fa8', color: '#fff', padding: '2px 8px', borderRadius: '3px', display: 'inline-block', marginBottom: '6px' }}>{tag}</span>
                    <h6 style={{ fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
                      <Link href={`/${lang}/blog`}>{t(key)}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
