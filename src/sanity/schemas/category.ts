import { defineField, defineType } from "sanity";

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
      options: { source: "name.es", maxLength: 96 },
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
      name: "order",
      title: "Orden en navegación",
      type: "number",
      description: "Número menor aparece primero",
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
