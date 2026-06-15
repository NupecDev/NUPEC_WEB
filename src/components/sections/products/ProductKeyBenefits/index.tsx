'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type KeyBenefitItem = {
  icon: string;
  description: string;
};

type Props = {
  categorySlug: string;
  accentColor: string;
  keyBenefits?: KeyBenefitItem[];
};

const CATEGORY_BENEFITS: Record<string, { icon: string; key: string }[]> = {
  'nutricion-diaria': [
    { icon: 'icon-37', key: 'digestibility' },
    { icon: 'icon-38', key: 'palatability' },
    { icon: 'icon-39', key: 'protein' },
    { icon: 'icon-40', key: 'omega' },
  ],
  'nutricion-especializada': [
    { icon: 'icon-28', key: 'breedSpecific' },
    { icon: 'icon-29', key: 'jointSupport' },
    { icon: 'icon-37', key: 'digestibility' },
    { icon: 'icon-40', key: 'omega' },
  ],
  'nutricion-clinica': [
    { icon: 'icon-28', key: 'therapeutic' },
    { icon: 'icon-15', key: 'vetApproved' },
    { icon: 'icon-37', key: 'digestibility' },
    { icon: 'icon-39', key: 'protein' },
  ],
  'premios-funcionales': [
    { icon: 'icon-38', key: 'palatability' },
    { icon: 'icon-28', key: 'functional' },
    { icon: 'icon-39', key: 'protein' },
    { icon: 'icon-40', key: 'omega' },
  ],
  'suplementos': [
    { icon: 'icon-28', key: 'supplement' },
    { icon: 'icon-37', key: 'digestibility' },
    { icon: 'icon-39', key: 'protein' },
    { icon: 'icon-15', key: 'vetApproved' },
  ],
  'alimentos-humedos': [
    { icon: 'icon-37', key: 'hydration' },
    { icon: 'icon-38', key: 'palatability' },
    { icon: 'icon-39', key: 'protein' },
    { icon: 'icon-40', key: 'omega' },
  ],
};

const DEFAULT_BENEFITS = [
  { icon: 'icon-37', key: 'digestibility' },
  { icon: 'icon-38', key: 'palatability' },
  { icon: 'icon-39', key: 'protein' },
  { icon: 'icon-40', key: 'omega' },
];

function SanityBenefitCard({
  benefit,
  accentColor,
  delay,
}: {
  benefit: KeyBenefitItem;
  accentColor: string;
  delay: number;
}) {
  const isUrl = benefit.icon.startsWith('/') || benefit.icon.startsWith('http');

  return (
    <div
      className="sp-benefit-block wow fadeInUp"
      data-wow-delay={`${delay}ms`}
      style={{ background: accentColor, borderRadius: 12 }}
    >
      <div className="inner-box" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
        <div style={{ width: 72, height: 72, position: 'relative', flexShrink: 0 }}>
          {isUrl ? (
            <Image
              src={benefit.icon}
              alt=""
              fill
              sizes="72px"
              style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          ) : (
            <i className={benefit.icon} style={{ fontSize: 64, color: '#fff' }} />
          )}
        </div>
        <p className="sp-benefit-block__desc" style={{ color: '#fff', margin: 0 }}>
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export default function ProductKeyBenefits({ categorySlug, accentColor, keyBenefits }: Props) {
  const t = useTranslations('productPage.keyBenefits');

  if (keyBenefits && keyBenefits.length > 0) {
    return (
      <section className="funfact-section sp-key-benefits p_relative">
        <div className="auto-container">
          <div className="sec-title centred mb_50 pt-5">
            <h2>{t('title')}</h2>
          </div>
          <div className="row clearfix">
            {keyBenefits.map((b, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 funfact-block-two">
                <SanityBenefitCard benefit={b} accentColor={accentColor} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const fallbackBenefits = CATEGORY_BENEFITS[categorySlug] ?? DEFAULT_BENEFITS;

  return (
    <section className="funfact-section sp-key-benefits p_relative">
      <div className="auto-container">
        <div className="sec-title centred mb_50 pt-5">
          <h2>{t('title')}</h2>
        </div>
        <div className="row clearfix">
          {fallbackBenefits.map((b, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-sm-12 funfact-block-two">
              <div className="funfact-block-two sp-benefit-block wow fadeInUp" data-wow-delay={`${i * 100}ms`}>
                <div className="inner-box">
                  <div className="icon-box" style={{ color: accentColor }}>
                    <i className={b.icon} />
                  </div>
                  <h3 className="sp-benefit-block__title">{t(`${b.key}Title`)}</h3>
                  <p className="sp-benefit-block__desc">{t(`${b.key}Desc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
