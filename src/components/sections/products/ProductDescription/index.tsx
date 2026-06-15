'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/lib/sanity/client';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
} from 'next-sanity';

const HTML_TAG_RE = /<[a-z][\s\S]*?>/i;

// Renders a Portable Text block's children, interpreting any span whose text
// contains literal HTML tags (e.g. <sup>MR</sup>) via dangerouslySetInnerHTML.
function RichBlock({ value, children: _ }: PortableTextComponentProps<PortableTextBlock>) {
  const Tag = (value.style === 'h3' ? 'h3' : value.style === 'h4' ? 'h4' : 'p') as React.ElementType;
  const spans = (value.children ?? []) as Array<{ _key: string; text: string; marks?: string[] }>;

  return (
    <Tag>
      {spans.map((span) => {
        const inner = HTML_TAG_RE.test(span.text)
          ? <span key={span._key} dangerouslySetInnerHTML={{ __html: span.text }} />
          : <span key={span._key}>{span.text}</span>;

        if (span.marks?.includes('strong')) return <strong key={span._key}>{inner}</strong>;
        if (span.marks?.includes('em'))     return <em key={span._key}>{inner}</em>;
        return inner;
      })}
    </Tag>
  );
}

const portableTextComponents = {
  block: {
    normal: (props: PortableTextComponentProps<PortableTextBlock>) => <RichBlock {...props} />,
    h3:     (props: PortableTextComponentProps<PortableTextBlock>) => <RichBlock {...props} />,
    h4:     (props: PortableTextComponentProps<PortableTextBlock>) => <RichBlock {...props} />,
  },
};

type Props = {
  name: string;
  description?: string | PortableTextBlock[];
  ingredients?: string;
  presentations?: string[];
  technicalSheet?: { asset: { _ref: string } };
  image?: { asset: { _ref: string }; alt: string };
  accentColor: string;
};

export default function ProductDescription({
  name,
  description,
  ingredients,
  presentations,
  technicalSheet,
  image,
  accentColor,
}: Props) {
  const t = useTranslations('productPage.description');

  return (
    <section id="descripcion" className="about-section sp-description sec-pad p_relative">
      <div className="auto-container">
        <div className="row clearfix align-items-start">
          {/* Left: image */}
          <div className="col-lg-5 col-md-12 col-sm-12 image-column">
            <div className="sp-description__img-wrap wow fadeInLeft">
              <div className="sp-description__img-inner" style={{ borderColor: accentColor }}>
                {image?.asset ? (
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
                <span>{t('badge')}</span>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="col-lg-7 col-md-12 col-sm-12 content-column pt-5">
            <div className="content-block-one wow fadeInRight">
              <div className="content-box">
                <div className="sec-title mb_25">
                  {/* <span className="sub-title mb_5">{t('subtitle')}</span> */}
                  <h2>NUPEC<sup>MR</sup> {t('title', { name })}</h2>
                </div>

                {description && (
                  <div className="text-box mb_25">
                    {Array.isArray(description)
                      ? <PortableText value={description} components={portableTextComponents} />
                      : <p>{description}</p>}
                  </div>
                )}

                {/* Presentations */}
                {presentations && presentations.length > 0 && (
                  <div className="sp-description__block mb_25">
                    <h4 className="sp-description__block-title" style={{ color: accentColor }}>
                      {t('presentationsTitle')}
                    </h4>
                    <div className="sp-hero__pres-list">
                      {presentations.map((p) => (
                        <span key={p} className="sp-description__pres-chip" style={{ borderColor: accentColor, color: accentColor }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {ingredients && (
                  <div className="sp-description__block mb_25">
                    <h4 className="sp-description__block-title" style={{ color: accentColor }}>
                      {t('ingredientsTitle')}
                    </h4>
                    <p className="sp-description__ingredients">{ingredients}</p>
                  </div>
                )}

                {/* CTA: technical sheet */}
                {technicalSheet?.asset && (
                  <div className="btn-box mt_30">
                    <a
                      href={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${technicalSheet.asset._ref.replace('file-', '').replace(/-([^-]+)$/, '.$1')}`}
                      className="theme-btn btn-two"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t('downloadSheet')}</span>
                    </a>
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
