# Registro: traducción EN/FR del contenido editorial (Sanity)

Continuación de `scripts/README-traduccion-seo.md` (SEO `seo.metaTitle`/
`seo.metaDescription` y `faq` de categorías/productos/páginas institucionales
— **ya completo**, no se repite aquí). Este archivo registra la traducción
del **resto** del contenido editorial de los schemas en `src/sanity/schemas/`.

Estado: **en curso, trabajando por lotes**.

## Inventario inicial (2026-09-18)

Antes de escribir contenido se hizo un inventario de solo lectura contra
Sanity (`production`) para confirmar qué documentos/campos ya tenían EN/FR
(parcial o completo) y cuáles campos ES tenían contenido real que traducir.
Resultado relevante:

- `blogPost`: 0 documentos — sin pendientes.
- `page` (institucional): SEO + FAQ ya completos EN/FR (del trabajo anterior)
  — sin pendientes de contenido editorial adicional (el schema no tiene otros
    campos de texto).
- `product`, `category`, `clinicalCase`, `feedingGuide`, `ingredient`: 0% de
  avance previo en los campos de contenido editorial (todo lo que tenía ES
  pendiente estaba vacío en EN/FR), con dos excepciones puntuales:
  - `product.name` ya estaba EN/FR en 55/57 productos.
  - La categoría `nutricion-diaria` (felino) ya tenía `complementaryText` y
    `excerpt` EN/FR; solo le faltaba `description`.
- Se encontró `drafts.category-felino-suplementos` (documento **sin publicar**,
  con `es`/`en`/`fr` ya completos en los campos que tiene). Por decisión del
  usuario, **se dejó fuera de todo el trabajo** — no se publica ni se toca.

### Corrección al inventario inicial (drafts)

El primer inventario contaba drafts y publicados como filas separadas del
mismo `_type`, sin distinguirlos. Se volvió a verificar explícitamente
`drafts.**` por tipo:

| Tipo | Drafts sin publicado (huérfanos) | Drafts con publicado (edición en curso) |
|---|---|---|
| `product` | 0 | 1 — `drafts.product-felino-creamy-treats-skin-coat` |
| `category` | 1 — `drafts.category-felino-suplementos` | 0 |
| `ingredient` | 1 — `drafts.dd2f4b1b-4330-45d4-a217-b4679ee516d7` | 0 |
| `clinicalCase` | 0 | 0 |
| `feedingGuide` | 0 | 0 |
| `blogPost` / `page` | 0 | 0 |

Criterio aplicado en todos los casos (confirmado con el usuario): **nunca se
trabaja sobre un draft**. Para el `product` con edición en curso, se traduce
solo la versión publicada; el draft con su contenido en/fr parcial se deja
intacto (si se publica más adelante, quien lo publique decide si conserva o
pisa esa traducción). El total real de productos publicados es **56**, no 57.

## Lote 1 — `category.ts` (contenido editorial, no-SEO) — 2026-09-18 ✅

Ámbito: 11 categorías publicadas (6 canino + 5 felino; excluye el draft
mencionado arriba). Campos: `description`, `excerpt`, `complementaryText`,
`stats[].label`/`stats[].description`. `name` no se tocó (ya estaba completo
en las 11).

- Contenido: `scripts/editorial-en-fr-category-content.ts`
- Aplicación: `scripts/patch-editorial-en-fr-category.ts` (patch por `_id`,
  paths específicos `.en`/`.fr`; `stats` fusionado por `_key`, nunca
  reemplaza el array)
- Verificado post-carga: las 11 categorías tienen `description`/`excerpt`/
  `complementaryText` completos en es/en/fr; los 2 `stats` (en
  `nutricion-especializada` felino) también.
- `es` no fue modificado (el script solo usa `.set()` sobre paths `en`/`fr`).

### Restricciones de contenido respetadas

- Traducción adaptada, no literal (EN mercado US, FR mercado francófono).
- "súper premium" → "super premium" (igual en ambos idiomas).
- Tono técnico-confiable en especializada/clínica; cercano-emocional en
  diaria/premios/húmedos/suplementos.
