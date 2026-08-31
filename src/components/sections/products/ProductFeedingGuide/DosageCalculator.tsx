'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

export type FeedingRow = {
  label?: string;
  weightRange: string;
  dailyAmount: string;
  weightMin?: number;
  weightMax?: number;
  amountMin?: number;
  amountMax?: number;
};

export type FeedingVariant = {
  label: string;
  rows: FeedingRow[];
};

export function interpolateAmount(rows: FeedingRow[], weight: number): number | null {
  const usable = rows.filter(
    (r) => typeof r.weightMin === 'number' && typeof r.amountMin === 'number' && typeof r.amountMax === 'number'
  );
  if (!usable.length) return null;

  const sorted = [...usable].sort((a, b) => a.weightMin! - b.weightMin!);

  const match =
    sorted.find(
      (r) => weight >= r.weightMin! && (typeof r.weightMax !== 'number' || weight <= r.weightMax)
    ) ?? (weight < sorted[0].weightMin! ? sorted[0] : sorted[sorted.length - 1]);

  if (typeof match.weightMax !== 'number' || match.weightMax === match.weightMin) {
    return Math.round((match.amountMin! + match.amountMax!) / 2);
  }

  const ratio = Math.min(Math.max((weight - match.weightMin!) / (match.weightMax - match.weightMin!), 0), 1);
  return Math.round(match.amountMin! + (match.amountMax! - match.amountMin!) * ratio);
}

export function hasCalculatorData(rows?: FeedingRow[]): boolean {
  return !!rows?.some((r) => typeof r.weightMin === 'number');
}

export default function DosageCalculator({
  rows,
  variants,
  accentColor,
  translationNamespace = 'productPage.feedingGuide',
  species,
}: {
  rows: FeedingRow[];
  variants?: FeedingVariant[];
  accentColor: string;
  translationNamespace?: string;
  species?: 'canino' | 'felino';
}) {
  const t = useTranslations(translationNamespace);
  const calcDesc = species === 'felino' ? t('calcDescFeline') : t('calcDesc');

  const numericRows = rows.filter(
    (r) => typeof r.weightMin === 'number' && typeof r.amountMin === 'number' && typeof r.amountMax === 'number'
  );

  const variantOptions = useMemo(
    () => [
      { label: t('variantDefault'), rows: numericRows },
      ...(variants ?? [])
        .filter((v) => v.rows?.some((r) => typeof r.weightMin === 'number'))
        .map((v) => ({ label: v.label, rows: v.rows })),
    ],
    [numericRows, variants, t]
  );

  const [variantIndex, setVariantIndex] = useState(0);
  const [weight, setWeight] = useState(() =>
    numericRows.length ? Math.min(...numericRows.map((r) => r.weightMin!)) : 0
  );

  if (!numericRows.length) return null;

  const currentRows = variantOptions[variantIndex]?.rows ?? numericRows;
  const currentMin = Math.min(...currentRows.map((r) => r.weightMin!));
  const currentMax = Math.max(...currentRows.map((r) => r.weightMax ?? r.weightMin!));
  const clampedWeight = Math.min(Math.max(weight, currentMin), currentMax);
  const amount = interpolateAmount(currentRows, clampedWeight);

  return (
    <div className="sp-feeding-guide__calc mt_40" style={{ borderColor: accentColor, color: accentColor }}>
      <div className="sp-feeding-guide__calc-title" style={{ color: accentColor }}>
        {t('calcTitle')}
      </div>
      <p className="sp-feeding-guide__calc-desc mb_20">{calcDesc}</p>

      {variantOptions.length > 1 && (
        <div className="mb_20">
          <label className="sp-feeding-guide__calc-label" htmlFor="dosage-variant">
            {t('variantLabel')}
          </label>
          <select
            id="dosage-variant"
            className="sp-feeding-guide__calc-select"
            value={variantIndex}
            onChange={(e) => setVariantIndex(Number(e.target.value))}
          >
            {variantOptions.map((opt, i) => (
              <option key={i} value={i}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="sp-feeding-guide__calc-label" htmlFor="dosage-weight">
        {t('weight')}: {clampedWeight} kg
      </label>
      <input
        id="dosage-weight"
        type="range"
        className="sp-feeding-guide__calc-range"
        min={currentMin}
        max={currentMax}
        step={0.5}
        value={clampedWeight}
        onChange={(e) => setWeight(Number(e.target.value))}
        style={{ color: accentColor, accentColor }}
      />

      <div className="sp-feeding-guide__calc-result mt_20">
        <span className="sp-feeding-guide__calc-num" style={{ color: accentColor }}>
          {amount ?? '—'}
        </span>
        <span className="sp-feeding-guide__calc-unit">g</span>
        <p className="sp-feeding-guide__calc-per">{t('perDay')}</p>
        <p className="sp-feeding-guide__calc-ref">{t('reference')}</p>
      </div>

      <p className="sp-feeding-guide__calc-disclaimer mt_20">{t('disclaimer')}</p>
    </div>
  );
}
