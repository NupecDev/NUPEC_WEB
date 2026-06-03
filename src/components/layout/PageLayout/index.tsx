'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '../../../../components/elements/BackToTop';
import DataBg from '../../../../components/elements/DataBg';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu((prev) => {
      const next = !prev;
      next
        ? document.body.classList.add('mobile-menu-visible')
        : document.body.classList.remove('mobile-menu-visible');
      return next;
    });
  };

  useEffect(() => {
    (async () => {
      // @ts-expect-error: wowjs has no types
      const { WOW } = await import('wowjs');
      new WOW({ live: false }).init();
    })();

    const onScroll = () => setIsScrolled(window.scrollY > 100);
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
      document.body.classList.remove('mobile-menu-visible');
    };
  }, []);

  return (
    <>
      <DataBg />
      <div className="page-wrapper" id="top">
        <Header scroll={isScrolled} handleMobileMenu={handleMobileMenu} />
        {children}
        <Footer />
      </div>
      <BackToTop scroll={isScrolled} />
    </>
  );
}
