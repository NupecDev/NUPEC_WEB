/**
 * NUPEC – Seed: Guía de Alimentación "Senior" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Senior.
 * Tabla única de rangos de peso, con columna adicional en lbs (se incluye
 * como referencia en el texto de weightRange; la calculadora interpola
 * solo en kg vía weightMin/weightMax).
 *
 * El producto "Senior" no tenía ningún feedingGuide vinculado — este
 * script crea el documento y lo enlaza al producto.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-senior.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-senior";
const PRODUCT_ID = "product-canino-senior";

type RangeRow = {
  weightMin: number;
  weightMax: number;
  lbsMin: string;
  lbsMax: string;
  amountMin: number;
  amountMax: number;
  cups: string;
};

const RANGES: RangeRow[] = [
  { weightMin: 1, weightMax: 3, lbsMin: "2.2", lbsMax: "6.6", amountMin: 50, amountMax: 75, cups: "1/2 - 3/4" },
  { weightMin: 3, weightMax: 5, lbsMin: "6.6", lbsMax: "11.0", amountMin: 75, amountMax: 100, cups: "3/4 - 1" },
  { weightMin: 5, weightMax: 10, lbsMin: "11.0", lbsMax: "22.1", amountMin: 100, amountMax: 175, cups: "1 - 1 3/4" },
  { weightMin: 10, weightMax: 15, lbsMin: "22.1", lbsMax: "33.1", amountMin: 175, amountMax: 225, cups: "1 3/4 - 2 1/4" },
  { weightMin: 15, weightMax: 20, lbsMin: "33.1", lbsMax: "44.1", amountMin: 225, amountMax: 275, cups: "2 1/4 - 2 3/4" },
  { weightMin: 20, weightMax: 30, lbsMin: "44.1", lbsMax: "66.2", amountMin: 275, amountMax: 350, cups: "2 3/4 - 3 1/2" },
  { weightMin: 30, weightMax: 40, lbsMin: "66.2", lbsMax: "88.2", amountMin: 350, amountMax: 425, cups: "3 1/2 - 4 1/4" },
  { weightMin: 40, weightMax: 50, lbsMin: "88.2", lbsMax: "110.3", amountMin: 425, amountMax: 500, cups: "4 1/4 - 5" },
  { weightMin: 50, weightMax: 60, lbsMin: "110.3", lbsMax: "132.3", amountMin: 500, amountMax: 550, cups: "5 - 5 1/2" },
  { weightMin: 60, weightMax: 70, lbsMin: "132.3", lbsMax: "154.4", amountMin: 550, amountMax: 625, cups: "5 1/2 - 6 1/4" },
  { weightMin: 70, weightMax: 80, lbsMin: "154.4", lbsMax: "176.4", amountMin: 625, amountMax: 675, cups: "6 1/4 - 6 3/4" },
];

const rows = RANGES.map((r) => ({
  _type: "feedingRow" as const,
  _key: `${r.weightMin}-${r.weightMax}`,
  weightRange: `${r.weightMin} - ${r.weightMax} kg (${r.lbsMin} - ${r.lbsMax} lbs)`,
  dailyAmount: `${r.amountMin} - ${r.amountMax} g (${r.cups} tazas)`,
  weightMin: r.weightMin,
  weightMax: r.weightMax,
  amountMin: r.amountMin,
  amountMax: r.amountMax,
}));

const feedingGuideSenior = {
  _id: FEEDING_GUIDE_ID,
  _type: "feedingGuide",
  product: { _type: "reference", _ref: PRODUCT_ID },
  notes: {
    es: "1 taza de 8 oz (225 ml) = 100 g de NUPEC® SENIOR.",
    en: "",
    fr: "",
  },
  rows,
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Senior (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument(PRODUCT_ID);
  if (!product) {
    console.log(`  ⚠️  Producto "${PRODUCT_ID}" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(FEEDING_GUIDE_ID);
  if (existing) {
    console.log(`  ⏭️   ${FEEDING_GUIDE_ID} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideSenior);
  console.log(`  ✅  Guía alim.→ ${created._id}`);

  if (!product.feedingGuide) {
    await client
      .patch(PRODUCT_ID)
      .set({ feedingGuide: { _type: "reference", _ref: FEEDING_GUIDE_ID } })
      .commit();
    console.log(`  ✅  ${PRODUCT_ID}: feedingGuide vinculado a ${FEEDING_GUIDE_ID}`);
  }
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
