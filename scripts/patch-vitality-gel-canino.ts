/**
 * NUPEC – Patch: agrega la descripción de la unidad (sachet) al producto
 * "Vitality Gel Sabor Galleta" (Canino / Suplementos), que ya tiene cargada
 * manualmente en Sanity Studio la imagen `kibble.image` ("Unidades de 15 g."),
 * pero no la descripción de texto.
 *
 * Usa `.setIfMissing()` con path anidado para NO pisar `kibble.image` (ni
 * ningún otro campo) si ya existe — solo completa `kibble.description` si
 * está vacío.
 *
 * Uso:
 *   npx tsx scripts/patch-vitality-gel-canino.ts
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

const PRODUCT_ID = "921ec3c3-40ea-4b64-ae6c-88e4c8981b9d"; // Vitality Gel Sabor Galleta (canino)

const kibbleDescription = {
  es: "Cada sachet contiene una porción individual de 15 g, lista para servir.",
  en: "Each sachet contains an individual 15 g portion, ready to serve.",
  fr: "Chaque sachet contient une portion individuelle de 15 g, prête à servir.",
};

async function run() {
  console.log(`\n🐾  NUPEC – Patch: Vitality Gel Sabor Galleta (Canino) — descripción de la unidad`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const current = await client.getDocument(PRODUCT_ID);
  if (!current) {
    throw new Error(`No se encontró el documento ${PRODUCT_ID}`);
  }

  await client
    .patch(PRODUCT_ID)
    .setIfMissing({ "kibble.description": kibbleDescription })
    .commit();

  console.log(`  ✅  ${PRODUCT_ID}: kibble.description actualizado (si estaba vacío)\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el patch:", err.message);
  process.exit(1);
});
