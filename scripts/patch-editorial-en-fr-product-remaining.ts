/**
 * NUPEC – Patch: contenido editorial EN/FR de los 27 productos publicados
 * restantes (nutricion-especializada 14, suplementos 4, alimentos-humedos 9).
 *
 * Último tramo de product.ts. El contenido vive en
 * scripts/editorial-en-fr-product-remaining-content.ts (incluye el detalle
 * de las 4 correcciones de ES aplicadas antes de traducir).
 *
 * `highTech`, `keyBenefits` y `claims` se fusionan por `_key` (nunca
 * reemplazan el array completo). `name`, `tagline`, `description`,
 * `ingredients` y `kibble.description` se escriben directo con `.set()`.
 *
 * Uso:
 *   npx tsx scripts/patch-editorial-en-fr-product-remaining.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { PRODUCT_REMAINING_CONTENT_PATCHES } from "./editorial-en-fr-product-remaining-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n📝  Contenido editorial EN/FR — productos restantes (${PRODUCT_REMAINING_CONTENT_PATCHES.length})\n`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of PRODUCT_REMAINING_CONTENT_PATCHES) {
    if (p.id.startsWith("drafts.")) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): es un draft, se omite`);
      continue;
    }
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    const setOps: Record<string, unknown> = {};

    if (p.nameField) {
      setOps["name.en"] = p.nameField.en;
      setOps["name.fr"] = p.nameField.fr;
    }
    if (p.tagline) {
      setOps["tagline.en"] = p.tagline.en;
      setOps["tagline.fr"] = p.tagline.fr;
    }
    if (p.ingredients) {
      setOps["ingredients.en"] = p.ingredients.en;
      setOps["ingredients.fr"] = p.ingredients.fr;
    }
    if (p.description) {
      setOps["description.en"] = p.description.en;
      setOps["description.fr"] = p.description.fr;
    }
    if (p.kibbleDescription) {
      setOps["kibble.description.en"] = p.kibbleDescription.en;
      setOps["kibble.description.fr"] = p.kibbleDescription.fr;
    }

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
