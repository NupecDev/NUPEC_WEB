/**
 * NUPEC – Patch: Guía de Alimentación "Felino Hepatic" (felino)
 *
 * El documento (id feedingguide-felino-hepatic) tenía las 3 condiciones
 * corporales (Delgado / Normal / Sobrepeso) MEZCLADAS en una sola fila de
 * texto por peso (dailyAmount concatenaba los 3 valores), con _type: "row"
 * (no "feedingRow") y sin weightMin/weightMax/amountMin/amountMax.
 *
 * Este patch reestructura en:
 *   - rows        = "Normal" (tabla principal / default)
 *   - variants[0] = "Delgado"
 *   - variants[1] = "Sobrepeso"
 *
 * Cada fila es un punto de la ficha técnica (2, 3, 4, 5, 6 kg). Para que la
 * calculadora interpole linealmente entre puntos consecutivos, weightMin/
 * weightMax y amountMin/amountMax de cada fila se encadenan con el
 * siguiente punto. El último punto (6 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-felino-hepatic.ts
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

const FEEDING_GUIDE_ID = "feedingguide-felino-hepatic";

type Point = { weight: number; grams: number; cups: string };

const NORMAL: Point[] = [
  { weight: 2, grams: 38, cups: "2/5" },
  { weight: 3, grams: 52, cups: "1/2" },
  { weight: 4, grams: 65, cups: "2/3" },
  { weight: 5, grams: 77, cups: "3/4" },
  { weight: 6, grams: 88, cups: "4/5" },
];

const DELGADO: Point[] = [
  { weight: 2, grams: 44, cups: "2/5" },
  { weight: 3, grams: 60, cups: "3/5" },
  { weight: 4, grams: 75, cups: "3/4" },
  { weight: 5, grams: 88, cups: "4/5" },
  { weight: 6, grams: 101, cups: "1" },
];

const SOBREPESO: Point[] = [
  { weight: 2, grams: 33, cups: "1/3" },
  { weight: 3, grams: 44, cups: "2/5" },
  { weight: 4, grams: 55, cups: "1/2" },
  { weight: 5, grams: 66, cups: "2/3" },
  { weight: 6, grams: 75, cups: "3/4" },
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
      dailyAmount: `${p.grams} g (${p.cups} taza)`,
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
    _key: "delgado",
    label: { es: "Delgado", en: "", fr: "" },
    rows: buildRows(DELGADO, "delgado"),
  },
  {
    _type: "variant" as const,
    _key: "sobrepeso",
    label: { es: "Sobrepeso", en: "", fr: "" },
    rows: buildRows(SOBREPESO, "sobrepeso"),
  },
];

const notes = {
  es: "1 taza de 225 ml (8 oz) = 100 g de NUPEC® FELINO HEPATIC.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Felino Hepatic (felino)`);
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
