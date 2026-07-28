'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const CARD_KEYS = ['avalados', 'pruebas', 'laboratorio', 'certificado'] as const;
const ICONS = [
  '/assets/images/icons/npc-ico-certificado.svg',
  '/assets/images/icons/npc-ico-digestibilidad.svg',
  '/assets/images/icons/npc-ico-formulacion.svg',
  '/assets/images/icons/npc-ico-garantia-calidad.png',
] as const;

type Props = {
  species?: 'canino' | 'felino';
};

export default function ScienceStats({ species = 'canino' }: Props) {
  const t = useTranslations(species === 'felino' ? 'feline.science' : 'canine.science');

  return (
    <section className="funfact-section canine-science p_relative pt_80 pb_80">
      <div className="auto-container">
        <div className="sec-title mb_60 text-center">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="row clearfix">
          {CARD_KEYS.map((key, i) => (
            <div key={key} className="col-lg-3 col-md-6 col-sm-12 canine-science__col">
              <div className="canine-science__card">
                <div className="canine-science__card-icon">
                  <Image src={ICONS[i]} alt="" width={64} height={64} />
                </div>
                <p className="canine-science__card-desc">{t(`${key}Desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
