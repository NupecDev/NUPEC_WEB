'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';

type Props = {
  name: string;
  image?: { asset: { _ref: string }; alt?: string; isGif?: boolean };
  video?: { url: string; mimeType: string } | null;
  description?: string;
  accentColor: string;
};

export default function ProductKibble({ name, video, image, description, accentColor }: Props) {
  const t = useTranslations('productPage.kibble');

  if (!video?.url && !image?.asset && !description) return null;

  return (
    <section id="croqueta" className="about-section sp-description sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-start flex-lg-row-reverse">
          {/* Right (visually left on mobile): image */}
          <div className="col-lg-5 col-md-12 col-sm-12 image-column">
            <div className="sp-description__img-wrap wow fadeInRight">
              <div className="sp-description__img-inner" style={{ borderColor: accentColor }}>
                {video?.url ? (
                  <video
                    src={video.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="sp-description__img"
                  />
                ) : image?.asset && image.isGif ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(image).url()}
                    alt={image.alt ?? name}
                    className="sp-description__img"
                  />
                ) : image?.asset ? (
                  <Image
                    src={urlFor(image).url()}
                    alt={image.alt ?? name}
                    width={480}
                    height={480}
                    className="sp-description__img"
                  />
                ) : (
                  <div className="sp-description__img-ph" style={{ borderColor: accentColor, color: accentColor }}>
                    <span className="sp-description__img-ph-brand">NUPEC<sup>MR</sup></span>
                    <span className="sp-description__img-ph-name">{name}</span>
                  </div>
                )}
              </div>
              <div className="sp-description__img-badge" style={{ background: accentColor }}>
                {/* <span>{t('badge')}</span> */}
              </div>
            </div>
          </div>

          {/* Left: content */}
          <div className="col-lg-7 col-md-12 col-sm-12 content-column pt-5">
            <div className="content-block-one wow fadeInLeft">
              <div className="content-box">
                <div className="sec-title mb_25">
                  {/* <span className="sub-title mb_5">{t('subtitle')}</span> */}
                  <h2>{t('title')}</h2>
                </div>

                {description && (
                  <div className="text-box mb_25">
                    <h3>{description}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
