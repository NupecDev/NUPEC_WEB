/**
 * NUPEC – Patch: completa breedSize y specialNeeds faltantes para el wizard
 * "Encuentra tu alimento" en los productos ya sembrados en Sanity.
 *
 * Criterio de asignación revisado producto por producto (descripción, claims,
 * indicaciones clínicas, guaranteedAnalysis, warnings) y confirmado con el
 * cliente. Ver /Users/emora/.claude/plans/linear-strolling-parrot.md para el
 * detalle de cada decisión.
 *
 * Usa `.set()` explícito (no `.setIfMissing()`) porque estos campos están
 * vacíos hoy y queremos que el valor final quede exactamente como se define
 * aquí, sin depender de si Sanity los reporta como `undefined` o `null`.
 *
 * Uso:
 *   npx tsx scripts/patch-wizard-fields.ts
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
  breedSize?: string[];
  specialNeeds?: string[];
};

const PATCHES: Patch[] = [
  // ── a) breedSize faltante (línea diaria canina, contraparte "todas las razas" ──
  { id: "94543c98-c670-466e-82cd-aa62c446a963", name: "Adulto", breedSize: ["mediana", "grande"] },
  { id: "product-canino-cachorro", name: "Cachorro", breedSize: ["mediana", "grande"] },

  // ── b) specialNeeds inferidos por contraparte de nombre ──
  { id: "product-felino-felino-indoor", name: "FELINO Indoor", specialNeeds: ["indoor"] },
  { id: "21d2abd4-ec74-4c79-8a7b-03a771da3d72", name: "Felino Hairball", specialNeeds: ["hairball"] },
  { id: "product-felino-felino-digestive-health", name: "Digestive Health (felino)", specialNeeds: ["digestion"] },
  { id: "product-canino-joint-care-treats", name: "Joint Care Treats", specialNeeds: ["articular"] },
  { id: "product-felino-creamy-treats-joint-care", name: "Creamy Treats Joint Care", specialNeeds: ["articular"] },

  // ── c) specialNeeds por evidencia clínica/textual ──
  { id: "product-canino-acute-hepatic", name: "Acute Hepatic", specialNeeds: ["hepatico"] },
  { id: "product-canino-hepatic", name: "Hepatic", specialNeeds: ["hepatico"] },
  { id: "product-felino-felino-hepatic", name: "FELINO Hepatic", specialNeeds: ["hepatico"] },
  { id: "product-canino-cardiac", name: "Cardiac", specialNeeds: ["cardiaco"] },
  { id: "product-felino-felino-cardiac", name: "FELINO Cardiac", specialNeeds: ["cardiaco"] },
  { id: "product-canino-hypoallergenic", name: "Hypoallergenic", specialNeeds: ["alergias"] },
  { id: "product-canino-dental-care-treats", name: "Dental Care Treats", specialNeeds: ["dental"] },
  { id: "product-canino-relax-treats", name: "Relax Treats", specialNeeds: ["ansiedad"] },
  { id: "product-canino-smart-treats", name: "Smart Treats", specialNeeds: ["cognitivo"] },
  { id: "product-canino-training-treats", name: "Training Treats", specialNeeds: ["cognitivo"] },
  { id: "product-canino-vitality-gel-multivitaminico", name: "Vitality Gel Multivitamínico", specialNeeds: ["vitalidad"] },
  { id: "product-canino-vitality-water-carne", name: "Vitality Water Sabor Carne", specialNeeds: ["vitalidad"] },
  { id: "fec6eebd-bcfa-45fb-a817-67ca4fb3a527", name: "Vitality Water Sabor Frutal", specialNeeds: ["vitalidad"] },
  { id: "product-canino-vitality-water-sandia", name: "Vitality Water Sabor Sandía", specialNeeds: ["vitalidad"] },
  { id: "product-felino-creamy-treats-vitality-care", name: "Creamy Treats Vitality Care", specialNeeds: ["vitalidad"] },
  { id: "product-canino-1st-care", name: "1st Care", specialNeeds: ["vitalidad"] },
  { id: "product-canino-high-performance", name: "High Performance", specialNeeds: ["vitalidad"] },
  { id: "product-canino-adulto-razas-mini", name: "Adulto Razas Mini", specialNeeds: ["ansiedad"] },
  { id: "product-canino-senior-razas-mini", name: "Senior Razas Mini", specialNeeds: ["ansiedad"] },
  { id: "product-canino-cachorro-razas-mini", name: "Cachorro Razas Mini", specialNeeds: ["ansiedad"] },
  { id: "product-canino-senior", name: "Senior", specialNeeds: ["articular"] },
  { id: "product-canino-senior-razas-pequenas", name: "Senior Razas Pequeñas", specialNeeds: ["articular"] },

  // Nota: Adulto Razas Pequeñas, Cachorro Razas Pequeñas, FELINO Kitten,
  // FELINO Senior, Felino Kitten Alimento Húmedo y Adulto/Cachorro/Senior
  // Alimento Húmedo (canino) se dejan intencionalmente sin specialNeeds —
  // son línea base de mantenimiento sin necesidad diferenciadora real.
];

async function run() {
  console.log(`\n🐾  NUPEC – Patch: campos del wizard (breedSize / specialNeeds)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Productos a actualizar: ${PATCHES.length}\n`);

  for (const p of PATCHES) {
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    const fields: Record<string, string[]> = {};
    if (p.breedSize) fields.breedSize = p.breedSize;
    if (p.specialNeeds) fields.specialNeeds = p.specialNeeds;

    await client.patch(p.id).set(fields).commit();
    console.log(`  ✅  ${p.name}: ${JSON.stringify(fields)}`);
  }

  console.log(`\n✔️  Patch completo.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
