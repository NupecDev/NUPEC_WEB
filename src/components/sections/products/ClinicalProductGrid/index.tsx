'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type ClinicalProduct = {
  key: string;
  color: string;
  rxBadge: boolean;
};

const CLINICAL_PRODUCTS: ClinicalProduct[] = [
  { key: 'hepatic',       color: '#5C3317', rxBadge: true },
  { key: 'acuteHepatic',  color: '#B35A00', rxBadge: true },
  { key: 'cardiac',       color: '#8B1A1A', rxBadge: true },
  { key: 'hypoallergenic',color: '#4A6741', rxBadge: true },
];

type Props = {
  lang: string;
  categorySlug: string;
  species: 'canino' | 'felino';
};

export default function ClinicalProductGrid({ lang, categorySlug, species }: Props) {
  const t = useTranslations('clinical.grid');
  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';

  return (
    <section id="productos" className="clin-grid p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: '#0085CA' }} />
            <div>
              <span className="section-eyebrow">{t('title')}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="clin-grid__cards">
          {CLINICAL_PRODUCTS.map(({ key, color }) => (
            <article
              key={key}
              className="clin-grid__card"
              style={{ background: color }}
            >
              {/* Rx badge */}
              <div className="clin-grid__rx-badge" style={{ color }}>
                {t('rxLabel')}
              </div>

              {/* Bag placeholder */}
              <div className="clin-grid__bag" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                <div className="clin-grid__bag-brand">NUPEC</div>
                <div className="clin-grid__bag-circle" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.7)' }}>
                  <span>{t(`${key}Name`)}</span>
                </div>
              </div>

              {/* Name + pathology */}
              <div className="clin-grid__meta">
                <h3 className="clin-grid__name">{t(`${key}Name`)}</h3>
                <p className="clin-grid__patho">{t(`${key}Patho`)}</p>
              </div>

              <div className="clin-grid__divider" />

              {/* Bullets */}
              <ul className="clin-grid__bullets">
                {([1, 2, 3] as const).map((n) => (
                  <li key={n}>{t(`${key}B${n}`)}</li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/${lang}/${speciesBase}/${categorySlug}/${key.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                className="clin-grid__cta"
              >
                {t('viewCard')} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
