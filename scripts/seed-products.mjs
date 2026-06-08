// scripts/seed-products.mjs
// Ejecutar con: node scripts/seed-products.mjs
// Requiere .env.local con NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─────────────────────────────────────────────────────────────
// MAPEO DE CATEGORÍAS (nombres internos → slugs del sitio)
//
//  "nutricion-diaria"       = NUTRICIÓN CIENTÍFICA
//  "nutricion-especializada"= NUTRICIÓN ESPECIALIZADA
//  "nutricion-clinica"      = NUTRICIÓN CLÍNICA
//  "alimentos-humedos"      = ALIMENTO HÚMEDO
//  "premios-funcionales"    = PREMIOS FUNCIONALES
//  "suplementos"            = MULTIVITAMÍNICOS
// ─────────────────────────────────────────────────────────────

const productosCanino = [
  // ── NUTRICIÓN DIARIA (Científica) ─────────────────────────
  // { slug: 'adulto' }  ← YA CARGADO, omitido del array
  { slug: 'cachorro',               nameEs: 'Cachorro',                    nameEn: 'Puppy',                      nameFr: 'Chiot',                       category: 'nutricion-diaria' },
  { slug: 'senior',                 nameEs: 'Senior',                      nameEn: 'Senior',                     nameFr: 'Sénior',                      category: 'nutricion-diaria' },
  { slug: 'adulto-razas-pequenas',  nameEs: 'Adulto Razas Pequeñas',       nameEn: 'Adult Small Breeds',         nameFr: 'Adulte Petites Races',        category: 'nutricion-diaria' },
  { slug: 'cachorro-razas-pequenas',nameEs: 'Cachorro Razas Pequeñas',     nameEn: 'Puppy Small Breeds',         nameFr: 'Chiot Petites Races',         category: 'nutricion-diaria' },
  { slug: 'senior-razas-pequenas',  nameEs: 'Senior Razas Pequeñas',       nameEn: 'Senior Small Breeds',        nameFr: 'Sénior Petites Races',        category: 'nutricion-diaria' },
  { slug: 'adulto-razas-mini',      nameEs: 'Adulto Razas Mini',           nameEn: 'Adult Mini Breeds',          nameFr: 'Adulte Races Mini',           category: 'nutricion-diaria' },
  { slug: 'cachorro-razas-mini',    nameEs: 'Cachorro Razas Mini',         nameEn: 'Puppy Mini Breeds',          nameFr: 'Chiot Races Mini',            category: 'nutricion-diaria' },
  { slug: 'senior-razas-mini',      nameEs: 'Senior Razas Mini',           nameEn: 'Senior Mini Breeds',         nameFr: 'Sénior Races Mini',           category: 'nutricion-diaria' },

  // ── NUTRICIÓN ESPECIALIZADA ───────────────────────────────
  { slug: '1st-care',               nameEs: '1st Care',                    nameEn: '1st Care',                   nameFr: '1st Care',                    category: 'nutricion-especializada' },
  { slug: 'high-performance',       nameEs: 'High Performance',            nameEn: 'High Performance',           nameFr: 'Haute Performance',           category: 'nutricion-especializada' },
  { slug: 'sensitive',              nameEs: 'Sensitive',                   nameEn: 'Sensitive',                  nameFr: 'Sensitive',                   category: 'nutricion-especializada' },
  { slug: 'sensitive-razas-pequenas',nameEs: 'Sensitive Razas Pequeñas',   nameEn: 'Sensitive Small Breeds',     nameFr: 'Sensitive Petites Races',     category: 'nutricion-especializada' },
  { slug: 'weight-control',         nameEs: 'Weight Control',              nameEn: 'Weight Control',             nameFr: 'Contrôle du Poids',           category: 'nutricion-especializada' },
  { slug: 'weight-control-razas-pequenas', nameEs: 'Weight Control Razas Pequeñas', nameEn: 'Weight Control Small Breeds', nameFr: 'Contrôle du Poids Petites Races', category: 'nutricion-especializada' },
  { slug: 'urinary-management',     nameEs: 'Urinary Management',         nameEn: 'Urinary Management',         nameFr: 'Gestion Urinaire',            category: 'nutricion-especializada' },
  { slug: 'digestive-health',       nameEs: 'Digestive Health',            nameEn: 'Digestive Health',           nameFr: 'Santé Digestive',             category: 'nutricion-especializada' },
  { slug: 'renal-care',             nameEs: 'Renal Care',                  nameEn: 'Renal Care',                 nameFr: 'Soin Rénal',                  category: 'nutricion-especializada' },

  // ── NUTRICIÓN CLÍNICA ─────────────────────────────────────
  { slug: 'cardiac',                nameEs: 'Cardiac',                     nameEn: 'Cardiac',                    nameFr: 'Cardiaque',                   category: 'nutricion-clinica' },
  { slug: 'acute-hepatic',          nameEs: 'Acute Hepatic',               nameEn: 'Acute Hepatic',              nameFr: 'Hépatique Aigu',              category: 'nutricion-clinica' },
  { slug: 'hepatic',                nameEs: 'Hepatic',                     nameEn: 'Hepatic',                    nameFr: 'Hépatique',                   category: 'nutricion-clinica' },
  { slug: 'hypoallergenic',         nameEs: 'Hypoallergenic',              nameEn: 'Hypoallergenic',             nameFr: 'Hypoallergénique',            category: 'nutricion-clinica' },

  // ── ALIMENTOS HÚMEDOS ─────────────────────────────────────
  { slug: 'humedo-adulto-carne-verduras', nameEs: 'Adulto Carne con Verduras', nameEn: 'Adult Meat with Vegetables', nameFr: 'Adulte Viande aux Légumes', category: 'alimentos-humedos' },
  { slug: 'humedo-cachorro-alto-pollo',   nameEs: 'Cachorro Alto en Pollo',    nameEn: 'Puppy High in Chicken',      nameFr: 'Chiot Riche en Poulet',     category: 'alimentos-humedos' },
  { slug: 'humedo-senior',                nameEs: 'Senior Alimento Húmedo',   nameEn: 'Senior Wet Food',            nameFr: 'Humide Sénior',             category: 'alimentos-humedos' },
  { slug: 'humedo-digestive',             nameEs: 'Digestive Alimento Húmedo',nameEn: 'Digestive Wet Food',         nameFr: 'Humide Digestif',           category: 'alimentos-humedos' },
  { slug: 'humedo-weight-control',        nameEs: 'Weight Control Alimento Húmedo', nameEn: 'Weight Control Wet Food', nameFr: 'Humide Contrôle du Poids', category: 'alimentos-humedos' },

  // ── PREMIOS FUNCIONALES ───────────────────────────────────
  { slug: 'dental-care-treats',     nameEs: 'Dental Care Treats',          nameEn: 'Dental Care Treats',         nameFr: 'Friandises Soin Dentaire',    category: 'premios-funcionales' },
  { slug: 'digestive-care-treats',  nameEs: 'Digestive Care Treats',       nameEn: 'Digestive Care Treats',      nameFr: 'Friandises Soin Digestif',    category: 'premios-funcionales' },
  { slug: 'joint-care-treats',      nameEs: 'Joint Care Treats',           nameEn: 'Joint Care Treats',          nameFr: 'Friandises Soin Articulaire', category: 'premios-funcionales' },
  { slug: 'relax-treats',           nameEs: 'Relax Treats',                nameEn: 'Relax Treats',               nameFr: 'Friandises Relaxantes',       category: 'premios-funcionales' },
  { slug: 'smart-treats',           nameEs: 'Smart Treats',                nameEn: 'Smart Treats',               nameFr: 'Friandises Smart',            category: 'premios-funcionales' },
  { slug: 'training-treats',        nameEs: 'Training Treats',             nameEn: 'Training Treats',            nameFr: 'Friandises Entraînement',     category: 'premios-funcionales' },

  // ── SUPLEMENTOS (Multivitamínicos) ────────────────────────
  { slug: 'vitality-water-carne',   nameEs: 'Vitality Water Sabor Carne',  nameEn: 'Vitality Water Meat Flavor', nameFr: 'Vitality Water Saveur Viande',category: 'suplementos' },
  { slug: 'vitality-water-frutal',  nameEs: 'Vitality Water Sabor Frutal', nameEn: 'Vitality Water Fruit Flavor',nameFr: 'Vitality Water Saveur Fruitée',category: 'suplementos' },
  { slug: 'vitality-water-sandia',  nameEs: 'Vitality Water Sabor Sandía', nameEn: 'Vitality Water Watermelon',  nameFr: 'Vitality Water Saveur Pastèque', category: 'suplementos' },
  { slug: 'vitality-gel-multivitaminico', nameEs: 'Vitality Gel Multivitamínico', nameEn: 'Vitality Gel Multivitamin', nameFr: 'Vitality Gel Multivitaminé', category: 'suplementos' },
]

