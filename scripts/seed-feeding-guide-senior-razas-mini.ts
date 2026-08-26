/**
 * NUPEC – Seed: Guía de Alimentación "Senior Razas Mini" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Senior Razas Mini.
 * Para perros adultos de talla miniatura a partir de 9 años de edad.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-senior-razas-mini.ts
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

const feedingGuideSeniorRazasMini = {
  _id: "feedingguide-canino-senior-razas-mini",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-senior-razas-mini" },
  notes: {
    es: "Para perros adultos de talla miniatura a partir de 9 años de edad. Un vaso de 225 ml (8 oz) = 100 g de NUPEC® Senior Razas Mini.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "1", weightRange: "1 kg", dailyAmount: "35 g (1/3 vasos)" },
    { _type: "row", _key: "1.5", weightRange: "1.5 kg", dailyAmount: "50 g (1/2 vasos)" },
    { _type: "row", _key: "2", weightRange: "2 kg", dailyAmount: "60 g (3/5 vasos)" },
    { _type: "row", _key: "2.5", weightRange: "2.5 kg", dailyAmount: "70 g (2/3 vasos)" },
    { _type: "row", _key: "3", weightRange: "3 kg", dailyAmount: "80 g (4/5 vasos)" },
    { _type: "row", _key: "3.5", weightRange: "3.5 kg", dailyAmount: "90 g (4/5 vasos)" },
    { _type: "row", _key: "4", weightRange: "4 kg", dailyAmount: "100 g (1 vasos)" },
    { _type: "row", _key: "4.5", weightRange: "4.5 kg", dailyAmount: "105 g (1 vasos)" },
    { _type: "row", _key: "5", weightRange: "5 kg", dailyAmount: "115 g (1 1/5 vasos)" },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Senior Razas Mini`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-senior-razas-mini");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-senior-razas-mini" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideSeniorRazasMini._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideSeniorRazasMini._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideSeniorRazasMini);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
