/**
 * NUPEC – Patch: Guía de Alimentación "Senior Razas Mini" (canino)
 *
 * El documento (id feedingguide-canino-senior-razas-mini) ya tenía las 9
 * filas correctas (weightRange/dailyAmount, coinciden con la ficha técnica)
 * pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Este patch reescribe `rows` con _type correcto y los campos numéricos
 * encadenados entre puntos consecutivos (ej. fila "1.5 kg" cubre el tramo
 * 1.5–2 kg, 50–60 g) para que la calculadora interpole linealmente. El
 * último punto (5 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-senior-razas-mini.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-senior-razas-mini";

type Point = { weight: number; grams: number; cups: string };

const SENIOR_MINI: Point[] = [
  { weight: 1, grams: 35, cups: "1/3" },
  { weight: 1.5, grams: 50, cups: "1/2" },
  { weight: 2, grams: 60, cups: "3/5" },
  { weight: 2.5, grams: 70, cups: "2/3" },
  { weight: 3, grams: 80, cups: "4/5" },
  { weight: 3.5, grams: 90, cups: "4/5" },
  { weight: 4, grams: 100, cups: "1" },
  { weight: 4.5, grams: 105, cups: "1" },
  { weight: 5, grams: 115, cups: "1 1/5" },
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

const rows = buildRows(SENIOR_MINI, "senior-mini");

const notes = {
  es: "Para perros adultos de talla miniatura a partir de 9 años de edad. Un vaso de 225 ml (8 oz) = 100 g de NUPEC® SENIOR RAZAS MINI.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Senior Razas Mini (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows, notes }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows (${rows.length}) actualizado (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows, notes }).commit();
    console.log(`  ✅  ${draftId}: rows actualizado (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
