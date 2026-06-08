'use client';

import { useTranslations } from 'next-intl';

type CategoryAboutProps = {
  categoryName: string;
  categoryDescription: string | null;
  categorySlug: string;
};

const CATEGORY_STATS: Record<string, { num: string; label: string }[]> = {
  'nutricion-diaria': [
    { num: '92%', label: 'digestibilidadLabel' },
    { num: '+15', label: 'estudiosLabel' },
    { num: '100%', label: 'ingredientesLabel' },
  ],
  'nutricion-especializada': [
    { num: '91%', label: 'digestibilidadLabel' },
    { num: '+10', label: 'estudiosLabel' },
    { num: '100%', label: 'ingredientesLabel' },
  ],
  'nutricion-clinica': [
    { num: '93%', label: 'digestibilidadLabel' },
    { num: '+20', label: 'estudiosLabel' },
    { num: '100%', label: 'ingredientesLabel' },
  ],
};

const DEFAULT_STATS = [
  { num: '90%', label: 'digestibilidadLabel' },
  { num: '+10', label: 'estudiosLabel' },
  { num: '100%', label: 'ingredientesLabel' },
];

export default function CategoryAbout({ categoryName, categoryDescription, categorySlug }: CategoryAboutProps) {
  const t = useTranslations('categoryPage.about');
  const stats = CATEGORY_STATS[categorySlug] ?? DEFAULT_STATS;

  return (
    <section className="about-section cat-about sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          {/* Left: text */}
          <div className="col-lg-7 col-md-12 col-sm-12 content-column">
            <div className="content-block-one">
              <div className="content-box">
                <div className="sec-title mb_25">
                  <span className="sub-title mb_5">{t('subtitle')}</span>
                  <h2>{t('title', { category: categoryName })}</h2>
                </div>
                <div className="text-box">
                  <p>
                    {categoryDescription ?? t('fallbackDescription', { category: categoryName })}
                  </p>
                  <p className="mt_15">{t('bodyTwo')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: stats column */}
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="cat-about__stats">
              {stats.map(({ num, label }, i) => (
                <div key={i} className="cat-about__stat-row">
                  <span className="cat-about__stat-num">{num}</span>
                  <div className="cat-about__stat-text">
                    <strong>{t(label)}</strong>
                    <span>{t(`${label}Desc`)}</span>
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
