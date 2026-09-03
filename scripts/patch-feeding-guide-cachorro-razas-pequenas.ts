/**
 * NUPEC – Patch: Guía de Alimentación "Cachorro Razas Pequeñas" (canino)
 *
 * El documento (id feedingguide-canino-cachorro-razas-pequenas) tenía las
 * tablas "Destete – mitad de crecimiento" y "Mitad – final de crecimiento"
 * MEZCLADAS en un solo array `rows` (distinguidas solo por `label`), sin
 * "Gestantes / Lactantes", con _type: "row" (no "feedingRow") y sin
 * weightMin/weightMax/amountMin/amountMax. Eso rompía la calculadora: al
 * interpolar cruzaba pesos de ambas tablas indistintamente.
 *
 * Este patch reestructura en:
 *   - rows        = "Cachorros de destete – mitad de crecimiento" (default)
 *   - variants[0] = "Cachorros de mitad – final de crecimiento"
 *   - variants[1] = "Hembras gestantes / lactantes"
 *
 * Cada fila es un punto de la ficha técnica. weightMin/weightMax y
 * amountMin/amountMax de cada fila se encadenan con el siguiente punto
 * para que la calculadora interpole linealmente. El último punto de cada
 * tabla queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-cachorro-razas-pequenas.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-cachorro-razas-pequenas";

type Point = { weight: number; grams: number; cups: string };

const DESTETE: Point[] = [
  { weight: 0.5, grams: 40, cups: "1/3" },
  { weight: 1, grams: 75, cups: "3/4" },
  { weight: 2, grams: 130, cups: "1 1/4" },
  { weight: 3, grams: 175, cups: "1 3/4" },
  { weight: 4, grams: 215, cups: "2 1/4" },
  { weight: 5, grams: 250, cups: "2 1/2" },
  { weight: 8, grams: 365, cups: "3 2/3" },
  { weight: 10, grams: 425, cups: "4 1/4" },
  { weight: 12, grams: 500, cups: "5" },
  { weight: 15, grams: 575, cups: "5 3/4" },
];

const MITAD_FINAL: Point[] = [
  { weight: 1, grams: 60, cups: "2/3" },
  { weight: 2, grams: 100, cups: "1" },
  { weight: 3, grams: 130, cups: "1 1/4" },
  { weight: 4, grams: 160, cups: "1 2/3" },
  { weight: 5, grams: 180, cups: "1 3/4" },
  { weight: 8, grams: 250, cups: "2 1/2" },
  { weight: 10, grams: 295, cups: "3" },
  { weight: 12, grams: 335, cups: "3 1/3" },
];

const GESTANTES_LACTANTES: Point[] = [
  { weight: 1, grams: 50, cups: "1/2" },
  { weight: 2, grams: 90, cups: "1" },
  { weight: 3, grams: 120, cups: "1 1/4" },
  { weight: 4, grams: 145, cups: "1 1/2" },
  { weight: 5, grams: 170, cups: "1 3/4" },
  { weight: 8, grams: 250, cups: "2 1/2" },
  { weight: 10, grams: 295, cups: "3" },
  { weight: 12, grams: 345, cups: "3 1/2" },
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
      dailyAmount: `${p.grams} g (${p.cups} taza)`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(DESTETE, "destete", "Cachorros de destete – mitad de crecimiento");

const variants = [
  {
    _type: "variant" as const,
    _key: "mitad-final-crecimiento",
    label: { es: "Cachorros de mitad – final de crecimiento", en: "", fr: "" },
    rows: buildRows(MITAD_FINAL, "mitadfinal", "Cachorros de mitad – final de crecimiento"),
  },
  {
    _type: "variant" as const,
    _key: "gestantes-lactantes",
    label: { es: "Hembras gestantes / lactantes", en: "", fr: "" },
    rows: buildRows(GESTANTES_LACTANTES, "gestantes", "Hembras gestantes / lactantes"),
  },
];

const notes = {
  es: "1 taza de 8 oz (225 ml) = 100 g de NUPEC® CACHORRO RAZAS PEQUEÑAS.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Cachorro Razas Pequeñas (canino)`);
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