- `stats` fusionado por `_key` — se verificó con un dry-run previo que las
  `_key` (`ea2da1efdda1`, `3ec1e10ce6a8`) existían en el documento antes de
  aplicar el patch.

## Lote 2 — `product.ts`, nutrición diaria + premios funcionales — 2026-09-18 ✅

Ámbito: 21 productos publicados de las categorías `nutricion-diaria` y
`premios-funcionales` (canino y felino). El lote original tenía 22 productos
candidatos; `product-canino-senior` quedó fuera porque ya tenía todo
completo en es/en/fr (name, tagline, description, ingredients, highTech,
keyBenefits, kibble.description).

- Contenido: `scripts/editorial-en-fr-product-daily-treats-content.ts`
- Aplicación: `scripts/patch-editorial-en-fr-product-daily-treats.ts` (patch
  por `_id`; `highTech`/`keyBenefits`/`claims` fusionados por `_key`;
  `description` y `kibble.description` con `.set()` directo por ser
  objetos/arrays completos por idioma)
- Campos cubiertos (solo donde faltaba): `tagline`, `description` (rich
  text, misma estructura de blocks/marks que el ES), `ingredients`,
  `warnings`, `highTechTitleOverride`, `highTech[].title/description`,
  `keyBenefits[].description`, `claims[].text`.
- Verificado post-carga contra Sanity: los 21 productos tienen en/fr
  completos en cada campo que se tocó.

### Corrección al inventario fino (drafts y granularidad)

Al preparar este lote se detectó que el conteo inicial de "57 productos"
incluía por error el draft `drafts.product-felino-creamy-treats-skin-coat`
como fila separada de su publicado — son 56 productos publicados en total,
no 57 (ver tabla de drafts arriba). Además, el inventario agregado inicial
no mostraba huecos parciales dentro de un mismo documento (ej. un producto
con `description`/`ingredients` ya completos pero un item de `highTech[]`
con EN cargado y FR faltante, u otro item sin ninguno). Se hizo un
inventario fino campo-por-campo y `_key`-por-`_key` antes de traducir este
lote para no pisar contenido bueno ni dejar huecos.

### Decisiones especiales de este lote (con el usuario, en vivo)

1. **`warnings`**: sí se incluyó en el alcance de traducción (eran parte de
   la lista original de campos). Se tradujeron 6 productos con
   `warnings.es` pendiente: `product-canino-adulto-razas-mini`,
   `product-canino-cachorro-razas-mini`, `product-canino-cachorro-razas-pequenas`,
   `product-canino-senior-razas-mini`, `product-canino-senior-razas-pequenas`,
   `product-felino-felino-indoor`.
2. **`product-canino-senior`.ingredients**: tenía un error preexistente
   (texto en francés bajo la key `en`, ajeno a este trabajo). El usuario lo
   corrigió manualmente en Sanity antes de que se procesara el lote — no
   requirió ninguna acción del script.
3. **`product-felino-creamy-treats-joint-care`.description**: tenía un
   error preexistente (copy idéntico al de `digestive-care`, hablando de
   digestión en un producto articular). El usuario corrigió manualmente el
   `es` en Sanity (ahora describe correctamente salmón + Scutellaria
   baicalensis para articulaciones) antes de traducir; el EN/FR de este
   lote se generó sobre el `es` ya corregido.
4. **`product-felino-felino-indoor`, `highTech` item `86932af1374d`**
   (Yucca schidigera): el `title`/`description` en ES eran idénticos (solo
   repetía el nombre del ingrediente, sin explicar beneficio). El usuario
   reemplazó manualmente `description.es` por "Reduce la presencia de malos
   olores en las heces."; el EN/FR se generó sobre ese texto nuevo.

### Otros hallazgos señalados, sin acción (quedan documentados, no corregidos)

- `highTechTitleOverride` "Immunity Plus" (FELINO Senior): se mantuvo igual
  en EN/FR (nombre de sub-marca, no se traduce, mismo criterio que "NUPEC").
- Descripción duplicada entre `keyBenefits`/`claims` en "Relax Treats": es
  el mismo texto en dos secciones de la ficha, parece intencional (refuerza
  el mismo claim) — se tradujo igual en ambos lugares para mantener
  consistencia.
