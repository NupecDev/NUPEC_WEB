'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ICONS = ['icon-28', 'icon-29', 'icon-15', 'icon-30'] as const;
const ITEMS = ['uno', 'dos', 'tres', 'cuatro'] as const;

export default function AboutWhatWeDo() {
  const t = useTranslations('nosotros.whatWeDo');
  const params = useParams();
  const lang = params.lang as string;

  return (
    /*
      Mismo patrón que ExpertsCanina: chooseus-style-two con grid 2x2 de
      chooseus-block-one, reutilizando el CSS ya definido en chooseus.css.
    */
    <section className="chooseus-style-two about-whatwedo p_relative pt_100 pb_100">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          <div className="col-lg-5 col-md-12 col-sm-12 title-column">
            <div className="sec-title mb_40">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </div>
            <Link href={`/${lang}/nosotros`} className="theme-btn btn-two">
              <span>{t('cta')}</span>
            </Link>
          </div>

          <div className="col-lg-7 col-md-12 col-sm-12 content-column">
            <div className="row clearfix">
              {ITEMS.map((item, i) => (
                <div key={item} className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <div className="icon">
                          <i className={ICONS[i]} />
                        </div>
                        <span className="count-text">0{i + 1}</span>
                      </div>
                      <h3>{t(`${item}Title`)}</h3>
                      <p>{t(`${item}Desc`)}</p>
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
