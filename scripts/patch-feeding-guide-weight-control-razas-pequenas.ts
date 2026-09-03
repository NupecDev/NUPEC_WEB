/**
 * NUPEC – Patch: Guía de Alimentación "Weight Control Razas Pequeñas" (canino)
 *
 * El documento (id feedingguide-canino-weight-control-razas-pequenas) ya
 * tenía las 8 filas correctas (weightRange/dailyAmount, coinciden con la
 * ficha técnica) pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Cada fila ya es un rango de peso (ej. "5 – 7 kg" -> 90–120 g), así que
 * weightMin/weightMax/amountMin/amountMax se toman directo de los extremos
 * del rango, sin necesidad de encadenar con la siguiente fila.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-weight-control-razas-pequenas.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-weight-control-razas-pequenas";

type RangeRow = { weightMin: number; weightMax: number; amountMin: number; amountMax: number; cups: string };

const RANGES: RangeRow[] = [
  { weightMin: 1, weightMax: 2, amountMin: 30, amountMax: 50, cups: "1/3 a 2/3" },
  { weightMin: 2, weightMax: 3, amountMin: 50, amountMax: 70, cups: "2/3 a 3/4" },
  { weightMin: 3, weightMax: 4, amountMin: 70, amountMax: 80, cups: "3/4 a 1" },
  { weightMin: 4, weightMax: 5, amountMin: 80, amountMax: 90, cups: "1 a 1 1/4" },
  { weightMin: 5, weightMax: 7, amountMin: 90, amountMax: 120, cups: "1 1/4 a 1 2/3" },
  { weightMin: 7, weightMax: 10, amountMin: 120, amountMax: 150, cups: "1 2/3 a 1 3/4" },
  { weightMin: 10, weightMax: 12, amountMin: 150, amountMax: 170, cups: "1 3/4 a 2" },
  { weightMin: 12, weightMax: 15, amountMin: 170, amountMax: 190, cups: "2 a 2 1/3" },
];

const rows = RANGES.map((r) => ({
  _type: "feedingRow" as const,
  _key: `${r.weightMin}-${r.weightMax}`,
  weightRange: `${r.weightMin} – ${r.weightMax} kg`,
  dailyAmount: `${r.amountMin} – ${r.amountMax} g (${r.cups} vasos)`,
  weightMin: r.weightMin,
  weightMax: r.weightMax,
  amountMin: r.amountMin,
  amountMax: r.amountMax,
}));

const notes = {
  es: "Para perros adultos obesos. 1 vaso de 225 ml (8 oz) = 83 g de NUPEC® WEIGHT CONTROL Razas Pequeñas.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Weight Control Razas Pequeñas (canino)`);
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
