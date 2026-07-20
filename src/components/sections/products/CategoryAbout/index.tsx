'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';

type CategoryStat = {
  value: string;
  label: string | null;
  description: string | null;
};

type CategoryAboutProps = {
  categoryName: string;
  categoryDescription: string | null;
  categorySlug: string;
  familyImage?: { asset: { _ref: string }; alt?: string } | null;
  stats?: CategoryStat[] | null;
};

export default function CategoryAbout({ categoryName, categoryDescription, familyImage, stats }: CategoryAboutProps) {
  const t = useTranslations('categoryPage.about');
  const aboutStats = stats ?? [];

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

          {/* Right: family image + stats */}
          <div className="col-lg-5 col-md-12 col-sm-12">
            {familyImage && (
              <div className="cat-about__family-image mb_30">
                <Image
                  src={urlFor(familyImage).width(600).auto('format').url()}
                  alt={familyImage.alt ?? categoryName}
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )}
            {aboutStats.length > 0 && (
              <div className="cat-about__stats">
                {aboutStats.map((stat, i) => (
                  <div key={i} className="cat-about__stat-row">
                    <span className="cat-about__stat-num">{stat.value}</span>
                    <div className="cat-about__stat-text">
                      <strong>{stat.label}</strong>
                      {stat.description && <span>{stat.description}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
