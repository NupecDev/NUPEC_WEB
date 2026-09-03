/**
 * NUPEC – Patch: define `sortOrder` para los productos de la línea
 * clínica canina, para que la grid (ClinicalProductGrid) los muestre en
 * el orden: Acute Hepatic, Hepatic, Cardiac, Hypoallergenic.
 *
 * Uso:
 *   npx tsx scripts/patch-sortorder-clinical-canino.ts
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

const ORDER: { id: string; sortOrder: number }[] = [
  { id: "product-canino-acute-hepatic", sortOrder: 1 },
  { id: "product-canino-hepatic", sortOrder: 2 },
  { id: "product-canino-cardiac", sortOrder: 3 },
  { id: "product-canino-hypoallergenic", sortOrder: 4 },
];

async function patchDoc(id: string, sortOrder: number) {
  const current = await client.getDocument(id);
  if (!current) {
    console.log(`  ⚠️  ${id} no encontrado — se omite`);
    return;
  }

  await client.patch(id).set({ sortOrder }).commit();
  console.log(`  ✅  ${id}: sortOrder = ${sortOrder}`);
}

async function run() {
  console.log(`\n🐾  NUPEC – Patch: sortOrder línea clínica canina`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const { id, sortOrder } of ORDER) {
    await patchDoc(id, sortOrder);

    const draftId = `drafts.${id}`;
    const draft = await client.getDocument(draftId);
    if (draft) {
      await patchDoc(draftId, sortOrder);
    }
  }

  console.log(`\n✨  Listo.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
