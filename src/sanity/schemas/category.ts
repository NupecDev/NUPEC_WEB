import { defineField, defineType } from "sanity";
import type { SlugIsUniqueValidator } from "sanity";

const isSlugUniquePerSpecies: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2023-01-01" });
  const id = document?._id.replace(/^drafts\./, "");
  const species = document?.species;

  const params = { draft: `drafts.${id}`, published: id, slug, species };
  const query = `!defined(*[
    _type == "category" &&
    !(_id in [$draft, $published]) &&
    species == $species &&
    slug.current == $slug
  ][0]._id)`;

  return await client.fetch(query, params);
};

export default defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "object",
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
      description:
        "Segmento de URL: /nutricion-canina/[slug] — debe coincidir con la ruta Next.js",
      options: {
        source: "name.es",
        maxLength: 96,
        isUnique: isSlugUniquePerSpecies,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "species",
      title: "Especie",
      type: "string",
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
      name: "description",
      title: "Descripción",
      type: "object",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 3 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 3 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "object",
      description: "Texto corto que aparece en listados y cards de categoría",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 2 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 2 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "familyImage",
      title: "Imagen familia de productos",
      type: "image",
      description: "Foto grupal de todos los productos de esta categoría (usada en la sección introductoria de la línea)",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "bannerImage",
      title: "Imagen de fondo del banner",
      type: "image",
      description: "Imagen de fondo del hero de esta categoría. Formato paisaje recomendado (1920×600 px).",
      options: { hotspot: true },
    }),
    defineField({
      name: "complementaryText",
      title: "Texto complementario",
      type: "object",
      description: "Párrafo adicional que acompaña la introducción a la categoría",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 4 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 4 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "order",
      title: "Orden en navegación",
      type: "number",
      description: "Número menor aparece primero",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta título",
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
      description: "Preguntas y respuestas que se muestran en la página y se exponen como datos estructurados FAQPage (mejora respuestas en ChatGPT, Perplexity, AI Overviews).",
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
    defineField({
      name: "stats",
      title: "Datos destacados",
      type: "array",
      description:
        "Cifras destacadas de esta categoría (ej. fórmulas, digestibilidad, estudios clínicos). Se usan en el banner y en la sección introductoria. Puedes agregar las que necesites.",
      of: [
        defineField({
          name: "stat",
          title: "Dato destacado",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Valor",
              type: "string",
              description: "Ej. 12, 91%, +10",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Etiqueta",
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
              description: "Texto breve opcional (usado en la sección introductoria)",
              fields: [
                defineField({ name: "es", title: "Español", type: "string" }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { value: "value", label: "label.es" },
            prepare({ value, label }) {
              return { title: `${value} — ${label}` };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.es",
      subtitle: "species",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === "canino" ? "Canino" : "Felino",
      };
    },
  },
  orderings: [
    {
      title: "Especie + Orden",
      name: "speciesOrder",
      by: [
        { field: "species", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
