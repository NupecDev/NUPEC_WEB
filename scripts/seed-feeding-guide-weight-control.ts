/**
 * NUPEC – Seed: Guía de Alimentación "Weight Control" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Weight Control.
 * Para perros adultos obesos.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-weight-control.ts
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

const feedingGuideWeightControl = {
  _id: "feedingguide-canino-weight-control",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-weight-control" },
  notes: {
    es: "Para perros adultos obesos. 1 vaso de 225 ml (8 oz) = 83 g de NUPEC® Weight Control.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1-3", weightRange: "1 – 3 kg", dailyAmount: "30 – 70 g (1/3 a 3/4 vasos)" },
    { _type: "row", _key: "3-5", weightRange: "3 – 5 kg", dailyAmount: "70 – 90 g (3/4 a 1 1/4 vasos)" },
    { _type: "row", _key: "5-10", weightRange: "5 – 10 kg", dailyAmount: "90 – 150 g (1 1/4 a 1 3/4 vasos)" },
    { _type: "row", _key: "10-15", weightRange: "10 – 15 kg", dailyAmount: "150 – 190 g (1 3/4 a 2 1/3 vasos)" },
    { _type: "row", _key: "15-20", weightRange: "15 – 20 kg", dailyAmount: "190 – 230 g (2 1/3 a 2 3/4 vasos)" },
    { _type: "row", _key: "20-30", weightRange: "20 – 30 kg", dailyAmount: "230 – 310 g (2 3/4 a 3 2/3 vasos)" },
    { _type: "row", _key: "30-40", weightRange: "30 – 40 kg", dailyAmount: "310 – 370 g (3 2/3 a 4 1/2 vasos)" },
    { _type: "row", _key: "40-50", weightRange: "40 – 50 kg", dailyAmount: "370 – 430 g (4 1/2 a 5 1/4 vasos)" },
    { _type: "row", _key: "50-60", weightRange: "50 – 60 kg", dailyAmount: "430 – 490 g (5 1/4 a 6 vasos)" },
    { _type: "row", _key: "60-70", weightRange: "60 – 70 kg", dailyAmount: "490 – 540 g (6 a 6 1/2 vasos)" },
    { _type: "row", _key: "70-80", weightRange: "70 – 80 kg", dailyAmount: "540 – 590 g (6 1/2 a 7 1/4 vasos)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Weight Control`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-weight-control");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-weight-control" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideWeightControl._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideWeightControl._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideWeightControl);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
