'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STUDY_KEYS = ['digestibility', 'palatability', 'safety', 'efficacy', 'traceability'] as const;

export default function SanurenStudies() {
  const t = useTranslations('clinical.sanuren');
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section p_relative sec-pad">
      <style>{`
        /* ── accordion hover ──────────────────────────────── */
        .sanuren-item .acc-btn {
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
        }
        .sanuren-item .acc-btn:hover {
          background: #E6F1FB;
          box-shadow: 0 6px 24px rgba(0, 133, 202, 0.18);
          transform: scale(1.018);
        }
        .sanuren-item .acc-btn:hover h4 {
          color: #0085CA;
        }
        .sanuren-item .acc-btn:hover h4 span {
          background: #0085CA;
          color: #fff;
        }
        .sanuren-item .acc-btn:hover .icon-box {
          border-color: #0085CA;
          color: #0085CA;
        }

        .sanuren-item .acc-btn h4 {
          transition: color 0.25s ease;
        }
        .sanuren-item .acc-btn h4 span {
          transition: background 0.25s ease, color 0.25s ease;
        }
        .sanuren-item .acc-btn .icon-box {
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.4s ease;
        }
      `}</style>

      <div className="auto-container">
        <div className="row clearfix align-items-center">

          {/* Left: image */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image_block_four">
              <div className="image-box">
                <figure className="image">
                  <Image
                    src="/assets/images/resource/SANUREN.png"
                    alt={t('imageAlt')}
                    width={540}
                    height={620}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </figure>
              </div>
            </div>
          </div>

          {/* Right: title + accordion */}
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_five">
              <div className="content-box ml_50">
                <div className="sec-title mb_30">
                  <span className="sub-title mb_5">{t('eyebrow')}</span>
                  <h2>{t('title')}</h2>
                  <p className="mt_15">{t('subtitle')}</p>
                </div>

                <ul className="accordion-box">
                  {STUDY_KEYS.map((key, index) => (
                    <li
                      key={key}
                      className={`accordion block sanuren-item ${activeIndex === index ? 'active-block' : ''}`}
                    >
                      <div
                        className={`acc-btn ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggle(index)}
                      >
                        <div className="icon-box">
                          <i className="icon-22"></i>
                        </div>
                        <h4>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          {t(`${key}Title`)}
                        </h4>
                      </div>

                      {activeIndex === index && (
                        <div className="acc-content current">
                          <p>{t(`${key}Desc`)}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
