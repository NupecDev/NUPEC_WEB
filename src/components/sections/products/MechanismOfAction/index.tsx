'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type MechanismStep = {
  step: number;
  title: string;
  description?: string;
  iconUrl?: string;
};

type Props = {
  steps: MechanismStep[];
  productName: string;
  accentColor?: string;
};

const PARABOLA_GOLD = '#B8952A';

export default function MechanismOfAction({ steps, productName, accentColor = PARABOLA_GOLD }: Props) {
  const t = useTranslations('clinicalProduct.mechanism');

  if (!steps || steps.length === 0) return null;

  const count = steps.length;

  // y offset per position to build the parabola arc (0=top of arc for middle items)
  const arcY = (i: number) => {
    const mid = (count - 1) / 2;
    const norm = (i - mid) / Math.max(mid, 1); // -1 to 1
    return norm * norm * 60; // px drop at edges
  };

  return (
    <section className="moa p_relative pt_80 pb_80">
      <div className="auto-container">

        {/* Header */}
        <div className="sec-title mb_70 text-center">
          <span className="moa__eyebrow" style={{ color: accentColor }}>{t('title')}</span>
          <h2 className="moa__heading">{t('subtitle', { name: productName })}</h2>
        </div>

        {/* Parabola container */}
        <div className="moa__parabola">

          {/* Steps */}
          <div className="moa__steps">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="moa__step"
                style={{ transform: `translateY(${arcY(i)}px)` }}
              >
                {/* Circle icon */}
                <div className="moa__icon-wrap" style={{ borderColor: accentColor }}>
                  {step.iconUrl ? (
                    <Image
                      src={step.iconUrl}
                      alt={step.title}
                      width={80}
                      height={80}
                      className="moa__icon-img"
                    />
                  ) : (
                    <span className="moa__icon-fallback" style={{ color: accentColor }}>
                      {String(step.step).padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Text below icon */}
                <div className="moa__step-text">
                  <h3 className="moa__step-title" style={{ color: accentColor }}>{step.title}</h3>
                  {step.description && (
                    <p className="moa__step-desc">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
