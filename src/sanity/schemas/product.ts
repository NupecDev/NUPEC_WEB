import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",

  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "alimentacion", title: "Alimentación" },
    { name: "presentaciones", title: "Presentaciones" },
    { name: "wizard", title: "Wizard / Filtros" },
    { name: "clinica", title: "Clínica (solo nutricion-clinica)" },
  ],

  fields: [
    // ── Identificación ────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Nombre",
      type: "object",
      group: "contenido",
      fields: [
        defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "contenido",
      description:
        "Segmento final de la URL: /es/nutricion-canina/[categoria]/[slug]",
      options: { source: "name.es", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "species",
      title: "Especie",
      type: "string",
      group: "contenido",
      options: {
        list: [
          { title: "Canino", value: "canino" },
          { title: "Felino", value: "felino" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      group: "contenido",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),

    // ── Contenido ─────────────────────────────────────────────────
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "object",
      group: "contenido",
      description: "Frase corta bajo el nombre del producto",
      fields: [
        defineField({ name: "es", title: "Español", type: "string" }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    defineField({
      name: "description",
      title: "Descripción",
      type: "object",
      group: "contenido",
      fields: [
        defineField({ name: "es", title: "Español", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "en", title: "Inglés", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "fr", title: "Francés", type: "array", of: [{ type: "block" }] }),
      ],
    }),

    defineField({
      name: "color",
      title: "Color representativo",
      type: "string",
      group: "contenido",
      description: "Color hexadecimal que identifica este producto (ej. #78BE20). Se usa en el hero, tarjetas y acentos de la página.",
      validation: (r) =>
        r.custom((val: string | undefined) => {
          if (!val) return true;
          return /^#[0-9A-Fa-f]{6}$/.test(val) || "Debe ser un código hex válido (ej. #78BE20)";
        }),
    }),

    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      group: "contenido",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),

    defineField({
      name: "ingredients",
      title: "Ingredientes",
      type: "object",
      group: "contenido",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 4 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 4 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 4 }),
      ],
    }),

    defineField({
      name: "guaranteedAnalysis",
      title: "Análisis garantizado",
      type: "array",
      group: "contenido",
      description: "Valores nutricionales garantizados (proteína, grasa, fibra, humedad, etc.)",
      of: [
        {
          type: "object",
          name: "nutrient",
          title: "Nutriente",
          fields: [
            defineField({ name: "label", title: "Nutriente", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", title: "Valor", type: "string", validation: (r) => r.required() }),
            defineField({ name: "min", title: "Mín.", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "contenido",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta título",
          type: "object",
          fields: [
            defineField({ name: "es", title: "Español", type: "string" }),
            defineField({ name: "en", title: "Inglés", type: "string" }),
            defineField({ name: "fr", title: "Francés", type: "string" }),
          ],
        }),
        defineField({
          name: "metaDescription",
          title: "Meta descripción",
          type: "object",
          fields: [
            defineField({ name: "es", title: "Español", type: "text", rows: 2 }),
            defineField({ name: "en", title: "Inglés", type: "text", rows: 2 }),
            defineField({ name: "fr", title: "Francés", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "technicalSheet",
      title: "Ficha técnica (PDF)",
      type: "file",
      group: "contenido",
      options: { accept: ".pdf" },
    }),

    // ── HighTech ──────────────────────────────────────────────────
    defineField({
      name: "highTech",
      title: "HighTech",
      type: "array",
      group: "contenido",
      description: "Tecnologías / características técnicas destacadas del producto",
      of: [
        {
          type: "object",
          name: "highTechItem",
          title: "HighTech item",
          fields: [
            defineField({
              name: "icon",
              title: "Icono",
              type: "string",
              description: "Nombre del icono (Lucide) o URL de SVG",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "title",
              title: "Título",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "description",
              title: "Descripción",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "text", rows: 2 }),
                defineField({ name: "en", title: "Inglés", type: "text", rows: 2 }),
                defineField({ name: "fr", title: "Francés", type: "text", rows: 2 }),
              ],
            }),
          ],
          preview: { select: { title: "title.es", subtitle: "icon" } },
        },
      ],
    }),

    // ── Beneficios clave ──────────────────────────────────────────
    defineField({
      name: "keyBenefits",
      title: "Beneficios clave",
      type: "array",
      group: "contenido",
      description: "Lista de beneficios visibles en la página del producto",
      of: [
        {
          type: "object",
          name: "keyBenefitItem",
          title: "Beneficio",
          fields: [
            defineField({
              name: "icon",
              title: "Icono",
              type: "string",
              description: "Nombre del icono (Lucide) o URL de SVG",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Descripción",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "description.es", subtitle: "icon" } },
        },
      ],
    }),

    // ── Croqueta ──────────────────────────────────────────────────
    defineField({
      name: "kibble",
      title: "Croqueta",
      type: "object",
      group: "contenido",
      description: "Imagen y descripción de la croqueta (entrada única)",
      fields: [
        defineField({
          name: "image",
          title: "Imagen",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "object",
          fields: [
            defineField({ name: "es", title: "Español", type: "text", rows: 3 }),
            defineField({ name: "en", title: "Inglés", type: "text", rows: 3 }),
            defineField({ name: "fr", title: "Francés", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),

    // ── Alimentación ──────────────────────────────────────────────
    defineField({
      name: "feedingGuide",
      title: "Guía de alimentación",
      type: "reference",
      group: "alimentacion",
      to: [{ type: "feedingGuide" }],
    }),

    // ── Presentaciones ────────────────────────────────────────────
    defineField({
      name: "presentations",
      title: "Presentaciones disponibles",
      type: "array",
      group: "presentaciones",
      of: [
        {
          type: "object",
          name: "presentation",
          title: "Presentación",
          fields: [
            defineField({
              name: "weight",
              title: "Peso / Volumen",
              type: "string",
              description: 'Ej. "1 kg", "2 kg", "250 ml"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "sku",
              title: "SKU",
              type: "string",
            }),
            defineField({
              name: "ean",
              title: "Código EAN",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "weight", subtitle: "sku" },
          },
        },
      ],
    }),

    // ── Wizard / Filtros ──────────────────────────────────────────
    defineField({
      name: "lifeStage",
      title: "Etapa de vida",
      type: "string",
      group: "wizard",
      description: "Usado por el wizard para filtrar productos",
      options: {
        list: [
          { title: "Cachorro", value: "cachorro" },
          { title: "Adulto", value: "adulto" },
          { title: "Senior", value: "senior" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "breedSize",
      title: "Tamaño de raza",
      type: "string",
      group: "wizard",
      description: "Solo aplica para productos caninos",
      options: {
        list: [
          { title: "Mini (hasta 4 kg adulto)", value: "mini" },
          { title: "Pequeña (4–10 kg adulto)", value: "pequena" },
          { title: "Mediana (10–25 kg adulto)", value: "mediana" },
          { title: "Grande (más de 25 kg adulto)", value: "grande" },
          { title: "Todas las razas", value: "todas" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "specialNeeds",
      title: "Necesidades especiales",
      type: "array",
      group: "wizard",
      description: "Selecciona todas las que apliquen",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Control de peso", value: "peso" },
          { title: "Salud digestiva", value: "digestion" },
          { title: "Cuidado renal", value: "renal" },
          { title: "Manejo urinario", value: "urinario" },
          { title: "Piel sensible", value: "piel" },
        ],
        layout: "grid",
      },
    }),

    // ── Clínica ───────────────────────────────────────────────────
    // Solo aplica cuando category.slug == "nutricion-clinica"

    defineField({
      name: "clinicalIndications",
      title: "Indicaciones clínicas",
      type: "array",
      group: "clinica",
      description: "Lista de condiciones/patologías para las que está indicado el producto",
      of: [
        {
          type: "object",
          name: "indication",
          fields: [
            defineField({
              name: "label",
              title: "Indicación",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "icon",
              title: "Icono (Lucide o nombre de clase)",
              type: "string",
            }),
          ],
          preview: { select: { title: "label.es" } },
        },
      ],
    }),

    defineField({
      name: "mechanismOfAction",
      title: "Mecanismo de acción",
      type: "array",
      group: "clinica",
      description: "Pasos numerados (máx. 4) que explican cómo actúa el producto",
      of: [
        {
          type: "object",
          name: "mechanismStep",
          fields: [
            defineField({ name: "step", title: "Número de paso", type: "number", validation: (r) => r.required().min(1).max(4) }),
            defineField({
              name: "title",
              title: "Título del paso",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "description",
              title: "Descripción",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "text", rows: 2 }),
                defineField({ name: "en", title: "Inglés", type: "text", rows: 2 }),
                defineField({ name: "fr", title: "Francés", type: "text", rows: 2 }),
              ],
            }),
            defineField({
              name: "icon",
              title: "Icono (Lucide o nombre de clase)",
              type: "string",
            }),
          ],
          preview: { select: { title: "title.es", subtitle: "step" } },
        },
      ],
    }),

    defineField({
      name: "clinicalCases",
      title: "Casos clínicos",
      type: "array",
      group: "clinica",
      description: "Casos clínicos asociados a este producto",
      of: [{ type: "reference", to: [{ type: "clinicalCase" }] }],
    }),

    defineField({
      name: "technicalResources",
      title: "Recursos técnicos",
      type: "array",
      group: "clinica",
      description: "PDFs y documentos descargables para veterinarios",
      of: [
        {
          type: "object",
          name: "technicalResource",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "subtitle",
              title: "Subtítulo / descripción breve",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string" }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "file",
              title: "Archivo (PDF)",
              type: "file",
              options: { accept: ".pdf" },
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "title.es" } },
        },
      ],
    }),

    defineField({
      name: "isActive",
      title: "Activo",
      type: "boolean",
      group: "wizard",
      description: "Desactiva para ocultar el producto sin eliminarlo",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "name.es",
      species: "species",
      media: "image",
    },
    prepare({ title, species, media }) {
      return {
        title: title as string,
        subtitle: (species as string) === "canino" ? "Canino" : "Felino",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Especie + Categoría + Nombre",
      name: "speciesCategoryName",
      by: [
        { field: "species", direction: "asc" },
        { field: "category.name.es", direction: "asc" },
        { field: "name.es", direction: "asc" },
      ],
    },
  ],
});
