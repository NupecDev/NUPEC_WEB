'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import MobileMenu from '../../../../components/layout/MobileMenu';
import LanguageSwitcher from '../LanguageSwitcher';

type HeaderProps = {
  scroll: boolean;
  handleMobileMenu: () => void;
};

export default function Header({ scroll, handleMobileMenu }: HeaderProps) {
  const t = useTranslations('nav');
  const params = useParams();
  const lang = params.lang as string;
  const base = `/${lang}`;

  const caninaCategories = [
    { key: 'daily', slug: 'nutricion-diaria' },
    { key: 'specialized', slug: 'nutricion-especializada' },
    { key: 'clinical', slug: 'nutricion-clinica' },
    { key: 'treats', slug: 'premios-funcionales' },
    { key: 'supplements', slug: 'suplementos' },
    { key: 'wet', slug: 'alimentos-humedos' },
  ] as const;

  // Suplementos omitido: aún no hay productos felinos en esta categoría
  const felinaCategories = [
    { key: 'daily', slug: 'nutricion-diaria' },
    { key: 'specialized', slug: 'nutricion-especializada' },
    { key: 'clinical', slug: 'nutricion-clinica' },
    { key: 'treats', slug: 'premios-funcionales' },
    { key: 'wet', slug: 'alimentos-humedos' },
  ] as const;

  const Nav = () => (
    <ul className="navigation clearfix">
      {/* <li className="current">
        <Link href={base}>{lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home'}</Link>
      </li> */}
      <li className="dropdown">
        <Link href={`${base}/nutricion-canina`}>{t('canina')}</Link>
        <ul>
          {caninaCategories.map(({ key, slug }) => (
            <li key={slug}>
              <Link href={`${base}/nutricion-canina/${slug}`}>{t(`sub.${key}`)}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="dropdown">
        <Link href={`${base}/nutricion-felina`}>{t('felina')}</Link>
        <ul>
          {felinaCategories.map(({ key, slug }) => (
            <li key={slug}>
              <Link href={`${base}/nutricion-felina/${slug}`}>{t(`sub.${key}`)}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="dropdown">
        <Link href={`${base}/nosotros`}>{t('nosotros')}</Link>
        <ul>
          <li><Link href={`${base}/nosotros`}>{t('nosotros')}</Link></li>
          <li><Link href={`${base}/conciencia`}>{t('conciencia')}</Link></li>
          <li>
            <a href="https://nupec.com/adoptaunmextizo/" target="_blank" rel="noopener noreferrer">
              {t('adopciones')}
            </a>
          </li>
        </ul>
      </li>
      <li><Link href={`${base}/contacto`}>{t('contacto')}</Link></li>
    </ul>
  );

  return (
    <>
      <header className={`main-header ${scroll ? 'fixed-header' : ''}`}>
        <div className="header-lower">
          <div className="outer-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link href={base}>
                    <Image
                      src="/assets/images/logo.png"
                      alt="NUPEC"
                      width={203}
                      height={40}
                      priority
                    />
                  </Link>
                </figure>
              </div>

              <div className="menu-area">
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>
                <nav className="main-menu navbar-expand-md navbar-light clearfix">
                  <div className="collapse navbar-collapse show clearfix">
                    <Nav />
                  </div>
                </nav>
              </div>

              <div className="menu-right-content">
                <LanguageSwitcher />
                <div className="btn-box">
                  <Link href={`${base}/encuentra-tu-alimento`} className="theme-btn btn-one">
                    <span>{t('findFood')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`sticky-header ${scroll ? 'animated slideInDown' : ''}`}>
          <div className="outer-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link href={base}>
                    <Image
                      src="/assets/images/logo.png"
                      alt="NUPEC"
                      width={203}
                      height={40}
                      priority
                    />
                  </Link>
                </figure>
              </div>
              <div className="menu-area">
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>
                <nav className="main-menu navbar-expand-md navbar-light clearfix">
                  <div className="collapse navbar-collapse show clearfix">
                    <Nav />
                  </div>
                </nav>
              </div>
              <div className="menu-right-content">
                <LanguageSwitcher />
                <div className="btn-box">
                  <Link href={`${base}/encuentra-tu-alimento`} className="theme-btn btn-one">
                    <span>{t('findFood')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu
          isSidebar={false}
          handleMobileMenu={handleMobileMenu}
          handleSidebar={() => {}}
        />
      </header>
    </>
  );
}
