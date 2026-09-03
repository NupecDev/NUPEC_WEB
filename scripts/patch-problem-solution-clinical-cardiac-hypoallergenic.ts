/**
 * NUPEC – Patch: sección "Problema y Solución" para los productos clínicos
 * Cardiac e Hypoallergenic, canino y felino.
 *
 * Contenido tomado de la ficha técnica impresa (NUP_VADEMECUM_CLIN_ESP_
 * Problema-Solucion.pdf, páginas CARDIAC y HYPOALLERGENIC). El contenido de
 * Problema/Solución se comparte entre especies (perro y gato) para un mismo
 * producto/línea — solo cambia el producto, no la especie — por lo que se
 * aplica el mismo set de filas a ambos documentos de cada línea.
 *
 * Usa `setIfEmpty` para no pisar el campo si ya se hubiera llenado
 * manualmente en Sanity Studio.
 *
 * Uso:
 *   npx tsx scripts/patch-problem-solution-clinical-cardiac-hypoallergenic.ts
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

type PSItem = {
  _type: "problemSolutionItem";
  _key: string;
  problem: { es: string; en: string; fr: string };
  solution: { es: string; en: string; fr: string };
};

const CARDIAC_PS: PSItem[] = [
  {
    _type: "problemSolutionItem",
    _key: "caquexia",
    problem: {
      es: "Desarrollo de un estado catabólico que favorece la pérdida progresiva de masa muscular (caquexia cardiaca); condición asociada con un peor pronóstico.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Proteínas de alta digestibilidad y calidad biológica (pollo, pavo, pescado y huevo) con aminoácidos esenciales para contribuir al mantenimiento de la masa muscular.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "metabolismo-energetico",
    problem: {
      es: "Metabolismo energético del miocardio alterado (menor eficiencia para producir y utilizar ATP). En etapas avanzadas, la reducción del apetito y el estado catabólico comprometen el aporte energético y favorecen la pérdida de masa muscular.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Dieta altamente digestible y con adecuada densidad energética, con fuentes seleccionadas de carbohidratos y grasas, que contribuye a cubrir las necesidades energéticas y limitar el catabolismo corporal.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "sodio-electrolitos",
    problem: {
      es: "Retención de sodio y agua. El tratamiento diurético puede modificar el balance de electrolitos como potasio y magnesio, importantes para la función eléctrica y muscular.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Sodio moderadamente restringido en la dieta que contribuye al manejo de la retención de líquidos, con niveles controlados de potasio y magnesio que mantienen el adecuado equilibrio electrolítico. Adicionado con arginina, precursor del óxido nítrico, para el mantenimiento de la función endotelial y vascular.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "estres-oxidativo",
    problem: {
      es: "El estrés oxidativo y la inflamación crónica contribuyen al daño celular y la progresión de la disfunción cardiaca.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Omega 3 como cardioprotectores, con efectos antiarrítmicos y antiinflamatorios, además de taurina y L-carnitina que optimizan la oxidación de las grasas, estabilizan la función eléctrica y refuerzan las paredes cardiacas.",
      en: "",
      fr: "",
    },
  },
];

const HYPOALLERGENIC_PS: PSItem[] = [
  {
    _type: "problemSolutionItem",
    _key: "proteinas-antigenicas",
    problem: {
      es: "Las proteínas alimentarias pueden desencadenar reacciones adversas en pacientes sensibilizados. Las más frecuentemente asociadas son res, lácteos, pollo y trigo.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Salmón hidrolizado como fuente proteica seleccionada para reducir la exposición a proteínas intactas potencialmente antigénicas. Tapioca y almidón de maíz altamente purificado como fuentes de carbohidratos de alta digestibilidad.",
      en: "",
      fr: "",
    },
  },
  {
    _type: "problemSolutionItem",
    _key: "barrera-intestinal",
    problem: {
      es: "La alteración de la barrera intestinal puede aumentar la exposición del sistema inmunológico a antígenos alimentarios y contribuir a la pérdida de tolerancia oral.",
      en: "",
      fr: "",
    },
    solution: {
      es: "Glutamina, butirato e inulina para apoyar la integridad y función de la barrera intestinal; EPA+DHA para modular la respuesta inflamatoria; y zinc y biotina como nutrientes esenciales para el mantenimiento de la integridad de la piel y del pelaje.",
      en: "",
      fr: "",
    },
  },
];

type Patch = { id: string; problemSolution: PSItem[] };

const patches: Patch[] = [
  { id: "product-canino-cardiac", problemSolution: CARDIAC_PS },
  { id: "product-felino-felino-cardiac", problemSolution: CARDIAC_PS },
  { id: "product-canino-hypoallergenic", problemSolution: HYPOALLERGENIC_PS },
  { id: "product-felino-felino-hypoallergenic", problemSolution: HYPOALLERGENIC_PS },
];

function isEmpty(val: unknown): boolean {
  if (val === undefined || val === null) return true;
  if (typeof val === "string") return val.trim() === "";
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === "object") return Object.values(val).every(isEmpty);
  return false;
}

async function patchDoc(id: string, problemSolution: PSItem[]) {
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
  console.log(`\n🐾  NUPEC – Patch: Problema y Solución — Cardiac / Hypoallergenic (canino + felino)`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const { id, problemSolution } of patches) {
    await patchDoc(id, problemSolution);

    const draftId = `drafts.${id}`;
    const draft = await client.getDocument(draftId);
    if (draft) {
      await patchDoc(draftId, problemSolution);
    }
  }

  console.log(`\n✨  Listo. Pendiente: traducir problemSolution[].problem/solution a en/fr.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
