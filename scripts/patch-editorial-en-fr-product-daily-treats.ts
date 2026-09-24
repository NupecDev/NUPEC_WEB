/**
 * NUPEC – Patch: contenido editorial EN/FR de 21 productos publicados del
 * lote "nutricion-diaria" + "premios-funcionales" (canino y felino).
 *
 * Continuación de scripts/patch-editorial-en-fr-category.ts. El contenido
 * vive en scripts/editorial-en-fr-product-daily-treats-content.ts (incluye
 * el detalle de las decisiones especiales tomadas en este lote: warnings,
 * y los 2 campos que el usuario corrigió manualmente en Sanity antes de
 * traducir — product-canino-senior no aparece porque ya estaba completo).
 *
 * `highTech`, `keyBenefits` y `claims` se fusionan por `_key` (nunca
 * reemplazan el array completo). `description` (rich text) y `kibble.description`
 * se escriben directo con `.set()` porque son objetos/arrays completos por
 * idioma, no requieren fusión por _key adicional.
 *
 * Uso:
 *   npx tsx scripts/patch-editorial-en-fr-product-daily-treats.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { PRODUCT_CONTENT_PATCHES } from "./editorial-en-fr-product-daily-treats-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n📝  Contenido editorial EN/FR — productos diaria + premios (${PRODUCT_CONTENT_PATCHES.length})\n`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of PRODUCT_CONTENT_PATCHES) {
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }
    if (p.id.startsWith("drafts.")) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): es un draft, se omite (nunca se escribe sobre drafts)`);
      continue;
    }

    const setOps: Record<string, unknown> = {};

    if (p.tagline) {
      setOps["tagline.en"] = p.tagline.en;
      setOps["tagline.fr"] = p.tagline.fr;
    }
    if (p.ingredients) {
      setOps["ingredients.en"] = p.ingredients.en;
      setOps["ingredients.fr"] = p.ingredients.fr;
    }
    if (p.warnings) {
      setOps["warnings.en"] = p.warnings.en;
      setOps["warnings.fr"] = p.warnings.fr;
    }
    if (p.highTechTitleOverride) {
      setOps["highTechTitleOverride.en"] = p.highTechTitleOverride.en;
      setOps["highTechTitleOverride.fr"] = p.highTechTitleOverride.fr;
    }
    if (p.description) {
      setOps["description.en"] = p.description.en;
      setOps["description.fr"] = p.description.fr;
    }
    if (p.kibbleDescription) {
      setOps["kibble.description.en"] = p.kibbleDescription.en;
      setOps["kibble.description.fr"] = p.kibbleDescription.fr;
    }

    // Arrays fusionados por _key — se verifica que el _key exista en el
    // documento actual antes de escribir, para no crear entradas fantasma.
    const mergeByKey = (
      arrayName: "highTech" | "keyBenefits" | "claims",
      items: Array<{ key: string; title?: { en: string; fr: string }; description?: { en: string; fr: string }; text?: { en: string; fr: string } }> | undefined
    ) => {
      if (!items || items.length === 0) return;
      const existing: Array<{ _key: string }> = (current as Record<string, unknown>)[arrayName] as Array<{ _key: string }> ?? [];
      for (const item of items) {
        const exists = existing.some((e) => e._key === item.key);
        if (!exists) {
          console.warn(`  ⚠️  ${p.id}: ${arrayName}._key "${item.key}" no existe en el documento, se omite ese item`);
          continue;
        }
        if (item.title) {
          setOps[`${arrayName}[_key=="${item.key}"].title.en`] = item.title.en;
          setOps[`${arrayName}[_key=="${item.key}"].title.fr`] = item.title.fr;
        }
        if (item.description) {
          setOps[`${arrayName}[_key=="${item.key}"].description.en`] = item.description.en;
          setOps[`${arrayName}[_key=="${item.key}"].description.fr`] = item.description.fr;
        }
        if (item.text) {
          setOps[`${arrayName}[_key=="${item.key}"].text.en`] = item.text.en;
          setOps[`${arrayName}[_key=="${item.key}"].text.fr`] = item.text.fr;
        }
      }
    };

    mergeByKey("highTech", p.highTech);
    mergeByKey("keyBenefits", p.keyBenefits);
    mergeByKey("claims", p.claims);

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
