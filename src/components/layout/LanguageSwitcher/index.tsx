'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const LANGS = ['es', 'en', 'fr'] as const;

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = params.lang as string;

  function getHref(targetLang: string) {
    return pathname.replace(`/${currentLang}`, `/${targetLang}`);
  }

  return (
    <ul className="lang-switcher">
      {LANGS.map((lang, i) => (
        <li key={lang}>
          {lang === currentLang ? (
            <span className="lang-switcher__active">{lang.toUpperCase()}</span>
          ) : (
            <Link href={getHref(lang)}>{lang.toUpperCase()}</Link>
          )}
          {i < LANGS.length - 1 && <span className="lang-switcher__sep">/</span>}
        </li>
      ))}
    </ul>
  );
}
