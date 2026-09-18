# Historial: plan SEO/AEO de NUPEC (ES completado, EN/FR completado)

Este archivo queda como registro de cómo se ejecutó el plan de SEO/AEO.
Las tres fases están **completas**.

## Contexto

- **Fase 1** (técnica): `generateMetadata()` dinámico, canonical + hreflang (es/en/fr),
  Open Graph/Twitter, JSON-LD (`Organization`, `Product`, `BreadcrumbList`, `FAQPage`),
  `sitemap.ts`, `robots.ts`. Helper central en `src/lib/seo.ts`.
- **Fase 2** (schema): Sanity tiene el campo `seo` (`metaTitle`/`metaDescription`/
  `canonicalOverride`/`noIndex`, todos ES/EN/FR) en `product`, `category`, `page` y
  `blogPost`, más un campo `faq` (pregunta/respuesta ES/EN/FR) en `category`, `page`
  y `blogPost` para AEO (FAQPage JSON-LD).
- **Contenido ES**: redactado y cargado a Sanity (producción):
  - 11 categorías (6 líneas × canino/felino, felino no tiene "suplementos")
  - 55 de 56 productos activos (el producto "Cachorro" canino ya tenía copy propio
    y se dejó intacto)
  - 3 páginas institucionales (`nosotros`, `conciencia`, `contacto`), cada una con
    meta título/descripción + FAQ (2-3 preguntas c/u)
- **Contenido EN/FR**: redactado (traducción adaptada, no literal) y cargado a
  Sanity (producción) el 2026-09-18:
  - Mismos 11 categorías + 55 productos → `seo.metaTitle`/`seo.metaDescription`
  - Mismas 3 páginas institucionales → `seo.metaTitle`/`seo.metaDescription` +
    8 FAQ (question/answer), fusionadas por `_key` sobre el FAQ ES existente
    (sin pisar el texto en español)

Scripts usados (quedaron en el repo como registro):
- `scripts/patch-seo-es.ts` — categorías y productos, copy ES
- `scripts/seed-seo-paginas-institucionales.ts` — páginas institucionales ES
  (también crea los documentos `page` si no existen, con `createIfNotExists`)
- `scripts/seo-en-fr-content.ts` — contenido EN/FR (categorías, productos, páginas + FAQ)
- `scripts/seo-en-fr-check-lengths.ts` — valida meta título ≤60 / meta descripción
  ≤155 caracteres antes de cargar a Sanity
- `scripts/patch-seo-en-fr.ts` — aplica el contenido EN/FR a Sanity (usa los
  mismos `_id` que `patch-seo-es.ts` / `seed-seo-paginas-institucionales.ts`)

### Restricciones respetadas (ES y EN/FR)

- Meta título ≤ 60 caracteres
- Meta descripción ≤ 155 caracteres
- Posicionamiento de marca: **"súper premium"** ("super premium" en EN/FR) —
  aplicado sobre todo en nutrición diaria y alimentos húmedos, en ambas especies
- Tono: técnico-confiable en nutrición especializada/clínica; cercano-emocional en
  diaria/premios/húmedos/suplementos
- Traducción adaptada (no literal) al idioma (EN para mercado US, FR para mercado
  francófono), manteniendo el mismo significado y beneficio clave
- Traducción, no localización de precios/regulación — es solo copy de marketing/SEO

## Notas técnicas

- `.env.local` tiene `NEXT_PUBLIC_SITE_URL=https://nupec.com` (agregado en la Fase 1)
- Dataset de Sanity: `production` (mismo usado por todos los scripts `patch-*`/`seed-*`)
- El campo `seo` en `productBySlugQuery` y `categoryBySlugQuery`
  (`src/lib/sanity/queries.ts`) proyecta `seo.metaTitle[$lang]` — como EN/FR ya
  están cargados en Sanity, `generateMetadata()` los sirve automáticamente sin
  tocar código, porque ya lee el idioma dinámico vía `$lang`.

## Pendientes / posibles siguientes pasos

- Revisión editorial humana del copy EN/FR (tono de marca, matices regionales)
  antes de considerarlo definitivo, si el cliente lo requiere.
- Verificar en Search Console / herramientas SEO que los meta EN/FR se están
  sirviendo correctamente en producción tras el próximo deploy.
