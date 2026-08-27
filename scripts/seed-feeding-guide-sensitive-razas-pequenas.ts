/**
 * NUPEC – Seed: Guía de Alimentación "Sensitive Razas Pequeñas" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Sensitive Razas Pequeñas.
 * Nutrición para perros con alergias alimentarias.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-sensitive-razas-pequenas.ts
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

const feedingGuideSensitiveRazasPequenas = {
  _id: "feedingguide-canino-sensitive-razas-pequenas",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-sensitive-razas-pequenas" },
  notes: {
    es: "Nutrición para perros con alergias alimentarias. 1 vaso de 225 ml (8 oz) = 108 g de NUPEC® Sensitive Razas Pequeñas.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1-2", weightRange: "1 – 2 kg", dailyAmount: "40 – 60 g (1/3 a 2/3 vasos)" },
    { _type: "row", _key: "2-3", weightRange: "2 – 3 kg", dailyAmount: "60 – 80 g (2/3 a 3/4 vasos)" },
    { _type: "row", _key: "3-4", weightRange: "3 – 4 kg", dailyAmount: "80 – 100 g (3/4 a 1 vasos)" },
    { _type: "row", _key: "4-5", weightRange: "4 – 5 kg", dailyAmount: "100 – 120 g (1 a 1 1/4 vasos)" },
    { _type: "row", _key: "5-7", weightRange: "5 – 7 kg", dailyAmount: "120 – 150 g (1 1/4 a 1 1/3 vasos)" },
    { _type: "row", _key: "7-10", weightRange: "7 – 10 kg", dailyAmount: "150 – 190 g (1 1/3 a 1 3/4 vasos)" },
    { _type: "row", _key: "10-12", weightRange: "10 – 12 kg", dailyAmount: "190 – 210 g (1 3/4 a 2 vasos)" },
    { _type: "row", _key: "12-15", weightRange: "12 – 15 kg", dailyAmount: "210 – 250 g (2 a 2 1/4 vasos)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Sensitive Razas Pequeñas`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-sensitive-razas-pequenas");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-sensitive-razas-pequenas" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideSensitiveRazasPequenas._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideSensitiveRazasPequenas._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideSensitiveRazasPequenas);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
