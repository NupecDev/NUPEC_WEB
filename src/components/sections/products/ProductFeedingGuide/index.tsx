'use client';

import { Fragment, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

type FeedingRow = {
  label?: string;
  weightRange: string;
  dailyAmount: string;
  weightMin?: number;
  weightMax?: number;
  amountMin?: number;
  amountMax?: number;
};

type FeedingVariant = {
  label: string;
  rows: FeedingRow[];
};

type SecondaryCellValue = {
  grams?: string;
  cups?: string;
};

type SecondarySubColumn = {
  label?: string;
};

type SecondaryColumnGroup = {
  label?: string;
  subColumns?: SecondarySubColumn[];
};

type SecondaryTableRow = {
  weightLabel: string;
  values?: SecondaryCellValue[];
};

type FeedingGuide = {
  rows: FeedingRow[];
  notes?: string;
  secondaryTitle?: string;
  secondaryWeightColumnLabel?: string;
  secondaryColumnGroups?: SecondaryColumnGroup[];
  secondaryTableRows?: SecondaryTableRow[];
  secondaryNotes?: string;
  variants?: FeedingVariant[];
};

function interpolateAmount(rows: FeedingRow[], weight: number): number | null {
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

function DosageCalculator({
  rows,
  variants,
  accentColor,
}: {
  rows: FeedingRow[];
  variants?: FeedingVariant[];
  accentColor: string;
}) {
  const t = useTranslations('productPage.feedingGuide');

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
      <p className="sp-feeding-guide__calc-desc mb_20">{t('calcDesc')}</p>

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

type Props = {
  feedingGuide?: FeedingGuide | null;
  accentColor: string;
};

function FeedingTable({
  rows,
  notes,
  accentColor,
  colLabel,
  colWeight,
  colGrams,
}: {
  rows: FeedingRow[];
  notes?: string;
  accentColor: string;
  colLabel: string;
  colWeight: string;
  colGrams: string;
}) {
  const hasLabels = rows.some((r) => r.label);

  return (
    <div className="sp-feeding-guide__table-wrap">
      <table className="sp-feeding-guide__table">
        <thead>
          <tr>
            {hasLabels && <th>{colLabel}</th>}
            <th>{colWeight}</th>
            <th>{colGrams}</th>
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

      {notes && <p className="sp-feeding-guide__notes mt_20">{notes}</p>}
    </div>
  );
}

function GroupedFeedingTable({
  weightColumnLabel,
  columnGroups,
  tableRows,
  notes,
  accentColor,
  gramsLabel,
  cupsLabel,
}: {
  weightColumnLabel: string;
  columnGroups: SecondaryColumnGroup[];
  tableRows: SecondaryTableRow[];
  notes?: string;
  accentColor: string;
  gramsLabel: string;
  cupsLabel: string;
}) {
  return (
    <div className="sp-feeding-guide__table-wrap">
      <table className="sp-feeding-guide__table sp-feeding-guide__table--grouped">
        <thead>
          <tr>
            <th rowSpan={3}>{weightColumnLabel}</th>
            {columnGroups.map((group, gi) => (
              <th key={gi} colSpan={(group.subColumns?.length ?? 1) * 2}>
                {group.label}
              </th>
            ))}
          </tr>
          <tr>
            {columnGroups.map((group, gi) =>
              (group.subColumns ?? []).map((sub, si) => (
                <th key={`${gi}-${si}`} colSpan={2}>
                  {sub.label}
                </th>
              ))
            )}
          </tr>
          <tr>
            {columnGroups.map((group, gi) =>
              (group.subColumns ?? []).map((_, si) => (
                <Fragment key={`${gi}-${si}`}>
                  <th className="sp-feeding-guide__unit-col">{gramsLabel}</th>
                  <th className="sp-feeding-guide__unit-col">{cupsLabel}</th>
                </Fragment>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, ri) => (
            <tr key={ri}>
              <td>{row.weightLabel}</td>
              {(row.values ?? []).map((value, vi) => (
                <Fragment key={vi}>
                  <td>
                    <span className="sp-feeding-guide__grams" style={{ color: accentColor }}>
                      {value.grams ?? '—'}
                    </span>
                  </td>
                  <td>{value.cups ?? '—'}</td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {notes && <p className="sp-feeding-guide__notes mt_20">{notes}</p>}
    </div>
  );
}

export default function ProductFeedingGuide({ feedingGuide, accentColor }: Props) {
  const t = useTranslations('productPage.feedingGuide');

  const {
    rows,
    notes,
    secondaryTitle,
    secondaryWeightColumnLabel,
    secondaryColumnGroups,
    secondaryTableRows,
    secondaryNotes,
    variants,
  } = feedingGuide ?? {};
  const hasPrimaryTable = !!rows?.length;
  const hasSecondaryTable = !!secondaryColumnGroups?.length && !!secondaryTableRows?.length;
  const hasCalculator = !!rows?.some((r) => typeof r.weightMin === 'number');

  if (!hasPrimaryTable && !hasSecondaryTable) return null;

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

        {hasPrimaryTable && (
          <FeedingTable
            rows={rows!}
            notes={notes}
            accentColor={accentColor}
            colLabel={t('colLabel')}
            colWeight={t('colWeight')}
            colGrams={t('colGrams')}
          />
        )}

        {hasCalculator && <DosageCalculator rows={rows!} variants={variants} accentColor={accentColor} />}

        {hasSecondaryTable && (
          <div className={`sp-feeding-guide__secondary${hasPrimaryTable ? ' mt_50' : ''}`}>
            <h3 className="sp-feeding-guide__secondary-title mb_20">
              {secondaryTitle ?? t('secondaryTitleDefault')}
            </h3>
            <GroupedFeedingTable
              weightColumnLabel={secondaryWeightColumnLabel ?? t('secondaryWeightColumnDefault')}
              columnGroups={secondaryColumnGroups!}
              tableRows={secondaryTableRows!}
              notes={secondaryNotes}
              accentColor={accentColor}
              gramsLabel={t('colGramsPerDay')}
              cupsLabel={t('colCupsPerDay')}
            />
          </div>
        )}
      </div>
    </section>
  );
}
