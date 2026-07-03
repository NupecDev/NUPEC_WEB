'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { urlFor } from '@/lib/sanity/client';

import 'swiper/swiper-bundle.css';

export type IngredientStudy = {
  type: 'clinical' | 'lab' | 'field' | 'meta' | 'review';
  title: string;
  duration?: string;
  result: string;
  externalUrl?: string;
  pdf?: { asset: { url: string } };
};

export type IngredientKeyPoint = {
  icon?: string;
  text: string;
};

export type IngredientItem = {
  _id: string;
  name: string;
  eyebrow?: string;
  image?: { asset: { _ref: string }; alt?: string };
  summary: string;
  keyPoints?: IngredientKeyPoint[];
  studies?: IngredientStudy[];
  badges?: Array<{ image?: { asset: { _ref: string } }; label?: string }>;
};

type Props = {
  ingredients: IngredientItem[];
  accentColor?: string;
};

const STUDY_TYPE_CONFIG: Record<
  IngredientStudy['type'],
  { labelKey: string; color: string; bg: string }
> = {
  clinical: { labelKey: 'study.clinical', color: '#1B365D', bg: '#1B365D1A' },
  lab:      { labelKey: 'study.lab',      color: '#0085CA', bg: '#0085CA1A' },
  field:    { labelKey: 'study.field',    color: '#78BE20', bg: '#78BE201A' },
  meta:     { labelKey: 'study.meta',     color: '#E8A200', bg: '#E8A2001A' },
  review:   { labelKey: 'study.review',   color: '#54301A', bg: '#54301A1A' },
};

