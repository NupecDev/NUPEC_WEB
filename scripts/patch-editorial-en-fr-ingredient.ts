/**
 * NUPEC – Patch: contenido editorial EN/FR de ingredient.ts (2 documentos
 * publicados: Colina, Silimarina).
 *
 * El contenido vive en scripts/editorial-en-fr-ingredient-content.ts.
 * `keyPoints` se fusiona por `_key` (nunca reemplaza el array completo).
 *
 * Uso:
 *   npx tsx scripts/patch-editorial-en-fr-ingredient.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { INGREDIENT_CONTENT_PATCHES } from "./editorial-en-fr-ingredient-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n📝  Contenido editorial EN/FR — ingredientes (${INGREDIENT_CONTENT_PATCHES.length})\n`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of INGREDIENT_CONTENT_PATCHES) {
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
    if (p.eyebrow) {
      setOps["eyebrow.en"] = p.eyebrow.en;
      setOps["eyebrow.fr"] = p.eyebrow.fr;
    }
    if (p.summary) {
      setOps["summary.en"] = p.summary.en;
      setOps["summary.fr"] = p.summary.fr;
    }

    if (p.keyPoints && p.keyPoints.length > 0) {
      const existing: Array<{ _key: string }> =
        (current as { keyPoints?: Array<{ _key: string }> }).keyPoints ?? [];
      for (const kp of p.keyPoints) {
        const exists = existing.some((e) => e._key === kp.key);
        if (!exists) {
          console.warn(`  ⚠️  ${p.id}: keyPoints._key "${kp.key}" no existe en el documento, se omite`);
          continue;
        }
        setOps[`keyPoints[_key=="${kp.key}"].text.en`] = kp.text.en;
        setOps[`keyPoints[_key=="${kp.key}"].text.fr`] = kp.text.fr;
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
