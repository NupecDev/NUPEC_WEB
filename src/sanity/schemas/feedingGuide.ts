import { defineField, defineType } from "sanity";

export default defineType({
  name: "feedingGuide",
  title: "Guía de Alimentación",
  type: "document",
  fields: [
    defineField({
      name: "product",
      title: "Producto",
      type: "reference",
      to: [{ type: "product" }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "rows",
      title: "Tabla de alimentación",
      type: "array",
      description:
        "Cada fila representa un rango de peso corporal con la cantidad diaria recomendada",
      of: [
        {
          type: "object",
          name: "row",
          title: "Fila",
          fields: [
            defineField({
              name: "label",
              title: "Etiqueta (opcional)",
              type: "string",
              description: 'Ej. "Cachorros 2–4 meses", "Gestación / Lactancia"',
            }),
            defineField({
              name: "weightRange",
              title: "Rango de peso",
              type: "string",
              description: 'Ej. "2–5 kg", "Hasta 2 kg", "Más de 40 kg"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "dailyAmount",
              title: "Cantidad diaria",
              type: "string",
              description: 'Ej. "45–90 g", "1/4–1/2 taza"',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "weightRange", subtitle: "dailyAmount" },
          },
        },
      ],
    }),

    defineField({
      name: "notes",
      title: "Notas adicionales",
      type: "object",
      description:
        "Instrucciones complementarias: transición, agua, ajuste por actividad, etc.",
      fields: [
        defineField({ name: "es", title: "Español", type: "text", rows: 4 }),
        defineField({ name: "en", title: "Inglés", type: "text", rows: 4 }),
        defineField({ name: "fr", title: "Francés", type: "text", rows: 4 }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "product.name.es",
      subtitle: "product.species",
    },
    prepare({ title, subtitle }) {
      return {
        title: (title as string) ?? "Sin producto",
        subtitle: (subtitle as string) === "canino" ? "Canino" : "Felino",
      };
    },
  },
});
