'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type BulletItem = {
  title: string;
  description: string;
};

export type DifferentiatorItem = {
  icon: string;
  title: string;
  subtitle?: string;
  bullets?: BulletItem[];
};

type Props = {
  items: DifferentiatorItem[];
  accentColor?: string;
  darkBg?: boolean;
};

const CLINICAL_RED = '#C4262E';

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ClinicalDifferentiators({
  items,
  accentColor = CLINICAL_RED,
  darkBg = false,
}: Props) {
  const t = useTranslations('clinicalProduct.differentiators');

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`clin-diff ${darkBg ? 'clin-diff--dark' : 'clin-diff--light'} p_relative pt_60 pb_60`}
      style={!darkBg ? { background: hexToRgba(accentColor, 0.13) } : undefined}
    >
      <div className="auto-container">

        {/* Header */}
        <div className="clin-diff__header clin-title-row mb_50">
          <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
          <span className="clin-diff__eyebrow" style={{ color: accentColor }}>
            {t('title')}
          </span>
        </div>

        {/* Grid */}
        <div className="row clearfix">
          {items.map((item, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-6 col-sm-12 clin-diff__col wow fadeInUp"
              data-wow-delay={`${i * 100}ms`}
            >
              <div className="clin-diff__card">
                {/* Icon circle */}
                <div className="clin-diff__icon-wrap" style={{ borderColor: accentColor }}>
                  {item.icon.startsWith('http') || item.icon.startsWith('/') ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="clin-diff__icon-img"
                    />
                  ) : (
                    <i className={`clin-diff__icon-class ${item.icon}`} style={{ color: accentColor }} />
                  )}
                </div>

                {/* Header del diferenciador */}
                <h2 className="clin-diff__title">{item.title}</h2>
                {item.subtitle && (
                  <p className="clin-diff__subtitle" style={{ color: accentColor }}>{item.subtitle}</p>
                )}

                {/* Puntos clave */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="clin-diff__bullets">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="clin-diff__bullet">
                        <strong className="clin-diff__bullet-title">{bullet.title}</strong>
                        <span className="clin-diff__bullet-desc">{bullet.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
