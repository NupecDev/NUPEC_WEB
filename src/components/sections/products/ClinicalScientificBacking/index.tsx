'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ICONS = ['icon-37', 'icon-38', 'icon-39'] as const;
const PILLARS = ['formula', 'digestibility', 'quality'] as const;

export default function ClinicalScientificBacking() {
  const t = useTranslations('clinical.backing');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="clin-backing p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: '#0085CA' }} />
            <div>
              <span className="section-eyebrow">{t('title')}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          {PILLARS.map((key, i) => (
            <div key={key} className="col-lg-4 col-md-6 col-sm-12">
              <div className="clin-backing__card">
                <div className="clin-backing__icon-wrap">
                  <i className={ICONS[i]} />
                </div>
                <h3 className="clin-backing__name">{t(`${key}Title`)}</h3>
                <p className="clin-backing__desc">{t(`${key}Desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="clin-backing__cta-wrap">
          <Link href={`/${lang}/nosotros`} className="clin-backing__cta">
            {t('cta')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
