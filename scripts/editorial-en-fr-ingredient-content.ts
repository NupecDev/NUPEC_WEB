/**
 * NUPEC – Contenido EN/FR (traducción adaptada, no literal) de ingredient.ts.
 *
 * Ámbito: 2 ingredientes publicados (Colina, Silimarina). Excluye a
 * propósito `drafts.dd2f4b1b-4330-45d4-a217-b4679ee516d7` (Taurina, sin
 * publicar — fuera del alcance de este trabajo, decisión del usuario).
 *
 * `studies` y `badges` están vacíos (null) en ambos documentos — no hay
 * nada que traducir ahí.
 *
 * Nota relacionada: los 2 documentos existentes de `clinicalCase.ts` eran
 * contenido demo/placeholder (no casos reales) — se marcaron
 * `isPublished: false` en Sanity y quedaron fuera de este lote de
 * traducción (decisión del usuario, ver scripts/README-traduccion-editorial.md).
 *
 * Consumido por scripts/patch-editorial-en-fr-ingredient.ts.
 */

type LangText = { en: string; fr: string };

type KeyPointPatch = {
  key: string;
  text: LangText;
};

type IngredientContentPatch = {
  id: string;
  name: string; // solo para logs, no se escribe a Sanity
  nameField?: LangText; // el campo `name` del ingrediente (distinto del label de log)
  eyebrow?: LangText;
  summary?: LangText;
  keyPoints?: KeyPointPatch[];
};

export const INGREDIENT_CONTENT_PATCHES: IngredientContentPatch[] = [
  {
    id: "a8db2876-b23a-405f-90b2-3901aee3a8ac",
    name: "Colina",
    nameField: { en: "Choline", fr: "Choline" },
    eyebrow: {
      en: "Helps prevent fat accumulation in the liver",
      fr: "Aide à prévenir l'accumulation de graisse dans le foie",
    },
    summary: {
      en: "Choline (known as vitamin B4) is used in veterinary nutrition mainly as a feed additive. It helps optimize liver function, prevents fat accumulation in the liver, and improves performance and growth in poultry, swine, and dairy cattle. In companion animals (dogs and cats), it supports cognitive and liver health.",
      fr: "La choline (connue comme vitamine B4) est utilisée en nutrition vétérinaire principalement comme additif alimentaire. Elle aide à optimiser la fonction hépatique, prévient l'accumulation de graisse dans le foie et améliore la performance et la croissance chez les volailles, les porcs et le bétail laitier. Chez les animaux de compagnie (chiens et chats), elle soutient la santé cognitive et hépatique.",
    },
    keyPoints: [
      {
        key: "0b6faa1d9bd2",
        text: {
          en: "Dogs and Cats: Included in liver-protective supplements or diets to support fat metabolism and maintain brain function in senior pets.",
          fr: "Chiens et Chats : Inclus dans des compléments hépatoprotecteurs ou des diètes pour favoriser le métabolisme des graisses et maintenir les fonctions cérébrales chez les animaux seniors.",
        },
      },
    ],
  },
  {
    id: "e1d6dcba-8147-4686-a380-db2e3d75297b",
    name: "Silimarina",
    nameField: { en: "Silymarin", fr: "Silymarine" },
    eyebrow: {
      en: "Natural antioxidant and liver protectant.",
      fr: "Antioxydant et hépatoprotecteur naturel.",
    },
    summary: {
      en: "Silymarin (milk thistle extract) is a powerful natural antioxidant and liver protectant used in pets. It stimulates liver cell regeneration, neutralizes toxins, and increases glutathione levels. It's frequently prescribed to manage liver conditions or as support during prolonged drug treatments.",
      fr: "La silymarine (extrait de chardon-marie) est un puissant antioxydant et hépatoprotecteur naturel utilisé chez les animaux de compagnie. Elle stimule la régénération cellulaire du foie, neutralise les toxines et augmente les niveaux de glutathion. Elle est fréquemment prescrite pour la prise en charge d'affections hépatiques ou en soutien lors de traitements pharmacologiques prolongés.",
    },
    keyPoints: [
      {
        key: "ca5793f68ad2",
        text: {
          en: "Liver regeneration: Stimulates protein synthesis to replace cells damaged by toxins.",
          fr: "Régénération hépatique : Stimule la synthèse des protéines pour remplacer les cellules endommagées par les toxines.",
        },
      },
      {
        key: "f53148814b09",
        text: {
          en: "Antioxidant: Helps counteract free radicals, being up to ten times more potent than vitamin E.",
          fr: "Antioxydant : Aide à contrer les radicaux libres, jusqu'à dix fois plus puissant que la vitamine E.",
        },
      },
      {
        key: "d80f63d22f68",
        text: {
          en: "Detoxification: Supports toxin elimination and improves bile secretion.",
          fr: "Détoxification : Favorise l'élimination des toxines et améliore la sécrétion biliaire.",
        },
      },
    ],
  },
];
