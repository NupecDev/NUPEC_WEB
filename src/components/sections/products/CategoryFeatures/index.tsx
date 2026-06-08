'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type CategoryFeaturesProps = {
  categorySlug: string;
};

const ICONS = ['icon-28', 'icon-29', 'icon-15', 'icon-30'] as const;
const FEATURE_KEYS = ['lifeStage', 'breedSize', 'digestion', 'skinCoat'] as const;

export default function CategoryFeatures({ categorySlug }: CategoryFeaturesProps) {
  const t = useTranslations('categoryPage.features');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="chooseus-style-two canine-experts cat-features p_relative pt_100 pb_100">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          {/* Left: title + CTA */}
          <div className="col-lg-5 col-md-12 col-sm-12 title-column">
            <div className="sec-title mb_40">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </div>
            <Link
              href={`/${lang}/nutricion-canina/${categorySlug}`}
              className="theme-btn btn-two"
            >
              <span>{t('cta')}</span>
            </Link>
          </div>

          {/* Right: 4 feature blocks */}
          <div className="col-lg-7 col-md-12 col-sm-12 content-column">
            <div className="row clearfix">
              {FEATURE_KEYS.map((key, i) => (
                <div key={key} className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <div className="icon">
                          <i className={ICONS[i]} />
                        </div>
                        <span className="count-text">0{i + 1}</span>
                      </div>
                      <h3>{t(`${key}Title`)}</h3>
                      <p>{t(`${key}Desc`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
