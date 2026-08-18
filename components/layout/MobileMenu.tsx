'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type MobileMenuProps = {
  isSidebar: boolean;
  handleMobileMenu: () => void;
  handleSidebar: () => void;
};

export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }: MobileMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tContact = useTranslations('contacto.info');
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

  const toggleDropdown = (key: number) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(key);
    }
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={handleMobileMenu} />
        <div className="close-btn" onClick={handleMobileMenu}>
          <span className="far fa-times" />
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href={base}><Image src="/assets/images/logos/logo-white.jpg" alt="Logo Image" width={203} height={40} priority /></Link>
          </div>
          <div className="menu-outer">
            <ul className="navigation clearfix">

              {/* Nutrición Canina */}
              <li className={`dropdown ${activeDropdown === 1 ? "current" : ""}`}>
                <Link href={`${base}/nutricion-canina`}>{t('canina')}</Link>
                <ul style={{ display: activeDropdown === 1 ? "block" : "none" }}>
                  {caninaCategories.map(({ key, slug }) => (
                    <li key={slug}><Link href={`${base}/nutricion-canina/${slug}`}>{t(`sub.${key}`)}</Link></li>
                  ))}
                </ul>
                <div className={`dropdown-btn ${activeDropdown === 1 ? "open" : ""}`} onClick={() => toggleDropdown(1)}>
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Nutrición Felina */}
              <li className={`dropdown ${activeDropdown === 2 ? "current" : ""}`}>
                <Link href={`${base}/nutricion-felina`}>{t('felina')}</Link>
                <ul style={{ display: activeDropdown === 2 ? "block" : "none" }}>
                  {felinaCategories.map(({ key, slug }) => (
                    <li key={slug}><Link href={`${base}/nutricion-felina/${slug}`}>{t(`sub.${key}`)}</Link></li>
                  ))}
                </ul>
                <div className={`dropdown-btn ${activeDropdown === 2 ? "open" : ""}`} onClick={() => toggleDropdown(2)}>
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Nosotros */}
              <li className={`dropdown ${activeDropdown === 3 ? "current" : ""}`}>
                <Link href={`${base}/nosotros`}>{t('nosotros')}</Link>
                <ul style={{ display: activeDropdown === 3 ? "block" : "none" }}>
                  <li><Link href={`${base}/nosotros`}>{t('nosotros')}</Link></li>
                  <li><Link href={`${base}/conciencia`}>{t('conciencia')}</Link></li>
                  <li><Link href={`${base}/blog`}>{t('blog')}</Link></li>
                  <li>
                    <a href="https://nupec.com/adoptaunmextizo/" target="_blank" rel="noopener noreferrer">
                      {t('adopciones')}
                    </a>
                  </li>
                </ul>
                <div className={`dropdown-btn ${activeDropdown === 3 ? "open" : ""}`} onClick={() => toggleDropdown(3)}>
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Contacto */}
              <li><Link href={`${base}/contacto`}>{t('contacto')}</Link></li>

            </ul>
          </div>

          <div className="contact-info">
              <h4>{tFooter('contactTitle')}</h4>
              <ul>
                  <li>{tContact('locationText')}</li>
                  <li><Link href={`tel:${tFooter('phone')}`}>{tFooter('phone')}</Link></li>
                  <li><Link href={`mailto:${tFooter('email')}`}>{tFooter('email')}</Link></li>
              </ul>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <ul className="clearfix">
              <li><Link href="https://www.facebook.com/NUPEC.PREMIUM/"><span className="fab fa-facebook-square" /></Link></li>
              <li><Link href="https://www.instagram.com/nupec_oficial/"><span className="fab fa-instagram" /></Link></li>
            </ul>
          </div>

        </nav>
      </div>

      {/* Overlay */}
      <div
        className="nav-overlay"
        style={{ display: isSidebar ? "block" : "none" }}
        onClick={handleSidebar}
      />
    </>
  );
}
