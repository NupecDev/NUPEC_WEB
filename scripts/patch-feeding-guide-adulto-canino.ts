/**
 * NUPEC – Patch: Guía de Alimentación "Adulto" (canino)
 *
 * Corrige y completa las filas de la tabla de alimentación (feedingGuide)
 * del producto Adulto canino, según la ficha técnica (guía de alimentación
 * impresa, 1 taza de 8 oz / 225 ml = 95 g de NUPEC® ADULTO).
 *
 * Reemplaza el array `rows` completo (solo tenía 2 de 11 filas, con datos
 * mal formateados) por las 11 filas correctas, incluyendo weightMin/Max y
 * amountMin/Max numéricos para que la calculadora de ración interpole bien.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-adulto-canino.ts
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

const FEEDING_GUIDE_ID = "17c748a5-bade-480b-a259-25d06f0b134f";

const rows = [
  { weightRange: "1 - 3 kg", dailyAmount: "40 - 85 g (1/2 a 1 taza)", weightMin: 1, weightMax: 3, amountMin: 40, amountMax: 85 },
  { weightRange: "3 - 5 kg", dailyAmount: "90 - 120 g (1 a 1 1/4 tazas)", weightMin: 3, weightMax: 5, amountMin: 90, amountMax: 120 },
  { weightRange: "5 - 10 kg", dailyAmount: "120 - 190 g (1 1/4 a 2 tazas)", weightMin: 5, weightMax: 10, amountMin: 120, amountMax: 190 },
  { weightRange: "10 - 15 kg", dailyAmount: "190 - 250 g (2 a 2 1/2 tazas)", weightMin: 10, weightMax: 15, amountMin: 190, amountMax: 250 },
  { weightRange: "15 - 20 kg", dailyAmount: "250 - 305 g (2 1/2 a 3 1/4 tazas)", weightMin: 15, weightMax: 20, amountMin: 250, amountMax: 305 },
  { weightRange: "20 - 30 kg", dailyAmount: "305 - 400 g (3 1/4 a 4 1/4 tazas)", weightMin: 20, weightMax: 30, amountMin: 305, amountMax: 400 },
  { weightRange: "30 - 40 kg", dailyAmount: "400 - 485 g (4 1/4 a 5 tazas)", weightMin: 30, weightMax: 40, amountMin: 400, amountMax: 485 },
  { weightRange: "40 - 50 kg", dailyAmount: "485 - 565 g (5 a 6 tazas)", weightMin: 40, weightMax: 50, amountMin: 485, amountMax: 565 },
  { weightRange: "50 - 60 kg", dailyAmount: "565 - 635 g (6 a 6 3/4 tazas)", weightMin: 50, weightMax: 60, amountMin: 565, amountMax: 635 },
  { weightRange: "60 - 70 kg", dailyAmount: "635 - 700 g (6 3/4 a 7 1/4 tazas)", weightMin: 60, weightMax: 70, amountMin: 635, amountMax: 700 },
  { weightRange: "70 - 80 kg", dailyAmount: "700 - 770 g (7 1/4 a 8 tazas)", weightMin: 70, weightMax: 80, amountMin: 700, amountMax: 770 },
].map((row, i) => ({
  _type: "feedingRow" as const,
  _key: `adulto-row-${i + 1}`,
  ...row,
}));

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Adulto (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows actualizado con ${rows.length} filas (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows }).commit();
    console.log(`  ✅  ${draftId}: rows actualizado con ${rows.length} filas (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
