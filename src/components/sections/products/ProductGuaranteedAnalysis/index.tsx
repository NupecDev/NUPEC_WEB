'use client';

import { useTranslations } from 'next-intl';
import NutrientBadge from '../../../../../components/elements/NutrientBadge';

type NutrientItem = {
  label: string;
  value: string;
  min?: boolean;
};

type Props = {
  guaranteedAnalysis?: NutrientItem[];
  accentColor: string;
};

export default function ProductGuaranteedAnalysis({ guaranteedAnalysis, accentColor }: Props) {
  const t = useTranslations('productPage.analysis');

  if (!guaranteedAnalysis || guaranteedAnalysis.length === 0) return null;

  return (
    <section className="about-section sp-analysis sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          <div className="col-lg-5 col-md-12 col-sm-12 content-column wow fadeInLeft">
            <div className="sec-title mb_25">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </div>
            <p className="sp-analysis__disclaimer">{t('disclaimer')}</p>
          </div>

          <div className="col-lg-7 col-md-12 col-sm-12 wow fadeInRight">
            <div
              className="sp-analysis__grid"
              style={{ '--badge-color': accentColor } as React.CSSProperties}
            >
              {guaranteedAnalysis.map((item) => (
                <NutrientBadge
                  key={item.label}
                  label={item.label}
                  displayValue={item.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
