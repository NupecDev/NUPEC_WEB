/**
 * NUPEC – Patch: Guía de Alimentación "Sensitive" (canino)
 *
 * El documento (id feedingguide-canino-sensitive) ya tenía las 11 filas
 * correctas (weightRange/dailyAmount, coinciden con la ficha técnica) pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *
 * Cada fila ya es un rango de peso (ej. "5 – 10 kg" -> 120–190 g), así que
 * weightMin/weightMax/amountMin/amountMax se toman directo de los extremos
 * del rango, sin necesidad de encadenar con la siguiente fila.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-sensitive.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-sensitive";

type RangeRow = { weightMin: number; weightMax: number; amountMin: number; amountMax: number; cups: string };

const RANGES: RangeRow[] = [
  { weightMin: 1, weightMax: 3, amountMin: 40, amountMax: 80, cups: "1/2 a 1 1/4" },
  { weightMin: 3, weightMax: 5, amountMin: 80, amountMax: 120, cups: "1 1/4 a 1 2/3" },
  { weightMin: 5, weightMax: 10, amountMin: 120, amountMax: 190, cups: "1 2/3 a 2 2/3" },
  { weightMin: 10, weightMax: 15, amountMin: 190, amountMax: 250, cups: "2 2/3 a 3 1/2" },
  { weightMin: 15, weightMax: 20, amountMin: 250, amountMax: 300, cups: "3 1/2 a 4 1/4" },
  { weightMin: 20, weightMax: 30, amountMin: 300, amountMax: 390, cups: "4 1/4 a 5 1/2" },
  { weightMin: 30, weightMax: 40, amountMin: 390, amountMax: 470, cups: "5 1/2 a 6 2/3" },
  { weightMin: 40, weightMax: 50, amountMin: 470, amountMax: 550, cups: "6 2/3 a 7 3/4" },
  { weightMin: 50, weightMax: 60, amountMin: 550, amountMax: 620, cups: "7 3/4 a 8 3/4" },
  { weightMin: 60, weightMax: 70, amountMin: 620, amountMax: 690, cups: "8 3/4 a 9 3/4" },
  { weightMin: 70, weightMax: 80, amountMin: 690, amountMax: 750, cups: "9 3/4 a 10 2/3" },
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
  es: "Nutrición para perros con alergias alimentarias. 1 vaso de 225 ml (8 oz) = 83 g de NUPEC® SENSITIVE.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Sensitive (canino)`);
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
