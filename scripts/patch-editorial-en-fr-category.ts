/**
 * NUPEC – Patch: contenido editorial EN/FR de category.ts
 * (description, excerpt, complementaryText, stats[].label/description).
 *
 * Continuación de scripts/patch-seo-en-fr.ts: ese script ya cargó
 * seo.metaTitle/metaDescription y faq. Este cubre el resto del contenido
 * editorial de categorías, sin tocar ninguno de esos campos ni el `es`
 * existente.
 *
 * El contenido EN/FR vive en scripts/editorial-en-fr-category-content.ts.
 *
 * `stats` se fusiona por `_key` (nunca reemplaza el array completo), igual
 * que el patrón usado para `faq` en patch-seo-en-fr.ts.
 *
 * Uso:
 *   npx tsx scripts/patch-editorial-en-fr-category.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { CATEGORY_CONTENT_PATCHES } from "./editorial-en-fr-category-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n📝  Contenido editorial EN/FR — categorías (${CATEGORY_CONTENT_PATCHES.length})\n`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of CATEGORY_CONTENT_PATCHES) {
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    const setOps: Record<string, unknown> = {};

    if (p.description) {
      setOps["description.en"] = p.description.en;
      setOps["description.fr"] = p.description.fr;
    }
    if (p.excerpt) {
      setOps["excerpt.en"] = p.excerpt.en;
      setOps["excerpt.fr"] = p.excerpt.fr;
    }
    if (p.complementaryText) {
      setOps["complementaryText.en"] = p.complementaryText.en;
      setOps["complementaryText.fr"] = p.complementaryText.fr;
    }

    if (p.stats && p.stats.length > 0) {
      const existingStats: Array<{ _key: string }> =
        (current as { stats?: Array<{ _key: string }> }).stats ?? [];

      for (const s of p.stats) {
        const exists = existingStats.some((e) => e._key === s.key);
        if (!exists) {
          console.warn(`  ⚠️  ${p.id}: stats._key "${s.key}" no existe en el documento, se omite ese stat`);
          continue;
        }
        if (s.label) {
          setOps[`stats[_key=="${s.key}"].label.en`] = s.label.en;
          setOps[`stats[_key=="${s.key}"].label.fr`] = s.label.fr;
        }
        if (s.description) {
          setOps[`stats[_key=="${s.key}"].description.en`] = s.description.en;
          setOps[`stats[_key=="${s.key}"].description.fr`] = s.description.fr;
        }
      }
    }

    if (Object.keys(setOps).length === 0) {
      console.log(`  ⏭️   ${p.name}: sin cambios definidos, se omite`);
      continue;
    }

    await client.patch(p.id).set(setOps).commit();
    console.log(`  ✅  ${p.name} (${Object.keys(setOps).length} paths)`);
  }

  console.log("\n✔️  Listo.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
