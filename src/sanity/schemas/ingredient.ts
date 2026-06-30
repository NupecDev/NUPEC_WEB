import { defineField, defineType } from "sanity";

export default defineType({
  name: "ingredient",
  title: "Ingrediente Activo",
  type: "document",

  groups: [
    { name: "identidad", title: "Identidad", default: true },
    { name: "evidencia", title: "Evidencia Científica" },
  ],

  fields: [
    // ── Identidad ─────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Nombre del ingrediente",
      type: "object",
      group: "identidad",
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
      group: "identidad",
      options: { source: "name.es", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "image",
      title: "Imagen del ingrediente",
      type: "image",
      group: "identidad",
      options: { hotspot: true },
      description: "Fotografía o render del ingrediente (fondo blanco/transparente o contextual)",
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
      name: "eyebrow",
      title: "Etiqueta / eyebrow",
      type: "object",
      group: "identidad",
      description: 'Texto corto sobre el título (ej. "INGREDIENTE ACTIVO PATENTADO")',
      fields: [
        defineField({ name: "es", title: "Español", type: "string" }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    defineField({
      name: "summary",
      title: "Descripción científica",
      type: "object",
      group: "identidad",
      description: "Párrafo introductorio que explica qué es y cómo actúa el ingrediente",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 4, validation: (r) => r.required() }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 4 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 4 }),
      ],
    }),

    // ── Puntos clave ──────────────────────────────────────────────
    defineField({
      name: "keyPoints",
      title: "Puntos a destacar",
      type: "array",
      group: "identidad",
      description: "Bullets con los beneficios o mecanismos clave del ingrediente",
      of: [
        {
          type: "object",
          name: "keyPoint",
          title: "Punto clave",
          fields: [
            defineField({
              name: "icon",
              title: "Icono (Lucide o URL)",
              type: "string",
              description: 'Nombre de icono Lucide (ej. "flask-conical") o URL de imagen SVG',
            }),
            defineField({
              name: "text",
              title: "Texto",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "text.es", subtitle: "icon" } },
        },
      ],
    }),

    // ── Evidencia científica ───────────────────────────────────────
    defineField({
      name: "studies",
      title: "Estudios y pruebas realizadas",
      type: "array",
      group: "evidencia",
      description: "Estudios clínicos, de laboratorio o en campo que respaldan el ingrediente",
      of: [
        {
          type: "object",
          name: "study",
          title: "Estudio",
          fields: [
            defineField({
              name: "type",
              title: "Tipo de estudio",
              type: "string",
              options: {
                list: [
                  { title: "Estudio clínico", value: "clinical" },
                  { title: "Laboratorio in vitro", value: "lab" },
                  { title: "Estudio en campo", value: "field" },
                  { title: "Meta-análisis", value: "meta" },
                  { title: "Revisión científica", value: "review" },
                ],
                layout: "dropdown",
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "title",
              title: "Título del estudio",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "duration",
              title: "Duración / período",
              type: "string",
              description: 'Ej. "12 semanas", "6 meses", "24 meses"',
            }),
            defineField({
              name: "result",
              title: "Resultado principal",
              type: "object",
              description: "Frase corta con el hallazgo clave del estudio",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "externalUrl",
              title: "URL de publicación (DOI / PubMed)",
              type: "url",
              description: "Enlace a la publicación científica original (opcional)",
            }),
            defineField({
              name: "pdf",
              title: "PDF del estudio",
              type: "file",
              options: { accept: ".pdf" },
              description: "Versión descargable del estudio (opcional)",
            }),
          ],
          preview: {
            select: { title: "title.es", subtitle: "type" },
            prepare({ title, subtitle }) {
              const labels: Record<string, string> = {
                clinical: "Clínico",
                lab: "Laboratorio",
                field: "Campo",
                meta: "Meta-análisis",
                review: "Revisión",
              };
              return { title: title as string, subtitle: labels[subtitle as string] ?? subtitle };
            },
          },
        },
      ],
    }),

    defineField({
      name: "badges",
      title: "Badges de respaldo",
      type: "array",
      group: "evidencia",
      description: "Certificaciones, premios o reconocimientos del ingrediente (imágenes pequeñas)",
      of: [
        {
          type: "object",
          name: "badge",
          fields: [
            defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: false } }),
            defineField({
              name: "label",
              title: "Etiqueta",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string" }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "label.es", media: "image" } },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "name.es", media: "image" },
    prepare({ title, media }) {
      return { title: title as string, subtitle: "Ingrediente activo", media };
    },
  },

  orderings: [
    {
      title: "Nombre A–Z",
      name: "nameAsc",
      by: [{ field: "name.es", direction: "asc" }],
    },
  ],
});