- Frase duplicada en el ES de un `highTech.description` ("COBRE") en
  "Adulto Razas Mini": se tradujo una sola vez en EN/FR en lugar de
  replicar la duplicación — no se tocó el ES original.

## Lote 3 — `ingredient.ts` (2 docs) + nota sobre `clinicalCase.ts` — 2026-09-18 ✅

Ámbito real: **2 ingredientes publicados** (Colina, Silimarina) — no 3 ni 5
como se estimó al agendar el lote. `drafts.dd2f4b1b-...` (Taurina) sigue
fuera por ser un draft sin publicar (mismo criterio que los demás drafts
huérfanos de este trabajo).

- Contenido: `scripts/editorial-en-fr-ingredient-content.ts`
- Aplicación: `scripts/patch-editorial-en-fr-ingredient.ts` (`keyPoints`
  fusionado por `_key`)
- Campos: `name`, `eyebrow`, `summary`, `keyPoints[].text`. `studies` y
  `badges` están vacíos (null) en ambos documentos — nada que traducir ahí.
- Verificado en seco antes de ejecutar: los 2 `_id` y las 4 `_key` de
  `keyPoints` existían en Sanity.

### Hallazgo — `clinicalCase.ts` es contenido demo, no real

Al revisar el contenido ES de los 2 documentos `clinicalCase` existentes
(`f5467ab6-...` "Otro caso clínico", `f6a4c86b-...` "Demo de un caso
clinico para HEPATIC"), se confirmó que es contenido de prueba, no casos
clínicos reales: texto como "El pug se mejoró y dominó el mundo.
Participando en la película de MIB", mismo nombre de veterinario genérico
repetido en ambos documentos. Estaban marcados `isPublished: true`.

Por decisión del usuario: **se cambió `isPublished` a `false` en ambos
documentos** (único cambio hecho sobre este tipo) y **no se tradujeron** —
quedan fuera del alcance de este trabajo hasta que exista contenido real de
casos clínicos.

## Lote 4 — `product.ts`, nutrición clínica — 2026-09-18 ✅

Ámbito: 7 productos publicados de la categoría `nutricion-clinica` (4
canino: Acute Hepatic, Cardiac, Hepatic, Hypoallergenic; 3 felino: FELINO
Cardiac, FELINO Hepatic, FELINO Hypoallergenic). Cifra corregida respecto a
la estimación original de "17" (mezclaba mal conteos de categorías
distintas; el real, consultado directamente en Sanity, es 4+3=7).

- Contenido: `scripts/editorial-en-fr-product-clinical-content.ts`
- Aplicación: `scripts/patch-editorial-en-fr-product-clinical.ts` — arrays
  fusionados por `_key` (`highTech`, `keyBenefits`, `claims`,
  `clinicalIndications`, `mechanismOfAction`, `differentiators` con
  `bullets[]` anidados por su propio `_key`, `problemSolution` con `_key`
  semánticas en texto como `"proteina"`/`"cobre"`/`"caquexia"`,
  `technicalResources`); `description`, `kibble.description` y los campos
  simples de `transitionGuide` con `.set()` directo.
- Campos cubiertos: `tagline`, `description` (rich text), `ingredients`,
  `warnings`, `claims[].text`, `clinicalIndications[].label`,
  `transitionGuide.*` (título/subtítulo/notas + `steps[].label`),
  `mechanismOfAction[].title/description`,
  `differentiators[].title/subtitle/bullets[].title/description`,
  `problemSolution[].problem/solution`, `technicalResources[].title/subtitle`
  (solo en los 4 productos que lo tienen: los 3 canino con PDF salvo
  Acute Hepatic, más FELINO Cardiac).
- Tono técnico-confiable, terminología veterinaria en inglés/francés
  estándar (hepatic/hépatique, renal/rénal, hypoallergenic/hypoallergénique).
- Dry-run confirmado antes de ejecutar: 7/7 documentos existen, 0 `_key`
  faltantes en ningún array (incluida la anidación de
  `differentiators.bullets`). Verificado post-carga: los 7 productos
  tienen en/fr completos en cada campo tocado.

### Decisiones especiales de este lote (con el usuario, en vivo)

1. **`warnings` de los 3 productos felinos**: el ES dice "cachorros"
   (terminología canina, error de copy-paste, no corregido en ES — fuera de
   alcance). Por decisión del usuario, la traducción EN/FR se adaptó a la
   especie correcta: EN "growing kittens" (no "puppies"), FR "chatons en
   croissance" (no "chiots"). Solo se ajustó la palabra de especie, el
   resto de la frase se mantuvo igual a la estructura canina.
2. **`problemSolution[]` con texto ES idéntico entre productos de distinta
   especie** (ej. FELINO Hepatic reutiliza el mismo ES que los caninos
   Hepatic/Acute Hepatic sin adaptar a fisiología felina; Cardiac y
   Hypoallergenic comparten texto ES entre su versión canina y felina): por
   decisión del usuario, se tradujo fielmente el ES tal cual, duplicado
   incluido, sin excluir ni adaptar nada — la corrección de fondo (si se
   decide) le corresponde al equipo de contenido, no a este trabajo de
   traducción.

### Otros hallazgos señalados, sin acción (quedan documentados)

- Claim de `product-canino-hypoallergenic` dice "cinco ingredientes
  funcionales" pero enumera solo 4 — se tradujo "cinco/five/cinq" tal cual,
  preservando la inconsistencia del ES.
- `ingredients` de `product-felino-felino-cardiac` incluye "Silimarina"
  (coincide casi textualmente con `product-felino-felino-hepatic`) aunque
  ningún claim/differentiator de Cardiac menciona función hepatoprotectora
  — posible residuo de copiar la lista de un producto hepático. No
  corregido.
- `transitionGuide.steps` de `product-felino-felino-cardiac` tiene un
  posible typo de pluralización ES ("Días 10" en vez de "Día 10", a
  diferencia de los demás productos del lote) — invisible en la traducción
  EN/FR ("Day 10"/"Jour 10"), señalado para corrección del ES si se desea.
- Ausencia inconsistente de `transitionGuide.noteText` entre productos
  (presente en Cardiac/Hepatic ambas especies, ausente en Acute Hepatic e
  Hypoallergenic ambas especies) — no se agregó donde no existía en ES,
  según la regla de no inventar contenido.

## Pendiente (siguientes lotes)

- `product.ts`: quedan ~28 productos (56 publicados totales − 21 del lote 2
  − 7 del lote 4, aprox., sujeto a inventario fino):
  - **nutrición especializada + suplementos + alimentos húmedos** (el
    resto, ambas especies): mismos campos base que el lote 2 (`tagline`,
    `description`, `ingredients`, `warnings`, `claims[].text`,
    `highTech[].title/description`, `keyBenefits[].description`,
    `kibble.description`), sin los campos exclusivos de clínica.
  - Más los 2 productos con `name` aún sin EN/FR (fuera del alcance
    original del lote 2 — confirmar cuáles siguen pendientes con un
    inventario fino antes de ese lote).
- `clinicalCase.ts`: sin pendientes por ahora — ver hallazgo del lote 3
  (contenido demo, despublicado, no se traduce hasta tener casos reales).
- `feedingGuide.ts`: 43 documentos — `notes`, `secondaryTitle`,
  `secondaryWeightColumnLabel`, `secondaryNotes`,
  `secondaryColumnGroups[].label`/`subColumns[].label`, `variants[].label`.
- `ingredient.ts`: completo (lote 3). Si se publica `drafts.dd2f4b1b-...`
  (Taurina) más adelante, faltará traducirlo.

## Notas técnicas

- Dataset de Sanity: `production` (mismo usado por los scripts `patch-seo-*`).
- Patrón seguido en todos los scripts de este trabajo: cliente `@sanity/client`
  con credenciales de `.env.local`, contenido separado en un archivo de datos
  (`editorial-en-fr-<schema>-content.ts`), aplicación con
  `.patch(id).set({...}).commit()` usando paths específicos, y fusión por
  `_key` en cualquier array existente (nunca se reemplaza un array completo).
- Antes de cada lote se presenta el mapeo ES→EN→FR completo para revisión, y
  se corre una verificación en seco (existencia de `_id`/`_key`) antes de
  ejecutar el patch real.
