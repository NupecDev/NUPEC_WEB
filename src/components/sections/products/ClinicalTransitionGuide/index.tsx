'use client';

import { useTranslations } from 'next-intl';

const STEPS = [
  { key: 'day12', prev: 75, clin: 25 },
  { key: 'day3',  prev: 50, clin: 50 },
  { key: 'day4',  prev: 25, clin: 75 },
  { key: 'day5',  prev: 10, clin: 90 },
  { key: 'day6',  prev: 0,  clin: 100 },
];

export default function ClinicalTransitionGuide({ accentColor = '#C4262E' }: { accentColor?: string }) {
  const t = useTranslations('clinical.transition');

  return (
    <section className="clin-transition p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: '#fff' }} />
            <div>
              <span className="clin-transition__eyebrow">{t('title')}</span>
              <p className="clin-transition__sub">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Step cards */}
        <div className="clin-transition__steps">
          {STEPS.map(({ key, prev, clin }, i) => (
            <div
              key={key}
              className={`clin-transition__step${i === STEPS.length - 1 ? ' clin-transition__step--final' : ''}`}
              style={i === STEPS.length - 1 ? { borderColor: accentColor } : undefined}
            >
              <div className="clin-transition__step-label">{t(key)}</div>

              {/* Progress bar */}
              <div className="clin-transition__bar">
                {prev > 0 && (
                  <div className="clin-transition__bar-prev" style={{ width: `${prev}%` }} />
                )}
                {clin > 0 && (
                  <div className="clin-transition__bar-clin" style={{ width: `${clin}%`, background: accentColor }} />
                )}
              </div>

              {/* Legend */}
              <div className="clin-transition__legend">
                <span className="clin-transition__legend-item">
                  <span className="clin-transition__dot clin-transition__dot--prev" />
                  {prev}% {t('labelPrev')}
                </span>
                <span className="clin-transition__legend-item clin-transition__legend-item--clin">
                  <span className="clin-transition__dot clin-transition__dot--clin" style={{ background: accentColor }} />
                  {clin}% {t('labelClin')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical note */}
        <div className="clin-transition__note" style={{ borderLeftColor: accentColor }}>
          <div className="clin-transition__note-icon" style={{ background: accentColor }}>i</div>
          <div className="clin-transition__note-text">
            <strong>{t('noteBold')} </strong>
            {t('noteText')}
          </div>
        </div>
      </div>
    </section>
  );
}
