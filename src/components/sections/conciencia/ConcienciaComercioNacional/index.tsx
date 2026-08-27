'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ConcienciaComercioNacional() {
  const t = useTranslations('conciencia.comercioNacional');

  return (
    /* Split section invertido, como ConcienciaLoboMexicano: imagen izquierda / texto derecha. */
    <section className="about-section sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-center flex-row-reverse">
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-block-one">
              <div className="content-box">
                <div className="sec-title mb_25">
                  <span className="sub-title mb_5">{t('subtitle')}</span>
                  <h2>{t('title')}</h2>
                </div>
                <div className="text-box">
                  <p>{t('description')}</p>
                  <p>{t('descriptionTwo')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-block-one">
              <div className="image-box p_relative">
                <div className="shape">
                  <div className="shape-1" style={{ backgroundImage: 'url(/assets/images/shape/shape-9.png)' }} />
                </div>
                <figure className="image">
                  <Image
                    src="/assets/images/resource/NACIONAL.png"
                    alt="NUPEC - Apoyamos el comercio nacional"
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
