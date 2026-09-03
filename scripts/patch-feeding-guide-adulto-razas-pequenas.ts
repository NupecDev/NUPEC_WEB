/**
 * NUPEC – Patch: Guía de Alimentación "Adulto Razas Pequeñas" (canino)
 *
 * El documento (id ab4ef8cb-fa35-489f-885a-1164c9ea217b) ya tenía las 9
 * filas correctas (weightRange/dailyAmount) pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Este patch reescribe `rows` con _type correcto y los campos numéricos
 * encadenados entre puntos consecutivos (ej. fila "5 kg" cubre el tramo
 * 5–8 kg, 120–165 g) para que la calculadora interpole linealmente. El
 * último punto (15 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-adulto-razas-pequenas.ts
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

const FEEDING_GUIDE_ID = "ab4ef8cb-fa35-489f-885a-1164c9ea217b";

type Point = { weight: number; grams: number; cups: string };

const ADULTO_PEQUENA: Point[] = [
  { weight: 1, grams: 40, cups: "1/3 taza" },
  { weight: 2, grams: 65, cups: "2/3 taza" },
  { weight: 3, grams: 85, cups: "3/4 taza" },
  { weight: 4, grams: 105, cups: "1 taza" },
  { weight: 5, grams: 120, cups: "1 1/4 taza" },
  { weight: 8, grams: 165, cups: "1 1/2 taza" },
  { weight: 10, grams: 190, cups: "1 3/4 taza" },
  { weight: 12, grams: 220, cups: "2 tazas" },
  { weight: 15, grams: 250, cups: "2 1/4 tazas" },
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

const rows = buildRows(ADULTO_PEQUENA, "pequena", "Adulto Raza Pequeña");

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Adulto Razas Pequeñas (canino)`);
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
