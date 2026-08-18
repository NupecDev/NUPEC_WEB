'use client';

import { useTranslations } from 'next-intl';

type TransitionStep = {
  label: string;
  newPercent: number;
};

export type TransitionGuideData = {
  title?: string;
  subtitle?: string;
  steps?: TransitionStep[];
  noteBold?: string;
  noteText?: string;
};

export default function ClinicalTransitionGuide({
  data,
  accentColor = '#C4262E',
}: {
  data?: TransitionGuideData | null;
  accentColor?: string;
}) {
  const t = useTranslations('clinical.transition');

  if (!data?.steps || data.steps.length === 0) return null;

  const { title, subtitle, steps, noteBold, noteText } = data;

  return (
    <section className="clin-transition p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: '#fff' }} />
            <div>
              <span className="clin-transition__eyebrow">{title || t('title')}</span>
              <p className="clin-transition__sub">{subtitle || t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Step cards */}
        <div className="clin-transition__steps">
          {steps.map(({ label, newPercent }, i) => {
            const prevPercent = 100 - newPercent;
            return (
              <div
                key={`${label}-${i}`}
                className={`clin-transition__step${i === steps.length - 1 ? ' clin-transition__step--final' : ''}`}
                style={i === steps.length - 1 ? { borderColor: accentColor } : undefined}
              >
                <div className="clin-transition__step-label">{label}</div>

                {/* Pie chart */}
                <div
                  className="clin-transition__pie"
                  style={{
                    background: `conic-gradient(${accentColor} 0% ${newPercent}%, rgba(255,255,255,0.3) ${newPercent}% 100%)`,
                  }}
                />

                {/* Legend */}
                <div className="clin-transition__legend">
                  <span className="clin-transition__legend-item">
                    <span className="clin-transition__dot clin-transition__dot--prev" />
                    {prevPercent}% {t('labelPrev')}
                  </span>
                  <span className="clin-transition__legend-item clin-transition__legend-item--clin">
                    <span className="clin-transition__dot clin-transition__dot--clin" style={{ background: accentColor }} />
                    {newPercent}% {t('labelClin')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical note */}
        {(noteBold || noteText || t('noteText')) && (
          <div className="clin-transition__note" style={{ borderLeftColor: accentColor }}>
            <div className="clin-transition__note-icon" style={{ background: accentColor }}>i</div>
            <div className="clin-transition__note-text">
              <strong>{noteBold || t('noteBold')} </strong>
              {noteText || t('noteText')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
