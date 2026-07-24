'use client';

import { useTranslations } from 'next-intl';

export type ClinicalFeedingRow = {
  label?: string;
  weightRange: string;
  dailyAmount: string;
};

type Props = {
  rows: ClinicalFeedingRow[];
  notes?: string;
  accentColor?: string;
};

const CLINICAL_RED = '#C4262E';

export default function ClinicalFeedingGuide({ rows, notes, accentColor = CLINICAL_RED }: Props) {
  const t = useTranslations('clinicalProduct.feedingGuide');

  if (!rows || rows.length === 0) return null;

  return (
    <section className="clin-feeding-guide p_relative pb_60 pt_60">
      <div className="auto-container">
        <div className="clin-indications__header clin-title-row mb_40">
          <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
          <span className="clin-indications__eyebrow" style={{ color: accentColor }}>
            {t('title')}
          </span>
        </div>

        <div className="clin-feeding-guide__table-wrap">
          <table className="clin-feeding-guide__table sp-feeding-guide__table">
            <thead>
              <tr>
                {rows.some((r) => r.label) && (
                  <th style={{ color: accentColor }}>{t('colLabel')}</th>
                )}
                <th style={{ color: accentColor }}>{t('colWeight')}</th>
                <th style={{ color: accentColor }}>{t('colAmount')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {rows.some((r) => r.label) && <td>{row.label ?? '—'}</td>}
                  <td>{row.weightRange}</td>
                  <td>
                    <span className="sp-feeding-guide__grams" style={{ color: accentColor }}>
                      {row.dailyAmount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notes && (
          <p className="sp-feeding-guide__notes mt_20">{notes}</p>
        )}

        <div className="clin-feeding-guide__rx-note mt_20" style={{ borderColor: accentColor, color: accentColor }}>
          {/* <span className="clin-indications__rx-symbol">Rx</span> */}
          <span className="clin-indications__rx-text">{t('rxNote')}</span>
        </div>
      </div>
    </section>
  );
}
