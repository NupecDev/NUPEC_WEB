/**
 * NUPEC – Patch: sección "Problema y Solución" para el producto clínico
 * "Hepatic" (canino, id: product-canino-hepatic).
 *
 * Contenido tomado de la ficha técnica impresa (página "HEPATIC",
 * tabla PROBLEMA / SOLUCIÓN). Usa `setIfEmpty` para no pisar el campo
 * si ya se hubiera llenado manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/patch-problem-solution-hepatic.ts
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

const PRODUCT_ID = "product-canino-hepatic";

const problemSolution = [
  {
    _type: "problemSolutionItem",
    _key: "proteina",
    problem: {
      es: "Restricción excesiva de proteína = pérdida de masa muscular y desnutrición. En pacientes con encefalopatía hepática, un exceso de proteína puede aumentar la producción de amoníaco y exacerbar los signos clínicos.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Proteína de alta digestibilidad y calidad biológica (huevo y caseína) para mantener la masa muscular y el balance nitrogenado.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "energia",
    problem: {
      es: "Mantener un aporte energético adecuado y altamente digestible para limitar el catabolismo y preservar la masa muscular en pacientes con apetito reducido.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Alta densidad energética (aceite de pescado, aceite de coco, grasa de pollo) y carbohidratos seleccionados (arroz y avena) que favorecen una adecuada cobertura de las necesidades energéticas.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "cobre",
    problem: {
      es: "En hepatopatías por acumulación de cobre o alteración de su excreción biliar, se acumula en los hepatocitos, aumentando el estrés oxidativo y favoreciendo inflamación, daño hepatocelular y fibrosis.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Selección de ingredientes naturalmente bajos en cobre para mantener un aporte total inferior a 5 PPM, con un aporte controlado de zinc que contribuye a limitar la absorción intestinal.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "inflamacion",
    problem: {
      es: "Inflamación y estrés oxidativo persistentes favorecen el daño hepatocelular, la progresión de la fibrosis y la pérdida de función hepática.",
      en: "",
      fr: "",
    },
    solution: {
      es: "EPA+DHA como moduladores de la respuesta inflamatoria; colina y silimarina con actividad antioxidante y hepatoprotectora.",
      en: "",
      fr: "",
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

async function patchDoc(id: string) {
  const current = await client.getDocument(id);
  if (!current) {
    console.log(`  ⚠️  ${id} no encontrado — se omite`);
    return;
  }

  const currentValue = (current as Record<string, unknown>).problemSolution;
  if (!isEmpty(currentValue)) {
    console.log(`  ⏭️   ${id}: problemSolution ya tiene datos — no se pisa`);
    return;
  }

  await client.patch(id).set({ problemSolution }).commit();
  console.log(`  ✅  ${id}: problemSolution actualizado (${problemSolution.length} filas)`);
}

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Problema y Solución — Hepatic (canino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  await patchDoc(PRODUCT_ID);

  const draftId = `drafts.${PRODUCT_ID}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    await patchDoc(draftId);
  }

  console.log(`\n✨  Listo. Pendiente: traducir problemSolution[].problem/solution a en/fr.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
