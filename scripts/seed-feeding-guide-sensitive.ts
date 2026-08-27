/**
 * NUPEC – Seed: Guía de Alimentación "Sensitive" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Sensitive.
 * Nutrición para perros con alergias alimentarias.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-sensitive.ts
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

const feedingGuideSensitive = {
  _id: "feedingguide-canino-sensitive",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-sensitive" },
  notes: {
    es: "Nutrición para perros con alergias alimentarias. 1 vaso de 225 ml (8 oz) = 83 g de NUPEC® Sensitive.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1-3", weightRange: "1 – 3 kg", dailyAmount: "40 – 80 g (1/2 a 1 1/4 vasos)" },
    { _type: "row", _key: "3-5", weightRange: "3 – 5 kg", dailyAmount: "80 – 120 g (1 1/4 a 1 2/3 vasos)" },
    { _type: "row", _key: "5-10", weightRange: "5 – 10 kg", dailyAmount: "120 – 190 g (1 2/3 a 2 2/3 vasos)" },
    { _type: "row", _key: "10-15", weightRange: "10 – 15 kg", dailyAmount: "190 – 250 g (2 2/3 a 3 1/2 vasos)" },
    { _type: "row", _key: "15-20", weightRange: "15 – 20 kg", dailyAmount: "250 – 300 g (3 1/2 a 4 1/4 vasos)" },
    { _type: "row", _key: "20-30", weightRange: "20 – 30 kg", dailyAmount: "300 – 390 g (4 1/4 a 5 1/2 vasos)" },
    { _type: "row", _key: "30-40", weightRange: "30 – 40 kg", dailyAmount: "390 – 470 g (5 1/2 a 6 2/3 vasos)" },
    { _type: "row", _key: "40-50", weightRange: "40 – 50 kg", dailyAmount: "470 – 550 g (6 2/3 a 7 3/4 vasos)" },
    { _type: "row", _key: "50-60", weightRange: "50 – 60 kg", dailyAmount: "550 – 620 g (7 3/4 a 8 3/4 vasos)" },
    { _type: "row", _key: "60-70", weightRange: "60 – 70 kg", dailyAmount: "620 – 690 g (8 3/4 a 9 3/4 vasos)" },
    { _type: "row", _key: "70-80", weightRange: "70 – 80 kg", dailyAmount: "690 – 750 g (9 3/4 a 10 2/3 vasos)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Sensitive`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-sensitive");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-sensitive" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideSensitive._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideSensitive._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideSensitive);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
