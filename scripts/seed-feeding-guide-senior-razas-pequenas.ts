/**
 * NUPEC – Seed: Guía de Alimentación "Senior Razas Pequeñas" (canino)
 *
 * Fuente: https://nupec.com/nutricion-canina/nutricion-cientifica/senior-raza-pequena/
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-senior-razas-pequenas.ts
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

const feedingGuideSeniorRazasPequenas = {
  _id: "feedingguide-canino-senior-razas-pequenas",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-senior-razas-pequenas" },
  notes: {
    es: "1 taza de 8 oz (225 ml) = 107 g de NUPEC® Senior Razas Pequeñas.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1-2kg", weightRange: "1 – 2 kg", dailyAmount: "40 – 70 g (1/2 – 2/3 vasos)" },
    { _type: "row", _key: "2-3kg", weightRange: "2 – 3 kg", dailyAmount: "70 – 90 g (2/3 – 3/4 vasos)" },
    { _type: "row", _key: "3-4kg", weightRange: "3 – 4 kg", dailyAmount: "90 – 110 g (3/4 – 1 vasos)" },
    { _type: "row", _key: "4-5kg", weightRange: "4 – 5 kg", dailyAmount: "110 – 130 g (1 – 1 1/4 vasos)" },
    { _type: "row", _key: "5-7kg", weightRange: "5 – 7 kg", dailyAmount: "130 – 160 g (1 1/4 – 1 1/2 vasos)" },
    { _type: "row", _key: "7-10kg", weightRange: "7 – 10 kg", dailyAmount: "160 – 200 g (1 1/2 – 2 vasos)" },
    { _type: "row", _key: "10-12kg", weightRange: "10 – 12 kg", dailyAmount: "200 – 230 g (2 – 2 1/4 vasos)" },
    { _type: "row", _key: "12-15kg", weightRange: "12 – 15 kg", dailyAmount: "230 – 260 g (2 1/4 – 2 1/2 vasos)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Senior Razas Pequeñas`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-senior-razas-pequenas");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-senior-razas-pequenas" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideSeniorRazasPequenas._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideSeniorRazasPequenas._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideSeniorRazasPequenas);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
