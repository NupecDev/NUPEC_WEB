/**
 * NUPEC – Patch: meta título, meta descripción (EN/FR) de las 11 categorías
 * y 55 productos activos, más meta título, meta descripción y FAQ (EN/FR)
 * de las 3 páginas institucionales (nosotros, conciencia, contacto), para
 * el plan de posicionamiento SEO/AEO.
 *
 * Complementa scripts/patch-seo-es.ts y
 * scripts/seed-seo-paginas-institucionales.ts (copy ES ya cargado en
 * producción). Usa los mismos `_id` de Sanity que esos scripts.
 *
 * El contenido EN/FR vive en scripts/seo-en-fr-content.ts.
 *
 * Uso:
 *   npx tsx scripts/patch-seo-en-fr.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { CATEGORY_PATCHES, PRODUCT_PATCHES, PAGE_PATCHES } from "./seo-en-fr-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function applySeoPatches(
  patches: typeof CATEGORY_PATCHES,
  label: string
) {
  console.log(`\n📝  ${label} (${patches.length})\n`);

  for (const p of patches) {
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    await client
      .patch(p.id)
      .set({
        "seo.metaTitle.en": p.en.metaTitle,
        "seo.metaDescription.en": p.en.metaDescription,
        "seo.metaTitle.fr": p.fr.metaTitle,
        "seo.metaDescription.fr": p.fr.metaDescription,
      })
      .commit();

    console.log(`  ✅  ${p.name}`);
  }
}

async function applyPagePatches() {
  console.log(`\n📝  Páginas institucionales (${PAGE_PATCHES.length})\n`);

  for (const p of PAGE_PATCHES) {
    const current = await client.getDocument(p.docId);
    if (!current) {
      console.warn(`  ⚠️  ${p.docId} (${p.pageId}): documento no encontrado, se omite`);
      continue;
    }

    // El FAQ ya existe (creado por seed-seo-paginas-institucionales.ts con
    // ES) — hay que fusionar EN/FR en las mismas _key en lugar de
    // reemplazar el array, para no perder el texto ES.
    const existingFaq: Array<{ _key: string }> =
      (current as { faq?: Array<{ _key: string }> }).faq ?? [];

    const faqPatches = p.en.faq.reduce<Record<string, unknown>>((acc, item, i) => {
      const key = existingFaq[i]?._key ?? `faq-${i}`;
      acc[`faq[_key=="${key}"].question.en`] = item.question;
      acc[`faq[_key=="${key}"].answer.en`] = item.answer;
      acc[`faq[_key=="${key}"].question.fr`] = p.fr.faq[i].question;
      acc[`faq[_key=="${key}"].answer.fr`] = p.fr.faq[i].answer;
      return acc;
    }, {});

    await client
      .patch(p.docId)
      .set({
        "seo.metaTitle.en": p.en.metaTitle,
        "seo.metaDescription.en": p.en.metaDescription,
        "seo.metaTitle.fr": p.fr.metaTitle,
        "seo.metaDescription.fr": p.fr.metaDescription,
        ...faqPatches,
      })
      .commit();

    console.log(`  ✅  ${p.pageId} (${p.en.faq.length} FAQ)`);
  }
}

async function run() {
  console.log(`\n🐾  NUPEC – Patch: SEO (EN/FR) categorías, productos y páginas`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);

  await applySeoPatches(CATEGORY_PATCHES, "Categorías");
  await applySeoPatches(PRODUCT_PATCHES, "Productos");
  await applyPagePatches();

  console.log(`\n✔️  Patch EN/FR completo.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
