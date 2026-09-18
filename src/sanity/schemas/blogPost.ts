import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Artículo de blog",
  type: "document",
  description:
    "Schema preparado para cuando se implemente /blog. Aún no tiene rutas Next.js conectadas.",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Segmento final de la URL: /blog/[slug]",
      options: { source: "title.es", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "object",
      description: "Texto corto usado en listados de blog",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 2 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 2 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "object",
      fields: [
        defineField({ name: "es", title: "Español", type: "array", of: [{ type: "block" }, { type: "image" }] }),
        defineField({ name: "en", title: "Inglés", type: "array", of: [{ type: "block" }, { type: "image" }] }),
        defineField({ name: "fr", title: "Francés", type: "array", of: [{ type: "block" }, { type: "image" }] }),
      ],
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "object",
      description: "Datos del autor, usados en Article JSON-LD (autoría/E-E-A-T) y AEO.",
      fields: [
        defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", title: "Cargo / credenciales", type: "string" }),
        defineField({ name: "image", title: "Foto", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Fecha de actualización",
      type: "datetime",
      description: "Opcional. Úsalo si el artículo se edita después de publicado (dateModified en Article JSON-LD).",
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
    defineField({
      name: "isPublished",
      title: "Publicado",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title.es", media: "mainImage", publishedAt: "publishedAt" },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString("es-MX") : "Sin publicar",
        media,
      };
    },
  },
});
