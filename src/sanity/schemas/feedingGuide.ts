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

    // ── Segunda tabla (opcional): madre en gestación / lactancia ──
    // Tabla con columnas agrupadas, ej. Peso Gata × Gestación[≤sem6, sem7-9] × Lactación[1-2, 3-4],
    // cada subcolumna con su propio valor en gramos/día y tazas/día.
    defineField({
      name: "secondaryTitle",
      title: "Título de la segunda tabla (opcional)",
      type: "object",
      description:
        'Solo para productos que requieren una guía adicional, ej. la madre durante gestación y lactancia. Ej. "Consumo de alimento"',
      fields: [
        defineField({ name: "es", title: "Español", type: "string" }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    defineField({
      name: "secondaryWeightColumnLabel",
      title: "Título de la columna de peso (opcional)",
      type: "object",
      description: 'Ej. "Peso Gata (kg)". Si se deja vacío se usa un texto por defecto.',
      fields: [
        defineField({ name: "es", title: "Español", type: "string" }),
        defineField({ name: "en", title: "Inglés", type: "string" }),
        defineField({ name: "fr", title: "Francés", type: "string" }),
      ],
    }),

    defineField({
      name: "secondaryColumnGroups",
      title: "Grupos de columnas de la segunda tabla",
      type: "array",
      description:
        'Cada grupo es un encabezado que agrupa subcolumnas. Ej. grupo "Gestación" con subcolumnas "Hasta semana 6" y "Semana 7 a 9".',
      of: [
        {
          type: "object",
          name: "columnGroup",
          title: "Grupo de columnas",
          fields: [
            defineField({
              name: "label",
              title: "Título del grupo",
              type: "object",
              description: 'Ej. "Gestación", "Lactación"',
              fields: [
                defineField({ name: "es", title: "Español", type: "string" }),
                defineField({ name: "en", title: "Inglés", type: "string" }),
                defineField({ name: "fr", title: "Francés", type: "string" }),
              ],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subColumns",
              title: "Subcolumnas",
              type: "array",
              description:
                'Ej. "Hasta semana 6", "Semana 7 a 9" o "1 a 2 gatitos", "3 a 4 gatitos"',
              validation: (r) => r.required().min(1),
              of: [
                {
                  type: "object",
                  name: "subColumn",
                  title: "Subcolumna",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Título de la subcolumna",
                      type: "object",
                      fields: [
                        defineField({ name: "es", title: "Español", type: "string" }),
                        defineField({ name: "en", title: "Inglés", type: "string" }),
                        defineField({ name: "fr", title: "Francés", type: "string" }),
                      ],
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "label.es" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label.es", subColumns: "subColumns" },
            prepare({ title, subColumns }) {
              const count = Array.isArray(subColumns) ? subColumns.length : 0;
              return {
                title: (title as string) ?? "Grupo sin título",
                subtitle: `${count} subcolumna(s)`,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "secondaryTableRows",
      title: "Filas de la segunda tabla",
      type: "array",
      description:
        "Cada fila representa un peso (ej. de la madre) con un valor de g/día y tazas/día por cada subcolumna definida arriba, en el mismo orden.",
      of: [
        {
          type: "object",
          name: "tableRow",
          title: "Fila",
          fields: [
            defineField({
              name: "weightLabel",
              title: "Peso / etiqueta de fila",
              type: "string",
              description: 'Ej. "1", "2", "Hasta 2 kg"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "values",
              title: "Valores (uno por subcolumna, en el mismo orden que arriba)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "cellValue",
                  title: "Valor",
                  fields: [
                    defineField({
                      name: "grams",
                      title: "g/día",
                      type: "string",
                      description: 'Ej. "40"',
                    }),
                    defineField({
                      name: "cups",
                      title: "Tazas/día",
                      type: "string",
                      description: 'Ej. "2/5"',
                    }),
                  ],
                  preview: {
                    select: { grams: "grams", cups: "cups" },
                    prepare({ grams, cups }) {
                      return { title: `${grams ?? "—"} g · ${cups ?? "—"} tazas` };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "weightLabel" },
            prepare({ title }) {
              return { title: `Peso: ${title ?? "—"}` };
            },
          },
        },
      ],
    }),

    defineField({
      name: "secondaryNotes",
      title: "Notas adicionales de la segunda tabla (opcional)",
      type: "object",
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
