'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type HighTechItem = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  items: HighTechItem[];
  categoryName: string;
  accentColor: string;
  species?: 'canino' | 'felino';
};

export default function ProductHighTech({ items, categoryName, accentColor, species = 'canino' }: Props) {
  const t = useTranslations('productPage.highTech');

  if (!items || items.length === 0) return null;

  const isFeline = species === 'felino';
  const title = isFeline ? t('vetsTitle') : t('title');
  const badgeSrc = isFeline
    ? '/assets/images/logos/img_logo_disenadovets_felino.png'
    : '/assets/images/logos/Logo_HT_horizontal.jpg';

  return (
    <section className="sp-hightech p_relative pt_40 pb_40">
      <div className="auto-container">
        {/* Header row: category title + HighTech/Vets badge */}
        <div className="sp-hightech__header mb_30">
          <h2 className="sp-hightech__cat-title" style={{ color: accentColor }}>
            {/* {categoryName.toUpperCase()} */}
            {title}
          </h2>
          <div className="sp-hightech__badge">
            <Image
              src={badgeSrc}
              alt={title}
              width={300}
              height={300}
              className="sp-hightech__badge-icon"
            />
            {/* <span className="sp-hightech__badge-label">{t('badgeLabel')}</span> */}
          </div>
        </div>

        {/* Items grid */}
        <div className="row clearfix">
          {items.map((item, i) => (
            <div
              key={i}
              className="col-lg-6 col-md-6 col-sm-12 sp-hightech__col wow fadeInUp"
              data-wow-delay={`${i * 80}ms`}
            >
              <div className="sp-hightech__item">
                {item.icon && (
                  <div className="sp-hightech__item-icon" style={{ color: accentColor }}>
                    {item.icon.startsWith('http') || item.icon.startsWith('/')
                      ? <Image src={item.icon} alt="" width={48} height={48} />
                      : <i className={item.icon} />}
                  </div>
                )}
                <h3 className="sp-hightech__item-title">{item.title}</h3>
                <p className="sp-hightech__item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
