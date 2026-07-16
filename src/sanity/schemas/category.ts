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