const productosFelinoData = [
  // ── NUTRICIÓN DIARIA (Científica) ─────────────────────────
  { slug: 'felino-indoor',          nameEs: 'FELINO Indoor',               nameEn: 'FELINE Indoor',              nameFr: 'FÉLIN Intérieur',             category: 'nutricion-diaria' },
  { slug: 'felino-kitten',          nameEs: 'FELINO Kitten',               nameEn: 'FELINE Kitten',              nameFr: 'FÉLIN Chaton',                category: 'nutricion-diaria' },

  // ── NUTRICIÓN ESPECIALIZADA ───────────────────────────────
  { slug: 'felino-senior',          nameEs: 'FELINO Senior',               nameEn: 'FELINE Senior',              nameFr: 'FÉLIN Sénior',                category: 'nutricion-especializada' },
  { slug: 'felino-weight-care',     nameEs: 'FELINO Weight Care',          nameEn: 'FELINE Weight Care',         nameFr: 'FÉLIN Contrôle du Poids',     category: 'nutricion-especializada' },
  { slug: 'felino-sensitive',       nameEs: 'Sensitive',                   nameEn: 'Sensitive',                  nameFr: 'Sensitive',                   category: 'nutricion-especializada' },
  { slug: 'felino-sensitive-razas-pequenas', nameEs: 'Sensitive Razas Pequeñas', nameEn: 'Sensitive Small Breeds', nameFr: 'Sensitive Petites Races',    category: 'nutricion-especializada' },
  { slug: 'felino-weight-control',  nameEs: 'Weight Control',              nameEn: 'Weight Control',             nameFr: 'Contrôle du Poids',           category: 'nutricion-especializada' },
  { slug: 'felino-weight-control-razas-pequenas', nameEs: 'Weight Control Razas Pequeñas', nameEn: 'Weight Control Small Breeds', nameFr: 'Contrôle du Poids Petites Races', category: 'nutricion-especializada' },
  { slug: 'felino-urinary-management', nameEs: 'Urinary Management',      nameEn: 'Urinary Management',         nameFr: 'Gestion Urinaire',            category: 'nutricion-especializada' },
  { slug: 'felino-digestive-health',nameEs: 'Digestive Health',            nameEn: 'Digestive Health',           nameFr: 'Santé Digestive',             category: 'nutricion-especializada' },
  { slug: 'felino-renal-care',      nameEs: 'Renal Care',                  nameEn: 'Renal Care',                 nameFr: 'Soin Rénal',                  category: 'nutricion-especializada' },

  // ── NUTRICIÓN CLÍNICA ─────────────────────────────────────
  { slug: 'felino-cardiac',         nameEs: 'FELINO Cardiac',              nameEn: 'FELINE Cardiac',             nameFr: 'FÉLIN Cardiaque',             category: 'nutricion-clinica' },
  { slug: 'felino-hepatic',         nameEs: 'FELINO Hepatic',              nameEn: 'FELINE Hepatic',             nameFr: 'FÉLIN Hépatique',             category: 'nutricion-clinica' },
  { slug: 'felino-hypoallergenic',  nameEs: 'FELINO Hypoallergenic',       nameEn: 'FELINE Hypoallergenic',      nameFr: 'FÉLIN Hypoallergénique',      category: 'nutricion-clinica' },

  // ── ALIMENTOS HÚMEDOS ─────────────────────────────────────
  { slug: 'felino-humedo-indoor',   nameEs: 'FELINO Indoor Alimento Húmedo',  nameEn: 'FELINE Indoor Wet Food',  nameFr: 'FÉLIN Humide Intérieur',      category: 'alimentos-humedos' },
  { slug: 'felino-humedo-kitten',   nameEs: 'FELINO Kitten Alimento Húmedo',  nameEn: 'FELINE Kitten Wet Food',  nameFr: 'FÉLIN Humide Chaton',         category: 'alimentos-humedos' },
  { slug: 'felino-humedo-hairball', nameEs: 'FELINO Hairball Alimento Húmedo',nameEn: 'FELINE Hairball Wet Food', nameFr: 'FÉLIN Humide Anti-Boules',    category: 'alimentos-humedos' },
  { slug: 'felino-humedo-urinary',  nameEs: 'FELINO Urinary Alimento Húmedo', nameEn: 'FELINE Urinary Wet Food',  nameFr: 'FÉLIN Humide Urinaire',       category: 'alimentos-humedos' },

  // ── PREMIOS FUNCIONALES CREMOSOS ──────────────────────────
  { slug: 'felino-joint-care-treats',     nameEs: 'FELINO Joint Care Treats',     nameEn: 'FELINE Joint Care Treats',     nameFr: 'FÉLIN Friandises Articulaires', category: 'premios-funcionales' },
  { slug: 'felino-digestive-care-treats', nameEs: 'FELINO Digestive Care Treats', nameEn: 'FELINE Digestive Care Treats', nameFr: 'FÉLIN Friandises Digestives',   category: 'premios-funcionales' },
  { slug: 'felino-skin-coat-treats',      nameEs: 'FELINO Skin & Coat Treats',    nameEn: 'FELINE Skin & Coat Treats',    nameFr: 'FÉLIN Friandises Peau & Pelage',category: 'premios-funcionales' },

  // ── SUPLEMENTOS (Multivitamínicos) ────────────────────────
  { slug: 'felino-vitality-gel-multivitaminico', nameEs: 'FELINO Vitality Gel Multivitamínico', nameEn: 'FELINE Vitality Gel Multivitamin', nameFr: 'FÉLIN Vitality Gel Multivitaminé', category: 'suplementos' },
]

