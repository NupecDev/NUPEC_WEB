/**
 * NUPEC – Seed: Guía de Alimentación "Felino Digestive Health" (felino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Felino Digestive Health.
 * Trae 2 tablas numéricas de puntos de peso:
 *   1) Condición Corporal Normal   -> rows (principal/default)
 *   2) Condición Corporal Delgada  -> variants[0]
 *
 * El producto "Digestive Health" (felino) no tenía ningún feedingGuide
 * vinculado — este script crea el documento y lo enlaza al producto.
 *
 * Cada fila es un punto de la ficha técnica (2, 3, 4, 5, 6, 6.5 kg). Para
 * que la calculadora interpole linealmente entre puntos consecutivos,
 * weightMin/weightMax y amountMin/amountMax de cada fila se encadenan con
 * el siguiente punto. El último punto (6.5 kg) queda con
 * weightMin === weightMax.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-felino-digestive-health.ts
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

const FEEDING_GUIDE_ID = "feedingguide-felino-digestive-health";
const PRODUCT_ID = "product-felino-felino-digestive-health";

type Point = { weight: number; grams: number; cups: string };

const NORMAL: Point[] = [
  { weight: 2, grams: 31, cups: "1/3" },
  { weight: 3, grams: 47, cups: "1/2" },
  { weight: 4, grams: 62, cups: "2/3" },
  { weight: 5, grams: 78, cups: "4/5" },
  { weight: 6, grams: 94, cups: "1" },
  { weight: 6.5, grams: 101, cups: "1 1/5" },
];

const DELGADA: Point[] = [
  { weight: 2, grams: 61, cups: "2/3" },
  { weight: 3, grams: 83, cups: "4/5" },
  { weight: 4, grams: 103, cups: "1 1/5" },
  { weight: 5, grams: 122, cups: "1 1/4" },
  { weight: 6, grams: 139, cups: "1 1/2" },
  { weight: 6.5, grams: 148, cups: "1 3/5" },
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

const feedingGuideFelinoDigestiveHealth = {
  _id: FEEDING_GUIDE_ID,
  _type: "feedingGuide",
  product: { _type: "reference", _ref: PRODUCT_ID },
  notes: {
    es: "Para gatos adultos a partir de 1 año de edad. Un vaso de 225 ml (8 oz) = 95 g de NUPEC® FELINO DIGESTIVE HEALTH.",
    en: "",
    fr: "",
  },
  rows: buildRows(NORMAL, "normal"),
  variants: [
    {
      _type: "variant" as const,
      _key: "condicion-delgada",
      label: { es: "Condición Corporal Delgada", en: "", fr: "" },
      rows: buildRows(DELGADA, "delgada"),
    },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Felino Digestive Health`);
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

  const created = await client.createIfNotExists(feedingGuideFelinoDigestiveHealth);
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
