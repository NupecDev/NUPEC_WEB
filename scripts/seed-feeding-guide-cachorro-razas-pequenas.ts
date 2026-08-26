/**
 * NUPEC – Seed: Guía de Alimentación "Cachorro Razas Pequeñas" (canino)
 *
 * Fuente: imagen de guía de alimentación NUPEC Cachorro Razas Pequeñas.
 * La fuente trae 4 tablas:
 *   1) Cachorros de destete – mitad de crecimiento
 *   2) Cachorros de mitad – final de crecimiento
 *   3) Hembras gestantes / lactantes
 * Las tablas 1 y 2 van en la tabla principal (rows) con "label" = etapa.
 * La tabla 3 va en la tabla secundaria agrupada (secondaryColumnGroups/secondaryTableRows).
 *
 * Usa createIfNotExists para no pisar el documento si ya fue creado/editado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/seed-feeding-guide-cachorro-razas-pequenas.ts
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

const DESTETE = "Cachorros de destete – mitad de crecimiento";
const MITAD_FINAL = "Cachorros de mitad – final de crecimiento";

const feedingGuideCachorroRazasPequenas = {
  _id: "feedingguide-canino-cachorro-razas-pequenas",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-canino-cachorro-razas-pequenas" },

  notes: {
    es: "1 taza de 8 oz (225 ml) = 100 g de NUPEC® Cachorro Razas Pequeñas. Contenido calórico: 3,600 Kcal/kg. INDICACIONES: Alimento balanceado formulado para perros cachorros de un mes de nacidos hasta un año de edad, hembras gestantes y lactantes. VÍA DE ADMINISTRACIÓN: Oral. DOSIS: Según el peso del animal (ver guía de alimentación). ADVERTENCIA: Manténgase en un lugar fresco y seco. Ofrezca en todo momento agua limpia y fresca. No ofrezca este producto si cambia de apariencia. Prohibido el uso de este producto en la alimentación de rumiantes. \"CONSULTE AL MÉDICO VETERINARIO\"",
    en: "",
    fr: "",
  },

  // Tabla 1 y 2: Destete–mitad y Mitad–final de crecimiento
  rows: [
    { _type: "row", _key: "destete-0.5", label: DESTETE, weightRange: "0.5 kg", dailyAmount: "40 g (1/3 taza)" },
    { _type: "row", _key: "destete-1", label: DESTETE, weightRange: "1 kg", dailyAmount: "75 g (3/4 taza)" },
    { _type: "row", _key: "destete-2", label: DESTETE, weightRange: "2 kg", dailyAmount: "130 g (1 1/4 taza)" },
    { _type: "row", _key: "destete-3", label: DESTETE, weightRange: "3 kg", dailyAmount: "175 g (1 3/4 taza)" },
    { _type: "row", _key: "destete-4", label: DESTETE, weightRange: "4 kg", dailyAmount: "215 g (2 1/4 taza)" },
    { _type: "row", _key: "destete-5", label: DESTETE, weightRange: "5 kg", dailyAmount: "250 g (2 1/2 taza)" },
    { _type: "row", _key: "destete-8", label: DESTETE, weightRange: "8 kg", dailyAmount: "365 g (3 2/3 taza)" },
    { _type: "row", _key: "destete-10", label: DESTETE, weightRange: "10 kg", dailyAmount: "425 g (4 1/4 taza)" },
    { _type: "row", _key: "destete-12", label: DESTETE, weightRange: "12 kg", dailyAmount: "500 g (5 taza)" },
    { _type: "row", _key: "destete-15", label: DESTETE, weightRange: "15 kg", dailyAmount: "575 g (5 3/4 taza)" },

    { _type: "row", _key: "mitadfinal-1", label: MITAD_FINAL, weightRange: "1 kg", dailyAmount: "60 g (2/3 taza)" },
    { _type: "row", _key: "mitadfinal-2", label: MITAD_FINAL, weightRange: "2 kg", dailyAmount: "100 g (1 taza)" },
    { _type: "row", _key: "mitadfinal-3", label: MITAD_FINAL, weightRange: "3 kg", dailyAmount: "130 g (1 1/4 taza)" },
    { _type: "row", _key: "mitadfinal-4", label: MITAD_FINAL, weightRange: "4 kg", dailyAmount: "160 g (1 2/3 taza)" },
    { _type: "row", _key: "mitadfinal-5", label: MITAD_FINAL, weightRange: "5 kg", dailyAmount: "180 g (1 3/4 taza)" },
    { _type: "row", _key: "mitadfinal-8", label: MITAD_FINAL, weightRange: "8 kg", dailyAmount: "250 g (2 1/2 taza)" },
    { _type: "row", _key: "mitadfinal-10", label: MITAD_FINAL, weightRange: "10 kg", dailyAmount: "295 g (3 taza)" },
    { _type: "row", _key: "mitadfinal-12", label: MITAD_FINAL, weightRange: "12 kg", dailyAmount: "335 g (3 1/3 taza)" },
  ],

  // Tabla 3: Hembras Gestantes / Lactantes (tabla secundaria agrupada)
  secondaryTitle: {
    es: "Hembras Gestantes / Lactantes",
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
      label: { es: "Hembras Gestantes / Lactantes", en: "", fr: "" },
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
    { _type: "tableRow", _key: "1", weightLabel: "1", values: [{ _type: "cellValue", _key: "v", grams: "50", cups: "1/2" }] },
    { _type: "tableRow", _key: "2", weightLabel: "2", values: [{ _type: "cellValue", _key: "v", grams: "90", cups: "1" }] },
    { _type: "tableRow", _key: "3", weightLabel: "3", values: [{ _type: "cellValue", _key: "v", grams: "120", cups: "1 1/4" }] },
    { _type: "tableRow", _key: "4", weightLabel: "4", values: [{ _type: "cellValue", _key: "v", grams: "145", cups: "1 1/2" }] },
    { _type: "tableRow", _key: "5", weightLabel: "5", values: [{ _type: "cellValue", _key: "v", grams: "170", cups: "1 3/4" }] },
    { _type: "tableRow", _key: "8", weightLabel: "8", values: [{ _type: "cellValue", _key: "v", grams: "250", cups: "2 1/2" }] },
    { _type: "tableRow", _key: "10", weightLabel: "10", values: [{ _type: "cellValue", _key: "v", grams: "295", cups: "3" }] },
    { _type: "tableRow", _key: "12", weightLabel: "12", values: [{ _type: "cellValue", _key: "v", grams: "345", cups: "3 1/2" }] },
  ],
};

async function run() {
  console.log(`\n🐾  NUPEC – Seed: Guía de Alimentación Cachorro Razas Pequeñas`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const product = await client.getDocument("product-canino-cachorro-razas-pequenas");
  if (!product) {
    console.log(`  ⚠️  Producto "product-canino-cachorro-razas-pequenas" no encontrado — se omite`);
    process.exit(1);
  }

  const existing = await client.getDocument(feedingGuideCachorroRazasPequenas._id);
  if (existing) {
    console.log(`  ⏭️   ${feedingGuideCachorroRazasPequenas._id} ya existe — no se sobrescribe`);
    console.log(`      (bórralo en Sanity Studio primero si quieres reemplazarlo con este script)`);
    return;
  }

  const created = await client.createIfNotExists(feedingGuideCachorroRazasPequenas);
  console.log(`  ✅  Guía alim.→ ${created._id}`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
