'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';
import { useCaninaTab } from '../CaninaTabContext';

export type CategoryIntro = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  complementaryText?: string;
  familyImage?: { asset: { _ref: string }; alt?: string };
};

const CATEGORY_COLOR: Record<string, string> = {
  'nutricion-diaria':        '#0085CA',
  'nutricion-especializada': '#0085CA',
  'nutricion-clinica':       '#0085CA',
  'premios-funcionales':     '#0085CA',
  'suplementos':             '#0085CA',
  'alimentos-humedos':       '#0085CA',
};

type Props = {
  lang: string;
  categories: CategoryIntro[];
};

export default function CategoryIntroClient({ lang, categories }: Props) {
  const t = useTranslations('canine.products');
  const { activeCategory } = useCaninaTab();

  const category = categories.find((c) => c.slug === activeCategory) ?? categories[0];
  const accentColor = CATEGORY_COLOR[activeCategory] ?? '#78BE20';

  // Track previous slug to detect changes and trigger animation
  const prevSlugRef = useRef<string | undefined>(undefined);
  const [animKey, setAnimKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prevSlugRef.current !== undefined && prevSlugRef.current !== activeCategory) {
      setIsAnimating(true);
      const t = setTimeout(() => {
        setAnimKey((k) => k + 1);
        setIsAnimating(false);
      }, 260);
      return () => clearTimeout(t);
    }
    prevSlugRef.current = activeCategory;
  }, [activeCategory]);

  // Sync prevSlugRef after animKey bump
  useEffect(() => {
    prevSlugRef.current = activeCategory;
  }, [animKey, activeCategory]);

  if (!category) return null;

  return (
    <section className="service-section alternat-2 p_relative canine-intro">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-13.png)' }}
      />

      {/* Accent bar tied to category color */}
      <div className="canine-intro__color-bar" style={{ background: accentColor }} />

      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        <div
          key={animKey}
          className={`canine-intro__panel${isAnimating ? ' canine-intro__panel--exit' : ' canine-intro__panel--enter'}`}
        >
          {/* Image column */}
          <div className="canine-intro__img-col">
            <div
              className="canine-intro__img-frame"
              style={{ borderColor: accentColor }}
            >
              {category.familyImage?.asset ? (
                <Image
                  src={urlFor(category.familyImage).width(1200).url()}
                  alt={category.familyImage.alt ?? category.name}
                  width={1200}
                  height={900}
                  className="canine-intro__img"
                  priority
                />
              ) : (
                <div
                  className="canine-intro__img-placeholder"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <span className="canine-intro__ph-brand">NUPEC</span>
                  <span className="canine-intro__ph-line">{category.name}</span>
                </div>
              )}

              {/* Floating category badge */}
              <div
                className="canine-intro__badge"
                style={{ background: accentColor }}
              >
                <span>{category.name}</span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="canine-intro__text-col">
            <div
              className="canine-intro__accent-bar"
              style={{ background: accentColor }}
            />

            <div className="canine-intro__text-body">
              <h3
                className="canine-intro__category-name"
                style={{ color: accentColor }}
              >
                {category.name}
              </h3>

              {(category.description || category.excerpt) && (
                <p className="canine-intro__description">
                  {category.description ?? category.excerpt}
                </p>
              )}

              {category.complementaryText && (
                <p className="canine-intro__complementary">
                  {category.complementaryText}
                </p>
              )}

              <div className="canine-intro__cta-row">
                <Link
                  href={`/${lang}/nutricion-canina/${activeCategory}`}
                  className="theme-btn btn-one"
                >
                  {t('verCategoria')} <i className="icon-22" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
