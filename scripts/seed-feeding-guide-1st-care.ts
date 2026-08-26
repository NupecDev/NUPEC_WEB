/**
 * NUPEC – Seed: Guía de Alimentación "1st Care" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC 1st Care.
 * Trae 3 tablas:
 *   1) 1ª mitad del crecimiento
 *   2) 2ª mitad del crecimiento
 *   3) Gestantes o Lactantes
 * Las tablas 1 y 2 van en la tabla principal (rows) con "label" = etapa.
 * La tabla 3 va en la tabla secundaria agrupada (secondaryColumnGroups/secondaryTableRows).
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-1st-care.ts
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

const PRIMERA_MITAD = "1ª mitad del crecimiento";
const SEGUNDA_MITAD = "2ª mitad del crecimiento";

const feedingGuide1stCare = {
  _id: "feedingguide-canino-1st-care",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-1st-care" },

  rows: [
    { _type: "row", _key: "primera-1", label: PRIMERA_MITAD, weightRange: "1 kg", dailyAmount: "90 g (1 vasos)" },
    { _type: "row", _key: "primera-3", label: PRIMERA_MITAD, weightRange: "3 kg", dailyAmount: "200 g (2 1/4 vasos)" },
    { _type: "row", _key: "primera-5", label: PRIMERA_MITAD, weightRange: "5 kg", dailyAmount: "280 g (3 vasos)" },
    { _type: "row", _key: "primera-10", label: PRIMERA_MITAD, weightRange: "10 kg", dailyAmount: "440 g (4 3/4 vasos)" },
    { _type: "row", _key: "primera-15", label: PRIMERA_MITAD, weightRange: "15 kg", dailyAmount: "580 g (6 1/3 vasos)" },
    { _type: "row", _key: "primera-20", label: PRIMERA_MITAD, weightRange: "20 kg", dailyAmount: "700 g (7 2/3 vasos)" },
    { _type: "row", _key: "primera-25", label: PRIMERA_MITAD, weightRange: "25 kg", dailyAmount: "820 g (8 3/4 vasos)" },
    { _type: "row", _key: "primera-30", label: PRIMERA_MITAD, weightRange: "30 kg", dailyAmount: "920 g (10 vasos)" },
    { _type: "row", _key: "primera-35", label: PRIMERA_MITAD, weightRange: "35 kg", dailyAmount: "1,020 g (11 1/4 vasos)" },
    { _type: "row", _key: "primera-40", label: PRIMERA_MITAD, weightRange: "40 kg", dailyAmount: "1,120 g (12 1/4 vasos)" },
    { _type: "row", _key: "primera-45", label: PRIMERA_MITAD, weightRange: "45 kg", dailyAmount: "1,210 g (13 1/4 vasos)" },

    { _type: "row", _key: "segunda-1", label: SEGUNDA_MITAD, weightRange: "1 kg", dailyAmount: "60 g (2/3 vasos)" },
    { _type: "row", _key: "segunda-3", label: SEGUNDA_MITAD, weightRange: "3 kg", dailyAmount: "130 g (1 1/3 vasos)" },
    { _type: "row", _key: "segunda-5", label: SEGUNDA_MITAD, weightRange: "5 kg", dailyAmount: "180 g (2 vasos)" },
    { _type: "row", _key: "segunda-10", label: SEGUNDA_MITAD, weightRange: "10 kg", dailyAmount: "280 g (3 vasos)" },
    { _type: "row", _key: "segunda-15", label: SEGUNDA_MITAD, weightRange: "15 kg", dailyAmount: "370 g (4 vasos)" },
    { _type: "row", _key: "segunda-20", label: SEGUNDA_MITAD, weightRange: "20 kg", dailyAmount: "450 g (4 3/4 vasos)" },
    { _type: "row", _key: "segunda-25", label: SEGUNDA_MITAD, weightRange: "25 kg", dailyAmount: "520 g (5 2/3 vasos)" },
    { _type: "row", _key: "segunda-30", label: SEGUNDA_MITAD, weightRange: "30 kg", dailyAmount: "590 g (6 1/3 vasos)" },
    { _type: "row", _key: "segunda-35", label: SEGUNDA_MITAD, weightRange: "35 kg", dailyAmount: "650 g (7 vasos)" },
    { _type: "row", _key: "segunda-40", label: SEGUNDA_MITAD, weightRange: "40 kg", dailyAmount: "710 g (7 3/4 vasos)" },
    { _type: "row", _key: "segunda-45", label: SEGUNDA_MITAD, weightRange: "45 kg", dailyAmount: "770 g (8 1/3 vasos)" },
  ],

  secondaryTitle: {
    es: "Gestantes o Lactantes",
    en: "",
    fr: "",
  },
  secondaryWeightColumnLabel: {
    es: "Peso (kg)",
    en: "",
    fr: "",
  },
  secondaryColumnGroups: [
    {
      _type: "columnGroup",
      _key: "gestantes-lactantes",
      label: { es: "Gestantes o Lactantes", en: "", fr: "" },
      subColumns: [
        {
          _type: "subColumn",
          _key: "consumo",
          label: { es: "Consumo diario", en: "", fr: "" },
        },
      ],
    },
  ],
  secondaryTableRows: [
    { _type: "tableRow", _key: "1", weightLabel: "1", values: [{ _type: "cellValue", _key: "v", grams: "40", cups: "1/2" }] },
    { _type: "tableRow", _key: "3", weightLabel: "3", values: [{ _type: "cellValue", _key: "v", grams: "100", cups: "1 1/4" }] },
    { _type: "tableRow", _key: "5", weightLabel: "5", values: [{ _type: "cellValue", _key: "v", grams: "150", cups: "1 2/3" }] },
    { _type: "tableRow", _key: "10", weightLabel: "10", values: [{ _type: "cellValue", _key: "v", grams: "270", cups: "2 3/4" }] },
    { _type: "tableRow", _key: "15", weightLabel: "15", values: [{ _type: "cellValue", _key: "v", grams: "370", cups: "4" }] },
    { _type: "tableRow", _key: "20", weightLabel: "20", values: [{ _type: "cellValue", _key: "v", grams: "470", cups: "5" }] },
    { _type: "tableRow", _key: "25", weightLabel: "25", values: [{ _type: "cellValue", _key: "v", grams: "560", cups: "6 1/4" }] },
    { _type: "tableRow", _key: "30", weightLabel: "30", values: [{ _type: "cellValue", _key: "v", grams: "650", cups: "7 1/4" }] },
    { _type: "tableRow", _key: "35", weightLabel: "35", values: [{ _type: "cellValue", _key: "v", grams: "740", cups: "8 1/4" }] },
    { _type: "tableRow", _key: "40", weightLabel: "40", values: [{ _type: "cellValue", _key: "v", grams: "830", cups: "9" }] },
    { _type: "tableRow", _key: "45", weightLabel: "45", values: [{ _type: "cellValue", _key: "v", grams: "920", cups: "10" }] },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación 1st Care`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-1st-care");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-1st-care" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuide1stCare._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuide1stCare._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuide1stCare);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
