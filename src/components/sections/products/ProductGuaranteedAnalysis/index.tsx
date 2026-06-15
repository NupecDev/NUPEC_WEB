'use client';

import { useTranslations } from 'next-intl';
import ProgressBar from '../../../../../components/elements/ProgressBar';

type NutrientItem = {
  label: string;
  value: string;
  min?: boolean;
};

type Props = {
  guaranteedAnalysis?: NutrientItem[];
  accentColor: string;
};

function parsePercent(value: string): number {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Math.min(parseFloat(match[1]), 100) : 0;
}

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
            <div className="sp-analysis__bars">
              {guaranteedAnalysis.map((item) => (
                <div
                  key={item.label}
                  className="sp-analysis__bar-row"
                  style={{ '--bar-color': accentColor } as React.CSSProperties}
                >
                  <ProgressBar
                    label={`${item.label}${item.min ? ' mín.' : ''}`}
                    percent={parsePercent(item.value)}
                    displayValue={item.value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
