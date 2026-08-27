'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const VIDEOS = [
  { key: 'featured', id: 'cNdljAs3lMA', tag: 'NUPEC' },
  { key: 'article1', id: 'IgXe6gv4qhs', tag: 'Senior' },
  { key: 'article2', id: '2_3ckKTz64M', tag: 'Adulto' },
  { key: 'article3', id: 'E3s2jEjIOMI', tag: 'Cachorro' },
  { key: 'article4', id: 'pXSwVJT7vDw', tag: 'Nutrición' },
] as const;

export default function VideoSection() {
  const t = useTranslations('home.video');
  const [activeIndex, setActiveIndex] = useState(0);

  const active = VIDEOS[activeIndex];
  const sidebarVideos = VIDEOS.filter((_, index) => index !== activeIndex);

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
            <a
              href="https://www.youtube.com/@nupec_mx"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn btn-two"
            >
              <span>{t('viewAll')}</span>
            </a>
          </div>
        </div>

        {/* Content: main video + sidebar */}
        <div className="row clearfix">
          {/* Main video */}
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="video-main p_relative" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  key={active.id}
                  src={`https://www.youtube.com/embed/${active.id}`}
                  title={t(active.key)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <div className="mt_15">
                <span className="sub-title" style={{ fontSize: '12px' }}>{t('featuredLabel')}</span>
                <h4 style={{ marginTop: '4px' }}>{t(active.key)}</h4>
              </div>
            </div>
          </div>

          {/* Sidebar videos */}
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="video-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sidebarVideos.map((video) => {
                const originalIndex = VIDEOS.indexOf(video);
                return (
                  <button
                    key={video.key}
                    type="button"
                    onClick={() => setActiveIndex(originalIndex)}
                    className="news-block-one"
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        minWidth: '130px',
                        height: '80px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        backgroundImage: `url(https://img.youtube.com/vi/${video.id}/mqdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,0,0,0.25)',
                        }}
                      >
                        <i className="icon-59" style={{ fontSize: '18px', color: '#fff' }} />
                      </span>
                    </div>
                    <div>
                      <span className="sub-title" style={{ fontSize: '11px', textTransform: 'uppercase', background: '#1a5fa8', color: '#fff', padding: '2px 8px', borderRadius: '3px', display: 'inline-block', marginBottom: '6px' }}>{video.tag}</span>
                      <h3 style={{ fontSize: '17px', lineHeight: '1.4', margin: 0 }}>{t(video.key)}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
