/**
 * NUPEC – Patch: Guía de Alimentación "Acute Hepatic" (canino)
 *
 * El documento (id 099b7628-8b00-4be8-946b-fee126577602) ya tenía las 14
 * filas correctas (weightRange/dailyAmount) pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Este patch reescribe `rows` con _type correcto y los campos numéricos
 * encadenados entre puntos consecutivos (ej. fila "3 kg" cubre el tramo
 * 3–5 kg, 71–104 g) para que la calculadora interpole linealmente. El
 * último punto (60 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-acute-hepatic.ts
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

const FEEDING_GUIDE_ID = "099b7628-8b00-4be8-946b-fee126577602";

type Point = { weight: number; grams: number; cups: string };

const ADULTO: Point[] = [
  { weight: 2, grams: 52, cups: "1/2 taza" },
  { weight: 3, grams: 71, cups: "2/3 taza" },
  { weight: 5, grams: 104, cups: "1 taza" },
  { weight: 10, grams: 174, cups: "1 3/4 taza" },
  { weight: 15, grams: 236, cups: "2 1/3 tazas" },
  { weight: 20, grams: 293, cups: "2 4/5 tazas" },
  { weight: 25, grams: 347, cups: "3 2/5 tazas" },
  { weight: 30, grams: 397, cups: "3 4/5 tazas" },
  { weight: 35, grams: 446, cups: "4 1/3 tazas" },
  { weight: 40, grams: 493, cups: "4 4/5 tazas" },
  { weight: 45, grams: 539, cups: "5 1/3 taza" },
  { weight: 50, grams: 583, cups: "5 3/4 tazas" },
  { weight: 55, grams: 626, cups: "6 1/5 taza" },
  { weight: 60, grams: 668, cups: "6 1/2 tazas" },
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
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Acute Hepatic (canino)`);
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
