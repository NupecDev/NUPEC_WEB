'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FeedingRow = {
  label: string;
  weightKg: number;
  gramsPerDay: number;
  mealsPerDay?: number;
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
  const [weightKg, setWeightKg] = useState<number>(10);

  if (!feedingGuide || !feedingGuide.rows || feedingGuide.rows.length === 0) return null;

  const { rows, notes } = feedingGuide;

  // Find closest row for live calculator
  const sortedRows = [...rows].sort((a, b) => a.weightKg - b.weightKg);
  const closest = sortedRows.reduce((prev, curr) =>
    Math.abs(curr.weightKg - weightKg) < Math.abs(prev.weightKg - weightKg) ? curr : prev
  );
  const maxWeight = sortedRows[sortedRows.length - 1].weightKg;

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

        <div className="row clearfix">
          {/* Left: feeding table */}
          <div className="col-lg-7 col-md-12 col-sm-12 wow fadeInLeft">
            <div className="sp-feeding-guide__table-wrap">
              <table className="sp-feeding-guide__table">
                <thead>
                  <tr>
                    <th>{t('colLabel')}</th>
                    <th>{t('colWeight')}</th>
                    <th>{t('colGrams')}</th>
                    {rows.some((r) => r.mealsPerDay) && <th>{t('colMeals')}</th>}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.label}</td>
                      <td>{row.weightKg} kg</td>
                      <td>
                        <span className="sp-feeding-guide__grams" style={{ color: accentColor }}>
                          {row.gramsPerDay}
                        </span>{' '}
                        g
                      </td>
                      {rows.some((r) => r.mealsPerDay) && (
                        <td>{row.mealsPerDay ? `${row.mealsPerDay} ${t('meals')}` : '—'}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {notes && (
                <p className="sp-feeding-guide__notes mt_20">{notes}</p>
              )}
            </div>
          </div>

          {/* Right: interactive calculator */}
          <div className="col-lg-5 col-md-12 col-sm-12 wow fadeInRight">
            <div className="sp-feeding-guide__calc" style={{ borderColor: accentColor }}>
              <h4 className="sp-feeding-guide__calc-title" style={{ color: accentColor }}>
                {t('calcTitle')}
              </h4>
              <p className="sp-feeding-guide__calc-desc">{t('calcDesc')}</p>

              <div className="sp-feeding-guide__calc-slider mt_20">
                <label className="sp-feeding-guide__calc-label">
                  {t('weight')}: <strong style={{ color: accentColor }}>{weightKg} kg</strong>
                </label>
                <input
                  type="range"
                  min={1}
                  max={maxWeight}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="sp-feeding-guide__calc-range"
                  style={{ accentColor }}
                />
              </div>

              <div className="sp-feeding-guide__calc-result mt_20">
                <div className="sp-feeding-guide__calc-num" style={{ color: accentColor }}>
                  {closest.gramsPerDay}
                  <span className="sp-feeding-guide__calc-unit">g</span>
                </div>
                <p className="sp-feeding-guide__calc-per">{t('perDay')}</p>
                {closest.mealsPerDay && (
                  <p className="sp-feeding-guide__calc-meals">
                    {closest.mealsPerDay} {t('meals')} / {t('day')}
                  </p>
                )}
                <p className="sp-feeding-guide__calc-ref">
                  {t('reference')}: {closest.label} ({closest.weightKg} kg)
                </p>
              </div>

              <p className="sp-feeding-guide__calc-disclaimer mt_15">
                {t('disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
