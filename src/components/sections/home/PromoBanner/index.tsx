'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PromoBanner() {
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="promo-banner-section p_relative">
      <div
        className="promo-banner-section__bg"
        style={{ backgroundImage: 'url(/assets/images/banner/img_home_1stCARE.jpg)' }}
      />
      <Link
        href={`/${lang}/nutricion-canina/nutricion-especializada`}
        className="promo-banner-section__link d_block"
        aria-label="NUPEC 1st Care Immunity Plus"
      />
    </section>
  );
}
