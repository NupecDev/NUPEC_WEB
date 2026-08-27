'use client';

import { useTranslations } from 'next-intl';
import type { WizardStep } from './types';

type Props = {
  steps: WizardStep[];
  currentIndex: number;
};

export default function ProgressHero({ steps, currentIndex }: Props) {
  const t = useTranslations('foodFinder');
  const isResult = steps[currentIndex] === 'result';

  return (
    <section className="page-title p_relative" style={{ background: '#0085CA', paddingBottom: 70 }}>
      <div className="auto-container">
        <div className="content-box" style={{ textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('hero.eyebrow')}
          </span>
          <h1 style={{ color: '#fff' }}>{t('hero.title')}</h1>
          <p style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 720, margin: '16px auto 0' }}>
            {t('hero.description')}
          </p>
        </div>
      </div>

      {!isResult && (
        <div
          className="food-finder__progress"
          style={{
            position: 'relative',
            marginTop: 30,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 100,
              padding: '14px 26px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {steps
              .filter((s) => s !== 'result')
              .map((step, i) => (
                <FoodFinderStepDot
                  key={step}
                  index={i}
                  active={i === currentIndex}
                  done={i < currentIndex}
                  label={t(`steps.${step}`)}
                  isLast={i === steps.filter((s) => s !== 'result').length - 1}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FoodFinderStepDot({
  index,
  active,
  done,
  label,
  isLast,
}: {
  index: number;
  active: boolean;
  done: boolean;
  label: string;
  isLast: boolean;
}) {
  const highlighted = active || done;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: highlighted ? '#0085CA' : '#fff',
            border: `2px solid ${highlighted ? '#0085CA' : '#d7dbe0'}`,
            color: highlighted ? '#fff' : '#9aa1ab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>
        <div
          style={{
            fontWeight: active ? 800 : 600,
            fontSize: 11,
            color: active ? '#1B365D' : '#8a909a',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
      {!isLast && <div style={{ width: 28, height: 2, background: '#d7dbe0', borderRadius: 1 }} />}
    </>
  );
}
