/**
 * NUPEC – Patch: Guía de Alimentación "Felino Weight Care" (felino)
 *
 * El documento (id 5f723d86-4511-4c02-a9e8-734d6fb0f2ad) solo tenía la
 * tabla agrupada estática (secondaryTableRows: Reducción de Peso /
 * Mantenimiento de Peso x pesos 2-9 kg, pasos de 0.5 kg) — sin `rows`
 * principal, por lo que la calculadora de ración no se muestra (requiere
 * rows con weightMin).
 *
 * Este patch agrega:
 *   - rows        = "Reducción de Peso" (tabla principal / default de la
 *                    calculadora; es el objetivo primario del producto)
 *   - variants[0] = "Mantenimiento de Peso"
 *
 * No toca secondaryColumnGroups/secondaryTableRows/secondaryNotes/
 * secondaryTitle (la tabla agrupada visual, que ya está correcta y se
 * sigue mostrando además del dropdown de la calculadora).
 *
 * Cada fila es un punto de la ficha técnica (2, 2.5, 3... 9 kg, pasos de
 * 0.5 kg). Para que la calculadora interpole linealmente entre puntos
 * consecutivos, weightMin/weightMax y amountMin/amountMax de cada fila se
 * encadenan con el siguiente punto. El último punto (9 kg) queda con
 * weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-felino-weight-care.ts
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

const FEEDING_GUIDE_ID = "5f723d86-4511-4c02-a9e8-734d6fb0f2ad";

type Point = { weight: number; grams: number; cups: string };

const REDUCCION: Point[] = [
  { weight: 2, grams: 25, cups: "1/4" },
  { weight: 2.5, grams: 29, cups: "1/3" },
  { weight: 3, grams: 34, cups: "2/5" },
  { weight: 3.5, grams: 38, cups: "2/5" },
  { weight: 4, grams: 42, cups: "1/2" },
  { weight: 4.5, grams: 46, cups: "1/2" },
  { weight: 5, grams: 49, cups: "3/5" },
  { weight: 5.5, grams: 53, cups: "3/5" },
  { weight: 6, grams: 57, cups: "2/3" },
  { weight: 6.5, grams: 60, cups: "2/3" },
  { weight: 7, grams: 64, cups: "3/4" },
  { weight: 7.5, grams: 67, cups: "3/4" },
  { weight: 8, grams: 70, cups: "4/5" },
  { weight: 8.5, grams: 74, cups: "4/5" },
  { weight: 9, grams: 77, cups: "4/5" },
];

const MANTENIMIENTO: Point[] = [
  { weight: 2, grams: 31, cups: "1/3" },
  { weight: 2.5, grams: 37, cups: "2/5" },
  { weight: 3, grams: 42, cups: "1/2" },
  { weight: 3.5, grams: 47, cups: "1/2" },
  { weight: 4, grams: 52, cups: "3/5" },
  { weight: 4.5, grams: 57, cups: "2/3" },
  { weight: 5, grams: 62, cups: "2/3" },
  { weight: 5.5, grams: 66, cups: "3/4" },
  { weight: 6, grams: 71, cups: "4/5" },
  { weight: 6.5, grams: 75, cups: "4/5" },
  { weight: 7, grams: 80, cups: "4/5" },
  { weight: 7.5, grams: 84, cups: "1" },
  { weight: 8, grams: 88, cups: "1" },
  { weight: 8.5, grams: 92, cups: "1" },
  { weight: 9, grams: 96, cups: "1 1/5" },
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
      dailyAmount: `${p.grams} g (${p.cups} vaso)`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(REDUCCION, "reduccion");

const variants = [
  {
    _type: "variant" as const,
    _key: "mantenimiento-peso",
    label: { es: "Mantenimiento de Peso", en: "", fr: "" },
    rows: buildRows(MANTENIMIENTO, "mantenimiento"),
  },
];

const notes = {
  es: "Para gatos adultos a partir de 1 año de edad. Un vaso de 225 ml (8 oz) = 90 g de NUPEC® FELINO WEIGHT CARE.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Felino Weight Care (felino)`);
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
