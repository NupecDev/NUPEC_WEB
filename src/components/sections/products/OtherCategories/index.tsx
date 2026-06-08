'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type OtherCategoriesProps = {
  currentCategorySlug: string;
  species: 'canino' | 'felino';
};

const ALL_CATEGORIES = [
  { key: 'daily',       slug: 'nutricion-diaria',        color: '#78BE20' },
  { key: 'specialized', slug: 'nutricion-especializada',  color: '#E35205' },
  { key: 'clinical',    slug: 'nutricion-clinica',        color: '#C4262E' },
  { key: 'treats',      slug: 'premios-funcionales',      color: '#78BE20' },
  { key: 'supplements', slug: 'suplementos',              color: '#E8A200' },
  { key: 'wet',         slug: 'alimentos-humedos',        color: '#0085CA' },
] as const;

export default function OtherCategories({ currentCategorySlug, species }: OtherCategoriesProps) {
  const tOther = useTranslations('categoryPage.otherCategories');
  const tNav   = useTranslations('nav.sub');
  const params = useParams();
  const lang = params.lang as string;

  const speciesBase = species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const others = ALL_CATEGORIES.filter((c) => c.slug !== currentCategorySlug);

  return (
    <section className="service-section cat-other-categories p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_50 text-center">
          <span className="sub-title mb_5">{tOther('subtitle')}</span>
          <h2>{tOther('title')}</h2>
          <p>{tOther('description')}</p>
        </div>

        <div className="cat-other-categories__strip">
          {others.map(({ key, slug, color }) => (
            <Link
              key={slug}
              href={`/${lang}/${speciesBase}/${slug}`}
              className="cat-other-categories__card"
              style={{ '--cat-color': color } as React.CSSProperties}
            >
              <div className="cat-other-categories__bar" style={{ background: color }} />
              <div className="cat-other-categories__body">
                <span className="cat-other-categories__name">{tNav(key)}</span>
                <i className="icon-22 cat-other-categories__arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
