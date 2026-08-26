'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type KeyBenefitItem = {
  icon: string;
  invertColors?: boolean;
  description: string;
};

type Props = {
  categorySlug: string;
  accentColor: string;
  keyBenefits?: KeyBenefitItem[];
};

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
              style={{ objectFit: 'contain', filter: benefit.invertColors ? 'brightness(0) invert(1)' : undefined }}
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

export default function ProductKeyBenefits({ accentColor, keyBenefits }: Props) {
  const t = useTranslations('productPage.keyBenefits');

  if (!keyBenefits || keyBenefits.length === 0) {
    return null;
  }

  return (
    <section className="funfact-section sp-key-benefits p_relative">
      <div className="auto-container">
        <div className="sec-title centred mb_50 pt-5">
          <h2>{t('title')}</h2>
        </div>
        <div className="row clearfix justify-content-center">
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
