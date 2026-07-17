/**
 * NUPEC – Patch: completa campos faltantes en los productos clínicos felinos
 * ya existentes (creados manualmente en Sanity Studio, IDs con prefijo
 * "product-felino-felino-*"). Usa `.patch().set()` para NO pisar campos
 * que ya se hayan llenado a mano (name, image, color, ingredients, etc.).
 *
 * Los feedingGuide (feedingguide-felino-cardiac/hepatic/hypoallergenic)
 * ya existen y apuntan correctamente a estos productos — no se tocan.
 *
 * Uso:
 *   npx tsx scripts/patch-clinical-feline.ts
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

type Patch = {
  id: string;
  setIfEmpty: Record<string, unknown>;
};

// Solo se aplican con `setIfEmpty` los campos que están vacíos/ausentes en el
// documento actual (ver dump previo). Todo lo ya cargado (name, image, color,
// ingredients.es en Cardiac) se deja intacto.

const patches: Patch[] = [
  // ── FELINO CARDIAC ──────────────────────────
  {
    id: "product-felino-felino-cardiac",
    setIfEmpty: {
      tagline: {
        es: "Nutrición clínica que apoya la terapia cardiovascular en los felinos",
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
        { _type: "indication", _key: "electrolitico", label: { es: "Mantenimiento del balance electrolítico", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "fatiga", label: { es: "Reducción de fatiga cardíaca", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "tromboembolismo", label: { es: "Disminuye el riesgo de tromboembolismo arterial", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "miocardico", label: { es: "Retrasa la progresión del daño miocárdico", en: "", fr: "" }, icon: "" },
      ],
      presentations: [
        { _type: "presentation", _key: "1.5kg", weight: "1.5 kg" },
      ],
      lifeStage: ["adulto"],
      specialNeeds: [],
      isActive: true,
    },
  },

  // ── FELINO HEPATIC ──────────────────────────
  {
    id: "product-felino-felino-hepatic",
    setIfEmpty: {
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
        { _type: "indication", _key: "encefalopatia", label: { es: "Reducción de encefalopatía hepática", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "lipidosis", label: { es: "Prevención de lipidosis secundaria", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "regeneracion", label: { es: "Regeneración hepática", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "masa-muscular", label: { es: "Preservación de masa muscular en el carnívoro estricto", en: "", fr: "" }, icon: "" },
      ],
      presentations: [
        { _type: "presentation", _key: "1.5kg", weight: "1.5 kg" },
      ],
      lifeStage: ["adulto"],
      specialNeeds: [],
      isActive: true,
    },
  },

  // ── FELINO HYPOALLERGENIC ───────────────────
  {
    id: "product-felino-felino-hypoallergenic",
    setIfEmpty: {
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
        { _type: "indication", _key: "prurito", label: { es: "Reducción del prurito y lesiones cutáneas asociadas", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "piel-pelaje", label: { es: "Recuperación de piel y pelaje", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "digestivos", label: { es: "Disminución de signos digestivos", en: "", fr: "" }, icon: "" },
        { _type: "indication", _key: "acicalamiento", label: { es: "Control del acicalamiento compulsivo", en: "", fr: "" }, icon: "" },
      ],
      presentations: [
        { _type: "presentation", _key: "1.5kg", weight: "1.5 kg" },
      ],
      lifeStage: ["adulto"],
      specialNeeds: ["piel", "digestion"],
      isActive: true,
    },
  },
];

function isEmpty(val: unknown): boolean {
  if (val === undefined || val === null) return true;
  if (typeof val === "string") return val.trim() === "";
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === "object") return Object.values(val).every(isEmpty);
  return false;
}

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Productos Clínicos Felinos (sin pisar datos existentes)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const { id, setIfEmpty } of patches) {
    const current = await client.getDocument(id);
    if (!current) {
      console.log(`  ⚠️  ${id} no encontrado — se omite`);
      continue;
    }

    const toSet: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(setIfEmpty)) {
      const currentValue = (current as Record<string, unknown>)[key];
      if (isEmpty(currentValue)) {
        toSet[key] = value;
      }
    }

    if (Object.keys(toSet).length === 0) {
      console.log(`  ⏭️   ${id}: nada que actualizar (todo ya lleno)`);
      continue;
    }

    await client.patch(id).set(toSet).commit();
    console.log(`  ✅  ${id}: actualizado → ${Object.keys(toSet).join(", ")}`);
  }

  console.log(`\n✨  Listo. Sigue pendiente llenar manualmente:`);
  console.log(`   - name.en/fr, tagline.en/fr, ingredients.en/fr, warnings.en/fr (fichas fuente son solo ESP)`);
  console.log(`   - clinicalIndications[].icon (elegir set de iconos Lucide)`);
  console.log(`   - Imagen principal / banner hero / banner beneficios (donde falte)`);
  console.log(`   - Ficha técnica PDF (technicalSheet)`);
  console.log(`   - SKU/EAN en presentations, SEO, color (donde falte)`);
  console.log(`   - mechanismOfAction, differentiators, ingredientHighlights, clinicalCases, technicalResources, highTech, keyBenefits, claims, kibble\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
