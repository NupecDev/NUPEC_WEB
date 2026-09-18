/**
 * NUPEC – Seed/Patch: meta título, meta descripción y FAQ (ES) de las 3
 * páginas institucionales (nosotros, conciencia, contacto), para el plan de
 * posicionamiento SEO/AEO.
 *
 * Copy basado en datos reales extraídos de src/i18n/dictionaries/es.json
 * (fundación 1993, alianza INCASÁRA, línea "Con Amor de México", datos de
 * contacto). Solo se completa `seo.metaTitle.es` / `seo.metaDescription.es`
 * y `faq[].question.es` / `faq[].answer.es` — EN/FR se completan en otra
 * sesión.
 *
 * Usa createIfNotExists porque el schema "page" es nuevo y estos documentos
 * probablemente no existen aún en Sanity.
 *
 * Uso:
 *   npx tsx scripts/seed-seo-paginas-institucionales.ts
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

type FaqItem = { question: string; answer: string };

type PageSeed = {
  docId: string;
  pageId: "nosotros" | "conciencia" | "contacto";
  metaTitle: string;
  metaDescription: string;
  faq: FaqItem[];
};

const PAGES: PageSeed[] = [
  {
    docId: "page-nosotros",
    pageId: "nosotros",
    metaTitle: "NUPEC — Más de 30 Años Nutriendo con Ciencia",
    metaDescription:
      "Conoce la historia de NUPEC, parte de Grupo NUTEC desde 1993. Ciencia, experiencia e investigación en nutrición premium para perros y gatos.",
    faq: [
      {
        question: "¿Desde cuándo existe NUPEC?",
        answer:
          "NUPEC nace de Grupo NUTEC, pioneros en nutrición animal en México desde 1993, con más de 30 años de experiencia e investigación científica.",
      },
      {
        question: "¿Qué significa el nombre NUPEC?",
        answer:
          'NUPEC combina "NU" de Nuevo y "PEEK" (perro en maya): un nombre que honra nuestras raíces mexicanas y representa la nueva generación de nutrición para mascotas.',
      },
      {
        question: "¿Dónde se fabrica NUPEC?",
        answer:
          "NUPEC se produce en dos plantas con tecnología 100% importada de Europa, en asociación con Grupo CCPA de Francia.",
      },
    ],
  },
  {
    docId: "page-conciencia",
    pageId: "conciencia",
    metaTitle: "Conciencia Social NUPEC — Nutrimos con Amor",
    metaDescription:
      "Iniciativas NUPEC de responsabilidad social: terapias asistidas con animales, conservación del lobo mexicano y apoyo al talento nacional.",
    faq: [
      {
        question: "¿Qué es Terapias con Amor de NUPEC?",
        answer:
          "Es la alianza de NUPEC con Fundación Movimiento INCASÁRA para terapia asistida con perros y caballos entrenados. Un porcentaje de cada compra financia estas terapias.",
      },
      {
        question: '¿Qué es la edición "Con Amor de México"?',
        answer:
          "Es una edición especial de NUPEC con arte Otomí de Guanajuato, Michoacán y Tlaxcala, que impulsa la capacitación de proveedores y talento nacional.",
      },
      {
        question: "¿Cuántos profesionales mexicanos respaldan a NUPEC?",
        answer:
          "Más de 600 profesionales mexicanos —científicos, veterinarios y especialistas en nutrición animal— participan en el desarrollo de NUPEC.",
      },
    ],
  },
  {
    docId: "page-contacto",
    pageId: "contacto",
    metaTitle: "Contacto NUPEC — Querétaro, México",
    metaDescription:
      "Contáctanos: (800) 926 8732, lunes a viernes de 8:00 a 18:00 h. Resolvemos tus dudas sobre nutrición NUPEC para perros y gatos.",
    faq: [
      {
        question: "¿Cuál es el teléfono de contacto de NUPEC?",
        answer:
          "Puedes llamar al (800) 926 8732 (800 YA NUPEC), de lunes a viernes de 08:00 a 18:00 horas.",
      },
      {
        question: "¿Dónde están las oficinas de NUPEC?",
        answer:
          "NUPEC opera desde Avenida de las Fuentes #14, Fraccionamiento Industrial Bernardo Quintana, El Marqués, Querétaro, C.P. 76240.",
      },
    ],
  },
];

async function run() {
  console.log(`\n🐾  NUPEC – Seed/Patch: SEO (ES) páginas institucionales`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  for (const p of PAGES) {
    await client.createIfNotExists({
      _id: p.docId,
      _type: "page",
      pageId: p.pageId,
    });

    await client
      .patch(p.docId)
      .set({
        "seo.metaTitle.es": p.metaTitle,
        "seo.metaDescription.es": p.metaDescription,
        faq: p.faq.map((item, i) => ({
          _type: "faqItem",
          _key: `faq-${i}`,
          question: { es: item.question },
          answer: { es: item.answer },
        })),
      })
      .commit();

    console.log(`  ✅  ${p.pageId} (${p.faq.length} FAQ)`);
  }

  console.log(`\n✔️  Seed/Patch completo. EN/FR pendientes para otra sesión.\n`);
}

run().catch((err) => {
  console.error("❌  Error durante el seed/patch:", err.message);
  process.exit(1);
});
