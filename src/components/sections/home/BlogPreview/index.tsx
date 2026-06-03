'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const POSTS = [
  {
    titleKey: 'post1Title',
    descKey: 'post1Desc',
    catKey: 'cat1',
    img: '/assets/images/news/news-1.jpg',
    date: 'Marzo 4, 2025',
  },
  {
    titleKey: 'post2Title',
    descKey: 'post2Desc',
    catKey: 'cat2',
    img: '/assets/images/news/news-2.jpg',
    date: 'Marzo 10, 2025',
  },
  {
    titleKey: 'post3Title',
    descKey: 'post3Desc',
    catKey: 'cat3',
    img: '/assets/images/news/news-3.jpg',
    date: 'Marzo 18, 2025',
  },
] as const;

export default function BlogPreview() {
  const t = useTranslations('home.blog');
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="news-section sec-pad">
      <div className="auto-container">
        <div className="sec-title centred mb_60">
          <span className="sub-title mb_5">{t('subtitle')}</span>
          <h2>{t('title')}</h2>
        </div>

        <div className="row clearfix">
          {POSTS.map(({ titleKey, descKey, catKey, img, date }) => (
            <div key={titleKey} className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-block-one">
                <div className="inner-box">
                  <figure className="image-box">
                    <Link href={`/${lang}/blog`}>
                      <Image src={img} alt={t(titleKey)} width={400} height={300} />
                    </Link>
                  </figure>
                  <div className="lower-content">
                    <span className="comment-box">{t(catKey)}</span>
                    <h3>
                      <Link href={`/${lang}/blog`}>{t(titleKey)}</Link>
                    </h3>
                    <ul className="post-info clearfix">
                      <li><i className="icon-59" />{date}</li>
                      <li><i className="icon-60" />{t('author')}</li>
                    </ul>
                    <p>{t(descKey)}</p>
                    <div className="link">
                      <Link href={`/${lang}/blog`}>{t('readMore')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
