'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useCaninaTab } from '../CaninaTabContext';

const TABS = [
  { key: 'daily',       slug: 'nutricion-diaria' },
  { key: 'specialized', slug: 'nutricion-especializada' },
  { key: 'clinical',    slug: 'nutricion-clinica' },
  { key: 'treats',      slug: 'premios-funcionales' },
  { key: 'supplements', slug: 'suplementos' },
  { key: 'wet',         slug: 'alimentos-humedos' },
] as const;

type Props = {
  species?: 'canino' | 'felino';
};

export default function TabsCanina({ species = 'canino' }: Props) {
  const t        = useTranslations('nav.sub');
  const params   = useParams();
  const pathname = usePathname();
  const lang     = params.lang as string;
  const speciesBase = species === 'felino' ? 'nutricion-felina' : 'nutricion-canina';

  const { activeCategory, setActiveCategory, hasProvider } = useCaninaTab();

  return (
    <section className="canine-tabs p_relative">
      <div className="auto-container">
        <div className="canine-tabs__strip">
          {TABS.map(({ key, slug }) => {
            const isActive = hasProvider
              ? activeCategory === slug
              : pathname.includes(slug);

            return hasProvider ? (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveCategory(slug)}
                className={`canine-tabs__tab${isActive ? ' canine-tabs__tab--active' : ''}`}
              >
                {t(key)}
              </button>
            ) : (
              <Link
                key={slug}
                href={`/${lang}/${speciesBase}/${slug}`}
                className={`canine-tabs__tab${isActive ? ' canine-tabs__tab--active' : ''}`}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
