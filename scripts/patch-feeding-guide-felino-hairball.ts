/**
 * NUPEC – Patch: Guía de Alimentación "Felino Hairball" (felino)
 *
 * El documento (id 274cae33-e99e-49f9-a1d8-97528730d529) solo tenía la
 * tabla agrupada estática (secondaryTableRows: Sedentarios/Activos/Muy
 * Activos x pesos 2, 4, 6.5 kg) — sin `rows` principal, por lo que la
 * calculadora de ración no se muestra (requiere rows con weightMin).
 *
 * Este patch agrega:
 *   - rows        = "Sedentarios" (tabla principal / default de la calc.)
 *   - variants[0] = "Activos"
 *   - variants[1] = "Muy Activos"
 *
 * No toca secondaryColumnGroups/secondaryTableRows/secondaryNotes (la
 * tabla agrupada visual, que ya está correcta y se sigue mostrando además
 * del dropdown de la calculadora).
 *
 * Solo hay 3 puntos de peso por nivel (2, 4, 6.5 kg) en la ficha técnica,
 * así que la interpolación linealiza entre esos 3 puntos únicamente.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-felino-hairball.ts
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

const FEEDING_GUIDE_ID = "274cae33-e99e-49f9-a1d8-97528730d529";

type Point = { weight: number; grams: number; cups: string };

const SEDENTARIOS: Point[] = [
  { weight: 2, grams: 40, cups: "1/2" },
  { weight: 4, grams: 70, cups: "1" },
  { weight: 6.5, grams: 115, cups: "1 2/3" },
];

const ACTIVOS: Point[] = [
  { weight: 2, grams: 45, cups: "3/5" },
  { weight: 4, grams: 80, cups: "1 1/5" },
  { weight: 6.5, grams: 140, cups: "2" },
];

const MUY_ACTIVOS: Point[] = [
  { weight: 2, grams: 50, cups: "2/3" },
  { weight: 4, grams: 100, cups: "1 2/5" },
  { weight: 6.5, grams: 155, cups: "2 1/5" },
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

const rows = buildRows(SEDENTARIOS, "sedentarios");

const variants = [
  {
    _type: "variant" as const,
    _key: "activos",
    label: { es: "Activos", en: "", fr: "" },
    rows: buildRows(ACTIVOS, "activos"),
  },
  {
    _type: "variant" as const,
    _key: "muy-activos",
    label: { es: "Muy Activos", en: "", fr: "" },
    rows: buildRows(MUY_ACTIVOS, "muy-activos"),
  },
];

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Felino Hairball (felino)`);
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
