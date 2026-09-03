/**
 * NUPEC – Patch: Guía de Alimentación "Hepatic" (canino)
 *
 * El documento (id 908cfb43-c128-40b1-819b-2183156195d8) ya tenía las 14
 * filas correctas (weightRange/dailyAmount, coinciden con la ficha técnica)
 * pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Este patch reescribe `rows` con _type correcto y los campos numéricos
 * encadenados entre puntos consecutivos (ej. fila "3 kg" cubre el tramo
 * 3–5 kg, 65–95 g) para que la calculadora interpole linealmente. El
 * último punto (60 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-hepatic.ts
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

const FEEDING_GUIDE_ID = "908cfb43-c128-40b1-819b-2183156195d8";

type Point = { weight: number; grams: number; cups: string };

const ADULTO: Point[] = [
  { weight: 2, grams: 48, cups: "1/2 taza" },
  { weight: 3, grams: 65, cups: "2/3 taza" },
  { weight: 5, grams: 95, cups: "1 taza" },
  { weight: 10, grams: 161, cups: "1 3/5 taza" },
  { weight: 15, grams: 218, cups: "2 1/5 taza" },
  { weight: 20, grams: 270, cups: "2 2/3 taza" },
  { weight: 25, grams: 319, cups: "3 1/5 taza" },
  { weight: 30, grams: 366, cups: "3 2/3 taza" },
  { weight: 35, grams: 411, cups: "4 tazas" },
  { weight: 40, grams: 454, cups: "4 1/2 taza" },
  { weight: 45, grams: 496, cups: "5 tazas" },
  { weight: 50, grams: 537, cups: "5 2/5 taza" },
  { weight: 55, grams: 577, cups: "5 3/4 taza" },
  { weight: 60, grams: 616, cups: "6 tazas" },
];

function buildRows(points: Point[], keyPrefix: string, label: string) {
  return points.map((p, i) => {
    const next = points[i + 1];
    const weightMax = next ? next.weight : p.weight;
    const amountMax = next ? next.grams : p.grams;
    return {
      _type: "feedingRow" as const,
      _key: `${keyPrefix}-${p.weight}`,
      label,
      weightRange: `${p.weight} kg`,
      dailyAmount: `${p.grams} g - ${p.cups}`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(ADULTO, "adulto", "Adulto");

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Hepatic (canino)`);
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
