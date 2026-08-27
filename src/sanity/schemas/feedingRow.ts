import { defineField, defineType } from "sanity";

export default defineType({
  name: "feedingRow",
  title: "Fila de alimentación",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Etiqueta (opcional)",
      type: "string",
      description: 'Ej. "Cachorros 2–4 meses", "Gestación / Lactancia"',
    }),
    defineField({
      name: "weightRange",
      title: "Rango de peso (texto)",
      type: "string",
      description: 'Ej. "2–5 kg", "Hasta 2 kg", "Más de 40 kg"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dailyAmount",
      title: "Cantidad diaria (texto)",
      type: "string",
      description: 'Ej. "45–90 g", "1/4–1/2 taza"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "weightMin",
      title: "Peso mínimo (kg)",
      type: "number",
      description:
        "Opcional. Necesario junto a los demás campos numéricos para que la calculadora interpole la ración según el peso exacto.",
    }),
    defineField({
      name: "weightMax",
      title: "Peso máximo (kg)",
      type: "number",
      description: 'Para el último rango abierto (ej. "Más de 40 kg") deja este campo vacío.',
    }),
    defineField({
      name: "amountMin",
      title: "Ración mínima (g/día)",
      type: "number",
    }),
    defineField({
      name: "amountMax",
      title: "Ración máxima (g/día)",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "weightRange", subtitle: "dailyAmount" },
  },
});
