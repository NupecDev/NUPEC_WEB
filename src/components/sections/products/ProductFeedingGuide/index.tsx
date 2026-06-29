'use client';

import { useTranslations } from 'next-intl';

type FeedingRow = {
  label?: string;
  weightRange: string;
  dailyAmount: string;
};

type FeedingGuide = {
  rows: FeedingRow[];
  notes?: string;
};

type Props = {
  feedingGuide?: FeedingGuide | null;
  accentColor: string;
};

export default function ProductFeedingGuide({ feedingGuide, accentColor }: Props) {
  const t = useTranslations('productPage.feedingGuide');

  if (!feedingGuide || !feedingGuide.rows || feedingGuide.rows.length === 0) return null;

  const { rows, notes } = feedingGuide;
  const hasLabels = rows.some((r) => r.label);

  return (
    <section className="sp-feeding-guide p_relative pt_80 pb_80">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        <div className="sp-feeding-guide__table-wrap">
          <table className="sp-feeding-guide__table">
            <thead>
              <tr>
                {hasLabels && <th>{t('colLabel')}</th>}
                <th>{t('colWeight')}</th>
                <th>{t('colGrams')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {hasLabels && <td>{row.label ?? '—'}</td>}
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

          {notes && (
            <p className="sp-feeding-guide__notes mt_20">{notes}</p>
          )}
        </div>
      </div>
    </section>
  );
}
