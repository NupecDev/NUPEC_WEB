/**
 * NUPEC – Seed: Guía de Alimentación "High Performance" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC High Performance.
 * Para perros adultos de actividad intensa.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-high-performance.ts
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

const feedingGuideHighPerformance = {
  _id: "feedingguide-canino-high-performance",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-high-performance" },
  notes: {
    es: "Para perros adultos de actividad intensa. 1 taza de 8 oz (225 ml) = 88 g de NUPEC® High Performance.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1-3", weightRange: "1 – 3 kg", dailyAmount: "40 a 90 g (1/2 a 1 tazas)" },
    { _type: "row", _key: "3-5", weightRange: "3 – 5 kg", dailyAmount: "90 a 120 g (1 a 1 1/2 tazas)" },
    { _type: "row", _key: "5-10", weightRange: "5 – 10 kg", dailyAmount: "120 a 200 g (1 1/2 a 2 1/4 tazas)" },
    { _type: "row", _key: "10-15", weightRange: "10 – 15 kg", dailyAmount: "200 a 260 g (2 1/4 a 3 tazas)" },
    { _type: "row", _key: "15-20", weightRange: "15 – 20 kg", dailyAmount: "260 a 310 g (3 a 3 1/2 tazas)" },
    { _type: "row", _key: "20-30", weightRange: "20 – 30 kg", dailyAmount: "310 a 410 g (3 1/2 a 4 2/3 tazas)" },
    { _type: "row", _key: "30-40", weightRange: "30 – 40 kg", dailyAmount: "410 a 500 g (4 2/3 a 5 2/3 tazas)" },
    { _type: "row", _key: "40-50", weightRange: "40 – 50 kg", dailyAmount: "500 a 580 g (5 2/3 a 6 1/2 tazas)" },
    { _type: "row", _key: "50-60", weightRange: "50 – 60 kg", dailyAmount: "580 a 660 g (6 1/2 a 7 1/2 tazas)" },
    { _type: "row", _key: "60-70", weightRange: "60 – 70 kg", dailyAmount: "660 a 730 g (7 1/2 a 8 1/4 tazas)" },
    { _type: "row", _key: "70-80", weightRange: "70 – 80 kg", dailyAmount: "730 a 790 g (8 1/4 a 9 tazas)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación High Performance`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-high-performance");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-high-performance" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideHighPerformance._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideHighPerformance._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideHighPerformance);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
