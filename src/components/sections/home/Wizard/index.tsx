'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type Species = 'dog' | 'cat';

export default function Wizard() {
  const t = useTranslations('home.wizard');
  const params = useParams();
  const lang = params.lang as string;

  const [selected, setSelected] = useState<Species>('dog');

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
                  <p>{t('description')}</p>
                </div>
                <div className="btn-box" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link href={`/${lang}/encuentra-tu-alimento`} className="theme-btn btn-one">
                    <span>{t('ctaPrimary')}</span>
                  </Link>
                  <Link
                    href={`/${lang}/${selected === 'dog' ? 'nutricion-canina' : 'nutricion-felina'}`}
                    className="theme-btn btn-two"
                  >
                    <span>{t('ctaSecondary')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: species toggle */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f5f9ff', borderRadius: '12px' }}>
              <p className="sub-title mb_20" style={{ marginBottom: '24px' }}>{t('selectSpecies')}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                  type="button"
                  onClick={() => setSelected('dog')}
                  className={selected === 'dog' ? 'theme-btn btn-one' : 'theme-btn btn-two'}
                  style={{ minWidth: '120px' }}
                >
                  <span>{t('dog')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelected('cat')}
                  className={selected === 'cat' ? 'theme-btn btn-one' : 'theme-btn btn-two'}
                  style={{ minWidth: '120px' }}
                >
                  <span>{t('cat')}</span>
                </button>
              </div>
              <div style={{ marginTop: '32px', fontSize: '48px' }}>
                {selected === 'dog' ? '🐕' : '🐈'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
