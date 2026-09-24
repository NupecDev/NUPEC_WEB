/**
 * NUPEC – Patch: contenido editorial EN/FR de los 7 productos publicados
 * del lote "nutricion-clinica" (4 canino + 3 felino).
 *
 * Continuación de scripts/patch-editorial-en-fr-product-daily-treats.ts. El
 * contenido vive en scripts/editorial-en-fr-product-clinical-content.ts
 * (incluye el detalle de las 2 decisiones especiales de este lote: warnings
 * felinos adaptados a "gatitos"/"chatons", y problemSolution traducido
 * fielmente con duplicados entre especies).
 *
 * Arrays fusionados por `_key` (nunca reemplazan el array completo):
 * highTech, keyBenefits, claims, clinicalIndications, mechanismOfAction,
 * differentiators (incluyendo bullets[] anidados por su propio _key),
 * problemSolution (con _key semánticas en texto, ej. "proteina", "energia"),
 * technicalResources. `description`, `kibble.description` y los campos
 * simples de `transitionGuide` se escriben directo con `.set()`.
 *
 * Uso:
 *   npx tsx scripts/patch-editorial-en-fr-product-clinical.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";
import { PRODUCT_CLINICAL_CONTENT_PATCHES } from "./editorial-en-fr-product-clinical-content";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n📝  Contenido editorial EN/FR — productos nutrición clínica (${PRODUCT_CLINICAL_CONTENT_PATCHES.length})\n`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of PRODUCT_CLINICAL_CONTENT_PATCHES) {
    if (p.id.startsWith("drafts.")) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): es un draft, se omite`);
      continue;
    }
    const current = await client.getDocument(p.id);
    if (!current) {
      console.warn(`  ⚠️  ${p.id} (${p.name}): documento no encontrado, se omite`);
      continue;
    }

    const setOps: Record<string, unknown> = {};

    if (p.tagline) {
      setOps["tagline.en"] = p.tagline.en;
      setOps["tagline.fr"] = p.tagline.fr;
    }
    if (p.ingredients) {
      setOps["ingredients.en"] = p.ingredients.en;
      setOps["ingredients.fr"] = p.ingredients.fr;
    }
    if (p.warnings) {
      setOps["warnings.en"] = p.warnings.en;
      setOps["warnings.fr"] = p.warnings.fr;
    }
    if (p.highTechTitleOverride) {
      setOps["highTechTitleOverride.en"] = p.highTechTitleOverride.en;
      setOps["highTechTitleOverride.fr"] = p.highTechTitleOverride.fr;
    }
    if (p.description) {
      setOps["description.en"] = p.description.en;
      setOps["description.fr"] = p.description.fr;
    }
    if (p.kibbleDescription) {
      setOps["kibble.description.en"] = p.kibbleDescription.en;
      setOps["kibble.description.fr"] = p.kibbleDescription.fr;
    }

    // transitionGuide: campos simples con .set() directo (no es un array).
    if (p.transitionGuide) {
      const tg = p.transitionGuide;
      if (tg.title) {
        setOps["transitionGuide.title.en"] = tg.title.en;
        setOps["transitionGuide.title.fr"] = tg.title.fr;
      }
      if (tg.subtitle) {
        setOps["transitionGuide.subtitle.en"] = tg.subtitle.en;
        setOps["transitionGuide.subtitle.fr"] = tg.subtitle.fr;
      }
      if (tg.noteBold) {
        setOps["transitionGuide.noteBold.en"] = tg.noteBold.en;
        setOps["transitionGuide.noteBold.fr"] = tg.noteBold.fr;
      }
      if (tg.noteText) {
        setOps["transitionGuide.noteText.en"] = tg.noteText.en;
        setOps["transitionGuide.noteText.fr"] = tg.noteText.fr;
      }
      if (tg.steps && tg.steps.length > 0) {
        const existingSteps: Array<{ _key: string }> =
          (current as { transitionGuide?: { steps?: Array<{ _key: string }> } }).transitionGuide?.steps ?? [];
        for (const step of tg.steps) {
          const exists = existingSteps.some((e) => e._key === step.key);
          if (!exists) {
            console.warn(`  ⚠️  ${p.id}: transitionGuide.steps._key "${step.key}" no existe, se omite`);
            continue;
          }
          setOps[`transitionGuide.steps[_key=="${step.key}"].label.en`] = step.label.en;
          setOps[`transitionGuide.steps[_key=="${step.key}"].label.fr`] = step.label.fr;
        }
      }
    }

    // Arrays de primer nivel fusionados por _key.
    const mergeByKey = (
      arrayName: string,
      items:
        | Array<{
            key: string;
            title?: { en: string; fr: string };
            description?: { en: string; fr: string };
            text?: { en: string; fr: string };
            label?: { en: string; fr: string };
            subtitle?: { en: string; fr: string };
            problem?: { en: string; fr: string };
            solution?: { en: string; fr: string };
          }>
        | undefined
    ) => {
      if (!items || items.length === 0) return;
      const existing: Array<{ _key: string }> =
        (current as Record<string, unknown>)[arrayName] as Array<{ _key: string }> ?? [];
      for (const item of items) {
        const exists = existing.some((e) => e._key === item.key);
        if (!exists) {
          console.warn(`  ⚠️  ${p.id}: ${arrayName}._key "${item.key}" no existe en el documento, se omite ese item`);
          continue;
        }
        if (item.title) {
          setOps[`${arrayName}[_key=="${item.key}"].title.en`] = item.title.en;
          setOps[`${arrayName}[_key=="${item.key}"].title.fr`] = item.title.fr;
        }
        if (item.description) {
          setOps[`${arrayName}[_key=="${item.key}"].description.en`] = item.description.en;
          setOps[`${arrayName}[_key=="${item.key}"].description.fr`] = item.description.fr;
        }
        if (item.text) {
          setOps[`${arrayName}[_key=="${item.key}"].text.en`] = item.text.en;
          setOps[`${arrayName}[_key=="${item.key}"].text.fr`] = item.text.fr;
        }
        if (item.label) {
          setOps[`${arrayName}[_key=="${item.key}"].label.en`] = item.label.en;
          setOps[`${arrayName}[_key=="${item.key}"].label.fr`] = item.label.fr;
        }
        if (item.subtitle) {
          setOps[`${arrayName}[_key=="${item.key}"].subtitle.en`] = item.subtitle.en;
          setOps[`${arrayName}[_key=="${item.key}"].subtitle.fr`] = item.subtitle.fr;
        }
        if (item.problem) {
          setOps[`${arrayName}[_key=="${item.key}"].problem.en`] = item.problem.en;
          setOps[`${arrayName}[_key=="${item.key}"].problem.fr`] = item.problem.fr;
        }
        if (item.solution) {
          setOps[`${arrayName}[_key=="${item.key}"].solution.en`] = item.solution.en;
          setOps[`${arrayName}[_key=="${item.key}"].solution.fr`] = item.solution.fr;
        }
      }
    };

    mergeByKey("highTech", p.highTech);
    mergeByKey("keyBenefits", p.keyBenefits);
    mergeByKey("claims", p.claims);
    mergeByKey("clinicalIndications", p.clinicalIndications);
    mergeByKey("mechanismOfAction", p.mechanismOfAction);
    mergeByKey("problemSolution", p.problemSolution);
    mergeByKey("technicalResources", p.technicalResources);

    // differentiators: fusión por _key en dos niveles (el item y sus bullets[]).
    if (p.differentiators && p.differentiators.length > 0) {
      const existingDiffs: Array<{ _key: string; bullets?: Array<{ _key: string }> }> =
        (current as { differentiators?: Array<{ _key: string; bullets?: Array<{ _key: string }> }> }).differentiators ?? [];
      for (const diff of p.differentiators) {
        const existingDiff = existingDiffs.find((e) => e._key === diff.key);
        if (!existingDiff) {
          console.warn(`  ⚠️  ${p.id}: differentiators._key "${diff.key}" no existe, se omite`);
          continue;
        }
        if (diff.title) {
          setOps[`differentiators[_key=="${diff.key}"].title.en`] = diff.title.en;
          setOps[`differentiators[_key=="${diff.key}"].title.fr`] = diff.title.fr;
        }
        if (diff.subtitle) {
          setOps[`differentiators[_key=="${diff.key}"].subtitle.en`] = diff.subtitle.en;
          setOps[`differentiators[_key=="${diff.key}"].subtitle.fr`] = diff.subtitle.fr;
        }
        for (const bullet of diff.bullets ?? []) {
          const existingBullet = existingDiff.bullets?.some((b) => b._key === bullet.key);
          if (!existingBullet) {
            console.warn(`  ⚠️  ${p.id}: differentiators[${diff.key}].bullets._key "${bullet.key}" no existe, se omite`);
            continue;
          }
          if (bullet.title) {
            setOps[`differentiators[_key=="${diff.key}"].bullets[_key=="${bullet.key}"].title.en`] = bullet.title.en;
            setOps[`differentiators[_key=="${diff.key}"].bullets[_key=="${bullet.key}"].title.fr`] = bullet.title.fr;
          }
          if (bullet.description) {
            setOps[`differentiators[_key=="${diff.key}"].bullets[_key=="${bullet.key}"].description.en`] = bullet.description.en;
            setOps[`differentiators[_key=="${diff.key}"].bullets[_key=="${bullet.key}"].description.fr`] = bullet.description.fr;
          }
        }
      }
    }

    if (Object.keys(setOps).length === 0) {
      console.log(`  ⏭️   ${p.name}: sin cambios definidos, se omite`);
      continue;
    }

    await client.patch(p.id).set(setOps).commit();
    console.log(`  ✅  ${p.name} (${Object.keys(setOps).length} paths)`);
  }

  console.log("\n✔️  Listo.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
