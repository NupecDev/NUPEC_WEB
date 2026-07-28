'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  species?: 'canino' | 'felino';
};

export default function FormulaHighTech({ species = 'canino' }: Props) {
  const t = useTranslations(species === 'felino' ? 'feline.formula' : 'canine.formula');

  return (
    /*
      Adaptado de npc-super-block npc-home-formula npc-bk-white-gradient (nupec.com)
      sec-title + auto-container reutilizan el sistema del template; el fondo
      degradado es el único agregado nuevo (no existe en style.css del template).
    */
    <section className="formula-hightech p_relative pt_100 pb_100">
      <div className="auto-container">
        <div className="sec-title text-center mb_40">
          <h2>
            <span className="formula-hightech__highlight">{t('titleHighlight')}</span> {t('titleRest')}
          </h2>
          <p className="formula-hightech__desc">{t.rich('description', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        </div>

        <div className="formula-hightech__image-holder">
          <Image
            src="/assets/images/banner/npc-home-formula.png"
            alt={t('imageAlt')}
            width={1988}
            height={782}
            className="formula-hightech__image"
            sizes="(max-width: 991px) 100vw, 994px"
          />
        </div>
      </div>
    </section>
  );
}
