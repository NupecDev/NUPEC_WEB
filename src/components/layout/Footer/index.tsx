'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const lang = params.lang as string;
  const base = `/${lang}`;

  return (
    <footer className="main-footer">
      <div className="widget-section p_relative">
        <div className="pattern-layer">
          <div className="pattern-1" style={{ backgroundImage: 'url(/assets/images/shape/shape-21.png)' }} />
          <div className="pattern-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-22.png)' }} />
          <div className="pattern-3" style={{ backgroundImage: 'url(/assets/images/shape/shape-23.png)' }} />
          <div className="pattern-4" style={{ backgroundImage: 'url(/assets/images/shape/shape-24.png)' }} />
        </div>

        <div className="auto-container">
          <div className="row clearfix">
            {/* About */}
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget about-widget">
                <div className="widget-title">
                  <img src="/assets/images/logos/logo-white.jpg" alt="NUPEC" width={203} height={40} />
                  </div>
                <div className="widget-content">
                  <p>{t('aboutDesc')}</p>
                  <ul className="social-links clearfix">
                    <li><Link href="https://www.facebook.com/NUPEC.PREMIUM/"><i className="fab fa-facebook-f" /></Link></li>
                    <li><Link href="https://www.instagram.com/nupec_oficial/"><i className="fab fa-instagram" /></Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Company links */}
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_70">
                <div className="widget-title"><h3>{t('companyTitle')}</h3></div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li><Link href={`${base}/nosotros`}>{t('nosotros')}</Link></li>
                    <li><Link href={`${base}/conciencia`}>{t('conciencia')}</Link></li>
                    <li><Link href={`${base}/contacto`}>{t('contacto')}</Link></li>
                    <li><Link href={`${base}/donde-comprar`}>{t('donde')}</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Product lines */}
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_70">
                <div className="widget-title"><h3>{t('linesTitle')}</h3></div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li><Link href={`${base}/nutricion-canina`}>{t('canina')}</Link></li>
                    <li><Link href={`${base}/nutricion-felina`}>{t('felina')}</Link></li>
                    <li><Link href={`${base}/nutricion-canina/nutricion-diaria`}>{t('daily')}</Link></li>
                    <li><Link href={`${base}/nutricion-canina/nutricion-especializada`}>{t('specialized')}</Link></li>
                    <li><Link href={`${base}/nutricion-canina/nutricion-clinica`}>{t('clinical')}</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget contact-widget">
                <div className="widget-title"><h3>{t('contactTitle')}</h3></div>
                <div className="widget-content">
                  <ul className="info-list clearfix">
                    <li>
                      <Image src="/assets/images/icons/icon-5.svg" alt="Email" width={20} height={15} priority />
                      <Link href={`mailto:${t('email')}`}>{t('email')}</Link>
                    </li>
                    <li>
                      <Image src="/assets/images/icons/icon-6.svg" alt="Phone" width={20} height={21} priority />
                      <Link href={`tel:${t('phone')}`}>{t('phone')}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-menu mt_60">
            <figure className="logo-box">
              <Link href={base}>
                <Image src="/assets/images/logo.png" alt="NUPEC" width={203} height={40} priority />
              </Link>
            </figure>
            <ul className="menu-list clearfix">
              <li><Link href={`${base}/nutricion-canina`}>{t('canina')}</Link></li>
              <li><Link href={`${base}/nutricion-felina`}>{t('felina')}</Link></li>
              <li><Link href={`${base}/nosotros`}>{t('nosotros')}</Link></li>
              <li><Link href={`${base}/contacto`}>{t('contacto')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom centred">
        <div className="auto-container">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
