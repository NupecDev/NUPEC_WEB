/**
 * NUPEC – Patch: Guía de Alimentación "High Performance" (canino)
 *
 * El documento (id feedingguide-canino-high-performance) ya tenía las 11
 * filas correctas (weightRange/dailyAmount, coinciden con la ficha técnica)
 * pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * A diferencia de guías de puntos únicos (1st Care, Hepatic), cada fila
 * aquí ya es un rango de peso (ej. "5 – 10 kg" -> 120–200 g), así que
 * weightMin/weightMax/amountMin/amountMax se toman directo de los extremos
 * del rango, sin necesidad de encadenar con la siguiente fila.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-high-performance.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-high-performance";

type RangeRow = { weightMin: number; weightMax: number; amountMin: number; amountMax: number; cups: string };

const RANGES: RangeRow[] = [
  { weightMin: 1, weightMax: 3, amountMin: 40, amountMax: 90, cups: "1/2 a 1" },
  { weightMin: 3, weightMax: 5, amountMin: 90, amountMax: 120, cups: "1 a 1 1/2" },
  { weightMin: 5, weightMax: 10, amountMin: 120, amountMax: 200, cups: "1 1/2 a 2 1/4" },
  { weightMin: 10, weightMax: 15, amountMin: 200, amountMax: 260, cups: "2 1/4 a 3" },
  { weightMin: 15, weightMax: 20, amountMin: 260, amountMax: 310, cups: "3 a 3 1/2" },
  { weightMin: 20, weightMax: 30, amountMin: 310, amountMax: 410, cups: "3 1/2 a 4 2/3" },
  { weightMin: 30, weightMax: 40, amountMin: 410, amountMax: 500, cups: "4 2/3 a 5 2/3" },
  { weightMin: 40, weightMax: 50, amountMin: 500, amountMax: 580, cups: "5 2/3 a 6 1/2" },
  { weightMin: 50, weightMax: 60, amountMin: 580, amountMax: 660, cups: "6 1/2 a 7 1/2" },
  { weightMin: 60, weightMax: 70, amountMin: 660, amountMax: 730, cups: "7 1/2 a 8 1/4" },
  { weightMin: 70, weightMax: 80, amountMin: 730, amountMax: 790, cups: "8 1/4 a 9" },
];

const rows = RANGES.map((r) => ({
  _type: "feedingRow" as const,
  _key: `${r.weightMin}-${r.weightMax}`,
  weightRange: `${r.weightMin} – ${r.weightMax} kg`,
  dailyAmount: `${r.amountMin} a ${r.amountMax} g (${r.cups} tazas)`,
  weightMin: r.weightMin,
  weightMax: r.weightMax,
  amountMin: r.amountMin,
  amountMax: r.amountMax,
}));

const notes = {
  es: "Para perros adultos de actividad intensa. 1 taza de 8 oz (225 ml) = 88 g de NUPEC® HIGH PERFORMANCE.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación High Performance (canino)`);
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
