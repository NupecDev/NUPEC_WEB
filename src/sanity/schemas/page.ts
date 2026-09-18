import { defineField, defineType } from "sanity";

const INSTITUTIONAL_PAGES = [
  { title: "Nosotros (/nosotros)", value: "nosotros" },
  { title: "Conciencia social (/conciencia)", value: "conciencia" },
  { title: "Contacto (/contacto)", value: "contacto" },
];

export default defineType({
  name: "page",
  title: "Página institucional (SEO)",
  type: "document",
  description:
    "Metadatos SEO para páginas institucionales cuyo contenido vive en los componentes del template (no editable desde Sanity).",
  fields: [
    defineField({
      name: "pageId",
      title: "Página",
      type: "string",
      options: { list: INSTITUTIONAL_PAGES, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta título",
          description: "Máx. 60 caracteres para no truncarse en resultados de búsqueda",
          type: "object",
          fields: [
            defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.max(60) }),
            defineField({ name: "en", title: "Inglés", type: "string", validation: (r) => r.max(60) }),
            defineField({ name: "fr", title: "Francés", type: "string", validation: (r) => r.max(60) }),
          ],
        }),
        defineField({
          name: "metaDescription",
          title: "Meta descripción",
          description: "Máx. 155 caracteres para no truncarse en resultados de búsqueda",
          type: "object",
          fields: [
            defineField({ name: "es", title: "Español", type: "text", rows: 2, validation: (r) => r.max(155) }),
            defineField({ name: "en", title: "Inglés", type: "text", rows: 2, validation: (r) => r.max(155) }),
            defineField({ name: "fr", title: "Francés", type: "text", rows: 2, validation: (r) => r.max(155) }),
          ],
        }),
        defineField({
          name: "canonicalOverride",
          title: "Canonical URL (override)",
          type: "url",
          description: "Opcional. Solo si esta página debe apuntar su canonical a otra URL distinta de la suya propia.",
        }),
        defineField({
          name: "noIndex",
          title: "Ocultar de buscadores (noindex)",
          type: "boolean",
          description: "Actívalo para que esta página no se indexe en buscadores.",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "Preguntas frecuentes (FAQ)",
      type: "array",
      description: "Preguntas y respuestas expuestas como datos estructurados FAQPage.",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Pregunta",
          fields: [
            defineField({
              name: "question",
              title: "Pregunta",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
            defineField({
              name: "answer",
              title: "Respuesta",
              type: "object",
              fields: [
                defineField({ name: "es", title: "Español", type: "text", rows: 3, validation: (r) => r.required() }),
                defineField({ name: "en", title: "Inglés", type: "text", rows: 3 }),
                defineField({ name: "fr", title: "Francés", type: "text", rows: 3 }),
              ],
            }),
          ],
          preview: { select: { title: "question.es" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) {
      const found = INSTITUTIONAL_PAGES.find((p) => p.value === title);
      return { title: found?.title || title };
    },
  },
});
