/**
 * NUPEC – Patch: Guía de Alimentación "Cardiac" (canino)
 *
 * El documento (id 4b143999-ffff-41cb-8388-10751f640d6a) ya tenía 14 filas
 * pero:
 *   - usaba _type: "row" en vez de "feedingRow" (no coincide con el schema)
 *   - no tenía weightMin/weightMax/amountMin/amountMax, por lo que la
 *     calculadora de ración (ProductFeedingGuide) no se muestra.
 *   - dos filas tenían datos incorrectos frente a la ficha técnica:
 *       "55 kg" decía "523 g - 5 tazas" (duplicado de "50 kg") en vez de
 *         "561 g - 5 3/5 taza".
 *       "60 kg" tenía un typo "55 4/5 taza" en vez de "5 4/5 taza".
 *
 * Este patch reescribe `rows` con _type correcto, los valores corregidos,
 * y los campos numéricos encadenados entre puntos consecutivos (ej. fila
 * "3 kg" cubre el tramo 3–5 kg, 63–93 g) para que la calculadora interpole
 * linealmente. El último punto (60 kg) queda con weightMin === weightMax.
 *
 * Uso:
 *   npx tsx scripts/patch-feeding-guide-cardiac.ts
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

const FEEDING_GUIDE_ID = "4b143999-ffff-41cb-8388-10751f640d6a";

type Point = { weight: number; grams: number; cups: string };

const ADULTO: Point[] = [
  { weight: 2, grams: 47, cups: "2/5 taza" },
  { weight: 3, grams: 63, cups: "3/5 taza" },
  { weight: 5, grams: 93, cups: "1 taza" },
  { weight: 10, grams: 156, cups: "1 1/2 taza" },
  { weight: 15, grams: 212, cups: "2 tazas" },
  { weight: 20, grams: 263, cups: "2 3/5 taza" },
  { weight: 25, grams: 311, cups: "3 tazas" },
  { weight: 30, grams: 356, cups: "3 1/2 taza" },
  { weight: 35, grams: 400, cups: "4 tazas" },
  { weight: 40, grams: 442, cups: "4 2/5 taza" },
  { weight: 45, grams: 483, cups: "4 4/5 taza" },
  { weight: 50, grams: 523, cups: "5 tazas" },
  { weight: 55, grams: 561, cups: "5 3/5 taza" },
  { weight: 60, grams: 600, cups: "5 4/5 taza" },
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
      dailyAmount: `${p.grams} g - ${p.cups}`,
      weightMin: p.weight,
      weightMax,
      amountMin: p.grams,
      amountMax,
    };
  });
}

const rows = buildRows(ADULTO, "adulto", "Adulto");

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Guía de Alimentación Cardiac (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (!existing) {
    console.log(`  ⚠️  Documento ${FEEDING_GUIDE_ID} no encontrado — abortando`);
    process.exit(1);
  }

  await client.patch(FEEDING_GUIDE_ID).set({ rows }).commit();
  console.log(`  ✅  ${FEEDING_GUIDE_ID}: rows (${rows.length}) actualizado (publicado)`);

  const draftId = `drafts.${FEEDING_GUIDE_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await client.patch(draftId).set({ rows }).commit();
    console.log(`  ✅  ${draftId}: rows actualizado (draft)`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
