/**
 * NUPEC – Patch: meta título y meta descripción (ES) de las 12 categorías
 * y 56 productos activos, para el plan de posicionamiento SEO/AEO.
 *
 * Copy redactado y aprobado por el cliente (ver conversación); posicionamiento
 * de marca "súper premium" aplicado en nutrición diaria y alimentos húmedos.
 * Solo se toca `seo.metaTitle.es` / `seo.metaDescription.es` — EN/FR se
 * completan en otra sesión.
 *
 * El producto "Cachorro" (nutricion-diaria/cachorro, canino) ya tenía copy
 * cargado en Sanity y se deja fuera de este patch intencionalmente.
 *
 * Uso:
 *   npx tsx scripts/patch-seo-es.ts
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

type Patch = {
  id: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
};

const CATEGORY_PATCHES: Patch[] = [
  // ── Canino ──
  { id: "e977c68b-e44d-495d-8164-3f45ee5d0f6e", name: "Nutrición diaria (canino)",
    metaTitle: "Nutrición Diaria NUPEC — Alimento Súper Premium Perros",
    metaDescription: "Alimento súper premium NUPEC para perros en cada etapa: cachorro, adulto y senior. Nutrición balanceada que cuida su salud y vitalidad." },
  { id: "category-canino-nutricion-especializada", name: "Nutrición especializada (canino)",
    metaTitle: "Nutrición Especializada NUPEC para Perros",
    metaDescription: "Fórmulas dirigidas para perros con necesidades específicas: digestión, piel, peso, energía o etapas tempranas. Respaldo nutricional de precisión." },
  { id: "category-canino-nutricion-clinica", name: "Nutrición clínica (canino)",
    metaTitle: "Nutrición Clínica NUPEC — Dietas Terapéuticas para Perros",
    metaDescription: "Dietas terapéuticas NUPEC formuladas científicamente para el manejo de enfermedades en perros, bajo prescripción y seguimiento veterinario." },
  { id: "category-canino-premios-funcionales", name: "Premios funcionales (canino)",
    metaTitle: "Premios Funcionales NUPEC para Perros | Snacks Saludables",
    metaDescription: "Premios NUPEC que consienten a tu perro y aportan beneficios reales: salud dental, digestiva, articular y manejo de ansiedad." },
  { id: "category-canino-suplementos", name: "Suplementos (canino)",
    metaTitle: "Suplementos NUPEC para Perros | Vitality Water y Gel",
    metaDescription: "Hidratación inteligente y vitalidad para tu perro con Vitality Water y Vitality Gel: el complemento ideal a su nutrición diaria." },
  { id: "category-canino-alimentos-humedos", name: "Alimentos húmedos (canino)",
    metaTitle: "Alimento Húmedo NUPEC Súper Premium para Perros",
    metaDescription: "Alimento húmedo NUPEC 100% balanceado para perros en cada etapa de vida. Nutrición completa que también consiente." },

  // ── Felino ──
  { id: "b377fa52-c4a8-42b6-8f88-179788df3d1d", name: "Nutrición diaria (felino)",
    metaTitle: "Nutrición Diaria NUPEC para Gatos | +90% Digestibilidad",
    metaDescription: "Alimento súper premium NUPEC para gatos con más del 90% de digestibilidad, formulado por etapa de vida: gatito, adulto y senior." },
  { id: "category-felino-nutricion-especializada", name: "Nutrición especializada (felino)",
    metaTitle: "Nutrición Especializada NUPEC para Gatos",
    metaDescription: "Fórmulas dirigidas para gatos con necesidades específicas: digestión, peso, tracto urinario, hairball o vida en interior." },
  { id: "category-felino-nutricion-clinica", name: "Nutrición clínica (felino)",
    metaTitle: "Nutrición Clínica NUPEC — Dietas Terapéuticas para Gatos",
    metaDescription: "Dietas terapéuticas NUPEC formuladas científicamente para el manejo de enfermedades en gatos, bajo prescripción y seguimiento veterinario." },
  { id: "category-felino-premios-funcionales", name: "Premios funcionales (felino)",
    metaTitle: "Premios Funcionales NUPEC para Gatos | Creamy Treats",
    metaDescription: "Premios cremosos NUPEC con respaldo científico para consentir a tu gato y facilitar la toma de medicamentos con beneficios reales." },
  { id: "category-felino-alimentos-humedos", name: "Alimentos húmedos (felino)",
    metaTitle: "Alimento Húmedo NUPEC Súper Premium para Gatos",
    metaDescription: "Alimento húmedo NUPEC biológicamente completo para gatos, que respeta su naturaleza carnívora en una experiencia gourmet." },
];

const PRODUCT_PATCHES: Patch[] = [
  // ── Canino / Nutrición diaria ──
  // "Cachorro" (product-canino-cachorro) se omite: ya tenía copy cargado.
  { id: "94543c98-c670-466e-82cd-aa62c446a963", name: "Adulto",
    metaTitle: "NUPEC Adulto — Alimento Súper Premium para Perros",
    metaDescription: "Alimento súper premium NUPEC para perros adultos: máximo aprovechamiento nutricional para una mejor salud y calidad de vida." },
  { id: "product-canino-adulto-razas-mini", name: "Adulto Razas Mini",
    metaTitle: "NUPEC Adulto Razas Mini — Alimento Súper Premium",
    metaDescription: "Nutrición especializada súper premium para perros adultos de raza mini, con el aporte energético que su metabolismo requiere." },
  { id: "product-canino-adulto-razas-pequenas", name: "Adulto Razas Pequeñas",
    metaTitle: "NUPEC Adulto Razas Pequeñas — Súper Premium",
    metaDescription: "Alimento súper premium NUPEC con energía adecuada para el metabolismo acelerado de perros adultos de raza pequeña." },
  { id: "product-canino-cachorro-razas-mini", name: "Cachorro Razas Mini",
    metaTitle: "NUPEC Cachorro Razas Mini — Alimento Súper Premium",
    metaDescription: "Nutrición especializada súper premium para el óptimo desarrollo de cachorros de raza mini." },
  { id: "product-canino-cachorro-razas-pequenas", name: "Cachorro Razas Pequeñas",
    metaTitle: "NUPEC Cachorro Razas Pequeñas — Súper Premium",
    metaDescription: "Balance nutricional súper premium para el óptimo desarrollo de cachorros de raza pequeña." },
  { id: "product-canino-senior", name: "Senior",
    metaTitle: "NUPEC Senior — Alimento Súper Premium para Perros",
    metaDescription: "Nutrición especializada súper premium que mejora la vitalidad y calidad de vida de perros senior." },
  { id: "product-canino-senior-razas-mini", name: "Senior Razas Mini",
    metaTitle: "NUPEC Senior Razas Mini — Alimento Súper Premium",
    metaDescription: "Nutrición especializada súper premium para perros senior de raza mini, cuidando su vitalidad diaria." },
  { id: "product-canino-senior-razas-pequenas", name: "Senior Razas Pequeñas",
    metaTitle: "NUPEC Senior Razas Pequeñas — Cuidado Articular",
    metaDescription: "Alimento súper premium que fortalece las articulaciones de perros senior de raza pequeña." },

  // ── Canino / Nutrición especializada ──
  { id: "product-canino-1st-care", name: "1st Care",
    metaTitle: "NUPEC 1st Care — Fortalece el Sistema Inmune",
    metaDescription: "Fórmula exclusiva NUPEC que fortalece el sistema inmune de cachorros en sus primeras etapas de vida." },
  { id: "product-canino-digestive-health", name: "Digestive Health",
    metaTitle: "NUPEC Digestive Health — Salud Digestiva Canina",
    metaDescription: "Nutrición especializada auxiliar en la salud digestiva de perros adultos y senior. Respaldo veterinario." },
  { id: "product-canino-high-performance", name: "High Performance",
    metaTitle: "NUPEC High Performance — Perros de Alto Rendimiento",
    metaDescription: "Nutrición especializada NUPEC para caninos activos y de alto rendimiento físico." },
  { id: "product-canino-renal-care", name: "Renal Care",
    metaTitle: "NUPEC Renal Care — Cuidado Renal para Perros",
    metaDescription: "Nutrición especializada auxiliar en el cuidado renal de perros adultos y senior." },
  { id: "product-canino-sensitive", name: "Sensitive",
    metaTitle: "NUPEC Sensitive — Alergias Alimentarias en Perros",
    metaDescription: "Dieta auxiliar en el tratamiento de alergias alimentarias en perros adultos y senior." },
  { id: "product-canino-sensitive-razas-pequenas", name: "Sensitive Razas Pequeñas",
    metaTitle: "NUPEC Sensitive Razas Pequeñas — Alergias",
    metaDescription: "Dieta auxiliar en el tratamiento de alergias alimentarias en perros adultos de raza pequeña." },
  { id: "product-canino-urinary-management", name: "Urinary Management",
    metaTitle: "NUPEC Urinary Management — Tracto Urinario Canino",
    metaDescription: "Nutrición especializada auxiliar en el cuidado del tracto urinario de perros adultos y senior." },
  { id: "product-canino-weight-control", name: "Weight Control",
    metaTitle: "NUPEC Weight Control — Control de Peso en Perros",
    metaDescription: "Nutrición adecuada para perros con sobrepeso u obesidad, bajo supervisión veterinaria." },
  { id: "product-canino-weight-control-razas-pequenas", name: "Weight Control Razas Pequeñas",
    metaTitle: "NUPEC Weight Control Razas Pequeñas — Control de Peso",
    metaDescription: "Reducción de peso con sensación de saciedad para perros de raza pequeña con sobrepeso." },

  // ── Canino / Nutrición clínica ──
  { id: "product-canino-acute-hepatic", name: "Acute Hepatic",
    metaTitle: "NUPEC Acute Hepatic — Nutrición Terapéutica Hepática",
    metaDescription: "Nutrición terapéutica NUPEC para la restauración hepatocelular aguda en perros. Uso bajo prescripción veterinaria." },
  { id: "product-canino-hepatic", name: "Hepatic",
    metaTitle: "NUPEC Hepatic — Nutrición Terapéutica Continua",
    metaDescription: "Nutrición terapéutica continua NUPEC para el manejo hepático en perros. Prescripción veterinaria." },
  { id: "product-canino-cardiac", name: "Cardiac",
    metaTitle: "NUPEC Cardiac — Nutrición Terapéutica Cardiovascular",
    metaDescription: "Nutrición terapéutica NUPEC para la salud cardiovascular de perros. Uso bajo prescripción veterinaria." },
  { id: "product-canino-hypoallergenic", name: "Hypoallergenic",
    metaTitle: "NUPEC Hypoallergenic — Reacción Adversa Alimentaria",
    metaDescription: "Nutrición terapéutica avanzada NUPEC en reacción adversa alimentaria en perros. Prescripción veterinaria." },

  // ── Canino / Premios funcionales ──
  { id: "product-canino-dental-care-treats", name: "Dental Care Treats",
    metaTitle: "NUPEC Dental Care Treats — Cuidado Dental Canino",
    metaDescription: "Premio NUPEC con ingredientes funcionales auxiliar en el control de placa y sarro dental en perros." },
  { id: "product-canino-digestive-care-treats", name: "Digestive Care Treats",
    metaTitle: "NUPEC Digestive Care Treats — Salud Digestiva",
    metaDescription: "Premio NUPEC con ingredientes funcionales que promueve una sana digestión en perros." },
  { id: "product-canino-joint-care-treats", name: "Joint Care Treats",
    metaTitle: "NUPEC Joint Care Treats — Salud Articular Canina",
    metaDescription: "Premio NUPEC con ingredientes funcionales auxiliar en el mantenimiento de las articulaciones." },
  { id: "product-canino-relax-treats", name: "Relax Treats",
    metaTitle: "NUPEC Relax Treats — Ansiedad y Estrés en Perros",
    metaDescription: "Premio NUPEC con ingredientes funcionales auxiliar en el manejo de ansiedad y estrés canino." },
  { id: "product-canino-smart-treats", name: "Smart Treats",
    metaTitle: "NUPEC Smart Treats — Función Cognitiva Canina",
    metaDescription: "Premio NUPEC con ingredientes funcionales que promueve la función cognitiva en perros." },
  { id: "product-canino-training-treats", name: "Training Treats",
    metaTitle: "NUPEC Training Treats — Adiestramiento Canino",
    metaDescription: "Premio NUPEC con ingredientes funcionales auxiliar en el adiestramiento de tu perro." },

  // ── Canino / Suplementos ──
  { id: "product-canino-vitality-gel-multivitaminico", name: "Vitality Gel Multivitamínico",
    metaTitle: "NUPEC Vitality Gel — Suplemento Multivitamínico",
    metaDescription: "Suplemento vitamínico NUPEC para perros en estados de alta exigencia fisiológica." },
  { id: "product-canino-vitality-water-carne", name: "Vitality Water Sabor Carne",
    metaTitle: "NUPEC Vitality Water Carne — Hidratación Activa",
    metaDescription: "Hidratación activa con soporte vitamínico para perros, sabor carne. El complemento ideal a su nutrición diaria." },
  { id: "fec6eebd-bcfa-45fb-a817-67ca4fb3a527", name: "Vitality Water Sabor Frutal",
    metaTitle: "NUPEC Vitality Water Frutal — Hidratación Activa",
    metaDescription: "Hidratación activa con soporte vitamínico para perros, sabor frutal. El complemento ideal a su nutrición diaria." },
  { id: "product-canino-vitality-water-sandia", name: "Vitality Water Sabor Sandía",
    metaTitle: "NUPEC Vitality Water Sandía — Hidratación Activa",
    metaDescription: "Hidratación activa con soporte vitamínico para perros, sabor sandía. El complemento ideal a su nutrición diaria." },

  // ── Canino / Alimentos húmedos ──
  { id: "product-canino-humedo-adulto-carne-verduras", name: "Adulto Alimento Húmedo",
    metaTitle: "NUPEC Adulto — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC, completo y balanceado para perros adultos." },
  { id: "product-canino-humedo-cachorro-alto-pollo", name: "Cachorro Alimento Húmedo",
    metaTitle: "NUPEC Cachorro — Alimento Húmedo Alto en Pollo",
    metaDescription: "Alimento húmedo súper premium NUPEC alto en pollo, para el desarrollo de cachorros." },
  { id: "product-canino-humedo-digestive", name: "Digestive Alimento Húmedo",
    metaTitle: "NUPEC Digestive — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC que apoya la salud digestiva en perros adultos y senior." },
  { id: "product-canino-humedo-senior", name: "Senior Alimento Húmedo",
    metaTitle: "NUPEC Senior — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC para perros adultos senior de todas las razas." },
  { id: "product-canino-humedo-weight-control", name: "Weight Control Alimento Húmedo",
    metaTitle: "NUPEC Weight Control — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC para perros con sobrepeso u obesidad." },

  // ── Felino / Nutrición diaria ──
  { id: "product-felino-felino-indoor", name: "FELINO Indoor",
    metaTitle: "NUPEC Indoor — Alimento Súper Premium para Gatos",
    metaDescription: "Nutrición especializada súper premium para gatos adultos de interior, cuidando su sistema nervioso." },
  { id: "product-felino-felino-kitten", name: "FELINO Kitten",
    metaTitle: "NUPEC Kitten — Alimento Súper Premium para Gatitos",
    metaDescription: "Nutrición especializada súper premium para gatitos de temprana edad, en su etapa de mayor desarrollo." },
  { id: "product-felino-felino-senior", name: "FELINO Senior",
    metaTitle: "NUPEC Senior — Alimento Súper Premium para Gatos",
    metaDescription: "Nutrición especializada súper premium para gatos de edad avanzada, cuidando su vitalidad diaria." },

  // ── Felino / Nutrición especializada ──
  { id: "product-felino-felino-digestive-health", name: "Digestive Health (felino)",
    metaTitle: "NUPEC Digestive Health — Salud Digestiva Felina",
    metaDescription: "Nutrición especializada auxiliar en la salud digestiva de gatos adultos. Respaldo veterinario." },
  { id: "21d2abd4-ec74-4c79-8a7b-03a771da3d72", name: "Felino Hairball",
    metaTitle: "NUPEC Hairball — Control de Bolas de Pelo",
    metaDescription: "Nutrición especializada NUPEC para gatos adultos de pelaje largo, auxiliar en el control de hairball." },
  { id: "product-felino-felino-weight-care", name: "Felino Weight Care",
    metaTitle: "NUPEC Weight Care — Control de Peso en Gatos",
    metaDescription: "Reducción y mantenimiento de peso saludable para gatos, bajo supervisión veterinaria." },
  { id: "product-felino-felino-renal-care", name: "Renal Care (felino)",
    metaTitle: "NUPEC Renal Care — Cuidado Renal para Gatos",
    metaDescription: "Nutrición especializada auxiliar en el cuidado renal de gatos adultos." },
  { id: "product-felino-felino-urinary-management", name: "Urinary Management (felino)",
    metaTitle: "NUPEC Urinary Management — Tracto Urinario Felino",
    metaDescription: "Nutrición especializada auxiliar en el cuidado del tracto urinario de gatos adultos." },

  // ── Felino / Nutrición clínica ──
  { id: "product-felino-felino-cardiac", name: "FELINO Cardiac",
    metaTitle: "NUPEC Cardiac Felino — Nutrición Terapéutica Cardiovascular",
    metaDescription: "Nutrición terapéutica NUPEC para la salud cardiovascular de gatos. Uso bajo prescripción veterinaria." },
  { id: "product-felino-felino-hepatic", name: "FELINO Hepatic",
    metaTitle: "NUPEC Hepatic Felino — Nutrición Terapéutica Hepática",
    metaDescription: "Nutrición terapéutica continua NUPEC para la insuficiencia hepática felina. Prescripción veterinaria." },
  { id: "product-felino-felino-hypoallergenic", name: "FELINO Hypoallergenic",
    metaTitle: "NUPEC Hypoallergenic Felino — Terapia Hipoalergénica",
    metaDescription: "Nutrición clínica NUPEC que apoya la terapia hipoalergénica en gatos. Uso bajo prescripción veterinaria." },

  // ── Felino / Premios funcionales ──
  { id: "product-felino-creamy-treats-digestive-care", name: "Creamy Treats Digestive Care",
    metaTitle: "NUPEC Creamy Treats Digestive Care — Gatos",
    metaDescription: "Premio cremoso NUPEC que complementa la salud digestiva diaria de tu gato." },
  { id: "product-felino-creamy-treats-joint-care", name: "Creamy Treats Joint Care",
    metaTitle: "NUPEC Creamy Treats Joint Care — Salud Articular",
    metaDescription: "Premio cremoso NUPEC que complementa la salud articular diaria de tu gato." },
  { id: "product-felino-creamy-treats-skin-coat", name: "Creamy Treats Skin & Coat",
    metaTitle: "NUPEC Creamy Treats Skin & Coat — Piel y Pelaje",
    metaDescription: "Premio cremoso NUPEC que complementa la salud de piel y pelaje de tu gato." },
  { id: "product-felino-creamy-treats-vitality-care", name: "Creamy Treats Vitality Care",
    metaTitle: "NUPEC Creamy Treats Vitality Care — Gatos",
    metaDescription: "Premio cremoso NUPEC que complementa la vitalidad diaria de tu gato." },

  // ── Felino / Alimentos húmedos ──
  { id: "product-felino-felino-humedo-hairball", name: "Felino Hairball Alimento Húmedo",
    metaTitle: "NUPEC Hairball — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC que ayuda a reducir la formación de bolas de pelo en gatos." },
  { id: "product-felino-felino-humedo-indoor", name: "Felino Indoor Alimento Húmedo",
    metaTitle: "NUPEC Indoor — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC que fortalece el sistema nervioso de gatos de interior." },
  { id: "product-felino-felino-humedo-kitten", name: "Felino Kitten Alimento Húmedo",
    metaTitle: "NUPEC Kitten — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC para el óptimo desarrollo visual de gatitos." },
  { id: "product-felino-felino-humedo-urinary", name: "Felino Urinary Alimento Húmedo",
    metaTitle: "NUPEC Urinary — Alimento Húmedo Súper Premium",
    metaDescription: "Alimento húmedo súper premium NUPEC que ayuda al equilibrio del pH urinario en gatos." },
];

async function applyPatches(patches: Patch[], label: string) {
  console.log(`\n📝  ${label} (${patches.length})\n`);

  for (const p of patches) {
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    await client
      .patch(p.id)
      .set({
        "seo.metaTitle.es": p.metaTitle,
        "seo.metaDescription.es": p.metaDescription,
      })
      .commit();

    console.log(`  ✅  ${p.name}`);
  }
}

async function run() {
  console.log(`\n🐾  NUPEC – Patch: SEO (ES) categorías y productos`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);

  await applyPatches(CATEGORY_PATCHES, "Categorías");
  await applyPatches(PRODUCT_PATCHES, "Productos");

  console.log(`\n✔️  Patch completo. EN/FR pendientes para otra sesión.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
