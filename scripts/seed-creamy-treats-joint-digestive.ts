/**
 * NUPEC – Seed: Productos "Creamy Treats Joint Care" y "Creamy Treats Digestive Care" (Felino)
 *
 * Requiere que la categoría "Suplementos" (Felino) ya exista
 * (ver scripts/seed-creamy-treats-skin-coat.ts, _id: category-felino-suplementos).
 *
 * Uso:
 *   npx tsx scripts/seed-creamy-treats-joint-digestive.ts
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

const CATEGORY_FELINO_SUPLEMENTOS_ID = "category-felino-suplementos";

// ─────────────────────────────────────────────
//  1. Producto "Creamy Treats – Joint Care" — Felino
//     Fuente: BNBLQ0750_NUPEC_Articular_Gato_Adulto_75 g_Mexico
// ─────────────────────────────────────────────
const productCreamyTreatsJointCare = {
  _id: "product-felino-creamy-treats-joint-care",
  _type: "product",
  name: {
    es: "Creamy Treats Articular",
    en: "Creamy Treats Joint Care",
    fr: "Creamy Treats Articulaire",
  },
  slug: { _type: "slug", current: "creamy-treats-articular" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_FELINO_SUPLEMENTOS_ID },

  tagline: {
    es: "Premio cremoso con taurina y vitamina E",
    en: "Creamy treat with taurine and vitamin E",
    fr: "Friandise crémeuse à la taurine et vitamine E",
  },

  ingredients: {
    es: "Agua, lomo de salmón, almidón, aceite de pescado, vitamina E, goma guar, fructooligosacáridos, goma xantana, Scutellaria baicalensis, taurina, extracto de romero y tocoferoles.",
    en: "Water, salmon loin, starch, fish oil, vitamin E, guar gum, fructooligosaccharides, xanthan gum, Scutellaria baicalensis, taurine, rosemary extract, and tocopherols.",
    fr: "Eau, filet de saumon, amidon, huile de poisson, vitamine E, gomme de guar, fructo-oligosaccharides, gomme xanthane, Scutellaria baicalensis, taurine, extrait de romarin et tocophérols.",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "min. 7.0 %", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "min. 3.0 %", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "max. 0.3 %", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "max. 1.3 %", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "max. 87.5 %", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "0.9 %", min: false },
    { _type: "nutrient", _key: "vite", label: "Vitamina E", value: "min. 250 UI/100 g", min: true },
  ],

  warnings: {
    es: "Una vez abierto el producto, mantener en refrigeración. No se suministre si cambia de apariencia. No se deje al alcance de los niños. CONSULTE AL MÉDICO VETERINARIO.",
    en: "Once opened, keep refrigerated. Do not administer if appearance changes. Keep out of reach of children. CONSULT A VETERINARIAN.",
    fr: "Une fois le produit ouvert, conserver au réfrigérateur. Ne pas administrer si l'aspect du produit a changé. Tenir hors de portée des enfants. CONSULTEZ UN VÉTÉRINAIRE.",
  },

  claims: [
    {
      _type: "claimItem",
      _key: "taurina-vite",
      icon: "sparkles",
      text: {
        es: "Con taurina y vitamina E",
        en: "With taurine and vitamin E",
        fr: "Avec taurine et vitamine E",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-conservadores",
      icon: "shield-off",
      text: {
        es: "Sin conservadores artificiales",
        en: "No artificial preservatives",
        fr: "Sans conservateurs artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-saborizantes",
      icon: "shield-off",
      text: {
        es: "Sin saborizantes artificiales",
        en: "No artificial flavors",
        fr: "Sans arômes artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-carragenina",
      icon: "shield-off",
      text: {
        es: "Sin carragenina",
        en: "No carrageenan",
        fr: "Sans carraghénane",
      },
    },
  ],

  keyBenefits: [
    {
      _type: "keyBenefitItem",
      _key: "vinculo",
      icon: "heart",
      description: {
        es: "Fortalece el vínculo con tu gato",
        en: "Build a stronger bond with your cat",
        fr: "Renforce le lien avec ton chat",
      },
    },
    {
      _type: "keyBenefitItem",
      _key: "articular",
      icon: "bone",
      description: {
        es: "Apoya la salud articular",
        en: "Supports joint health",
        fr: "Favorise la santé articulaire",
      },
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "75g",
      weight: "75 g (5 x 15 g)",
      ean: "7503038261960",
    },
  ],

  kibble: {
    description: {
      es: "Cada sachet contiene una porción individual de 15 g, lista para servir como premio.",
      en: "Each sachet contains an individual 15 g portion, ready to serve as a treat.",
      fr: "Chaque sachet contient une portion individuelle de 15 g, prête à servir en friandise.",
    },
  },

  lifeStage: ["adulto"],
  specialNeeds: [],

  isActive: true,
};

// ─────────────────────────────────────────────
//  2. Producto "Creamy Treats – Digestive Care" — Felino
//     Fuente: BNBNQ0750_NUPEC_Digestivo_Gato_Adulto_75 g_Mexico
// ─────────────────────────────────────────────
const productCreamyTreatsDigestiveCare = {
  _id: "product-felino-creamy-treats-digestive-care",
  _type: "product",
  name: {
    es: "Creamy Treats Digestivo",
    en: "Creamy Treats Digestive Care",
    fr: "Creamy Treats Digestif",
  },
  slug: { _type: "slug", current: "creamy-treats-digestivo" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_FELINO_SUPLEMENTOS_ID },

  tagline: {
    es: "Premio cremoso con taurina y vitamina E",
    en: "Creamy treat with taurine and vitamin E",
    fr: "Friandise crémeuse à la taurine et vitamine E",
  },

  ingredients: {
    es: "Agua, carne de pollo, hidrolizado de hígado, almidón, vitamina E, goma guar, fructooligosacáridos, goma xantana, aceite de krill, taurina, extracto de romero y tocoferoles.",
    en: "Water, chicken meat, hydrolyzed liver, starch, vitamin E, guar gum, fructooligosaccharides, xanthan gum, krill oil, taurine, rosemary extract, and tocopherols.",
    fr: "Eau, viande de poulet, hydrolysat de foie, amidon, vitamine E, gomme de guar, fructo-oligosaccharides, gomme xanthane, huile de krill, taurine, extrait de romarin et tocophérols.",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "min. 7.0 %", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "min. 3.5 %", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "max. 0.3 %", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "max. 1.6 %", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "max. 87.0 %", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "0.6 %", min: false },
    { _type: "nutrient", _key: "vite", label: "Vitamina E", value: "min. 250 UI/100 g", min: true },
  ],

  warnings: {
    es: "Una vez abierto el producto, mantener en refrigeración. No se suministre si cambia de apariencia. No se deje al alcance de los niños. CONSULTE AL MÉDICO VETERINARIO.",
    en: "Once opened, keep refrigerated. Do not administer if appearance changes. Keep out of reach of children. CONSULT A VETERINARIAN.",
    fr: "Une fois le produit ouvert, conserver au réfrigérateur. Ne pas administrer si l'aspect du produit a changé. Tenir hors de portée des enfants. CONSULTEZ UN VÉTÉRINAIRE.",
  },

  claims: [
    {
      _type: "claimItem",
      _key: "taurina-vite",
      icon: "sparkles",
      text: {
        es: "Con taurina y vitamina E",
        en: "With taurine and vitamin E",
        fr: "Avec taurine et vitamine E",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-conservadores",
      icon: "shield-off",
      text: {
        es: "Sin conservadores artificiales",
        en: "No artificial preservatives",
        fr: "Sans conservateurs artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-saborizantes",
      icon: "shield-off",
      text: {
        es: "Sin saborizantes artificiales",
        en: "No artificial flavors",
        fr: "Sans arômes artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-carragenina",
      icon: "shield-off",
      text: {
        es: "Sin carragenina",
        en: "No carrageenan",
        fr: "Sans carraghénane",
      },
    },
  ],

  keyBenefits: [
    {
      _type: "keyBenefitItem",
      _key: "vinculo",
      icon: "heart",
      description: {
        es: "Fortalece el vínculo con tu gato",
        en: "Build a stronger bond with your cat",
        fr: "Renforce le lien avec ton chat",
      },
    },
    {
      _type: "keyBenefitItem",
      _key: "digestivo",
      icon: "activity",
      description: {
        es: "Apoya la salud digestiva",
        en: "Supports digestive health",
        fr: "Favorise la santé digestive",
      },
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "75g",
      weight: "75 g (5 x 15 g)",
      ean: "7503038261953",
    },
  ],

  kibble: {
    description: {
      es: "Cada sachet contiene una porción individual de 15 g, lista para servir como premio.",
      en: "Each sachet contains an individual 15 g portion, ready to serve as a treat.",
      fr: "Chaque sachet contient une portion individuelle de 15 g, prête à servir en friandise.",
    },
  },

  lifeStage: ["adulto"],
  specialNeeds: ["digestion"],

  isActive: true,
};

// ─────────────────────────────────────────────
//  3. Producto "Creamy Treats – Vitality Care" — Felino
//     Fuente: BNBYQ0750_NUPEC_Multivitaminico_Gato_Adulto_75 g_Mexico
// ─────────────────────────────────────────────
const productCreamyTreatsVitalityCare = {
  _id: "product-felino-creamy-treats-vitality-care",
  _type: "product",
  name: {
    es: "Creamy Treats Multivitamínico",
    en: "Creamy Treats Vitality Care",
    fr: "Creamy Treats Vitalité",
  },
  slug: { _type: "slug", current: "creamy-treats-multivitaminico" },
  species: "felino" as const,
  category: { _type: "reference", _ref: CATEGORY_FELINO_SUPLEMENTOS_ID },

  tagline: {
    es: "Premio vitaminado con taurina y vitamina E",
    en: "Vitamin-enriched treat with taurine and vitamin E",
    fr: "Friandise vitaminée à la taurine et vitamine E",
  },

  ingredients: {
    es: "Agua, lomo de atún, lomo de salmón, almidón, hidrolizado de atún, aceite de pescado, vitamina E, goma guar, fructooligosacáridos, goma xantana, vitamina B1, taurina, vitamina B2, vitamina B6, vitamina A, vitamina D3, vitamina B12, vitamina B9, extracto de romero y tocoferoles.",
    en: "Water, tuna loin, salmon loin, starch, hydrolyzed tuna, fish oil, vitamin E, guar gum, fructooligosaccharides, xanthan gum, vitamin B1, taurine, vitamin B2, vitamin B6, vitamin A, vitamin D3, vitamin B12, vitamin B9, rosemary extract, and tocopherols.",
    fr: "Eau, filet de thon, filet de saumon, amidon, hydrolysat de thon, huile de poisson, vitamine E, gomme de guar, fructo-oligosaccharides, gomme xanthane, vitamine B1, taurine, vitamine B2, vitamine B6, vitamine A, vitamine D3, vitamine B12, vitamine B9, extrait de romarin et tocophérols.",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "min. 7.0 %", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "min. 3.0 %", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "max. 0.3 %", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "max. 1.5 %", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "max. 86.0 %", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "2.2 %", min: false },
    { _type: "nutrient", _key: "vite", label: "Vitamina E", value: "min. 250 UI/100 g", min: true },
    { _type: "nutrient", _key: "vita", label: "Vitamina A", value: "min. 5000 UI/100 g", min: true },
  ],

  warnings: {
    es: "Una vez abierto el producto, mantener en refrigeración. No se suministre si cambia de apariencia. No se deje al alcance de los niños. CONSULTE AL MÉDICO VETERINARIO.",
    en: "Once opened, keep refrigerated. Do not administer if appearance changes. Keep out of reach of children. CONSULT A VETERINARIAN.",
    fr: "Une fois le produit ouvert, conserver au réfrigérateur. Ne pas administrer si l'aspect du produit a changé. Tenir hors de portée des enfants. CONSULTEZ UN VÉTÉRINAIRE.",
  },

  claims: [
    {
      _type: "claimItem",
      _key: "taurina-vite",
      icon: "sparkles",
      text: {
        es: "Con taurina y vitamina E",
        en: "With taurine and vitamin E",
        fr: "Avec taurine et vitamine E",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-conservadores",
      icon: "shield-off",
      text: {
        es: "Sin conservadores artificiales",
        en: "No artificial preservatives",
        fr: "Sans conservateurs artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-saborizantes",
      icon: "shield-off",
      text: {
        es: "Sin saborizantes artificiales",
        en: "No artificial flavors",
        fr: "Sans arômes artificiels",
      },
    },
    {
      _type: "claimItem",
      _key: "sin-carragenina",
      icon: "shield-off",
      text: {
        es: "Sin carragenina",
        en: "No carrageenan",
        fr: "Sans carraghénane",
      },
    },
  ],

  keyBenefits: [
    {
      _type: "keyBenefitItem",
      _key: "vinculo",
      icon: "heart",
      description: {
        es: "Fortalece el vínculo con tu gato",
        en: "Build a stronger bond with your cat",
        fr: "Renforce le lien avec ton chat",
      },
    },
    {
      _type: "keyBenefitItem",
      _key: "vitalidad",
      icon: "zap",
      description: {
        es: "Aporta un complejo multivitamínico para la vitalidad",
        en: "Provides a multivitamin complex for vitality",
        fr: "Apporte un complexe multivitaminé pour la vitalité",
      },
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "75g",
      weight: "75 g (5 x 15 g)",
      ean: "7503038261984",
    },
  ],

  kibble: {
    description: {
      es: "Cada sachet contiene una porción individual de 15 g, lista para servir como premio.",
      en: "Each sachet contains an individual 15 g portion, ready to serve as a treat.",
      fr: "Chaque sachet contient une portion individuelle de 15 g, prête à servir en friandise.",
    },
  },

  lifeStage: ["adulto"],
  specialNeeds: [],

  isActive: true,
};

// ─────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────
async function seed() {
  console.log(`\n🐾  NUPEC – Seed: Creamy Treats Joint Care + Digestive Care + Vitality Care (Felino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  const category = await client.fetch(`*[_id == $id][0]`, { id: CATEGORY_FELINO_SUPLEMENTOS_ID });
  if (!category) {
    throw new Error(
      `No se encontró la categoría "${CATEGORY_FELINO_SUPLEMENTOS_ID}". Ejecuta primero scripts/seed-creamy-treats-skin-coat.ts`
    );
  }

  const joint = await client.createOrReplace(productCreamyTreatsJointCare);
  console.log(`  ✅  Producto → _id: ${joint._id}`);

  const digestive = await client.createOrReplace(productCreamyTreatsDigestiveCare);
  console.log(`  ✅  Producto → _id: ${digestive._id}`);

  const vitality = await client.createOrReplace(productCreamyTreatsVitalityCare);
  console.log(`  ✅  Producto → _id: ${vitality._id}`);

  console.log(`\n✨  Listo. Revisa en Sanity Studio:`);
  console.log(`   - Grupo "Contenido": sube imagen principal (paquete), banner y ficha técnica (PDF) para los tres.`);
  console.log(`   - Grupo "Contenido" → "Croqueta": sube foto/GIF del sachet individual (unidad dentro del pack) para los tres.`);
  console.log(`   - Grupo "Presentaciones": agrega SKU si aplica.\n`);
}

seed().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
