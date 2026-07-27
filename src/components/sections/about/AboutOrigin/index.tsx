'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutOrigin() {
  const t = useTranslations('nosotros.origin');

  return (
    /*
      Split section como AboutBrand: texto izquierda / imagen derecha.
      Reutiliza content-block-one e image-block-one del template.
    */
    <section className="about-section sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-block-one">
              <div className="content-box">
                <div className="sec-title mb_25">
                  <span className="sub-title mb_5">{t('subtitle')}</span>
                  <h2>{t('title')}</h2>
                </div>
                <div className="text-box">
                  <div className="about-origin__breakdown mb_20">
                    <div className="about-origin__row">
                      <span className="about-origin__syllable">{t('nu')}</span>
                      <span className="about-origin__equals">=</span>
                      <span className="about-origin__meaning">{t('nuMeaning')}</span>
                    </div>
                    <div className="about-origin__row">
                      <span className="about-origin__syllable">{t('peek')}</span>
                      <span className="about-origin__equals">=</span>
                      <span className="about-origin__meaning">{t('peekMeaning')}</span>
                    </div>
                  </div>
                  <p>{t('description')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-block-one">
              <div className="image-box p_relative">
                <div className="shape">
                  <div className="shape-1" style={{ backgroundImage: 'url(/assets/images/shape/shape-9.png)' }} />
                  <div className="shape-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-10.png)' }} />
                </div>
                <figure className="image">
                  <Image
                    src="/assets/images/resource/image.png"
                    alt="NUPEC"
                    width={523}
                    height={399}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
