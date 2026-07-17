/**
 * NUPEC – Seed: Productos Clínicos Felinos
 *   - Felino Hypoallergenic
 *   - Felino Hepatic
 *   - Felino Cardiac
 *
 * Fuente: fichas técnicas PDF (NUP_CLIN_FEL_HYPOALLERGENIC_ESP, NUP_CLIN_FEL_HEPATIC_ESP, NUP_CLIN_FEL_CARDIAC_ESP)
 * Categoría: category-felino-nutricion-clinica (creada en seed-categories-felino.ts)
 *
 * NOTA: Los textos EN/FR no vienen en las fichas técnicas (solo ESP) — quedan vacíos
 * para llenarse manualmente. Igual imagen principal, banner, ficha técnica PDF, SKU,
 * y meta SEO.
 *
 * Uso:
 *   npx tsx scripts/seed-clinical-feline.ts
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

const CATEGORY_ID = "category-felino-nutricion-clinica";

// ─────────────────────────────────────────────
//  1. FELINO HYPOALLERGENIC
// ─────────────────────────────────────────────
const productHypoallergenic = {
  _id: "product-felino-hypoallergenic",
  _type: "product",
  name: {
    es: "Felino Hypoallergenic",
    en: "",
    fr: "",
  },
  slug: { _type: "slug", current: "felino-hypoallergenic" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_ID },

  tagline: {
    es: "Nutrición clínica que apoya la terapia hipoalergénica en los felinos",
    en: "",
    fr: "",
  },

  ingredients: {
    es: "Salmón hidrolizado, tapioca, grasa de ave, almidón de maíz pregelatinizado, pulpa de remolacha, ortofosfato de calcio, celulosa, aceite de pescado, palatante natural hidrolizado, cloruro de potasio, inulina de achicoria, calcio, glutamina, metionina, mananooligosacáridos, lisina, cloruro de colina, taurina, L-arginina, treonina, triptófano, butirato de sodio, L-Carnitina, fructooligosacáridos, suplemento de vitamina A, colecalciferol, acetato de DL-alfa tocoferol, complejo de bisulfito sódico de menadiona, mononitrato de tiamina, riboflavina, ácido nicotínico, clorhidrato de piridoxina, cianocobalamina, D-biotina, pantotenato de calcio, ácido fólico, hierro orgánico, manganeso orgánico, selenio orgánico, cobre orgánico, zinc orgánico, dihidroyoduro de diamino etileno, extracto de Yucca schidigera, Scutellaria baicalensis, romero y tocoferoles como conservadores.",
    en: "",
    fr: "",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "30.0%", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "19.0%", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "4.0%", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "9.5%", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "12.0%", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "25.5%", min: false },
    { _type: "nutrient", _key: "kcal", label: "Contenido calórico", value: "3,800 Kcal/kg", min: false },
  ],

  warnings: {
    es: "Manténgase en un lugar fresco y seco. Ofrezca en todo momento agua limpia y fresca. No ofrezca este producto si cambia de apariencia. CONSULTE AL MÉDICO VETERINARIO.\n\nINDICACIONES: Alimento diseñado para apoyar la terapia de gatos adultos de todas las razas que cursen por un problema alérgico alimenticio diagnosticado clínicamente por un Médico Veterinario Zootecnista. VÍA DE ADMINISTRACIÓN: Oral. DOSIS: Según el peso del animal (ver guía de alimentación).",
    en: "",
    fr: "",
  },

  clinicalIndications: [
    {
      _type: "indication",
      _key: "prurito",
      label: {
        es: "Reducción del prurito y lesiones cutáneas asociadas",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "piel-pelaje",
      label: {
        es: "Recuperación de piel y pelaje",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "digestivos",
      label: {
        es: "Disminución de signos digestivos",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "acicalamiento",
      label: {
        es: "Control del acicalamiento compulsivo",
        en: "",
        fr: "",
      },
      icon: "",
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "1.5kg",
      weight: "1.5 kg",
    },
  ],

  lifeStage: ["adulto"],
  specialNeeds: ["piel", "digestion"],

  isActive: true,
};

const feedingGuideHypoallergenic = {
  _id: "feedingguide-felino-hypoallergenic",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-felino-hypoallergenic" },
  notes: {
    es: "1 taza de 225 ml (8 oz) = 94 g de NUPEC® FELINO HYPOALLERGENIC. Todo cambio en la alimentación debe ser gradual. Mezcle el alimento anterior con NUPEC® FELINO HYPOALLERGENIC en relación 3 a 1 y aumente la cantidad paulatinamente. Considera que las necesidades nutricionales de cada gato varían dependiendo de la talla, sexo, raza, actividad, etapa fisiológica y temperatura ambiental.",
    en: "",
    fr: "",
  },
  // Tabla condición corporal: Delgado / Normal / Sobrepeso (g/día — tazas/día)
  rows: [
    { _type: "row", _key: "2kg", label: "Delgado / Normal / Sobrepeso", weightRange: "2 kg", dailyAmount: "47 g (1/2 taza) / 41 g (2/5 taza) / 35 g (1/3 taza)" },
    { _type: "row", _key: "3kg", label: "Delgado / Normal / Sobrepeso", weightRange: "3 kg", dailyAmount: "65 g (2/3 taza) / 56 g (3/5 taza) / 48 g (1/2 taza)" },
    { _type: "row", _key: "4kg", label: "Delgado / Normal / Sobrepeso", weightRange: "4 kg", dailyAmount: "80 g (4/5 taza) / 70 g (3/4 taza) / 59 g (3/5 taza)" },
    { _type: "row", _key: "5kg", label: "Delgado / Normal / Sobrepeso", weightRange: "5 kg", dailyAmount: "93 g (1 taza) / 81 g (4/5 taza) / 69 g (3/4 taza)" },
    { _type: "row", _key: "6kg", label: "Delgado / Normal / Sobrepeso", weightRange: "6 kg", dailyAmount: "108 g (1 1/5 taza) / 94 g (1 taza) / 80 g (4/5 taza)" },
  ],
};

// ─────────────────────────────────────────────
//  2. FELINO HEPATIC
// ─────────────────────────────────────────────
const productHepatic = {
  _id: "product-felino-hepatic",
  _type: "product",
  name: {
    es: "Felino Hepatic",
    en: "",
    fr: "",
  },
  slug: { _type: "slug", current: "felino-hepatic" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_ID },

  tagline: {
    es: "Nutrición clínica que apoya la terapia hepática en los felinos",
    en: "",
    fr: "",
  },

  ingredients: {
    es: "Arroz, grasa de ave, caseína, huevo deshidratado, hidrolizado de pescado, proteína de papa, aceite de coco, pulpa de remolacha, aceite de pescado, sabor natural de pollo, inulina de achicoria, harina de carne de pollo, L-arginina, L-isoleucina, celulosa, L-valina, colina, taurina, sodio, potasio, calcio, lisina, L-carnitina, metionina, suplemento de vitamina A, colecalciferol, acetato de alfa-tocoferol, complejo de menadiona de sodio bisulfito, mononitrato de tiamina, riboflavina, ácido nicotínico, clorhidrato de piridoxina, suplemento de vitamina B12, biotina, vitamina C, pantotenato de calcio, ácido fólico, hierro orgánico, manganeso orgánico, selenio orgánico, zinc orgánico, dihidroyoduro de diamino etileno, Silimarina, extracto de Yucca schidigera, romero y tocoferoles como conservadores.",
    en: "",
    fr: "",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "28.0%", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "20.0%", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "3.0%", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "5.0%", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "12.0%", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "32.5%", min: false },
    { _type: "nutrient", _key: "kcal", label: "Contenido calórico", value: "3,500 Kcal/kg", min: false },
  ],

  warnings: {
    es: "Manténgase en un lugar fresco y seco. Ofrezca en todo momento agua limpia y fresca. No ofrezca este producto si cambia de apariencia. CONSULTE AL MÉDICO VETERINARIO.\n\nINDICACIONES: Alimento diseñado para apoyar la terapia de gatos adultos de todas las razas que cursen por un problema hepático diagnosticado clínicamente por un Médico Veterinario Zootecnista. VÍA DE ADMINISTRACIÓN: Oral. DOSIS: Según el peso del animal (ver guía de alimentación).",
    en: "",
    fr: "",
  },

  clinicalIndications: [
    {
      _type: "indication",
      _key: "encefalopatia",
      label: {
        es: "Reducción de encefalopatía hepática",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "lipidosis",
      label: {
        es: "Prevención de lipidosis secundaria",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "regeneracion",
      label: {
        es: "Regeneración hepática",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "masa-muscular",
      label: {
        es: "Preservación de masa muscular en el carnívoro estricto",
        en: "",
        fr: "",
      },
      icon: "",
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "1.5kg",
      weight: "1.5 kg",
    },
  ],

  lifeStage: ["adulto"],
  specialNeeds: [],

  isActive: true,
};

const feedingGuideHepatic = {
  _id: "feedingguide-felino-hepatic",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-felino-hepatic" },
  notes: {
    es: "1 taza de 225 ml (8 oz) = 100 g de NUPEC® FELINO HEPATIC. Todo cambio en la alimentación debe ser gradual. Mezcle el alimento anterior con NUPEC® FELINO HEPATIC en relación 3 a 1 y aumente la cantidad paulatinamente. Considera que las necesidades nutricionales de cada gato varían dependiendo de la talla, sexo, raza, actividad, etapa fisiológica y temperatura ambiental.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "2kg", label: "Delgado / Normal / Sobrepeso", weightRange: "2 kg", dailyAmount: "44 g (2/5 taza) / 38 g (2/5 taza) / 33 g (1/3 taza)" },
    { _type: "row", _key: "3kg", label: "Delgado / Normal / Sobrepeso", weightRange: "3 kg", dailyAmount: "60 g (3/5 taza) / 52 g (1/2 taza) / 44 g (2/5 taza)" },
    { _type: "row", _key: "4kg", label: "Delgado / Normal / Sobrepeso", weightRange: "4 kg", dailyAmount: "75 g (3/4 taza) / 65 g (2/3 taza) / 55 g (1/2 taza)" },
    { _type: "row", _key: "5kg", label: "Delgado / Normal / Sobrepeso", weightRange: "5 kg", dailyAmount: "88 g (4/5 taza) / 77 g (3/4 taza) / 66 g (2/3 taza)" },
    { _type: "row", _key: "6kg", label: "Delgado / Normal / Sobrepeso", weightRange: "6 kg", dailyAmount: "101 g (1 taza) / 88 g (4/5 taza) / 75 g (3/4 taza)" },
  ],
};

// ─────────────────────────────────────────────
//  3. FELINO CARDIAC
// ─────────────────────────────────────────────
const productCardiac = {
  _id: "product-felino-cardiac",
  _type: "product",
  name: {
    es: "Felino Cardiac",
    en: "",
    fr: "",
  },
  slug: { _type: "slug", current: "felino-cardiac" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_ID },

  tagline: {
    es: "Nutrición clínica que apoya la terapia cardiovascular en los felinos",
    en: "",
    fr: "",
  },

  ingredients: {
    es: "Harina de carne de pollo, cebada, sorgo, hidrolizado de pescado, grasa de ave, harina de pavo, proteína de papa, huevo deshidratado, plasma animal, concentrado proteico de chícharo, pulpa de remolacha, celulosa, sabor natural pollo, aceite de pescado, cloruro de potasio, L-Taurina, L-Lisina, L-Arginina, colina, metionina, L-Carnitina, Scutellaria baicalensis, suplemento de vitamina A, colecalciferol, acetato de alfa-tocoferol, complejo de menadiona de sodio bisulfito, mononitrato de tiamina, riboflavina, ácido nicotínico, clorhidrato de piridoxina, suplemento de vitamina B12, biotina, pantotenato de calcio, ácido fólico, hierro orgánico, manganeso orgánico, selenio orgánico, cobre orgánico, zinc orgánico, dihidroyoduro de diamino etileno, extracto de Yucca schidigera, romero y tocoferoles como conservadores.",
    en: "",
    fr: "",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "39.0%", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "14.0%", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "4.0%", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "8.5%", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "12.0%", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "22.5%", min: false },
    { _type: "nutrient", _key: "kcal", label: "Contenido calórico", value: "3,500 Kcal/kg", min: false },
  ],

  warnings: {
    es: "Manténgase en un lugar fresco y seco. Ofrezca en todo momento agua limpia y fresca. No ofrezca este producto si cambia de apariencia. CONSULTE AL MÉDICO VETERINARIO.\n\nINDICACIONES: Alimento diseñado para apoyar la terapia de gatos adultos de todas las razas que cursen por un problema cardiaco diagnosticado clínicamente por un Médico Veterinario Zootecnista. VÍA DE ADMINISTRACIÓN: Oral. DOSIS: Según el peso del animal (ver guía de alimentación).",
    en: "",
    fr: "",
  },

  clinicalIndications: [
    {
      _type: "indication",
      _key: "electrolitico",
      label: {
        es: "Mantenimiento del balance electrolítico",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "fatiga",
      label: {
        es: "Reducción de fatiga cardíaca",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "tromboembolismo",
      label: {
        es: "Disminuye el riesgo de tromboembolismo arterial",
        en: "",
        fr: "",
      },
      icon: "",
    },
    {
      _type: "indication",
      _key: "miocardico",
      label: {
        es: "Retrasa la progresión del daño miocárdico",
        en: "",
        fr: "",
      },
      icon: "",
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "1.5kg",
      weight: "1.5 kg",
    },
  ],

  lifeStage: ["adulto"],
  specialNeeds: [],

  isActive: true,
};

const feedingGuideCardiac = {
  _id: "feedingguide-felino-cardiac",
  _type: "feedingGuide",
  product: { _type: "reference", _ref: "product-felino-cardiac" },
  notes: {
    es: "1 taza de 225 ml (8 oz) = 90 g de NUPEC® FELINO CARDIAC. Todo cambio en la alimentación debe ser gradual. Mezcle el alimento anterior con NUPEC® FELINO CARDIAC en relación 3 a 1 y aumente la cantidad paulatinamente. Considera que las necesidades nutricionales de cada gato varían dependiendo de la talla, sexo, raza, actividad, etapa fisiológica y temperatura ambiental.",
    en: "",
    fr: "",
  },
  rows: [
    { _type: "row", _key: "2kg", label: "Delgado / Normal / Sobrepeso", weightRange: "2 kg", dailyAmount: "52 g (3/5 taza) / 45 g (1/2 taza) / 38 g (2/5 taza)" },
    { _type: "row", _key: "3kg", label: "Delgado / Normal / Sobrepeso", weightRange: "3 kg", dailyAmount: "69 g (3/4 taza) / 60 g (2/3 taza) / 51 g (3/5 taza)" },
    { _type: "row", _key: "4kg", label: "Delgado / Normal / Sobrepeso", weightRange: "4 kg", dailyAmount: "86 g (1 taza) / 75 g (4/5 taza) / 64 g (2/3 taza)" },
    { _type: "row", _key: "5kg", label: "Delgado / Normal / Sobrepeso", weightRange: "5 kg", dailyAmount: "100 g (1 taza) / 87 g (1 taza) / 74 g (4/5 taza)" },
    { _type: "row", _key: "6kg", label: "Delgado / Normal / Sobrepeso", weightRange: "6 kg", dailyAmount: "115 g (1 1/4 taza) / 100 g (1 taza) / 85 g (1 taza)" },
  ],
};

// ─────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────
async function seed() {
  console.log(`\n🐾  NUPEC – Seed: Productos Clínicos Felinos`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  const p1 = await client.createOrReplace(productHypoallergenic);
  console.log(`  ✅  Producto  → ${p1._id}`);
  const fg1 = await client.createOrReplace(feedingGuideHypoallergenic);
  console.log(`  ✅  Guía alim.→ ${fg1._id}`);

  const p2 = await client.createOrReplace(productHepatic);
  console.log(`  ✅  Producto  → ${p2._id}`);
  const fg2 = await client.createOrReplace(feedingGuideHepatic);
  console.log(`  ✅  Guía alim.→ ${fg2._id}`);

  const p3 = await client.createOrReplace(productCardiac);
  console.log(`  ✅  Producto  → ${p3._id}`);
  const fg3 = await client.createOrReplace(feedingGuideCardiac);
  console.log(`  ✅  Guía alim.→ ${fg3._id}`);

  console.log(`\n✨  Listo. Pendiente de llenar manualmente en Sanity Studio para cada producto:`);
  console.log(`   - "name.en" / "name.fr", "tagline.en/fr", "ingredients.en/fr", "warnings.en/fr" (las fichas fuente son solo ESP)`);
  console.log(`   - "clinicalIndications[].icon" (elegir set de iconos Lucide)`);
  console.log(`   - Imagen principal (image), banner del hero (bannerImage), banner de beneficios (benefitsBannerImage)`);
  console.log(`   - Ficha técnica en PDF (technicalSheet) — subir los PDFs originales`);
  console.log(`   - SKU / EAN en presentations`);
  console.log(`   - SEO (metaTitle / metaDescription)`);
  console.log(`   - color (hex representativo por producto)`);
  console.log(`   - mechanismOfAction, differentiators, ingredientHighlights, clinicalCases, technicalResources (no vienen en la ficha técnica)`);
  console.log(`   - highTech, keyBenefits, claims, kibble (opcionales, no presentes en fuente)\n`);
}

seed().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
