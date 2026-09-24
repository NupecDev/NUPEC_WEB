import { Fragment, type ReactNode } from 'react';

/*
  Agrega la marca registrada (MR) como superíndice a cada mención de "NUPEC".
  Funciona para textos de los diccionarios y de Sanity. Si el texto ya trae
  "NUPEC®" o "NUPECMR", se normaliza para no duplicar la marca. No distingue
  mayúsculas ("Nupec" también aplica) y respeta cómo está escrita la marca.
  Se ignoran URLs y correos (nupec.com, nupec@...).
*/
const BRAND_PATTERN = /(?<![\w./@-])(nupec)(?:®|MR)?(?![\w@]|\.\w)/gi;

export function BrandMark() {
  return <sup className="brand-mr">MR</sup>;
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

type BrandTextProps = {
  children: string | null | undefined;
};

export default function BrandText({ children }: BrandTextProps) {
  return <>{withBrandMark(children)}</>;
}
