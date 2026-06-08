'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function CategoryWizardCTA() {
  const t = useTranslations('categoryPage.wizardCta');
  const params = useParams();
  const lang = params.lang as string;

  return (
    /*
      Reutiliza appointment-section (fondo azul navy del template)
      Estructura: texto izquierda, CTA derecha — igual que las secciones de cita
    */
    <section className="appointment-section cat-wizard-cta p_relative pt_80 pb_80">
      <div
        className="bg-layer"
        style={{ backgroundImage: 'url(/assets/images/background/pattern-1.png)' }}
      />
      <div className="auto-container">
        <div className="row clearfix align-items-center">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="sec-title light mb_0">
              <span className="sub-title mb_5">{t('subtitle')}</span>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 text-lg-end mt_sm_30">
            <Link href={`/${lang}/nutricion-canina`} className="theme-btn btn-two">
              <span>{t('cta')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
