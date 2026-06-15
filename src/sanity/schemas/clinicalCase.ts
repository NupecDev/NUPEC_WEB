import { defineField, defineType } from "sanity";

export default defineType({
  name: "clinicalCase",
  title: "Caso Clínico",
  type: "document",

  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "resultado", title: "Resultado clínico" },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Título del caso",
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
      options: { source: "title.es", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    // Datos del paciente
    defineField({
      name: "patient",
      title: "Datos del paciente",
      type: "object",
      group: "contenido",
      fields: [
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
        defineField({ name: "breed", title: "Raza", type: "string" }),
        defineField({ name: "age", title: "Edad", type: "string", description: 'Ej. "3 años", "6 meses"' }),
        defineField({ name: "weight", title: "Peso", type: "string", description: 'Ej. "12 kg"' }),
        defineField({ name: "sex", title: "Sexo", type: "string", options: { list: ["Macho", "Hembra"], layout: "radio" } }),
      ],
    }),

    // Diagnóstico
    defineField({
      name: "diagnosis",
      title: "Diagnóstico / Condición",
      type: "object",
      group: "contenido",
      fields: [
        defineField({ name: "es", title: "Español", type: "string", validation: (r) => r.required() }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    // Historia clínica resumida
    defineField({
      name: "history",
      title: "Historia clínica",
      type: "object",
      group: "contenido",
      fields: [
        defineField({ name: "es", title: "Español", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "en", title: "Inglés", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "fr", title: "Francés", type: "array", of: [{ type: "block" }] }),
      ],
    }),

    // Intervención nutricional
    defineField({
      name: "intervention",
      title: "Intervención nutricional",
      type: "object",
      group: "resultado",
      fields: [
        defineField({ name: "es", title: "Español", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "en", title: "Inglés", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "fr", title: "Francés", type: "array", of: [{ type: "block" }] }),
      ],
    }),

    // Duración del tratamiento
    defineField({
      name: "duration",
      title: "Duración del tratamiento",
      type: "object",
      group: "resultado",
      fields: [
        defineField({ name: "es", title: "Español", type: "string" }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    // Resultado clínico
    defineField({
      name: "outcome",
      title: "Resultado clínico",
      type: "object",
      group: "resultado",
      fields: [
        defineField({ name: "es", title: "Español", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "en", title: "Inglés", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "fr", title: "Francés", type: "array", of: [{ type: "block" }] }),
      ],
    }),

    // Métricas del resultado (ej. mejora de valores hepáticos)
    defineField({
      name: "metrics",
      title: "Métricas de mejora",
      type: "array",
      group: "resultado",
      description: "Pares etiqueta/valor que se muestran como chips (ej. ALT: ↓62%, Peso: +0.5 kg)",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "label", title: "Etiqueta", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", title: "Valor", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "trend",
              title: "Tendencia",
              type: "string",
              options: { list: [{ title: "Mejora ↑", value: "up" }, { title: "Reducción ↓", value: "down" }, { title: "Neutro", value: "neutral" }], layout: "radio" },
              initialValue: "neutral",
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),

    // Referencia al veterinario / institución
    defineField({
      name: "author",
      title: "Veterinario / Institución",
      type: "object",
      group: "resultado",
      fields: [
        defineField({ name: "name", title: "Nombre", type: "string" }),
        defineField({ name: "title", title: "Título / Especialidad", type: "string" }),
        defineField({ name: "institution", title: "Institución", type: "string" }),
      ],
    }),

    // Productos NUPEC usados
    defineField({
      name: "products",
      title: "Productos NUPEC utilizados",
      type: "array",
      group: "resultado",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),

    defineField({
      name: "isPublished",
      title: "Publicado",
      type: "boolean",
      group: "contenido",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title.es",
      subtitle: "diagnosis.es",
    },
  },
});
