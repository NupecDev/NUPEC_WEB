/**
 * NUPEC – Patch: Guía de Alimentación "Felino Kitten" (felino)
 *
 * El documento (id e2d0aeba-cc01-4def-b6e1-ac69e07c6a00) ya tenía la tabla
 * principal (peso gatito, 5 filas) y la tabla secundaria agrupada
 * (Gestación/Lactación, 7 filas) correctas y coincidiendo con la ficha
 * técnica, pero la tabla principal:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no incluía las tazas/día (dailyAmount solo tenía gramos)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Este patch reescribe solo `rows` (peso gatito) con _type correcto,
 * dailyAmount con gramos + tazas, y los campos numéricos encadenados entre
 * puntos consecutivos (ej. fila "0.6 kg" cubre el tramo 0.6–1.0 kg,
 * 40–60 g) para que la calculadora interpole linealmente. El último punto
 * (2.0 kg) queda con weightMin === weightMax.
 *
 * No toca secondaryColumnGroups/secondaryTableRows/secondaryTitle/
 * secondaryWeightColumnLabel (tabla de Gestación/Lactación de la madre),
 * que ya está correcta.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-felino-kitten.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const FEEDING_GUIDE_ID = "e2d0aeba-cc01-4def-b6e1-ac69e07c6a00";

type Point = { weight: number; grams: number; cups: string };

const GATITO: Point[] = [
  { weight: 0.3, grams: 30, cups: "1/4" },
  { weight: 0.6, grams: 40, cups: "2/5" },
  { weight: 1.0, grams: 60, cups: "3/5" },
  { weight: 1.5, grams: 70, cups: "2/3" },
  { weight: 2.0, grams: 80, cups: "4/5" },
];

const rows = GATITO.map((p, i) => {
  const next = GATITO[i + 1];
  const weightMax = next ? next.weight : p.weight;
  const amountMax = next ? next.grams : p.grams;
  return {
    _type: "feedingRow" as const,
    _key: `gatito-${p.weight}`,
    label: "Gatito",
    weightRange: `${p.weight} kg`,
    dailyAmount: `${p.grams} g (${p.cups} taza)`,
    weightMin: p.weight,
    weightMax,
    amountMin: p.grams,
    amountMax,
  };
});

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Felino Kitten (felino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows (${rows.length}) actualizado (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows }).commit();
    console.log(`  ✅  ${draftId}: rows actualizado (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
