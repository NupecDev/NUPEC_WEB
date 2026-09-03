/**
 * NUPEC – Patch: Guía de Alimentación "1st Care" (canino)
 *
 * El documento feedingguide-canino-1st-care perdió el array `rows`
 * (tabla principal) y nunca tuvo weightMin/weightMax/amountMin/amountMax,
 * por lo que la calculadora de ración (ProductFeedingGuide) no se muestra
 * (requiere esos campos numéricos en al menos una fila).
 *
 * Este patch restaura:
 *   - rows          = "1ª mitad del crecimiento" (tabla principal / default)
 *   - variants[0]   = "2ª mitad del crecimiento" (seleccionable en el dropdown)
 *   - variants[1]   = "Gestantes o Lactantes" (seleccionable en el dropdown)
 *
 * Cada fila es un punto de la ficha técnica (1, 3, 5, 10, 15... kg). Para que
 * la calculadora interpole linealmente entre puntos consecutivos, weightMin/
 * weightMax y amountMin/amountMax de cada fila se encadenan con el siguiente
 * punto (ej. fila "3 kg" cubre el tramo 3–5 kg, 200–280 g). El último punto
 * (45 kg) queda con weightMin === weightMax para devolver el valor exacto.
 *
 * No toca secondaryTitle/secondaryColumnGroups/secondaryTableRows (tabla
 * estática de "Gestantes o Lactantes" que se sigue mostrando además del
 * dropdown de la calculadora).
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-1st-care.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-1st-care";

type Point = { weight: number; grams: number; cups: string };

const PRIMERA: Point[] = [
  { weight: 1, grams: 90, cups: "1" },
  { weight: 3, grams: 200, cups: "2 1/4" },
  { weight: 5, grams: 280, cups: "3" },
  { weight: 10, grams: 440, cups: "4 3/4" },
  { weight: 15, grams: 580, cups: "6 1/3" },
  { weight: 20, grams: 700, cups: "7 2/3" },
  { weight: 25, grams: 820, cups: "8 3/4" },
  { weight: 30, grams: 920, cups: "10" },
  { weight: 35, grams: 1020, cups: "11 1/4" },
  { weight: 40, grams: 1120, cups: "12 1/4" },
  { weight: 45, grams: 1210, cups: "13 1/4" },
];

const SEGUNDA: Point[] = [
  { weight: 1, grams: 60, cups: "2/3" },
  { weight: 3, grams: 130, cups: "1 1/3" },
  { weight: 5, grams: 180, cups: "2" },
  { weight: 10, grams: 280, cups: "3" },
  { weight: 15, grams: 370, cups: "4" },
  { weight: 20, grams: 450, cups: "4 3/4" },
  { weight: 25, grams: 520, cups: "5 2/3" },
  { weight: 30, grams: 590, cups: "6 1/3" },
  { weight: 35, grams: 650, cups: "7" },
  { weight: 40, grams: 710, cups: "7 3/4" },
  { weight: 45, grams: 770, cups: "8 1/3" },
];

const GESTANTES_LACTANTES: Point[] = [
  { weight: 1, grams: 40, cups: "1/2" },
  { weight: 3, grams: 100, cups: "1 1/4" },
  { weight: 5, grams: 150, cups: "1 2/3" },
  { weight: 10, grams: 270, cups: "2 3/4" },
  { weight: 15, grams: 370, cups: "4" },
  { weight: 20, grams: 470, cups: "5" },
  { weight: 25, grams: 560, cups: "6 1/4" },
  { weight: 30, grams: 650, cups: "7 1/4" },
  { weight: 35, grams: 740, cups: "8 1/4" },
  { weight: 40, grams: 830, cups: "9" },
  { weight: 45, grams: 920, cups: "10" },
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
      dailyAmount: `${p.grams.toLocaleString("es-MX")} g (${p.cups} vasos)`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(PRIMERA, "primera");

const variants = [
  {
    _type: "variant" as const,
    _key: "segunda-mitad-crecimiento",
    label: { es: "2ª mitad del crecimiento", en: "", fr: "" },
    rows: buildRows(SEGUNDA, "segunda"),
  },
  {
    _type: "variant" as const,
    _key: "gestantes-lactantes",
    label: { es: "Gestantes o Lactantes", en: "", fr: "" },
    rows: buildRows(GESTANTES_LACTANTES, "gestantes"),
  },
];

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación 1st Care (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows, variants }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows (${rows.length}) + variants (${variants.length}) actualizados (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows, variants }).commit();
    console.log(`  ✅  ${draftId}: rows + variants actualizados (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
