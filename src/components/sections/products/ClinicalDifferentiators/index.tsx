'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type DifferentiatorItem = {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
};

type Props = {
  items: DifferentiatorItem[];
  accentColor?: string;
  darkBg?: boolean;
};

const CLINICAL_RED = '#C4262E';

export default function ClinicalDifferentiators({
  items,
  accentColor = CLINICAL_RED,
  darkBg = false,
}: Props) {
  const t = useTranslations('clinicalProduct.differentiators');

  if (!items || items.length === 0) return null;

  return (
    <section className={`clin-diff ${darkBg ? 'clin-diff--dark' : 'clin-diff--light'} p_relative pt_60 pb_60`}>
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
                      width={52}
                      height={52}
                      className="clin-diff__icon-img"
                    />
                  ) : (
                    <i className={`clin-diff__icon-class ${item.icon}`} style={{ color: accentColor }} />
                  )}
                </div>

                {/* Text */}
                <h3 className="clin-diff__title">{item.title}</h3>
                {item.subtitle && (
                  <p className="clin-diff__subtitle" style={{ color: accentColor }}>{item.subtitle}</p>
                )}
                <p className="clin-diff__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
