'use client';

import { useTranslations } from 'next-intl';

export type MechanismStep = {
  step: number;
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  steps: MechanismStep[];
  productName: string;
  accentColor?: string;
};

const CLINICAL_NAVY = '#1B365D';

export default function MechanismOfAction({ steps, productName, accentColor = CLINICAL_NAVY }: Props) {
  const t = useTranslations('clinicalProduct.mechanism');

  if (!steps || steps.length === 0) return null;

  return (
    <section className="moa p_relative pt_80 pb_80" style={{ background: accentColor }}>
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_60 text-center">
          <span className="moa__eyebrow">{t('title')}</span>
          <h2 className="moa__heading">{t('subtitle', { name: productName })}</h2>
        </div>

        {/* Steps row */}
        <div className="moa__steps">
          {steps.map((step, i) => (
            <div key={step.step} className="moa__step">
              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div className="moa__connector" aria-hidden="true" />
              )}

              {/* Step card */}
              <div className="moa__card">
                <div className="moa__number">
                  {String(step.step).padStart(2, '0')}
                </div>
                <h3 className="moa__step-title">{step.title}</h3>
                {step.description && (
                  <p className="moa__step-desc">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="moa__note text-center">{t('note')}</p>
      </div>
    </section>
  );
}
