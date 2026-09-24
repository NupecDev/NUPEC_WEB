import { Children, Fragment, type ReactNode } from 'react';
import { useLocale } from 'next-intl';
import type { PortableTextComponents } from 'next-sanity';

/*
  Agrega la marca registrada como superíndice a cada mención de "NUPEC":
  "MR" en español y "®" en inglés y francés.
  Funciona para textos de los diccionarios y de Sanity. Si el texto ya trae
  "NUPEC®" o "NUPECMR", se normaliza para no duplicar la marca. No distingue
  mayúsculas ("Nupec" también aplica) y respeta cómo está escrita la marca.
  Se ignoran URLs y correos (nupec.com, nupec@...).
*/
const BRAND_PATTERN = /(?<![\w./@-])(nupec)(?:®|MR)?(?![\w@]|\.\w)/gi;

// Símbolo de marca registrada por idioma.
export function brandSymbol(locale: string): string {
  return locale === 'es' ? 'MR' : '®';
}

function brandMarkClass(locale: string): string {
  return locale === 'es' ? 'brand-mr' : 'brand-mr brand-mr--symbol';
}

export function BrandMark() {
  const locale = useLocale();
  return <sup className={brandMarkClass(locale)}>{brandSymbol(locale)}</sup>;
}

export function withBrandMark(text: string | null | undefined): ReactNode {
  if (!text) return text;
  // Con el grupo de captura, split intercala [texto, marca, texto, marca, ...]
  const parts = text.split(BRAND_PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    i % 2 === 0 ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <Fragment key={i}>
        {part}
        <BrandMark />
      </Fragment>
    ),
  );
}

/*
  Variante para textos de Sanity que traen HTML literal (p. ej. un editor que
  escribió "NUPEC<sup>MR</sup>"). Quita el superíndice manual y agrega el de la
  marca solo en el texto, nunca dentro de las etiquetas o sus atributos.
*/
const MANUAL_SUP_PATTERN = /(nupec)\s*<sup[^>]*>\s*(?:MR|®)\s*<\/sup>/gi;

export function brandMarkHtml(html: string, locale: string): string {
  const mark = `<sup class="${brandMarkClass(locale)}">${brandSymbol(locale)}</sup>`;
  return html
    .replace(MANUAL_SUP_PATTERN, '$1')
    .split(/(<[^>]+>)/)
    .map((part) =>
      part.startsWith('<')
        ? part
        : part.replace(BRAND_PATTERN, `$1${mark}`),
    )
    .join('');
}

// Aplica la marca a los textos sueltos dentro de children ya renderizados.
function brandChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) =>
    typeof child === 'string' ? withBrandMark(child) : child,
  );
}

/*
  Componentes para <PortableText> que agregan la marca en párrafos, títulos,
  listas y texto con formato (negritas, itálicas, links).
*/
export const brandPortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{brandChildren(children)}</p>,
    h2: ({ children }) => <h2>{brandChildren(children)}</h2>,
    h3: ({ children }) => <h3>{brandChildren(children)}</h3>,
    h4: ({ children }) => <h4>{brandChildren(children)}</h4>,
    blockquote: ({ children }) => <blockquote>{brandChildren(children)}</blockquote>,
  },
  listItem: ({ children }) => <li>{brandChildren(children)}</li>,
  marks: {
    strong: ({ children }) => <strong>{brandChildren(children)}</strong>,
    em: ({ children }) => <em>{brandChildren(children)}</em>,
    underline: ({ children }) => <u>{brandChildren(children)}</u>,
    link: ({ children, value }) => (
      <a href={(value as { href?: string } | undefined)?.href}>{brandChildren(children)}</a>
    ),
  },
};

type BrandTextProps = {
  children: string | null | undefined;
};

export default function BrandText({ children }: BrandTextProps) {
  return <>{withBrandMark(children)}</>;
}
