/**
 * NUPEC – Patch: Guía de Alimentación "Digestive Health" (canino)
 *
 * El producto ya estaba vinculado a un documento feedingGuide
 * (feedingguide-canino-digestive-health), pero el documento estaba vacío
 * (sin rows/variants).
 *
 * Este patch llena:
 *   - rows        = "Condición Corporal Normal" (tabla principal / default)
 *   - variants[0] = "Condición Corporal Delgada"
 *
 * Cada fila es un punto de la ficha técnica (1, 3, 5, 10, 15, 20, 30... 80
 * kg). Para que la calculadora interpole linealmente entre puntos
 * consecutivos, weightMin/weightMax y amountMin/amountMax de cada fila se
 * encadenan con el siguiente punto (ej. fila "20 kg" cubre el tramo 20–30
 * kg). El último punto (80 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-digestive-health.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-digestive-health";

type Point = { weight: number; grams: number; cups: string };

const NORMAL: Point[] = [
  { weight: 1, grams: 40, cups: "2/5" },
  { weight: 3, grams: 90, cups: "4/5" },
  { weight: 5, grams: 130, cups: "1 1/4" },
  { weight: 10, grams: 170, cups: "1 2/3" },
  { weight: 15, grams: 230, cups: "2 1/5" },
  { weight: 20, grams: 285, cups: "2 3/4" },
  { weight: 30, grams: 390, cups: "3 3/4" },
  { weight: 40, grams: 480, cups: "4 3/5" },
  { weight: 50, grams: 570, cups: "5 1/2" },
  { weight: 60, grams: 650, cups: "6 1/5" },
  { weight: 70, grams: 730, cups: "7" },
  { weight: 80, grams: 810, cups: "7 3/4" },
];

const DELGADA: Point[] = [
  { weight: 1, grams: 50, cups: "1/2" },
  { weight: 3, grams: 110, cups: "1 1/5" },
  { weight: 5, grams: 160, cups: "1 1/2" },
  { weight: 10, grams: 205, cups: "2" },
  { weight: 15, grams: 280, cups: "2 2/3" },
  { weight: 20, grams: 345, cups: "3 1/3" },
  { weight: 30, grams: 465, cups: "4 1/2" },
  { weight: 40, grams: 575, cups: "5 1/2" },
  { weight: 50, grams: 680, cups: "6 1/2" },
  { weight: 60, grams: 780, cups: "7 1/2" },
  { weight: 70, grams: 875, cups: "8 1/3" },
  { weight: 80, grams: 970, cups: "9 1/4" },
];

function buildRows(points: Point[], keyPrefix: string) {
  return points.map((p, i) => {
    const next = points[i + 1];
    const weightMax = next ? next.weight : p.weight;
    const amountMax = next ? next.grams : p.grams;
    return {
      _type: "feedingRow" as const,
      _key: `${keyPrefix}-${p.weight}`,
      weightRange: `${p.weight} kg`,
      dailyAmount: `${p.grams} g (${p.cups} vasos)`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(NORMAL, "normal");

const variants = [
  {
    _type: "variant" as const,
    _key: "condicion-delgada",
    label: { es: "Condición Corporal Delgada", en: "", fr: "" },
    rows: buildRows(DELGADA, "delgada"),
  },
];

const notes = {
  es: "Para perros a partir de un año, con actividad media. Un vaso de 225 ml (8 oz) = 105 g de NUPEC® DIGESTIVE HEALTH.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Digestive Health (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows, variants, notes }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows (${rows.length}) + variants (${variants.length}) actualizados (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows, variants, notes }).commit();
    console.log(`  ✅  ${draftId}: rows + variants actualizados (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
