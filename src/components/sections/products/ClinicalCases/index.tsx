'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  PortableText,
  type PortableTextBlock,
} from 'next-sanity';

export type ClinicalMetric = {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
};

export type ClinicalCaseData = {
  _id: string;
  title: string;
  diagnosis: string;
  patient?: {
    species?: string;
    breed?: string;
    age?: string;
    weight?: string;
    sex?: string;
  };
  history?: PortableTextBlock[];
  intervention?: PortableTextBlock[];
  duration?: string;
  outcome?: PortableTextBlock[];
  metrics?: ClinicalMetric[];
  author?: {
    name?: string;
    title?: string;
    institution?: string;
  };
};

type Props = {
  cases: ClinicalCaseData[];
  productName: string;
  accentColor?: string;
};

const TREND_SYMBOL: Record<string, string> = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

function CaseArticle({ caseData, index, accentColor, t }: {
  caseData: ClinicalCaseData;
  index: number;
  accentColor: string;
  t: ReturnType<typeof useTranslations<'clinicalProduct.cases'>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="clin-case__article">
      {/* Header — always visible, click to expand */}
      <header
        className={`clin-case__article-header${open ? ' clin-case__article-header--open' : ''}`}
        style={{ borderLeftColor: accentColor }}
        onClick={() => setOpen((v) => !v)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
        <span className="clin-case__article-num" style={{ color: accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="clin-case__header-content">
          <span className="clin-case__diagnosis" style={{ color: accentColor }}>
            {caseData.diagnosis}
          </span>
          <h3 className="clin-case__title">{caseData.title}</h3>

          {caseData.patient && (
            <div className="clin-case__patient-badges">
              {caseData.patient.species && (
                <span className="clin-case__badge">{caseData.patient.species}</span>
              )}
              {caseData.patient.breed && (
                <span className="clin-case__badge">{caseData.patient.breed}</span>
              )}
              {caseData.patient.age && (
                <span className="clin-case__badge">{caseData.patient.age}</span>
              )}
              {caseData.patient.weight && (
                <span className="clin-case__badge">{caseData.patient.weight}</span>
              )}
            </div>
          )}
        </div>

        <div className={`clin-case__toggle${open ? ' clin-case__toggle--open' : ''}`} style={{ color: accentColor }}>
          {open ? '−' : '+'}
        </div>
      </header>

      {/* Body — expandible */}
      {open && (
        <div className="clin-case__body">
          <div className="clin-case__body-grid">
            {caseData.history && (
              <div className="clin-case__section">
                <h4 className="clin-case__section-title" style={{ color: accentColor }}>
                  {t('historyTitle')}
                </h4>
                <div className="clin-case__rich">
                  <PortableText value={caseData.history} />
                </div>
              </div>
            )}

            {caseData.intervention && (
              <div className="clin-case__section">
                <h4 className="clin-case__section-title" style={{ color: accentColor }}>
                  {t('interventionTitle')}
                </h4>
                {caseData.duration && (
                  <p className="clin-case__duration">
                    <strong>{t('duration')}:</strong> {caseData.duration}
                  </p>
                )}
                <div className="clin-case__rich">
                  <PortableText value={caseData.intervention} />
                </div>
              </div>
            )}

            {caseData.outcome && (
              <div className="clin-case__section clin-case__section--outcome">
                <h4 className="clin-case__section-title" style={{ color: accentColor }}>
                  {t('outcomeTitle')}
                </h4>
                <div className="clin-case__rich">
                  <PortableText value={caseData.outcome} />
                </div>
              </div>
            )}
          </div>

          {caseData.metrics && caseData.metrics.length > 0 && (
            <div className="clin-case__all-metrics">
              {caseData.metrics.map((m, i) => (
                <div key={i} className="clin-case__metric clin-case__metric--full" style={{ borderColor: accentColor }}>
                  <span className="clin-case__metric-label">{m.label}</span>
                  <span className="clin-case__metric-value" style={{ color: accentColor }}>
                    {m.trend ? TREND_SYMBOL[m.trend] : ''}{m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {caseData.author?.name && (
            <div className="clin-case__author">
              <strong>{caseData.author.name}</strong>
              {caseData.author.title && <span> · {caseData.author.title}</span>}
              {caseData.author.institution && <span> · {caseData.author.institution}</span>}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function ClinicalCases({ cases, productName, accentColor = '#C4262E' }: Props) {
  const t = useTranslations('clinicalProduct.cases');
  const published = cases?.filter((c) => c) ?? [];

  if (published.length === 0) return null;

  return (
    <section className="clin-cases p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
            <div>
              <span className="section-eyebrow">{t('title', { name: productName })}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Case articles — all expanded for continuous reading */}
        <div className="clin-cases__list">
          {published.map((c, i) => (
            <CaseArticle key={c._id} caseData={c} index={i} accentColor={accentColor} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
