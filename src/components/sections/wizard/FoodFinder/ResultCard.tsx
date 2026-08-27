'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';
import type { WizardProductResult } from './types';

type Props = {
  lang: string;
  product: WizardProductResult;
  best?: boolean;
};

export default function ResultCard({ lang, product, best }: Props) {
  const t = useTranslations('foodFinder.result');
  const speciesBase = product.species === 'canino' ? 'nutricion-canina' : 'nutricion-felina';
  const href = `/${lang}/${speciesBase}/${product.categoria}/${product.slug}`;
  const accent = product.color || '#0085CA';

  return (
    <div
      style={{
        background: '#fff',
        color: '#1B365D',
        borderRadius: 6,
        padding: 24,
        position: 'relative',
        display: 'flex',
        gap: 20,
        border: best ? '2.5px solid #3FB272' : '1px solid #e6e9ee',
        flexWrap: 'wrap',
      }}
    >
      {best && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: 20,
            background: '#3FB272',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 2,
            fontWeight: 900,
            fontSize: 10,
            letterSpacing: '0.1em',
          }}
        >
          ★ {t('bestMatch').toUpperCase()}
        </div>
      )}

      <div
        style={{
          flex: '0 0 96px',
          height: 130,
          background: '#fff',
          border: `2px solid ${accent}`,
          borderRadius: '4px 4px 2px 2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {product.image?.asset ? (
          <Image
            src={urlFor(product.image).width(180).url()}
            alt={product.image.alt}
            width={90}
            height={120}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        ) : (
          <span style={{ color: accent, fontWeight: 900, fontSize: 11 }}>NUPEC</span>
        )}
      </div>

      <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontWeight: 900, fontSize: 18, color: '#1B365D' }}>{product.name}</div>
        {product.tagline && (
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#8a909a', flex: 1 }}>
            {product.tagline}
          </div>
        )}
        {product.presentations && product.presentations.length > 0 && (
          <div
            style={{
              fontWeight: 700,
              fontSize: 11,
              color: accent,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {product.presentations.join(' · ')}
          </div>
        )}
        <Link
          href={href}
          className="theme-btn btn-one"
          style={{ alignSelf: 'flex-start', marginTop: 6, padding: '10px 18px', fontSize: 12 }}
        >
          <span>{t('viewProduct')}</span>
        </Link>
      </div>
    </div>
  );
}