// ─────────────────────────────────────────────
// BUILDER
// ─────────────────────────────────────────────
function buildProduct({ slug, nameEs, nameEn, nameFr, category, species }) {
  return {
    _id: `product-${species}-${slug}`,
    _type: 'product',
    species,
    slug: { _type: 'slug', current: slug },
    name: { es: nameEs, en: nameEn, fr: nameFr },
    category,
    tagline: { es: '', en: '', fr: '' },
    description: { es: [], en: [], fr: [] },
    ingredients: { es: '', en: '', fr: '' },
    guaranteedAnalysis: [],
    presentations: [],
    seo: {
      metaTitle: { es: '', en: '', fr: '' },
      metaDescription: { es: '', en: '', fr: '' },
    },
  }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function seed() {
  const canino = productosCanino.map(p => buildProduct({ ...p, species: 'canino' }))
  const felino = productosFelinoData.map(p => buildProduct({ ...p, species: 'felino' }))
  const all = [...canino, ...felino]

  console.log(`\n🐾 Cargando ${all.length} productos en Sanity...\n`)
  console.log(`   Canino: ${canino.length} productos`)
  console.log(`   Felino: ${felino.length} productos`)
  console.log(`   (El producto "Adulto" canino ya está cargado — se omitirá si existe)\n`)

  let ok = 0, skip = 0, fail = 0

  for (const product of all) {
    try {
      await client.createOrReplace(product)
      console.log(`  ✅ [${product.species}] ${product.name.es}`)
      ok++
    } catch (err) {
      console.error(`  ❌ Error en ${product._id}: ${err.message}`)
      fail++
    }
  }

  console.log(`\n──────────────────────────────────────`)
  console.log(`✅ Creados/actualizados: ${ok}`)
  console.log(`❌ Errores:              ${fail}`)
  console.log(`──────────────────────────────────────`)
  console.log(`\n💡 Abre el Studio en localhost:3000/studio para llenar el contenido.\n`)
}

seed()
