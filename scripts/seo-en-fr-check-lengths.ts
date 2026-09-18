/**
 * NUPEC – Valida que todos los metaTitle (≤60 chars) y metaDescription
 * (≤155 chars) EN/FR en scripts/seo-en-fr-content.ts cumplan los límites
 * del plan SEO/AEO. No toca Sanity, solo valida el contenido en memoria.
 *
 * Uso:
 *   npx tsx scripts/seo-en-fr-check-lengths.ts
 */

import { CATEGORY_PATCHES, PRODUCT_PATCHES, PAGE_PATCHES } from "./seo-en-fr-content";

let violations = 0;

function check(id: string, name: string, lang: string, field: string, value: string, max: number) {
  if (value.length > max) {
    violations++;
    console.log(`❌ [${lang}] ${id} (${name}) ${field}: ${value.length}/${max} chars\n   "${value}"`);
  }
}

for (const p of [...CATEGORY_PATCHES, ...PRODUCT_PATCHES]) {
  check(p.id, p.name, "EN", "metaTitle", p.en.metaTitle, 60);
  check(p.id, p.name, "EN", "metaDescription", p.en.metaDescription, 155);
  check(p.id, p.name, "FR", "metaTitle", p.fr.metaTitle, 60);
  check(p.id, p.name, "FR", "metaDescription", p.fr.metaDescription, 155);
}

for (const p of PAGE_PATCHES) {
  check(p.docId, p.pageId, "EN", "metaTitle", p.en.metaTitle, 60);
  check(p.docId, p.pageId, "EN", "metaDescription", p.en.metaDescription, 155);
  check(p.docId, p.pageId, "FR", "metaTitle", p.fr.metaTitle, 60);
  check(p.docId, p.pageId, "FR", "metaDescription", p.fr.metaDescription, 155);
}

console.log(
  violations === 0
    ? "\n✅ Todas las longitudes OK"
    : `\n⚠️  ${violations} violaciones encontradas`
);
