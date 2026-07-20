'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

type FeedingRow = {
  label?: string;
  weightRange: string;
  dailyAmount: string;
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
};

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
  } = feedingGuide ?? {};
  const hasPrimaryTable = !!rows?.length;
  const hasSecondaryTable = !!secondaryColumnGroups?.length && !!secondaryTableRows?.length;

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
