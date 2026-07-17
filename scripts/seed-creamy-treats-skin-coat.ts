/**
 * NUPEC – Seed: Categoría "Suplementos" (Felino) + Producto "Creamy Treats Skin & Coat"
 *
 * Uso:
 *   npx tsx scripts/seed-creamy-treats-skin-coat.ts
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

// ─────────────────────────────────────────────
//  1. Categoría "Suplementos" — Felino
//     (adaptada de la categoría canina equivalente)
// ─────────────────────────────────────────────
const categorySuplementosFelino = {
  _id: "category-felino-suplementos",
  _type: "category",
  name: {
    es: "Suplementos",
    en: "Supplements",
    fr: "Suppléments",
  },
  slug: { _type: "slug", current: "suplementos" },
  species: "felino" as const,
  order: 5,
  description: {
    es: `NUTRICIÓN QUE VA MÁS ALLÁ DEL PLATO

Hay etapas de vida y condiciones específicas donde el organismo de tu gato necesita un apoyo adicional. Los Suplementos NUPEC están diseñados para complementar la dieta diaria con nutrientes clave —vitaminas, minerales, ácidos grasos y más— en formas de alta biodisponibilidad que el cuerpo puede aprovechar de forma óptima.

RESPALDO CIENTÍFICO PARA CADA NECESIDAD
Formulados por nuestros especialistas en nutrición animal con base en investigación clínica actualizada, los suplementos NUPEC cubren desde el soporte articular hasta la salud inmunológica, la condición del pelaje y el bienestar reproductivo. Una herramienta precisa para el cuidado integral del gato en cada momento de su vida.`,

    en: `NUTRITION THAT GOES BEYOND THE BOWL

There are specific life stages and conditions where your cat's body needs additional support. NUPEC Supplements are designed to complement the daily diet with key nutrients — vitamins, minerals, fatty acids, and more — in highly bioavailable forms that the body can optimally absorb.

SCIENTIFIC BACKING FOR EVERY NEED
Formulated by our animal nutrition specialists based on current clinical research, NUPEC supplements cover everything from joint support to immune health, coat condition, and reproductive well-being. A precise tool for the comprehensive care of your cat at every stage of life.`,

    fr: `UNE NUTRITION QUI VA AU-DELÀ DE L'ÉCUELLE

Il existe des étapes de vie et des conditions spécifiques où l'organisme de votre chat a besoin d'un soutien supplémentaire. Les Suppléments NUPEC sont conçus pour compléter l'alimentation quotidienne avec des nutriments essentiels — vitamines, minéraux, acides gras et bien plus — sous des formes hautement biodisponibles que l'organisme peut utiliser de manière optimale.

UN SOUTIEN SCIENTIFIQUE POUR CHAQUE BESOIN
Formulés par nos spécialistes en nutrition animale sur la base de recherches cliniques actualisées, les suppléments NUPEC couvrent tout, du soutien articulaire à la santé immunitaire, en passant par la condition du pelage et le bien-être reproductif. Un outil précis pour le soin global de votre chat à chaque étape de sa vie.`,
  },
};

// ─────────────────────────────────────────────
//  2. Producto "Creamy Treats – Skin & Coat" — Felino
//     Fuente: BNBABQ0750_NUPEC_Piel y Pelaje_Gato_Adulto_75 g_Mexico
// ─────────────────────────────────────────────
const productCreamyTreatsSkinCoat = {
  _id: "product-felino-creamy-treats-skin-coat",
  _type: "product",
  name: {
    es: "Creamy Treats Piel y Pelaje",
    en: "Creamy Treats Skin & Coat",
    fr: "Creamy Treats Peau et Pelage",
  },
  slug: { _type: "slug", current: "creamy-treats-piel-y-pelaje" },
  species: "felino" as const,
  category: { _type: "reference", _ref: "category-felino-suplementos" },

  tagline: {
    es: "Premio cremoso con taurina y vitamina E",
    en: "Creamy treat with taurine and vitamin E",
    fr: "Friandise crémeuse à la taurine et vitamine E",
  },

  ingredients: {
    es: "Agua, lomo de atún, hidrolizado de atún, almidón, vitamina E, aceite de krill, goma guar, goma xantana, taurina, extracto de romero y tocoferoles.",
    en: "Water, tuna loin, hydrolyzed tuna, starch, vitamin E, krill oil, guar gum, xanthan gum, taurine, rosemary extract, and tocopherols.",
    fr: "Eau, filet de thon, hydrolysat de thon, amidon, vitamine E, huile de krill, gomme de guar, gomme xanthane, taurine, extrait de romarin et tocophérols.",
  },

  guaranteedAnalysis: [
    { _type: "nutrient", _key: "protein", label: "Proteína cruda", value: "min. 7.0 %", min: true },
    { _type: "nutrient", _key: "fat", label: "Grasa cruda", value: "min. 1.0 %", min: true },
    { _type: "nutrient", _key: "fiber", label: "Fibra cruda", value: "max. 0.3 %", min: false },
    { _type: "nutrient", _key: "ash", label: "Cenizas", value: "max. 1.8 %", min: false },
    { _type: "nutrient", _key: "moisture", label: "Humedad", value: "max. 87.7 %", min: false },
    { _type: "nutrient", _key: "eln", label: "E.L.N.", value: "2.2 %", min: false },
    { _type: "nutrient", _key: "vite", label: "Vitamina E", value: "min. 250 UI/100g", min: true },
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
      _key: "piel-pelaje",
      icon: "sparkles",
      description: {
        es: "Apoya la salud de la piel y el pelaje",
        en: "Supports skin and coat health",
        fr: "Favorise la santé de la peau et du pelage",
      },
    },
  ],

  presentations: [
    {
      _type: "presentation",
      _key: "75g",
      weight: "75 g (5 x 15 g)",
      ean: "7503038261977",
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
  specialNeeds: ["piel"],

  isActive: true,
};

// ─────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────
async function seed() {
  console.log(`\n🐾  NUPEC – Seed: Suplementos (Felino) + Creamy Treats Skin & Coat`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  const cat = await client.createOrReplace(categorySuplementosFelino);
  console.log(`  ✅  Categoría → _id: ${cat._id}`);

  const prod = await client.createOrReplace(productCreamyTreatsSkinCoat);
  console.log(`  ✅  Producto  → _id: ${prod._id}`);

  console.log(`\n✨  Listo. Revisa en Sanity Studio:`);
  console.log(`   - Grupo "Presentaciones": agrega SKU si aplica.`);
  console.log(`   - Grupo "Contenido": sube imagen principal (paquete), banner y ficha técnica (PDF).`);
  console.log(`   - Grupo "Contenido" → "Croqueta": sube foto/GIF del sachet individual (unidad dentro del pack).`);
  console.log(`   - Grupo "Wizard/Filtros": no se asignó specialNeeds — revisa si aplica "piel".\n`);
}

seed().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
