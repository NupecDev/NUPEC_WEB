'use client';

import { useTranslations } from 'next-intl';

export type TechnicalResource = {
  title: string;
  subtitle?: string;
  fileUrl?: string;
};

type Props = {
  resources: TechnicalResource[];
  productName: string;
  accentColor?: string;
};

export default function VetResources({ resources, productName, accentColor = '#0085CA' }: Props) {
  const t = useTranslations('clinicalProduct.vetResources');

  if (!resources || resources.length === 0) return null;

  return (
    <section className="vet-resources p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
            <div>
              <span className="section-eyebrow">{t('title', { name: productName })}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="vet-resources__grid">
          {resources.map((doc, i) => (
            <div key={i} className="vet-resources__card">
              {/* PDF icon */}
              <div className="vet-resources__pdf-icon" style={{ borderColor: accentColor, color: accentColor }}>
                <span>PDF</span>
              </div>

              <h3 className="vet-resources__title">{doc.title}</h3>
              {doc.subtitle && <p className="vet-resources__sub">{doc.subtitle}</p>}

              {doc.fileUrl ? (
                <a
                  href={doc.fileUrl}
                  className="vet-resources__btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {t('download')}
                </a>
              ) : (
                <button className="vet-resources__btn vet-resources__btn--disabled" type="button" disabled>
                  {t('unavailable')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
