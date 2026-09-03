/**
 * NUPEC – Seed: Guía de Alimentación "Cachorro" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Cachorro.
 * Trae 3 tablas numéricas de rangos de peso:
 *   1) Cachorros de destete - mitad de crecimiento   -> rows (principal/default)
 *   2) Cachorros de mitad - final de crecimiento     -> variants[0]
 *   3) Hembras gestantes / lactantes                 -> variants[1]
 *
 * Cada fila ya es un rango (ej. "5-10 kg"), por lo que weightMin/weightMax/
 * amountMin/amountMax se toman directo de los extremos del rango — sin
 * necesidad de encadenar puntos como en guías de valores puntuales
 * (1st Care, Acute Hepatic).
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-cachorro.ts
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

const FEEDING_GUIDE_ID = "feedingguide-canino-cachorro";
const PRODUCT_ID = "product-canino-cachorro";

type RangeRow = { weightMin: number; weightMax: number; amountMin: number; amountMax: number; cups: string };

const DESTETE: RangeRow[] = [
  { weightMin: 1, weightMax: 3, amountMin: 75, amountMax: 175, cups: "3/4 a 1 1/2" },
  { weightMin: 3, weightMax: 5, amountMin: 175, amountMax: 250, cups: "1 1/2 a 2 1/3" },
  { weightMin: 5, weightMax: 10, amountMin: 250, amountMax: 425, cups: "2 1/3 a 4" },
  { weightMin: 10, weightMax: 15, amountMin: 425, amountMax: 575, cups: "4 a 5 1/3" },
  { weightMin: 15, weightMax: 20, amountMin: 575, amountMax: 715, cups: "5 1/3 a 6 1/2" },
  { weightMin: 20, weightMax: 25, amountMin: 715, amountMax: 845, cups: "6 1/2 a 7 3/4" },
  { weightMin: 25, weightMax: 30, amountMin: 845, amountMax: 965, cups: "7 3/4 a 9" },
  { weightMin: 30, weightMax: 35, amountMin: 965, amountMax: 1090, cups: "9 a 10" },
];

const MITAD_FINAL: RangeRow[] = [
  { weightMin: 1, weightMax: 3, amountMin: 60, amountMax: 130, cups: "1/2 a 1 1/4" },
  { weightMin: 3, weightMax: 5, amountMin: 130, amountMax: 180, cups: "1 1/4 a 1 3/4" },
  { weightMin: 5, weightMax: 10, amountMin: 180, amountMax: 290, cups: "1 3/4 a 2 3/4" },
  { weightMin: 10, weightMax: 15, amountMin: 290, amountMax: 380, cups: "2 3/4 a 3 1/2" },
  { weightMin: 15, weightMax: 20, amountMin: 380, amountMax: 460, cups: "3 1/2 a 4 1/4" },
  { weightMin: 20, weightMax: 25, amountMin: 460, amountMax: 535, cups: "4 1/4 a 5" },
  { weightMin: 25, weightMax: 30, amountMin: 535, amountMax: 605, cups: "5 a 5 1/2" },
  { weightMin: 30, weightMax: 35, amountMin: 605, amountMax: 670, cups: "5 1/2 a 6 1/4" },
  { weightMin: 35, weightMax: 40, amountMin: 670, amountMax: 735, cups: "6 1/4 a 6 3/4" },
  { weightMin: 40, weightMax: 45, amountMin: 735, amountMax: 795, cups: "6 3/4 a 7 1/3" },
];

const GESTANTES_LACTANTES: RangeRow[] = [
  { weightMin: 1, weightMax: 3, amountMin: 50, amountMax: 120, cups: "1/2 a 1 1/4" },
  { weightMin: 3, weightMax: 5, amountMin: 120, amountMax: 170, cups: "1 1/4 a 1 1/2" },
  { weightMin: 5, weightMax: 10, amountMin: 170, amountMax: 290, cups: "1 1/2 a 2 2/3" },
  { weightMin: 10, weightMax: 15, amountMin: 290, amountMax: 395, cups: "2 2/3 a 3 2/3" },
  { weightMin: 15, weightMax: 20, amountMin: 395, amountMax: 495, cups: "3 2/3 a 4 1/2" },
  { weightMin: 20, weightMax: 25, amountMin: 495, amountMax: 580, cups: "4 1/2 a 5 1/3" },
  { weightMin: 25, weightMax: 30, amountMin: 580, amountMax: 665, cups: "5 1/3 a 6 1/4" },
  { weightMin: 30, weightMax: 35, amountMin: 665, amountMax: 745, cups: "6 1/4 a 7" },
  { weightMin: 35, weightMax: 40, amountMin: 745, amountMax: 825, cups: "7 a 7 2/3" },
  { weightMin: 40, weightMax: 45, amountMin: 825, amountMax: 900, cups: "7 2/3 a 8 1/4" },
];

function buildRows(ranges: RangeRow[], keyPrefix: string) {
  return ranges.map((r) => ({
    _type: "feedingRow" as const,
    _key: `${keyPrefix}-${r.weightMin}-${r.weightMax}`,
    weightRange: `${r.weightMin} - ${r.weightMax} kg`,
    dailyAmount: `${r.amountMin} - ${r.amountMax} g (${r.cups} tazas)`,
    weightMin: r.weightMin,
    weightMax: r.weightMax,
    amountMin: r.amountMin,
    amountMax: r.amountMax,
  }));
}

const feedingGuideCachorro = {
  _id: FEEDING_GUIDE_ID,
  _type: "feedingGuide",
  product: { _type: "reference", _ref: PRODUCT_ID },
  notes: {
    es: "1 taza de 8 oz (225 ml) = 108 g de NUPEC® CACHORRO.",
    en: "",
    fr: "",
  },
  rows: buildRows(DESTETE, "destete"),
  variants: [
    {
      _type: "variant" as const,
      _key: "mitad-final-crecimiento",
      label: { es: "Cachorros de mitad - final de crecimiento", en: "", fr: "" },
      rows: buildRows(MITAD_FINAL, "mitad-final"),
    },
    {
      _type: "variant" as const,
      _key: "gestantes-lactantes",
      label: { es: "Hembras gestantes / lactantes", en: "", fr: "" },
      rows: buildRows(GESTANTES_LACTANTES, "gestantes"),
    },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Cachorro (canino)`);
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

  const created = await client.createIfNotExists(feedingGuideCachorro);
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
