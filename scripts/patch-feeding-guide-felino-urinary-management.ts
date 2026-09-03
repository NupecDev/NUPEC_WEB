/**
 * NUPEC – Patch: Guía de Alimentación "Felino Urinary Management" (felino)
 *
 * El documento (id 92d1c59e-be76-47fe-ad27-35f1dd6a30c7) solo tenía la
 * tabla agrupada estática (secondaryTableRows: Normal/Delgada x pesos
 * 2-6.5 kg) — sin `rows` principal, por lo que la calculadora de ración no
 * se muestra (requiere rows con weightMin).
 *
 * Este patch agrega:
 *   - rows        = "Normal" (tabla principal / default de la calculadora)
 *   - variants[0] = "Delgada"
 *
 * No toca secondaryColumnGroups/secondaryTableRows/secondaryNotes/
 * secondaryTitle (la tabla agrupada visual, que ya está correcta y se
 * sigue mostrando además del dropdown de la calculadora).
 *
 * Cada fila es un punto de la ficha técnica (2, 3, 4, 5, 6, 6.5 kg). Para
 * que la calculadora interpole linealmente entre puntos consecutivos,
 * weightMin/weightMax y amountMin/amountMax de cada fila se encadenan con
 * el siguiente punto. El último punto (6.5 kg) queda con
 * weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-felino-urinary-management.ts
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

const FEEDING_GUIDE_ID = "92d1c59e-be76-47fe-ad27-35f1dd6a30c7";

type Point = { weight: number; grams: number; cups: string };

const NORMAL: Point[] = [
  { weight: 2, grams: 33, cups: "1/3" },
  { weight: 3, grams: 50, cups: "1/2" },
  { weight: 4, grams: 67, cups: "2/3" },
  { weight: 5, grams: 83, cups: "4/5" },
  { weight: 6, grams: 100, cups: "1" },
  { weight: 6.5, grams: 108, cups: "1" },
];

const DELGADA: Point[] = [
  { weight: 2, grams: 65, cups: "2/3" },
  { weight: 3, grams: 89, cups: "4/5" },
  { weight: 4, grams: 110, cups: "1" },
  { weight: 5, grams: 130, cups: "1 1/4" },
  { weight: 6, grams: 149, cups: "1 2/5" },
  { weight: 6.5, grams: 158, cups: "1 1/2" },
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
    _key: "condicion-delgada",
    label: { es: "Delgada", en: "", fr: "" },
    rows: buildRows(DELGADA, "delgada"),
  },
];

const notes = {
  es: "Para gatos adultos a partir de 1 año de edad. Un vaso de 225 ml (8 oz) = 106 g de NUPEC® FELINO URINARY MANAGEMENT.",
  en: "",
  fr: "",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Felino Urinary Management (felino)`);
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
