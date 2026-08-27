/**
 * NUPEC – Seed: Guía de Alimentación "Digestive Health" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Digestive Health.
 * Para perros a partir de un año, con actividad media.
 * Dos columnas paralelas por condición corporal (Normal / Delgada), con el
 * mismo peso de referencia en cada fila — se mapea a la tabla secundaria
 * agrupada con un solo grupo "Condición Corporal" y 2 subcolumnas.
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-digestive-health.ts
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

const feedingGuideDigestiveHealth = {
  _id: "feedingguide-canino-digestive-health",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-digestive-health" },

  notes: {
    es: "Para perros a partir de un año, con actividad media. Un vaso de 225 ml (8 oz) = 105 g de NUPEC® Digestive Health. * La condición corporal del perro deberá ser determinada por un Médico Veterinario.",
    en: "",
    fr: "",
  },

  secondaryTitle: {
    es: "Guía de alimentación por condición corporal",
    en: "",
    fr: "",
  },
  secondaryWeightColumnLabel: {
    es: "Peso actual (kg)",
    en: "",
    fr: "",
  },
  secondaryColumnGroups: [
    {
      _type: "columnGroup",
      _key: "condicion-corporal",
      label: { es: "Condición Corporal", en: "", fr: "" },
      subColumns: [
        { _type: "subColumn", _key: "normal", label: { es: "Normal*", en: "", fr: "" } },
        { _type: "subColumn", _key: "delgada", label: { es: "Delgada*", en: "", fr: "" } },
      ],
    },
  ],
  secondaryTableRows: [
    {
      _type: "tableRow", _key: "1", weightLabel: "1",
      values: [
        { _type: "cellValue", _key: "normal", grams: "40", cups: "2/5" },
        { _type: "cellValue", _key: "delgada", grams: "50", cups: "1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "3", weightLabel: "3",
      values: [
        { _type: "cellValue", _key: "normal", grams: "90", cups: "4/5" },
        { _type: "cellValue", _key: "delgada", grams: "110", cups: "1 1/5" },
      ],
    },
    {
      _type: "tableRow", _key: "5", weightLabel: "5",
      values: [
        { _type: "cellValue", _key: "normal", grams: "130", cups: "1 1/4" },
        { _type: "cellValue", _key: "delgada", grams: "160", cups: "1 1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "10", weightLabel: "10",
      values: [
        { _type: "cellValue", _key: "normal", grams: "170", cups: "1 2/3" },
        { _type: "cellValue", _key: "delgada", grams: "205", cups: "2" },
      ],
    },
    {
      _type: "tableRow", _key: "15", weightLabel: "15",
      values: [
        { _type: "cellValue", _key: "normal", grams: "230", cups: "2 1/5" },
        { _type: "cellValue", _key: "delgada", grams: "280", cups: "2 2/3" },
      ],
    },
    {
      _type: "tableRow", _key: "20", weightLabel: "20",
      values: [
        { _type: "cellValue", _key: "normal", grams: "285", cups: "2 3/4" },
        { _type: "cellValue", _key: "delgada", grams: "345", cups: "3 1/3" },
      ],
    },
    {
      _type: "tableRow", _key: "30", weightLabel: "30",
      values: [
        { _type: "cellValue", _key: "normal", grams: "390", cups: "3 3/4" },
        { _type: "cellValue", _key: "delgada", grams: "465", cups: "4 1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "40", weightLabel: "40",
      values: [
        { _type: "cellValue", _key: "normal", grams: "480", cups: "4 3/5" },
        { _type: "cellValue", _key: "delgada", grams: "575", cups: "5 1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "50", weightLabel: "50",
      values: [
        { _type: "cellValue", _key: "normal", grams: "570", cups: "5 1/2" },
        { _type: "cellValue", _key: "delgada", grams: "680", cups: "6 1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "60", weightLabel: "60",
      values: [
        { _type: "cellValue", _key: "normal", grams: "650", cups: "6 1/5" },
        { _type: "cellValue", _key: "delgada", grams: "780", cups: "7 1/2" },
      ],
    },
    {
      _type: "tableRow", _key: "70", weightLabel: "70",
      values: [
        { _type: "cellValue", _key: "normal", grams: "730", cups: "7" },
        { _type: "cellValue", _key: "delgada", grams: "875", cups: "8 1/3" },
      ],
    },
    {
      _type: "tableRow", _key: "80", weightLabel: "80",
      values: [
        { _type: "cellValue", _key: "normal", grams: "810", cups: "7 3/4" },
        { _type: "cellValue", _key: "delgada", grams: "970", cups: "9 1/4" },
      ],
    },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Digestive Health`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-digestive-health");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-digestive-health" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideDigestiveHealth._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideDigestiveHealth._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideDigestiveHealth);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
