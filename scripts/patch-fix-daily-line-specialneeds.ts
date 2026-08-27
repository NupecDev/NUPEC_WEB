/**
 * NUPEC – Patch: revierte specialNeeds asignados por error a la línea BASE
 * "nutricion-diaria" (canino).
 *
 * En el patch anterior (patch-wizard-fields.ts) se marcaron Adulto/Cachorro/
 * Senior Razas Mini con "ansiedad" y Senior/Senior Razas Pequeñas con
 * "articular", basándose en beneficios secundarios mencionados en su
 * descripción (Passiflora incarnata, salud articular). Pero estos productos
 * SON la línea de mantenimiento diario para esa talla/etapa — no una línea
 * alterna — así que no deben tener specialNeeds: el wizard los excluía de
 * "sin necesidad especial" al buscarlos, dejando huecos (ej. senior + raza
 * pequeña + sin necesidad solo devolvía el alimento húmedo).
 *
 * Usa `.unset()` para eliminar el campo por completo (no solo vaciar el
 * array), dejándolo como estaba antes del patch original: undefined.
 *
 * Uso:
 *   npx tsx scripts/patch-fix-daily-line-specialneeds.ts
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

const IDS: { id: string; name: string }[] = [
  { id: "product-canino-adulto-razas-mini", name: "Adulto Razas Mini" },
  { id: "product-canino-cachorro-razas-mini", name: "Cachorro Razas Mini" },
  { id: "product-canino-senior-razas-mini", name: "Senior Razas Mini" },
  { id: "product-canino-senior", name: "Senior" },
  { id: "product-canino-senior-razas-pequenas", name: "Senior Razas Pequeñas" },
];

async function run() {
  console.log(`\n🐾  NUPEC – Patch: revertir specialNeeds de la línea diaria (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const { id, name } of IDS) {
    const current = await client.getDocument(id);
    if (!current) {
      console.warn(`  ⚠️  ${id} (${name}): documento no encontrado, se omite`);
      continue;
    }

    await client.patch(id).unset(["specialNeeds"]).commit();
    console.log(`  ✅  ${name}: specialNeeds eliminado`);
  }

  console.log(`\n✔️  Patch completo.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
