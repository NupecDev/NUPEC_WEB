'use client';

import { useTranslations } from 'next-intl';

export type ProblemSolutionItem = {
  problem: string;
  solution: string;
};

type Props = {
  items: ProblemSolutionItem[];
  accentColor?: string;
};

const CLINICAL_RED = '#C4262E';

export default function ClinicalProblemSolution({ items, accentColor = CLINICAL_RED }: Props) {
  const t = useTranslations('clinicalProduct.problemSolution');

  if (!items || items.length === 0) return null;

  return (
    <section className="clin-ps p_relative pt_60 pb_60">
      <div className="auto-container">
        {/* Header */}
        <div className="clin-ps__header clin-title-row mb_50">
          <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
          <span className="clin-ps__eyebrow" style={{ color: accentColor }}>
            {t('title')}
          </span>
        </div>

        {/* Column headers */}
        <div className="clin-ps__cols-header">
          <div className="clin-ps__col-header clin-ps__col-header--problem">{t('problemLabel')}</div>
          <div className="clin-ps__col-header clin-ps__col-header--solution" style={{ background: accentColor }}>
            {t('solutionLabel')}
          </div>
        </div>

        {/* Rows */}
        <div className="clin-ps__rows">
          {items.map((item, i) => (
            <div key={i} className="clin-ps__row wow fadeInUp" data-wow-delay={`${i * 80}ms`}>
              <div className="clin-ps__cell clin-ps__cell--problem">
                <p>{item.problem}</p>
              </div>
              <span className="clin-ps__check" style={{ borderColor: accentColor, color: accentColor }}>✓</span>
              <div className="clin-ps__cell clin-ps__cell--solution">
                <p>{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
