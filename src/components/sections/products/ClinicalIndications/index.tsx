'use client';

import { useTranslations } from 'next-intl';

export type ClinicalIndicationItem = {
  label: string;
  icon?: string;
};

type Props = {
  indications: ClinicalIndicationItem[];
  accentColor?: string;
};

const CLINICAL_RED = '#C4262E';

export default function ClinicalIndications({ indications, accentColor = CLINICAL_RED }: Props) {
  const t = useTranslations('clinicalProduct.indications');

  if (!indications || indications.length === 0) return null;

  return (
    <section className="clin-indications p_relative pb_60">
      <div className="auto-container">
        <div className="clin-indications__inner">
          {/* Label strip */}
          <div className="clin-indications__header clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
            <span className="clin-indications__eyebrow" style={{ color: accentColor }}>
              {t('title')}
            </span>
          </div>

          {/* Indication pills */}
          <ul className="clin-indications__list">
            {indications.map((item, i) => (
              <li key={i} className="clin-indications__item">
                <span className="clin-indications__check" style={{ color: accentColor }}>✓</span>
                <span className="clin-indications__label">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Rx badge */}
          <div className="clin-indications__rx" style={{ borderColor: accentColor, color: accentColor }}>
            <span className="clin-indications__rx-symbol">Rx</span>
            <span className="clin-indications__rx-text">{t('rxNote')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