export default function IngredientShowcase({ ingredients, accentColor = '#C4262E' }: Props) {
  const t = useTranslations('clinicalProduct.ingredientShowcase');
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!ingredients || ingredients.length === 0) return null;

  const total = ingredients.length;

  return (
    <section className="ing-showcase p_relative">
      {/* Dark hero background */}
      <div
        className="ing-showcase__bg"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 75% 50%, ${accentColor}20 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(27, 54, 93, 0.4) 0%, transparent 60%)
          `,
        }}
      />

      <div className="auto-container p_relative">

        {/* Section eyebrow */}
        <div className="ing-showcase__header">
          <div className="canine-hero__accent-bar" style={{ background: accentColor }} />
          <span className="ing-showcase__section-eyebrow" style={{ color: accentColor }}>
            {t('sectionLabel')}
          </span>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          effect="fade"
          slidesPerView={1}
          loop={total > 1}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="ing-showcase__swiper"
        >
          {ingredients.map((ingredient) => (
            <SwiperSlide key={ingredient._id}>
              <div className="ing-showcase__slide row clearfix">

                {/* ── LEFT: content ─────────────────────────── */}
                <div className="ing-showcase__content col-lg-6 col-md-12">

                  {ingredient.eyebrow && (
                    <span className="ing-showcase__eyebrow" style={{ color: accentColor }}>
                      {ingredient.eyebrow}
                    </span>
                  )}

                  <h2 className="ing-showcase__name">{ingredient.name}</h2>
                  <p className="ing-showcase__summary">{ingredient.summary}</p>

                  {/* Key points */}
                  {ingredient.keyPoints && ingredient.keyPoints.length > 0 && (
                    <ul className="ing-showcase__points">
                      {ingredient.keyPoints.map((point, i) => (
                        <li key={i} className="ing-showcase__point">
                          <span
                            className="ing-showcase__point-icon"
                            style={{ color: accentColor }}
                            aria-hidden="true"
                          >
                            {point.icon && !point.icon.startsWith('http') && !point.icon.startsWith('/') ? (
                              <i className={point.icon} />
                            ) : point.icon ? (
                              <Image src={point.icon} alt="" width={20} height={20} />
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.15" />
                                <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="ing-showcase__point-text">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Studies chips */}
                  {ingredient.studies && ingredient.studies.length > 0 && (
                    <div className="ing-showcase__studies">
                      <p className="ing-showcase__studies-label">{t('studiesLabel')}</p>
                      <div className="ing-showcase__chips">
                        {ingredient.studies.map((study, i) => {
                          const cfg = STUDY_TYPE_CONFIG[study.type] ?? STUDY_TYPE_CONFIG.clinical;
                          const label = t(cfg.labelKey as Parameters<typeof t>[0]);
                          const content = (
                            <span
                              key={i}
                              className="ing-showcase__chip"
                              style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color }}
                              title={study.result}
                            >
                              <span className="ing-showcase__chip-type">{label}</span>
                              {study.duration && (
                                <>
                                  <span className="ing-showcase__chip-dot" aria-hidden="true">·</span>
                                  <span className="ing-showcase__chip-duration">{study.duration}</span>
                                </>
                              )}
                            </span>
                          );

                          if (study.externalUrl) {
                            return (
                              <a
                                key={i}
                                href={study.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ing-showcase__chip-link"
                                aria-label={`${label} — ${study.title}`}
                              >
                                {content}
                              </a>
                            );
                          }
                          return content;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  {ingredient.badges && ingredient.badges.length > 0 && (
                    <div className="ing-showcase__badges">
                      {ingredient.badges.map((badge, i) =>
                        badge.image ? (
                          <div key={i} className="ing-showcase__badge" title={badge.label ?? ''}>
                            <Image
                              src={urlFor(badge.image).width(80).auto('format').url()}
                              alt={badge.label ?? ''}
                              width={64}
                              height={64}
                              className="ing-showcase__badge-img"
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </div>

                {/* ── RIGHT: image ──────────────────────────── */}
                <div className="ing-showcase__visual col-lg-6 col-md-12" aria-hidden="true">
                  <div className="ing-showcase__image-wrap">
                    {ingredient.image ? (
                      <Image
                        src={urlFor(ingredient.image).width(720).auto('format').url()}
                        alt={ingredient.image.alt ?? ingredient.name}
                        fill
                        className="ing-showcase__image"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="ing-showcase__image-placeholder" aria-hidden="true" />
                    )}
                    {/* decorative gradient overlay */}
                    <div className="ing-showcase__image-overlay" aria-hidden="true" />
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation — only when multiple slides */}
        {total > 1 && (
          <div className="ing-showcase__nav">
            <button
              className="ing-showcase__nav-btn ing-showcase__nav-btn--prev"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t('prev')}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="ing-showcase__dots" role="tablist" aria-label={t('slideNav')}>
              {ingredients.map((ing, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={ing.name}
                  className={`ing-showcase__dot ${i === activeIndex ? 'ing-showcase__dot--active' : ''}`}
                  style={i === activeIndex ? { background: accentColor, borderColor: accentColor } : {}}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                />
              ))}
            </div>

            <button
              className="ing-showcase__nav-btn ing-showcase__nav-btn--next"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t('next')}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* CSS */}
      <style>{`
        .ing-showcase {
          background: #0d1e36;
          overflow: hidden;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .ing-showcase__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ing-showcase__header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 40px;
        }

        .ing-showcase__section-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .ing-showcase__swiper {
          width: 100%;
        }

        /* ── Slide layout ────────────────────────────── */
        .ing-showcase__slide {
          min-height: 480px;
          align-items: center;
        }

        /* ── Content (left) ──────────────────────────── */
        .ing-showcase__content {
          padding-right: 40px;
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .ing-showcase__eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .ing-showcase__name {
          font-size: 38px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 18px;
        }

        .ing-showcase__summary {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 28px;
        }

        /* ── Key points ──────────────────────────────── */
        .ing-showcase__points {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ing-showcase__point {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .ing-showcase__point-icon {
          flex-shrink: 0;
          margin-top: 1px;
          display: flex;
          align-items: center;
        }

        /* ── Studies ─────────────────────────────────── */
        .ing-showcase__studies {
          margin-bottom: 24px;
        }

        .ing-showcase__studies-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 10px;
        }

        .ing-showcase__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ing-showcase__chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid currentColor;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: default;
        }

        .ing-showcase__chip-link {
          text-decoration: none;
          display: inline-flex;
        }

        .ing-showcase__chip-link .ing-showcase__chip {
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .ing-showcase__chip-link:hover .ing-showcase__chip {
          opacity: 0.8;
        }

        .ing-showcase__chip-dot {
          opacity: 0.5;
        }

        .ing-showcase__chip-duration {
          opacity: 0.8;
        }

        /* ── Badges ──────────────────────────────────── */
        .ing-showcase__badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ing-showcase__badge {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ing-showcase__badge-img {
          object-fit: contain;
        }

        /* ── Visual (right) ──────────────────────────── */
        .ing-showcase__visual {
          position: relative;
          min-height: 400px;
        }

        .ing-showcase__image-wrap {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .ing-showcase__image {
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }

        .swiper-slide-active .ing-showcase__image {
          transform: scale(1.03);
        }

        .ing-showcase__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #0d1e36 0%,
            rgba(13, 30, 54, 0.3) 40%,
            transparent 100%
          );
        }

        .ing-showcase__image-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1B365D 0%, #0d1e36 100%);
          border-radius: 12px;
        }

        /* ── Navigation ──────────────────────────────── */
        .ing-showcase__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 36px;
        }

        .ing-showcase__nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }

        .ing-showcase__nav-btn:hover {
          background: currentColor;
        }

        .ing-showcase__nav-btn:hover svg path {
          stroke: #0d1e36;
        }

        .ing-showcase__dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ing-showcase__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }

        .ing-showcase__dot--active {
          transform: scale(1.4);
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 991px) {
          .ing-showcase__content {
            padding-right: 0;
            padding-bottom: 0;
          }

          .ing-showcase__visual {
            min-height: 280px;
            margin-top: 32px;
          }

          .ing-showcase__image-overlay {
            background: linear-gradient(
              to bottom,
              transparent 40%,
              #0d1e36 100%
            );
          }

          .ing-showcase__name {
            font-size: 28px;
          }
        }

        @media (max-width: 575px) {
          .ing-showcase__name {
            font-size: 24px;
          }

          .ing-showcase__chips {
            gap: 6px;
          }
        }

        /* ── Fade transition ─────────────────────────── */
        .ing-showcase__swiper.swiper-fade .swiper-slide {
          opacity: 0 !important;
          pointer-events: none;
          transition: opacity 0.4s ease !important;
        }

        .ing-showcase__swiper.swiper-fade .swiper-slide-active {
          opacity: 1 !important;
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}
