/**
 * NUPEC – Contenido EN/FR (traducción adaptada, no literal) de los 22
 * productos publicados del lote "nutricion-diaria" + "premios-funcionales"
 * (canino y felino).
 *
 * Fuente del mapeo: otro agente redactó el mapeo completo ES→EN→FR campo
 * por campo (ver mapping-daily-treats-raw.md, PARTE 2). Este archivo lo
 * transcribe a datos TypeScript listos para un patch a Sanity, y completa
 * la única pieza que el mapeo dejó pendiente: `warnings` EN/FR.
 *
 * Campos cubiertos por producto (solo los que faltaban en Sanity):
 * tagline, description (rich text), ingredients, warnings,
 * highTechTitleOverride, y los arrays por _key: highTech (title+description),
 * keyBenefits (description), claims (text).
 *
 * Sigue el mismo patrón de tipos que scripts/editorial-en-fr-category-content.ts
 * y se consume con la lógica de merge por _key de scripts/patch-seo-en-fr.ts.
 *
 * Reglas de contenido:
 * - Traducción adaptada, no literal (EN mercado US, FR mercado francófono)
 * - Nunca se toca el campo `es`
 * - Solo se incluyen campos/sub-items realmente faltantes en Sanity
 *
 * DECISIONES ESPECIALES TOMADAS EN ESTE LOTE (ver instrucciones del encargo):
 * 1. `warnings` SÍ se tradujeron en este lote (eran la única pieza pendiente
 *    del mapeo fuente). Se generaron EN/FR fieles y directos, mismo registro
 *    que el resto del contenido, para los 6 productos confirmados con
 *    `warnings.es` no vacío y en/fr ausentes: product-canino-adulto-razas-mini,
 *    product-canino-cachorro-razas-mini, product-canino-cachorro-razas-pequenas,
 *    product-canino-senior-razas-mini, product-canino-senior-razas-pequenas,
 *    product-felino-felino-indoor. Se releyó el JSON fuente para confirmar el
 *    texto ES exacto de cada uno (incluye variaciones de orden, espacios y
 *    comillas entre productos) y se verificó que ningún otro de los 22
 *    productos tuviera este mismo patrón pendiente.
 * 2. `product-canino-senior`: el usuario ya corrigió manualmente `ingredients`
 *    en Sanity (ya no tiene el error de texto en francés bajo la key "en").
 *    No requiere ninguna acción — no aparece en este archivo.
 * 3. `product-felino-creamy-treats-joint-care`: el usuario corrigió
 *    manualmente `description.es` en Sanity (ahora habla de salmón/articulaciones).
 *    Se descartó el mapeo EN/FR de `description` hecho sobre el ES viejo/incorrecto
 *    del archivo fuente, y en su lugar se tradujo aquí el ES nuevo confirmado
 *    ("Premio cremoso a base de lomo de salmón... Sin conservadores,
 *    saborizantes artificiales ni carragenina").
 * 4. `product-felino-felino-indoor`, highTech item `86932af1374d` (Yucca
 *    schidigera): se descartó la propuesta anterior de "beneficio funcional
 *    genérico inventado" en description. El usuario ya reemplazó
 *    manualmente description.es por "Reduce la presencia de malos olores en
 *    las heces.", y aquí se traduce fielmente ese texto nuevo a EN/FR
 *    (title se mantiene como nombre de ingrediente, sin cambios de sentido).
 */

type LangText = { en: string; fr: string };

type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: string;
  markDefs: unknown[];
  children: PortableTextSpan[];
};

type HighTechPatch = {
  key: string;
  title?: LangText;
  description?: LangText;
};

type KeyBenefitPatch = {
  key: string;
  description: LangText;
};

type ClaimPatch = {
  key: string;
  text: LangText;
};

type ProductContentPatch = {
  id: string;
  name: string; // solo para logs, no se escribe a Sanity
  tagline?: LangText;
  description?: { en: PortableTextBlock[]; fr: PortableTextBlock[] };
  ingredients?: LangText;
  warnings?: LangText;
  highTechTitleOverride?: LangText;
  highTech?: HighTechPatch[];
  keyBenefits?: KeyBenefitPatch[];
  claims?: ClaimPatch[];
  kibbleDescription?: LangText;
};

export const PRODUCT_CONTENT_PATCHES: ProductContentPatch[] = [
  // ── 1. Adulto (canino) ──────────────────────────────────────────
  {
    id: "94543c98-c670-466e-82cd-aa62c446a963",
    name: "Adulto (canino)",
    highTech: [
      {
        key: "bff37188ae8a",
        title: {
          en: "HIGH DIGESTIBILITY",
          fr: "HAUTE DIGESTIBILITÉ",
        },
        description: {
          en: "Nutritional balance between proteins, fats, carbohydrates, vitamins and minerals, ingredients of the highest quality and high-tech processes that guarantee maximum nutritional use.",
          fr: "Un équilibre nutritionnel entre protéines, lipides, glucides, vitamines et minéraux, des ingrédients de la plus haute qualité et des procédés de pointe garantissant une assimilation nutritionnelle optimale.",
        },
      },
      {
        key: "978e06d3fcb3",
        description: {
          en: "Essential for protein and nucleic acid synthesis, which are key to a dog's immune health.",
          fr: "Essentiel à la synthèse des protéines et des acides nucléiques, éléments clés de l'immunité du chien.",
        },
      },
      {
        key: "9bdee3e26fc4",
        title: {
          en: "NATURAL PRESERVATIVES",
          fr: "CONSERVATEURS NATURELS",
        },
        description: {
          en: "A blend of rosemary and tocopherols that keeps every kibble fresh, thanks to antioxidant properties that protect the food from oxidation.",
          fr: "Un mélange de romarin et de tocophérols qui garantit la fraîcheur de chaque croquette, grâce à ses propriétés antioxydantes qui protègent l'aliment de l'oxydation.",
        },
      },
    ],
  },

  // ── 2. Adulto Razas Mini (canino) ──────────────────────────────
  {
    id: "product-canino-adulto-razas-mini",
    name: "Adulto Razas Mini",
    tagline: {
      en: "Specialized nutrition for mini breeds",
      fr: "Une nutrition spécialisée pour les races miniatures",
    },
    description: {
      en: [
        {
          _key: "e1a2b3c4d5e6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e1a2b3c4d5e7",
              _type: "span",
              marks: [],
              text: "Mini-breed dogs can be prone to nervousness, which is why NUPECMR MINI BREEDS contains ",
            },
            {
              _key: "e1a2b3c4d5e8",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "e1a2b3c4d5e9",
              _type: "span",
              marks: [],
              text: ", which can help reduce stress. Mini breeds tend to live longer than large breeds, which puts extra demands on their small bodies, so they need specialized nutrition to stay active and healthy for longer. Mini dogs also have a small mouth, so they need a kibble shape and size designed for easy, proper chewing.\n\nAsk your veterinarian to help determine the right diet.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f1a2b3c4d5e6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f1a2b3c4d5e7",
              _type: "span",
              marks: [],
              text: "Les chiens de petite taille peuvent avoir tendance à être nerveux ; c'est pourquoi NUPECMR RACES MINI contient de la ",
            },
            {
              _key: "f1a2b3c4d5e8",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "f1a2b3c4d5e9",
              _type: "span",
              marks: [],
              text: ", qui peut les aider à réduire le stress. Les chiens de race miniature ont une espérance de vie plus longue que les chiens de grande taille, ce qui représente un défi pour leur petit organisme : ils ont donc besoin d'une nutrition spécialisée pour rester actifs et en bonne santé plus longtemps. Les chiens mini ont également une petite gueule, ils ont donc besoin d'une croquette conçue pour faciliter une bonne mastication.\n\nConsultez votre vétérinaire pour déterminer le régime alimentaire adapté.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, lamb meal, chicken meal, chicken fat, wheat, wheat gluten, soybean concentrate, beet pulp, fish meal, natural chicken flavor, oats, fish oil, sodium, potassium, choline chloride, fructooligosaccharides, taurine, lysine, sodium hexametaphosphate, Curcuma longa, Eugenia caryophyllus, vitamin A supplement, cholecalciferol, DL-alpha-tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Passiflora incarnata extract, undenatured type II collagen, L-carnitine, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine d'agneau, farine de poulet, graisse de poulet, blé, gluten de blé, concentré de soja, pulpe de betterave, farine de poisson, arôme naturel de poulet, avoine, huile de poisson, sodium, potassium, chlorure de choline, fructo-oligosaccharides, taurine, lysine, hexamétaphosphate de sodium, Curcuma longa, Eugenia caryophyllus, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite sodique de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Passiflora incarnata, collagène non dénaturé de type II, L-carnitine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Keep in a cool, dry place.\nProvide your pet with fresh water at all times.\nDo not offer this product if its appearance changes.\nThe use of this product in ruminant feed is prohibited.\n“CONSULT YOUR VETERINARIAN.”",
      fr: "Conserver dans un endroit frais et sec.\nMettez de l'eau fraîche à disposition de votre animal.\nNe proposez pas ce produit si son aspect change.\nL'utilisation de ce produit dans l'alimentation des ruminants est interdite.\n« CONSULTEZ VOTRE VÉTÉRINAIRE ».",
    },
    highTech: [
      {
        key: "3aff18be637b",
        title: { en: "DIGESTIBILITY", fr: "DIGESTIBILITÉ" },
        description: {
          en: "Controlled extrusion under international quality standards that promotes maximum nutrient absorption from the formula. Nutritional balance with the perfect blend of proteins, fat, carbohydrates, vitamins, and minerals. Human-grade raw materials.",
          fr: "Une extrusion contrôlée selon des normes de qualité internationales qui favorise une assimilation optimale des nutriments de la formule. Un équilibre nutritionnel avec le parfait mélange de protéines, de matières grasses, de glucides, de vitamines et de minéraux. Des matières premières de qualité consommation humaine.",
        },
      },
      {
        key: "72ae31548992",
        title: {
          en: "NUPECMR QUALITY BENEFITS FOR MINI BREEDS",
          fr: "LES BÉNÉFICES QUALITÉ NUPECMR POUR LES RACES MINI",
        },
        description: {
          en: "Natural antioxidants (a blend of rosemary and tocopherols): protect against free radicals, which cause cell aging and disease.",
          fr: "Antioxydants naturels (mélange de romarin et de tocophérols) : protègent contre les radicaux libres, responsables du vieillissement et des maladies cellulaires.",
        },
      },
      {
        key: "bebb4087449e",
        title: { en: "HIGH PALATABILITY", fr: "HAUTE APPÉTENCE" },
        description: {
          en: "Developed by experts: a unique flavor, aroma, and texture for NUPECMR. Always fresh ingredients, controlled and inspected from the source.",
          fr: "Conçu par des experts : une saveur, un arôme et une texture uniques pour NUPECMR. Des ingrédients toujours frais, contrôlés et inspectés dès leur origine.",
        },
      },
      {
        key: "cc9af1919209",
        title: { en: "ZINC", fr: "ZINC" },
        description: {
          en: "Essential for the synthesis of proteins and nucleic acids (DNA and RNA), playing a key role in reproduction and immunity.",
          fr: "Essentiel à la synthèse des protéines et des acides nucléiques (ADN et ARN), il joue un rôle clé dans la reproduction et l'immunité.",
        },
      },
      {
        key: "1813e6e23994",
        title: { en: "VITAMIN E", fr: "VITAMINE E" },
        description: {
          en: "A natural antioxidant that boosts the immune system's response.",
          fr: "Un antioxydant naturel qui améliore la réponse du système immunitaire.",
        },
      },
      {
        key: "e00e7be3fe58",
        title: { en: "COPPER", fr: "CUIVRE" },
        description: {
          en: "Helps support the natural production of coat pigment. No artificial preservatives or dyes.",
          fr: "Contribue à la production naturelle du pigment du pelage. Sans conservateurs ni colorants artificiels.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "41744645ffb4",
        description: {
          en: "Medicinal plant extracts with antioxidant and immune-boosting properties",
          fr: "Des extraits de plantes médicinales aux propriétés antioxydantes et immunostimulantes",
        },
      },
      {
        key: "ea7f95f52e19",
        description: {
          en: "Lamb protein as the second ingredient",
          fr: "Protéine d'agneau comme deuxième ingrédient",
        },
      },
      {
        key: "4dde791541fa",
        description: {
          en: "Helps manage anxiety and stress",
          fr: "Aide à gérer l'anxiété et le stress",
        },
      },
      {
        key: "14410f95e6ee",
        description: {
          en: "Helps prevent heart disease",
          fr: "Contribue à la prévention des maladies cardiaques",
        },
      },
    ],
  },

  // ── 3. Adulto Razas Pequeñas (canino) ──────────────────────────
  {
    id: "product-canino-adulto-razas-pequenas",
    name: "Adulto Razas Pequeñas",
    tagline: {
      en: "The right energy content for the metabolism of small breeds",
      fr: "Un apport énergétique adapté au métabolisme des petites races",
    },
    description: {
      en: [
        {
          _key: "a2b3c4d5e6f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a2b3c4d5e6f2",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we understand the specific needs of an adult small-breed dog. We know small breeds have smaller teeth, which is why we've designed a kibble with the right shape and texture for easy pickup and chewing. Small-breed dogs tend to be more active, but their digestive tract has a limited capacity, so they need food with the right nutritional and energy density to help maintain their muscle mass and vitality.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b2b3c4d5e6f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b2b3c4d5e6f2",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous connaissons les besoins spécifiques d'un chien adulte de petite race. Nous savons que ses dents sont plus petites, c'est pourquoi nous avons conçu une croquette dont la forme et la texture facilitent la préhension et la mastication. Un chien de petite race est plus actif, mais son tube digestif a une capacité limitée : il a donc besoin d'un aliment à la densité nutritionnelle et énergétique adaptée pour préserver sa masse musculaire et sa vitalité.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Beef meal, rice, corn, chicken meat, vegetable protein concentrate, chicken fat, chicken meal, beet pulp, flaxseed, fish meal, natural chicken flavor, phosphorus, calcium, sodium, chicory root extract, choline chloride, hydrolyzed yeast (Saccharomyces cerevisiae active 10x10¹⁰), retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, EDDI, Yucca schidigera extract, a blend of rosemary and tocopherols as preservatives.",
      fr: "Farine de bœuf, riz, maïs, viande de poulet, concentré de protéines végétales, graisse de poulet, farine de poulet, pulpe de betterave, graines de lin, farine de poisson, arôme naturel de poulet, phosphore, calcium, sodium, extrait de racine de chicorée, chlorure de choline, levure hydrolysée (Saccharomyces cerevisiae activa 10x10¹⁰), acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, EDDI, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    highTech: [
      {
        key: "52fd5eea0a4b",
        title: { en: "HIGH DIGESTIBILITY", fr: "HAUTE DIGESTIBILITÉ" },
        description: {
          en: "A balanced nutritional profile of proteins, fats, carbohydrates, vitamins, and minerals, combined with the highest-quality ingredients and state-of-the-art processes that ensure maximum nutritional benefit.",
          fr: "Un équilibre nutritionnel entre protéines, lipides, glucides, vitamines et minéraux, des ingrédients de la plus haute qualité et des procédés de pointe garantissant une assimilation nutritionnelle optimale.",
        },
      },
      {
        key: "119aa1e7fcc9",
        title: { en: "WITH ZINC", fr: "AU ZINC" },
        description: {
          en: "Essential for the synthesis of proteins and nucleic acids, which are key to canine immunity.",
          fr: "Essentiel à la synthèse des protéines et des acides nucléiques, qui jouent un rôle clé dans l'immunité du chien.",
        },
      },
      {
        key: "3a905c25085f",
        title: {
          en: "HIGH PALATABILITY DEVELOPED BY EXPERTS",
          fr: "HAUTE APPÉTENCE, CONÇUE PAR DES EXPERTS",
        },
        description: {
          en: "Unique flavor, aroma, and texture for NUPECMR. High-vacuum flavor injection ensures a unique and irresistible flavor from the inside out.",
          fr: "Saveur, arôme et texture uniques pour NUPECMR. Injection de l'assaisonnement sous vide poussé, garantissant une saveur unique et irrésistible de l'intérieur vers l'extérieur de la croquette.",
        },
      },
      {
        key: "1e7364187c82",
        title: { en: "NATURAL PRESERVATIVES", fr: "CONSERVATEURS NATURELS" },
        description: {
          en: "A blend of rosemary and tocopherols that keeps every kibble fresh, thanks to antioxidant properties that protect the food from oxidation.",
          fr: "Un mélange de romarin et de tocophérols qui garantit la fraîcheur de chaque croquette, grâce à ses propriétés antioxydantes qui protègent l'aliment de l'oxydation.",
        },
      },
      {
        key: "5363100fe595",
        title: {
          en: "HIGH-QUALITY SOURCE OF PROTEIN",
          fr: "SOURCE DE PROTÉINES DE HAUTE QUALITÉ",
        },
        description: {
          en: "State-of-the-art technology that allows fresh meat to be incorporated directly into the extrusion process. Protein digestibility of over 90%.",
          fr: "Une technologie de pointe qui permet d'intégrer de la viande fraîche directement dans le processus d'extrusion. Une digestibilité des protéines supérieure à 90 %.",
        },
      },
      {
        key: "ff15d3780d57",
        title: { en: "VITAMINS A, B, C, AND E", fr: "VITAMINES A, B, C ET E" },
        description: {
          en: "Support healthy skin and a beautiful coat.",
          fr: "Favorisent une peau saine et un pelage éclatant.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "d3d765c67b09",
        description: {
          en: "Omega-3 and omega-6 for healthy skin and a radiant coat.",
          fr: "Oméga-3 et oméga-6 pour une peau saine et un pelage éclatant.",
        },
      },
      {
        key: "59f5637ec1f3",
        description: {
          en: "Chicory root extract as a prebiotic for excellent digestion.",
          fr: "Extrait de racine de chicorée comme prébiotique pour une excellente digestion.",
        },
      },
      {
        key: "1e0b2453a277",
        description: {
          en: "A balanced amino acid profile for optimal condition",
          fr: "Un équilibre d'acides aminés pour une condition optimale",
        },
      },
    ],
    kibbleDescription: {
      en: "The size and texture of each kibble are specially designed for the jaw and digestive tract of an adult small-breed dog.",
      fr: "La taille et la texture de chaque croquette sont spécialement adaptées à la mâchoire et au système digestif d'un chien adulte de petite race.",
    },
  },

  // ── 4. Cachorro (canino) — solo falta kibble.description ────────
  {
    id: "product-canino-cachorro",
    name: "Cachorro",
    kibbleDescription: {
      en: "The size and texture of each kibble are specially designed for your puppy's developing teeth.",
      fr: "La taille et la texture de chaque croquette sont spécialement adaptées aux dents en développement de votre chiot.",
    },
  },

  // ── 5. Cachorro Razas Mini (canino) ────────────────────────────
  {
    id: "product-canino-cachorro-razas-mini",
    name: "Cachorro Razas Mini",
    tagline: {
      en: "Specialized nutrition for mini breeds",
      fr: "Une nutrition spécialisée pour les races miniatures",
    },
    description: {
      en: [
        {
          _key: "c3d4e5f6a7b1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c3d4e5f6a7b2",
              _type: "span",
              marks: [],
              text: "During the first months of life, puppies experience the world through their senses, which is why it's important for them to have an immune system that protects them from microorganisms that could put their health at risk. Mini-breed dogs can be prone to nervousness, which is why NUPECMR MINI BREEDS contains ",
            },
            {
              _key: "c3d4e5f6a7b3",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "c3d4e5f6a7b4",
              _type: "span",
              marks: [],
              text: ", which can help reduce stress. Mini dogs also have a small mouth, so they need a kibble shape and size designed for easy, proper chewing.\n\nAsk your veterinarian to help determine the right diet.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d3d4e5f6a7b1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d3d4e5f6a7b2",
              _type: "span",
              marks: [],
              text: "Durant les premiers mois de sa vie, le chiot découvre le monde à travers ses sens ; il est donc important qu'il dispose d'un système immunitaire capable de le protéger des micro-organismes qui pourraient mettre sa santé en danger. Les chiens de petite taille peuvent avoir tendance à être nerveux ; c'est pourquoi NUPECMR RACES MINI contient de la ",
            },
            {
              _key: "d3d4e5f6a7b3",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "d3d4e5f6a7b4",
              _type: "span",
              marks: [],
              text: ", qui peut l'aider à réduire le stress. Les chiens mini ont également une petite gueule, ils ont donc besoin d'une croquette conçue pour faciliter une bonne mastication.\n\nConsultez votre vétérinaire pour déterminer le régime alimentaire adapté.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, chicken meal, lamb meal, chicken fat, wheat, wheat gluten, soybean concentrate, beet pulp, fish meal, natural chicken flavor, oats, fish oil, sodium, potassium, choline chloride, fructooligosaccharides, taurine, lysine, Curcuma longa, Eugenia caryophyllus, vitamin A supplement, cholecalciferol, DL-alpha-tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Passiflora incarnata extract, undenatured type II collagen, L-carnitine, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de poulet, farine d'agneau, graisse de poulet, blé, gluten de blé, concentré de soja, pulpe de betterave, farine de poisson, arôme naturel de poulet, avoine, huile de poisson, sodium, potassium, chlorure de choline, fructo-oligosaccharides, taurine, lysine, Curcuma longa, Eugenia caryophyllus, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite sodique de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Passiflora incarnata, collagène non dénaturé de type II, L-carnitine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Keep in a cool, dry place.\nProvide your pet with fresh water at all times.\nDo not offer this product if its appearance changes.\nThe use of this product in ruminant feed is prohibited.\n“CONSULT YOUR VETERINARIAN.”",
      fr: "Conserver dans un endroit frais et sec.\nMettez de l'eau fraîche à disposition de votre animal.\nNe proposez pas ce produit si son aspect change.\nL'utilisation de ce produit dans l'alimentation des ruminants est interdite.\n« CONSULTEZ VOTRE VÉTÉRINAIRE ».",
    },
    highTech: [
      {
        key: "e236882b2d7f",
        title: { en: "DIGESTIBILITY", fr: "DIGESTIBILITÉ" },
        description: {
          en: "Controlled extrusion under international quality standards that promotes maximum nutrient absorption from the formula. Nutritional balance with the perfect blend of proteins, fat, carbohydrates, vitamins, and minerals. Human-grade raw materials.",
          fr: "Une extrusion contrôlée selon des normes de qualité internationales qui favorise une assimilation optimale des nutriments de la formule. Un équilibre nutritionnel avec le parfait mélange de protéines, de matières grasses, de glucides, de vitamines et de minéraux. Des matières premières de qualité consommation humaine.",
        },
      },
      {
        key: "cebc07c31dc8",
        title: {
          en: "NUPECMR QUALITY BENEFITS FOR MINI BREEDS",
          fr: "LES BÉNÉFICES QUALITÉ NUPECMR POUR LES RACES MINI",
        },
        description: {
          en: "Natural antioxidants (a blend of rosemary and tocopherols): protect against free radicals, which cause cell aging and disease.",
          fr: "Antioxydants naturels (mélange de romarin et de tocophérols) : protègent contre les radicaux libres, responsables du vieillissement et des maladies cellulaires.",
        },
      },
      {
        key: "301756107cd0",
        title: { en: "HIGH PALATABILITY", fr: "HAUTE APPÉTENCE" },
        description: {
          en: "Developed by experts: a unique flavor, aroma, and texture for NUPECMR. Always fresh ingredients, controlled and inspected from the source.",
          fr: "Conçu par des experts : une saveur, un arôme et une texture uniques pour NUPECMR. Des ingrédients toujours frais, contrôlés et inspectés dès leur origine.",
        },
      },
      {
        key: "36dc62e3cd88",
        title: { en: "ZINC", fr: "ZINC" },
        description: {
          en: "Essential for the synthesis of proteins and nucleic acids (DNA and RNA), playing a key role in reproduction and immunity.",
          fr: "Essentiel à la synthèse des protéines et des acides nucléiques (ADN et ARN), il joue un rôle clé dans la reproduction et l'immunité.",
        },
      },
      {
        key: "1246e897acb5",
        title: { en: "VITAMIN E", fr: "VITAMINE E" },
        description: {
          en: "A natural antioxidant that boosts the immune system's response.",
          fr: "Un antioxydant naturel qui améliore la réponse du système immunitaire.",
        },
      },
      {
        key: "73b269483c25",
        title: { en: "COPPER", fr: "CUIVRE" },
        description: {
          en: "Helps support the natural production of coat pigment. No artificial preservatives or dyes.",
          fr: "Contribue à la production naturelle du pigment du pelage. Sans conservateurs ni colorants artificiels.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "38a4fd724faa",
        description: {
          en: "Medicinal plant extracts with immune-boosting properties",
          fr: "Des extraits de plantes médicinales aux propriétés immunostimulantes",
        },
      },
      {
        key: "a406e6cdd083",
        description: {
          en: "Collagen for optimal joint development",
          fr: "Du collagène pour un développement articulaire optimal",
        },
      },
      {
        key: "d0080e92249c",
        description: {
          en: "Vitamin E and selenium to support healthy immune system development",
          fr: "Vitamine E et sélénium pour un développement adéquat du système immunitaire",
        },
      },
      {
        key: "ad926d3e0130",
        description: {
          en: "Lamb protein as the third ingredient",
          fr: "Protéine d'agneau comme troisième ingrédient",
        },
      },
    ],
  },

  // ── 6. Cachorro Razas Pequeñas (canino) ────────────────────────
  {
    id: "product-canino-cachorro-razas-pequenas",
    name: "Cachorro Razas Pequeñas",
    tagline: {
      en: "The right nutritional balance for the optimal development of your small-breed puppy",
      fr: "Un équilibre nutritionnel adapté pour le développement optimal de votre chiot de petite race",
    },
    description: {
      en: [
        {
          _key: "e4d5f6a7b8c1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e4d5f6a7b8c2",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that small-breed puppies reach adulthood faster (in about 7 to 12 months) and have a digestive tract with limited capacity. That's why we've designed a food with the nutritional and energy density that helps maximize the growth that will shape their quality of life as adults.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f4d5f6a7b8c1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f4d5f6a7b8c2",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons qu'un chiot de petite race atteint l'âge adulte plus rapidement (entre 7 et 12 mois) et que son tube digestif a une capacité limitée. C'est pourquoi nous avons conçu un aliment à la densité nutritionnelle et énergétique adaptée pour optimiser sa croissance, une étape clé qui déterminera sa qualité de vie à l'âge adulte.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Beef meal, rice, corn, chicken meat, chicken meal, vegetable protein concentrate, chicken fat, beet pulp, flaxseed, fish meal, natural chicken flavor, phosphorus, calcium, sodium, chicory root extract, choline chloride, hydrolyzed yeast (Saccharomyces cerevisiae active 10x10¹⁰), lysine, retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, EDDI, Yucca schidigera extract, a blend of rosemary and tocopherols as preservatives.",
      fr: "Farine de bœuf, riz, maïs, viande de poulet, farine de poulet, concentré de protéines végétales, graisse de poulet, pulpe de betterave, graines de lin, farine de poisson, arôme naturel de poulet, phosphore, calcium, sodium, extrait de racine de chicorée, chlorure de choline, levure hydrolysée (Saccharomyces cerevisiae active 10x10¹⁰), lysine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, EDDI, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Keep in a cool, dry place.\nAlways provide clean, fresh water. Do not offer this product if its appearance changes. The use of this product in ruminant feed is prohibited.",
      fr: "Conserver dans un endroit frais et sec.\nMettez toujours de l'eau propre et fraîche à disposition. Ne proposez pas ce produit si son aspect change. L'utilisation de ce produit dans l'alimentation des ruminants est interdite.",
    },
    keyBenefits: [
      {
        key: "b4dd9f74bf85",
        description: {
          en: "Omega-3 and omega-6 to protect skin and coat.",
          fr: "Oméga-3 et oméga-6 pour la protection de la peau et du pelage.",
        },
      },
      {
        key: "0a57ac557864",
        description: {
          en: "A balanced mineral profile for strong bone and teeth development.",
          fr: "Un équilibre minéral pour le développement d'os et de dents solides.",
        },
      },
      {
        key: "8017033cee11",
        description: {
          en: "Vitamin E and selenium to strengthen the immune system.",
          fr: "Vitamine E et sélénium pour renforcer le système immunitaire.",
        },
      },
    ],
    kibbleDescription: {
      en: "The size and texture of each kibble are specially designed for your puppy's developing teeth.",
      fr: "La taille et la texture de chaque croquette sont spécialement adaptées aux dents en développement de votre chiot.",
    },
  },

  // ── 7. Senior Razas Mini (canino) ──────────────────────────────
  {
    id: "product-canino-senior-razas-mini",
    name: "Senior Razas Mini",
    tagline: {
      en: "Specialized nutrition for mini breeds",
      fr: "Une nutrition spécialisée pour les races miniatures",
    },
    description: {
      en: [
        {
          _key: "a5b6c7d8e9f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a5b6c7d8e9f2",
              _type: "span",
              marks: [],
              text: "Mini-breed dogs tend to live longer than medium or large breeds, so we've included natural immune boosters and antioxidants in their diet. They can also be prone to nervousness, which is why NUPECMR SENIOR MINI BREEDS contains ",
            },
            {
              _key: "a5b6c7d8e9f3",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "a5b6c7d8e9f4",
              _type: "span",
              marks: [],
              text: ", which can help reduce stress. Supplemented with type II collagen, which helps prevent the development of joint disease*.\n\n*Canine Dilated Cardiomyopathy caused by taurine deficiency.\n\nAsk your veterinarian to help determine the right diet.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b5b6c7d8e9f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b5b6c7d8e9f2",
              _type: "span",
              marks: [],
              text: "Un chien de petite taille vit généralement plus longtemps qu'un chien de race moyenne ou grande, c'est pourquoi nous intégrons à son alimentation des immunostimulants et des antioxydants naturels. Il peut également avoir tendance à être nerveux ; c'est pourquoi NUPECMR SÉNIOR RACES MINI contient de la ",
            },
            {
              _key: "b5b6c7d8e9f3",
              _type: "span",
              marks: ["em"],
              text: "Passiflora incarnata",
            },
            {
              _key: "b5b6c7d8e9f4",
              _type: "span",
              marks: [],
              text: ", qui peut l'aider à réduire le stress. Enrichi en collagène de type II, qui aide à prévenir le développement de maladies articulaires*.\n\n*Cardiomyopathie dilatée canine causée par une carence en taurine.\n\nConsultez votre vétérinaire pour déterminer le régime alimentaire adapté.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, chicken meal, chicken fat, wheat, lamb meal, wheat gluten, soybean concentrate, beet pulp, fish meal, natural chicken flavor, fish oil, sodium, potassium, choline chloride, fructooligosaccharides, taurine, lysine, sodium hexametaphosphate, Curcuma longa, Eugenia caryophyllus, vitamin A supplement, cholecalciferol, DL-alpha-tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Passiflora incarnata extract, undenatured type II collagen, L-carnitine, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de poulet, graisse de poulet, blé, farine d'agneau, gluten de blé, concentré de soja, pulpe de betterave, farine de poisson, arôme naturel de poulet, huile de poisson, sodium, potassium, chlorure de choline, fructo-oligosaccharides, taurine, lysine, hexamétaphosphate de sodium, Curcuma longa, Eugenia caryophyllus, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite sodique de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Passiflora incarnata, collagène non dénaturé de type II, L-carnitine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Keep in a cool, dry place.\nProvide your pet with fresh water at all times.\nDo not offer this product if its appearance changes.\nThe use of this product in ruminant feed is prohibited.\n“CONSULT YOUR VETERINARIAN.”",
      fr: "Conserver dans un endroit frais et sec.\nMettez de l'eau fraîche à disposition de votre animal.\nNe proposez pas ce produit si son aspect change.\nL'utilisation de ce produit dans l'alimentation des ruminants est interdite.\n« CONSULTEZ VOTRE VÉTÉRINAIRE ».",
    },
    keyBenefits: [
      {
        key: "16782924b0bd",
        description: {
          en: "Promotes joint cartilage restoration",
          fr: "Favorise la restauration du cartilage articulaire",
        },
      },
      {
        key: "809d15e35026",
        description: {
          en: "Helps prevent heart disease* *Canine Dilated Cardiomyopathy caused by taurine deficiency",
          fr: "Contribue à la prévention des maladies cardiaques* *Cardiomyopathie dilatée canine causée par une carence en taurine",
        },
      },
      {
        key: "32c4d7babd31",
        description: {
          en: "Plant extracts with antioxidant and immunomodulatory properties",
          fr: "Des extraits de plantes aux propriétés antioxydantes et immunomodulatrices",
        },
      },
      {
        key: "37bb010f3575",
        description: {
          en: "Lamb protein",
          fr: "Protéine d'agneau",
        },
      },
    ],
  },

  // ── 8. Senior Razas Pequeñas (canino) ──────────────────────────
  {
    id: "product-canino-senior-razas-pequenas",
    name: "Senior Razas Pequeñas",
    tagline: {
      en: "Strengthens the joints of senior small-breed dogs",
      fr: "Renforce les articulations des chiens seniors de petite race",
    },
    description: {
      en: [
        {
          _key: "c6d7e8f9a0b1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c6d7e8f9a0b2",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that small breeds have a longer life expectancy and need specific nutrition to meet their needs. That's why we've designed a food with the essential nutrients to slow down the body's aging process, strengthening the immune system and joints, and keeping your dog active and healthy for longer.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d6d7e8f9a0b1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d6d7e8f9a0b2",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons que les petites races ont une espérance de vie plus longue et nécessitent une nutrition spécifique adaptée à leurs besoins. C'est pourquoi nous avons conçu un aliment contenant les nutriments essentiels pour retarder le vieillissement de l'organisme, en renforçant le système immunitaire et les articulations, afin de garder votre chien actif et en bonne santé plus longtemps.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Beef meal, corn, rice, chicken meat, chicken fat, fish meal, beet pulp, vegetable protein concentrate, natural chicken flavor, phosphorus, calcium, sodium, retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, EDDI, glucosamine, chondroitin sulfate, Yucca schidigera extract, a blend of rosemary and tocopherols as preservatives.",
      fr: "Farine de bœuf, maïs, riz, viande de poulet, graisse de poulet, farine de poisson, pulpe de betterave, concentré de protéines végétales, arôme naturel de poulet, phosphore, calcium, sodium, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, EDDI, glucosamine, sulfate de chondroïtine, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    warnings: {
      en: "The use of this product in ruminant feed is prohibited.\nKeep in a cool, dry place.\nProvide your pet with fresh water at all times.\n“CONSULT YOUR VETERINARIAN.”",
      fr: "L'utilisation de ce produit dans l'alimentation des ruminants est interdite.\nConserver dans un endroit frais et sec.\nMettez de l'eau fraîche à disposition de votre animal.\n« CONSULTEZ VOTRE VÉTÉRINAIRE ».",
    },
    keyBenefits: [
      {
        key: "ea681958a342",
        description: {
          en: "Promotes joint health.",
          fr: "Favorise la santé articulaire.",
        },
      },
      {
        key: "09f5154c34cc",
        description: {
          en: " Helps maintain bone and muscle mass.",
          fr: " Contribue au maintien de la masse osseuse et musculaire.",
        },
      },
      {
        key: "fccc86e89295",
        description: {
          en: "It supports the immune system's response.",
          fr: "Il favorise la réponse du système immunitaire.",
        },
      },
    ],
    kibbleDescription: {
      en: "The size and texture of each kibble are specially designed for the jaw and digestive tract of a senior small-breed dog.",
      fr: "La taille et la texture de chaque croquette sont spécialement adaptées à la mâchoire et au système digestif d'un chien senior de petite race.",
    },
  },

  // ── 9. Dental Care Treats (canino) ─────────────────────────────
  {
    id: "product-canino-dental-care-treats",
    name: "Dental Care Treats",
    tagline: {
      en: "A functional treat that helps control plaque and tartar buildup",
      fr: "Une friandise fonctionnelle qui aide à contrôler la plaque et le tartre dentaire",
    },
    description: {
      en: [
        {
          _key: "e7f8a9b0c1d2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e7f8a9b0c1d3",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know how important dental health is for our pets. That's why we've developed a treat with functional ingredients that help prevent tartar buildup.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f7f8a9b0c1d2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f7f8a9b0c1d3",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous connaissons l'importance de la santé dentaire de nos animaux de compagnie. C'est pourquoi nous avons développé une friandise aux ingrédients fonctionnels qui aident à prévenir la formation de tartre.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "7a65ff995411",
        text: {
          en: "Its chlorophyll formula helps fight bad breath by inhibiting bacterial growth.",
          fr: "Sa formule à la chlorophylle aide à lutter contre la mauvaise haleine en inhibant la croissance bactérienne.",
        },
      },
      {
        key: "4867a6237761",
        text: {
          en: "With calcium to help strengthen teeth",
          fr: "Avec du calcium pour aider à renforcer les dents",
        },
      },
    ],
    keyBenefits: [
      {
        key: "064a0d589ff5",
        description: {
          en: "HELPS CONTROL PLAQUE AND TARTAR",
          fr: "AIDE À CONTRÔLER LA PLAQUE ET LE TARTRE",
        },
      },
      {
        key: "d16ef3c1b956",
        description: {
          en: "HELPS PREVENT PERIODONTAL DISEASE",
          fr: "AIDE À PRÉVENIR LA MALADIE PARODONTALE",
        },
      },
    ],
    kibbleDescription: {
      en: "Irresistible aroma and flavor",
      fr: "Un arôme et une saveur irrésistibles",
    },
  },

  // ── 10. Digestive Care Treats (canino) ─────────────────────────
  {
    id: "product-canino-digestive-care-treats",
    name: "Digestive Care Treats",
    tagline: {
      en: "A functional treat that promotes healthy digestion",
      fr: "Une friandise fonctionnelle qui favorise une digestion saine",
    },
    description: {
      en: [
        {
          _key: "a9b0c1d2e3f4",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a9b0c1d2e3f5",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that gastrointestinal issues are common in dogs. That's why we've developed a treat with a combination of prebiotics and vitamins that help preserve intestinal health.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b9b0c1d2e3f4",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b9b0c1d2e3f5",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons que les troubles gastro-intestinaux sont fréquents chez le chien. C'est pourquoi nous avons développé une friandise contenant une combinaison de prébiotiques et de vitamines qui aident à préserver la santé intestinale.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "182bd9b51ecc",
        text: {
          en: "With prebiotics that promote the growth of beneficial gut bacteria.",
          fr: "Avec des prébiotiques qui favorisent la croissance de bactéries bénéfiques dans l'intestin.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "56e9af029e1c",
        description: {
          en: "HELPS MAINTAIN HEALTHY DIGESTION",
          fr: "AIDE À MAINTENIR UNE DIGESTION SAINE",
        },
      },
      {
        key: "838b5cd030bc",
        description: {
          en: "WITH PREBIOTICS TO SUPPORT INTESTINAL HEALTH",
          fr: "AVEC DES PRÉBIOTIQUES POUR MAINTENIR LA SANTÉ INTESTINALE",
        },
      },
    ],
  },

  // ── 11. Joint Care Treats (canino) ─────────────────────────────
  {
    id: "product-canino-joint-care-treats",
    name: "Joint Care Treats",
    tagline: {
      en: "A functional treat that helps support joint health",
      fr: "Une friandise fonctionnelle qui aide à entretenir les articulations",
    },
    description: {
      en: [
        {
          _key: "c1d2e3f4a5b6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c1d2e3f4a5b7",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know how important joint health is. That's why we've developed a treat with glucosamine and chondroitin to help strengthen joints and keep your pet full of vitality.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d1d2e3f4a5b6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d1d2e3f4a5b7",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous connaissons l'importance de la santé articulaire. C'est pourquoi nous avons développé une friandise à la glucosamine et à la chondroïtine pour aider à renforcer les articulations et préserver la vitalité de votre animal.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "665cfa5866dc",
        text: {
          en: "With glucosamine and chondroitin that help support cartilage regeneration.",
          fr: "Avec de la glucosamine et de la chondroïtine qui favorisent la régénération du cartilage et de ses composants.",
        },
      },
      {
        key: "a7239b764082",
        text: {
          en: "Contains omega-3, which supports the anti-inflammatory process in joints.",
          fr: "Contient des oméga-3, qui interviennent dans le processus anti-inflammatoire des articulations.",
        },
      },
      {
        key: "9a550eeb577f",
        text: {
          en: "With vitamin E and C that help support proper circulatory function and help prevent cellular damage.",
          fr: "Avec de la vitamine E et de la vitamine C qui aident au bon fonctionnement du système circulatoire et préviennent les dommages cellulaires.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "4a215c150194",
        description: {
          en: "CHONDROITIN + GLUCOSAMINE TO HELP MAINTAIN JOINT HEALTH",
          fr: "CHONDROÏTINE + GLUCOSAMINE POUR L'ENTRETIEN DES ARTICULATIONS",
        },
      },
    ],
  },

  // ── 12. Relax Treats (canino) ──────────────────────────────────
  {
    id: "product-canino-relax-treats",
    name: "Relax Treats",
    tagline: {
      en: "A functional treat that helps manage anxiety and stress",
      fr: "Une friandise fonctionnelle qui aide à gérer l'anxiété et le stress",
    },
    description: {
      en: [
        {
          _key: "e3f4a5b6c7d8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e3f4a5b6c7d9",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that today's lifestyle exposes our pets to certain levels of stress. That's why we've developed a treat with functional ingredients that help reduce your pet's anxiety, improving their quality of life.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f3f4a5b6c7d8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f3f4a5b6c7d9",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons que le mode de vie actuel expose nos animaux de compagnie à certains niveaux de stress. C'est pourquoi nous avons développé une friandise aux ingrédients fonctionnels qui aident à réduire l'anxiété de votre animal, améliorant ainsi sa qualité de vie.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "672cfc9cec7b",
        text: {
          en: "With Passiflora incarnata, which has a relaxing effect.",
          fr: "Avec de la Passiflora incarnata, qui produit un effet relaxant.",
        },
      },
      {
        key: "53b3aa51f9ac",
        text: {
          en: "Contains B-complex vitamins, essential for keeping the central nervous system healthy.",
          fr: "Contient un complexe B, essentiel pour préserver la santé du système nerveux central.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "9ba9715f07c3",
        description: {
          en: "With Passiflora incarnata, which has a relaxing effect.",
          fr: "Avec de la Passiflora incarnata, qui produit un effet relaxant.",
        },
      },
    ],
    kibbleDescription: {
      en: "Helps manage anxiety and stress",
      fr: "Aide à gérer l'anxiété et le stress",
    },
  },

  // ── 13. Smart Treats (canino) ──────────────────────────────────
  {
    id: "product-canino-smart-treats",
    name: "Smart Treats",
    tagline: {
      en: "A functional treat that supports cognitive function",
      fr: "Une friandise fonctionnelle qui favorise la fonction cognitive",
    },
    description: {
      en: [
        {
          _key: "a5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know just how much learning potential dogs have. That's why we've developed a treat with omega-3 fatty acids (EPA/DHA) that help support cognitive function.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous connaissons l'énorme potentiel d'apprentissage des chiens. C'est pourquoi nous avons développé une friandise aux acides gras oméga-3 (EPA/DHA) qui contribuent au maintien de la fonction cognitive.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "cb20cb5806c1",
        text: {
          en: "With EPA/DHA, which help stimulate your pet's intelligence.",
          fr: "Avec de l'EPA/DHA, qui stimulent l'intelligence de votre animal.",
        },
      },
      {
        key: "3c2b8f60ef91",
        text: {
          en: "Help combat the natural aging process by supporting proper communication between neurons.",
          fr: "Aident à lutter contre le processus naturel de vieillissement en préservant une bonne communication interneuronale.",
        },
      },
      {
        key: "363c879d3232",
        text: {
          en: "Contain B-complex vitamins, essential for keeping the central nervous system healthy.",
          fr: "Contiennent un complexe B, essentiel pour préserver la santé du système nerveux central.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "782009eb1c2f",
        description: {
          en: "WITH DHA THAT PROMOTES COGNITIVE FUNCTION",
          fr: "AVEC DU DHA QUI FAVORISE LA FONCTION COGNITIVE",
        },
      },
    ],
  },

  // ── 14. Training Treats (canino) ───────────────────────────────
  {
    id: "product-canino-training-treats",
    name: "Training Treats",
    tagline: {
      en: "A functional treat that helps with dog training",
      fr: "Une friandise fonctionnelle qui aide au dressage canin",
    },
    description: {
      en: [
        {
          _key: "c7d8e9f0a1b2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c7d8e9f0a1b3",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know how important it is to encourage your pet's good behavior. That's why we've developed a low-calorie treat that lets you reward your pet multiple times during training sessions.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d7d8e9f0a1b2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d7d8e9f0a1b3",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons combien il est important d'encourager le bon comportement de votre animal. C'est pourquoi nous avons développé une friandise basses calories qui vous permet de récompenser votre animal plusieurs fois pendant ses séances d'entraînement.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "53b88690b304",
        text: {
          en: "Less than 3 kcal per piece",
          fr: "Moins de 3 kcal par pièce",
        },
      },
      {
        key: "b00cd0163a11",
        text: {
          en: "Helps with dog training",
          fr: "Aide au dressage canin",
        },
      },
    ],
    keyBenefits: [
      {
        key: "f10766d264b5",
        description: {
          en: "Less than 3 kcal per piece",
          fr: "Moins de 3 kcal par pièce",
        },
      },
      {
        key: "b8953c106290",
        description: {
          en: "Helps with dog training",
          fr: "Aide au dressage canin",
        },
      },
    ],
  },

  // ── 15. FELINO Indoor (felino) ─────────────────────────────────
  {
    id: "product-felino-felino-indoor",
    name: "FELINO Indoor",
    tagline: {
      en: "Specialized nutrition for adult indoor cats",
      fr: "Une nutrition spécialisée pour les chats adultes d'intérieur",
    },
    description: {
      en: [
        {
          _key: "e9f0a1b2c3d4",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e9f0a1b2c3d5",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that a homebound lifestyle gives indoor cats special nutritional needs. That's why we've formulated specialized nutrition with a balance of ingredients that help regulate the nervous system and maintain healthy body condition.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f9f0a1b2c3d4",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f9f0a1b2c3d5",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons qu'un chat au mode de vie sédentaire a des besoins nutritionnels particuliers. C'est pourquoi nous avons formulé une nutrition spécialisée à base d'ingrédients équilibrés qui aident à réguler le système nerveux et à maintenir une condition corporelle saine.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Chicken meal, brewer's rice, chicken fat, corn, beet pulp, fish meal, fish oil, natural chicken flavor, chicory root extract, fructooligosaccharides, sodium chloride, potassium chloride, choline chloride, beta-glucans and mannan oligosaccharides (derived from the cell wall of active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), taurine, retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), Yucca schidigera extract, a blend of tocopherols and rosemary extract as preservatives.",
      fr: "Farine de poulet, riz de brasserie, graisse de poulet, maïs, pulpe de betterave, farine de poisson, huile de poisson, arôme naturel de poulet, extrait de racine de chicorée, fructo-oligosaccharides, chlorure de sodium, chlorure de potassium, chlorure de choline, bêta-glucanes et mannane-oligosaccharides (dérivés de la paroi cellulaire de Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), taurine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), extrait de Yucca schidigera, mélange de tocophérols et d'extrait de romarin comme conservateurs.",
    },
    warnings: {
      en: "Keep in a cool, dry place.\nProvide your pet with fresh water at all times.\nDo not offer this product if its appearance changes.\n“CONSULT YOUR VETERINARIAN”\n“AUTHORIZED FOR SALE IN SEALED PACKAGING”",
      fr: "Conserver dans un endroit frais et sec.\nMettez de l'eau fraîche à disposition de votre animal.\nNe proposez pas ce produit si son aspect change.\n« CONSULTEZ VOTRE VÉTÉRINAIRE »\n« AUTORISÉ À LA COMMERCIALISATION EN EMBALLAGE SCELLÉ »",
    },
    claims: [
      {
        key: "5df4d6874827",
        text: { en: "Food Safety", fr: "Sécurité alimentaire" },
      },
      {
        key: "9e4ede149650",
        text: {
          en: "47 quality controls in raw material selection",
          fr: "47 contrôles qualité dans la sélection des matières premières",
        },
      },
      {
        key: "d30c552ae741",
        text: {
          en: "Select ingredients of human-grade quality",
          fr: "Des ingrédients sélectionnés de qualité consommation humaine",
        },
      },
    ],
    highTech: [
      {
        key: "d182e64296ea",
        title: { en: "B-COMPLEX AND ROSEMARY", fr: "COMPLEXE B ET ROMARIN" },
        description: {
          en: "Help regulate the nervous system and mood",
          fr: "Contribuent à réguler le système nerveux et l'humeur",
        },
      },
      {
        key: "99b1f5f5a1f2",
        title: { en: "TAURINE", fr: "TAURINE" },
        description: {
          en: "Supports eye development, strengthening vision",
          fr: "Contribue au développement oculaire en renforçant la vision",
        },
      },
      {
        // El usuario reemplazó manualmente description.es por
        // "Reduce la presencia de malos olores en las heces." — se traduce
        // fielmente ese texto nuevo (se descarta la propuesta anterior de
        // beneficio funcional genérico inventado).
        key: "86932af1374d",
        title: {
          en: "YUCCA SCHIDIGERA EXTRACT",
          fr: "EXTRAIT DE YUCCA SCHIDIGERA",
        },
        description: {
          en: "Reduces the presence of unpleasant stool odor.",
          fr: "Réduit la présence de mauvaises odeurs dans les selles.",
        },
      },
      {
        key: "37860e8af564",
        title: { en: "pH", fr: "pH" },
        description: {
          en: "Proper control to help prevent bladder stones.",
          fr: "Un contrôle adapté pour aider à prévenir les calculs vésicaux.",
        },
      },
      {
        key: "9d7175c451f0",
        title: {
          en: "PREBIOTICS (MOS AND FOS)",
          fr: "PRÉBIOTIQUES (MOS ET FOS)",
        },
        description: {
          en: "Helps optimize digestion and keep natural defenses strong",
          fr: "Aide à optimiser la digestion et à maintenir des défenses naturelles élevées",
        },
      },
      {
        key: "716302eca88f",
        title: { en: "OMEGA-3 AND OMEGA-6", fr: "OMÉGA-3 ET OMÉGA-6" },
        description: {
          en: "For a glossy coat and healthy skin",
          fr: "Pour un pelage brillant et une peau saine",
        },
      },
      {
        key: "6d5ec976283a",
        title: { en: "ANTIOXIDANTS", fr: "ANTIOXYDANTS" },
        description: {
          en: "Help prevent cellular aging",
          fr: "Aident à prévenir le vieillissement cellulaire",
        },
      },
    ],
    keyBenefits: [
      {
        key: "1e233f007383",
        description: {
          en: "CHICKEN PROTEIN of high biological value, providing essential amino acids for a highly digestible protein",
          fr: "PROTÉINE DE POULET de haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible",
        },
      },
      {
        key: "a68d0ce2fcdb",
        description: {
          en: "SALMON PROTEIN concentrates large amounts of essential fatty acids beneficial for health",
          fr: "PROTÉINE DE SAUMON concentre de grandes quantités d'acides gras essentiels bénéfiques pour la santé",
        },
      },
      {
        key: "4f4eaba1250c",
        description: {
          en: "SELECT RICE provides the energy needed for optimal growth",
          fr: "RIZ SÉLECTIONNÉ apporte l'énergie nécessaire à une croissance optimale",
        },
      },
    ],
    kibbleDescription: {
      en: "A flat kibble for effective pickup. A crescent shape designed for proper chewing.",
      fr: "Une croquette plate pour une préhension efficace. Une forme de croissant conçue pour une mastication adaptée.",
    },
  },

  // ── 16. FELINO Kitten (felino) ──────────────────────────────────
  {
    id: "product-felino-felino-kitten",
    name: "FELINO Kitten",
    tagline: {
      en: "Specialized nutrition for young kittens.",
      fr: "Une nutrition spécialisée pour les chatons en bas âge.",
    },
    description: {
      en: [
        {
          _key: "a1b2c3d4e5f6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a1b2c3d4e5f7",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that a kitten's first months are key to shaping their quality of life as an adult. That's why we've formulated specialized nutrition that supports optimal cognitive, immune, bone, and muscle development.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b1b2c3d4e5f6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b1b2c3d4e5f7",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons que les premiers mois de vie du chaton sont essentiels pour déterminer sa qualité de vie à l'âge adulte. C'est pourquoi nous avons formulé une nutrition spécialisée qui favorise son développement cognitif, immunitaire, osseux et musculaire optimal.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Chicken meal, brewer's rice, chicken fat, corn, beet pulp, fish meal, fish oil, natural chicken flavor, chicory root extract, fructooligosaccharides, potassium chloride, choline chloride, beta-glucans and mannan oligosaccharides (derived from the cell wall of Saccharomyces cerevisiae 1x10¹⁰ CFU/g), taurine, retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), Yucca schidigera extract, a blend of tocopherols and rosemary extract as preservatives.",
      fr: "Farine de poulet, riz de brasserie, graisse de poulet, maïs, pulpe de betterave, farine de poisson, huile de poisson, arôme naturel de poulet, extrait de racine de chicorée, fructo-oligosaccharides, chlorure de potassium, chlorure de choline, bêta-glucanes et mannane-oligosaccharides (dérivés de la paroi cellulaire de Saccharomyces cerevisiae 1x10¹⁰ UFC/g), taurine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), extrait de Yucca schidigera, mélange de tocophérols et d'extrait de romarin comme conservateurs.",
    },
    highTech: [
      {
        key: "727cfd79a0ae",
        title: { en: "DHA AND FOLIC ACID", fr: "DHA ET ACIDE FOLIQUE" },
        description: {
          en: "Necessary for brain and nerve cell development.",
          fr: "Nécessaires au développement du cerveau et des cellules nerveuses.",
        },
      },
      {
        key: "fb4974850794",
        title: { en: "TAURINE", fr: "TAURINE" },
        description: {
          en: "Supports eye development, strengthening vision from an early age.",
          fr: "Contribue au développement oculaire en renforçant la vision dès le plus jeune âge.",
        },
      },
      {
        key: "7cb20e14f2ad",
        title: { en: "HIGH PALATABILITY", fr: "HAUTE APPÉTENCE" },
        description: {
          en: "Great taste and excellent acceptance.",
          fr: "Une saveur savoureuse et une excellente acceptation.",
        },
      },
      {
        key: "df3312872222",
        title: { en: "OMEGA-3 AND OMEGA-6", fr: "OMÉGA-3 ET OMÉGA-6" },
        description: {
          en: "For a glossy coat and healthy skin.",
          fr: "Pour un pelage brillant et une peau saine.",
        },
      },
      {
        key: "0cec09b3c0ad",
        title: {
          en: "PREBIOTICS (MOS AND FOS)",
          fr: "PRÉBIOTIQUES (MOS ET FOS)",
        },
        description: {
          en: "Strengthen the digestive system.",
          fr: "Renforcent le système digestif.",
        },
      },
      {
        key: "2c89b05d84eb",
        title: {
          en: "VITAMINS, MINERALS, AND ANTIOXIDANTS",
          fr: "VITAMINES, MINÉRAUX ET ANTIOXYDANTS",
        },
        description: {
          en: "Strengthen the immune system.",
          fr: "Renforcent le système immunitaire.",
        },
      },
      {
        key: "4a77cb0b920b",
        title: { en: "CALCIUM", fr: "CALCIUM" },
        description: {
          en: "Helps support healthy bone and teeth development.",
          fr: "Contribue au développement sain des os et des dents.",
        },
      },
    ],
    keyBenefits: [
      {
        key: "c4c7c75171dd",
        description: {
          en: "Chicken protein of high biological value, providing essential amino acids for a highly digestible protein.",
          fr: "Protéine de poulet de haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible.",
        },
      },
      {
        key: "cdd208c93121",
        description: {
          en: "Salmon protein that concentrates large amounts of essential fatty acids.",
          fr: "Protéine de saumon qui concentre de grandes quantités d'acides gras essentiels.",
        },
      },
      {
        key: "315a41a1ab47",
        description: {
          en: "Select rice that provides the energy needed for optimal growth.",
          fr: "Riz sélectionné qui apporte l'énergie nécessaire à une croissance optimale.",
        },
      },
    ],
    kibbleDescription: {
      en: "A tiny kibble suited to developing teeth. A crunchy texture for extra tastiness.",
      fr: "Une micro-croquette adaptée aux dents en développement. Une texture croustillante pour plus de gourmandise.",
    },
  },

  // ── 17. FELINO Senior (felino) ─────────────────────────────────
  {
    id: "product-felino-felino-senior",
    name: "FELINO Senior",
    tagline: {
      en: "Specialized nutrition for senior cats",
      fr: "Une nutrition spécialisée pour les chats seniors",
    },
    description: {
      en: [
        {
          _key: "c1d2e3f4a5b6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c1d2e3f4a5b7",
              _type: "span",
              marks: [],
              text: "At NUPECMR, we know that a senior cat's metabolism requires nutrition specifically formulated to meet the needs of a mature adult. That's why we've formulated specialized nutrition with a balance of ingredients that helps prevent cellular aging, keeping your cat active and healthy for longer.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d1d2e3f4a5b6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d1d2e3f4a5b7",
              _type: "span",
              marks: [],
              text: "Chez NUPECMR, nous savons que le métabolisme d'un chat senior nécessite une alimentation spécialement formulée pour répondre aux besoins d'un adulte à un âge mûr. C'est pourquoi nous avons formulé une nutrition spécialisée à base d'ingrédients équilibrés qui aident à prévenir le vieillissement cellulaire, pour garder votre chat actif et en bonne santé plus longtemps.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Chicken meal, brewer's rice, corn gluten, chicken fat, corn, salmon meal, beet pulp, fish oil, natural chicken flavor, dehydrated whole egg, fructooligosaccharides, potassium chloride, sodium chloride, choline chloride, taurine, sodium hexametaphosphate, L-carnitine, glucosamine, chondroitin sulfate, beta-glucans and mannan oligosaccharides (derived from the cell wall of active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), retinol acetate (source of vitamin A), cholecalciferol (source of vitamin D), DL-alpha-tocopherol acetate (source of vitamin E), menadione nicotinamide bisulfate (source of vitamin K), ascorbic acid (source of vitamin C), thiamine mononitrate (source of vitamin B1), riboflavin (source of vitamin B2), nicotinic acid (source of vitamin B3), pyridoxine hydrochloride (source of vitamin B6), cyanocobalamin (source of vitamin B12), D-biotin (source of vitamin H), calcium D-pantothenate (source of vitamin B5), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), Yucca schidigera extract, a blend of tocopherols and rosemary extract as preservatives.",
      fr: "Farine de poulet, riz de brasserie, gluten de maïs, graisse de poulet, maïs, farine de saumon, pulpe de betterave, huile de poisson, arôme naturel de poulet, œuf entier déshydraté, fructo-oligosaccharides, chlorure de potassium, chlorure de sodium, chlorure de choline, taurine, hexamétaphosphate de sodium, L-carnitine, glucosamine, sulfate de chondroïtine, bêta-glucanes et mannane-oligosaccharides (dérivés de la paroi cellulaire de Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), bisulfate de ménadione nicotinamide (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), extrait de Yucca schidigera, mélange de tocophérols et d'extrait de romarin comme conservateurs.",
    },
    claims: [
      {
        key: "db66026f4465",
        text: { en: "Food Safety", fr: "Sécurité alimentaire" },
      },
      {
        key: "aeb0db78501d",
        text: {
          en: "47 quality controls in raw material selection",
          fr: "47 contrôles qualité dans la sélection des matières premières",
        },
      },
      {
        key: "bce74a3a58ad",
        text: {
          en: "Select ingredients of human-grade quality",
          fr: "Des ingrédients sélectionnés de qualité consommation humaine",
        },
      },
    ],
    highTech: [
      {
        key: "67cc7654ef87",
        title: { en: "TAURINE AND VITAMIN A", fr: "TAURINE ET VITAMINE A" },
        description: {
          en: "Support retinal function and help prevent blindness.",
          fr: "Renforcent la fonction rétinienne et aident à prévenir la cécité.",
        },
      },
      {
        key: "95c953476e2e",
        title: {
          en: "SODIUM HEXAMETAPHOSPHATE",
          fr: "HEXAMÉTAPHOSPHATE DE SODIUM",
        },
        description: {
          en: "Reduces tartar buildup.",
          fr: "Réduit la formation de tartre dentaire.",
        },
      },
      {
        key: "8a9bd2e7657d",
        title: { en: "DHA AND EPA", fr: "DHA ET EPA" },
        description: {
          en: "Essential fatty acids for cellular regeneration.",
          fr: "Acides gras essentiels pour la régénération cellulaire.",
        },
      },
      {
        key: "7d62a9f8e9fc",
        title: { en: "SALMON AND OMEGA 3-6", fr: "SAUMON ET OMÉGA 3-6" },
        description: {
          en: "Support cognitive activity.",
          fr: "Renforcent l'activité cognitive.",
        },
      },
      {
        key: "fda74141ec93",
        title: {
          en: "IMMUNITY PLUS FORMULA",
          fr: "FORMULE IMMUNITY PLUS",
        },
        description: {
          en: "With natural antibodies that help prevent disease in older age.",
          fr: "Avec des anticorps naturels qui aident à prévenir les maladies liées à l'âge avancé.",
        },
      },
      {
        key: "a79e2604b794",
        title: {
          en: "GLUCOSAMINE AND CHONDROITIN",
          fr: "GLUCOSAMINE ET CHONDROÏTINE",
        },
        description: {
          en: "Promote joint health.",
          fr: "Favorisent la santé articulaire.",
        },
      },
    ],
    highTechTitleOverride: {
      // Nombre propio de fórmula — se mantiene igual en los 3 idiomas.
      en: "Immunity Plus",
      fr: "Immunity Plus",
    },
    keyBenefits: [
      {
        key: "120f02e5dab3",
        description: {
          en: "CHICKEN PROTEIN of high biological value, providing essential amino acids for a highly digestible protein",
          fr: "PROTÉINE DE POULET de haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible",
        },
      },
      {
        key: "c68b342db4bf",
        description: {
          en: "SALMON PROTEIN concentrates large amounts of essential fatty acids beneficial for health",
          fr: "PROTÉINE DE SAUMON concentre de grandes quantités d'acides gras essentiels bénéfiques pour la santé",
        },
      },
      {
        key: "2702867cff8c",
        description: {
          en: "SELECT RICE provides the energy needed for optimal growth",
          fr: "RIZ SÉLECTIONNÉ apporte l'énergie nécessaire à une croissance optimale",
        },
      },
    ],
    kibbleDescription: {
      en: "A kibble with a creamy dairy filling that contains natural antibodies.",
      fr: "Une croquette au cœur fondant lacté, contenant des anticorps naturels.",
    },
  },

  // ── 18. Creamy Treats Digestive Care (felino) ──────────────────
  {
    id: "product-felino-creamy-treats-digestive-care",
    name: "Creamy Treats Digestive Care",
    tagline: {
      en: "The functional treat that supports your cat's everyday health",
      fr: "La friandise fonctionnelle qui complète sa santé au quotidien",
    },
    description: {
      en: [
        {
          _key: "e3f4a5b6c7d8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e3f4a5b6c7d9",
              _type: "span",
              marks: [],
              text: "A creamy treat made with chicken meat and liver hydrolysate, formulated to support digestion in adult cats. Its crude fat content (min. 3.5%) is the highest in the line, delivering energy in a palatable way, along with krill oil, vitamin E, and taurine. Ideal for cats that need extra encouragement to eat while supporting digestive wellness, in an easy-to-enjoy creamy format. No artificial preservatives, flavors, or carrageenan.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f3f4a5b6c7d8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f3f4a5b6c7d9",
              _type: "span",
              marks: [],
              text: "Une friandise crémeuse à base de viande de poulet et d'hydrolysat de foie, formulée pour soutenir la digestion du chat adulte. Sa teneur en matières grasses brutes (min. 3,5 %) est la plus élevée de la gamme, apportant de l'énergie de façon appétente, associée à de l'huile de krill, de la vitamine E et de la taurine. Idéale pour les chats ayant besoin d'un coup de pouce pour s'alimenter tout en préservant leur bien-être digestif, dans un format crémeux facile à consommer. Sans conservateurs, arômes artificiels ni carraghénane.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Water, tuna loin, tuna hydrolysate, starch, vitamin E, krill oil, guar gum, xanthan gum, taurine, rosemary extract and tocopherols.",
      fr: "Eau, longe de thon, hydrolysat de thon, amidon, vitamine E, huile de krill, gomme de guar, gomme xanthane, taurine, extrait de romarin et tocophérols.",
    },
    keyBenefits: [
      {
        key: "89c90fcda1dc",
        description: {
          en: "Highly palatable, well-accepted creamy treats",
          fr: "Des friandises crémeuses très appétentes et bien acceptées",
        },
      },
    ],
    kibbleDescription: {
      en: "Individual 15-gram packets for easy serving.",
      fr: "Des sachets individuels de 15 grammes pour une consommation facile.",
    },
  },

  // ── 19. Creamy Treats Joint Care (felino) ──────────────────────
  {
    id: "product-felino-creamy-treats-joint-care",
    name: "Creamy Treats Joint Care",
    tagline: {
      en: "The functional treat that supports your cat's everyday health",
      fr: "La friandise fonctionnelle qui complète sa santé au quotidien",
    },
    // El usuario corrigió manualmente description.es en Sanity (ahora habla
    // de salmón/articulaciones, no del texto duplicado de digestive-care).
    // Se descarta el mapeo EN/FR hecho sobre el ES viejo/incorrecto y se
    // traduce aquí el ES nuevo confirmado.
    description: {
      en: [
        {
          _key: "a6b7c8d9e0f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "a6b7c8d9e0f2",
              _type: "span",
              marks: [],
              text: "A creamy treat made with salmon loin, designed as joint support for adult cats. It contains Scutellaria baicalensis, a functional ingredient with anti-inflammatory properties, along with vitamin E and taurine. Its soft texture makes it easy to give, even to cats with reduced mobility. Ideal as a complement to comprehensive joint care, while offering a moment of enjoyment and bonding with your cat. No artificial preservatives, flavors, or carrageenan.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "b6b7c8d9e0f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b6b7c8d9e0f2",
              _type: "span",
              marks: [],
              text: "Une friandise crémeuse à base de longe de saumon, conçue comme un soutien articulaire pour les chats adultes. Elle contient de la Scutellaria baicalensis, un ingrédient fonctionnel aux propriétés anti-inflammatoires, associée à de la vitamine E et de la taurine. Sa texture douce facilite son administration, même chez les chats à mobilité réduite. Idéale en complément d'une prise en charge articulaire globale, tout en offrant un moment de plaisir et de complicité avec votre chat. Sans conservateurs, arômes artificiels ni carraghénane.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Water, salmon loin, starch, fish oil, vitamin E, guar gum, fructooligosaccharides, xanthan gum, Scutellaria baicalensis, taurine, rosemary extract and tocopherols.",
      fr: "Eau, longe de saumon, amidon, huile de poisson, vitamine E, gomme de guar, fructo-oligosaccharides, gomme xanthane, Scutellaria baicalensis, taurine, extrait de romarin et tocophérols.",
    },
    keyBenefits: [
      {
        key: "fbec51aaf51d",
        description: {
          en: "Highly palatable, well-accepted creamy treats",
          fr: "Des friandises crémeuses très appétentes et bien acceptées",
        },
      },
    ],
    kibbleDescription: {
      en: "Individual 15 g units for easy serving.",
      fr: "Des unités individuelles de 15 g pour une consommation facile.",
    },
  },

  // ── 20. Creamy Treats Skin & Coat (felino, publicado) ──────────
  {
    id: "product-felino-creamy-treats-skin-coat",
    name: "Creamy Treats Skin & Coat",
    tagline: {
      en: "The functional treat that supports your cat's everyday health",
      fr: "La friandise fonctionnelle qui complète sa santé au quotidien",
    },
    description: {
      en: [
        {
          _key: "c5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "c5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "A creamy treat made with tuna loin, formulated to support skin and coat health in adult cats. It provides krill oil as a source of fatty acids, along with vitamin E and taurine. Its moderate fat profile and creamy texture make it a practical way to boost coat shine and condition day after day, while strengthening the bond with your cat. No artificial preservatives, flavors, or carrageenan.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "d5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "Une friandise crémeuse à base de longe de thon, formulée pour soutenir la santé de la peau et du pelage du chat adulte. Elle apporte de l'huile de krill comme source d'acides gras, associée à de la vitamine E et de la taurine. Son profil en matières grasses modéré et sa texture crémeuse en font une option pratique pour renforcer l'éclat et l'état du pelage au quotidien, tout en renforçant le lien avec votre chat. Sans conservateurs, arômes artificiels ni carraghénane.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Water, tuna loin, tuna hydrolysate, starch, vitamin E, krill oil, guar gum, xanthan gum, taurine, rosemary extract and tocopherols.",
      fr: "Eau, longe de thon, hydrolysat de thon, amidon, vitamine E, huile de krill, gomme de guar, gomme xanthane, taurine, extrait de romarin et tocophérols.",
    },
    keyBenefits: [
      {
        key: "fa66f4f2e6c8",
        description: {
          en: "Highly palatable, well-accepted creamy treats",
          fr: "Des friandises crémeuses très appétentes et bien acceptées",
        },
      },
    ],
    kibbleDescription: {
      en: "15 g sachets for easy serving",
      fr: "Des sachets de 15 g pour une utilisation facile",
    },
  },

  // ── 21. Creamy Treats Vitality Care (felino) ───────────────────
  {
    id: "product-felino-creamy-treats-vitality-care",
    name: "Creamy Treats Vitality Care",
    tagline: {
      en: "The functional treat that supports your cat's everyday health",
      fr: "La friandise fonctionnelle qui complète sa santé au quotidien",
    },
    description: {
      en: [
        {
          _key: "e5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "e5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "A vitamin-enriched creamy treat for adult cats, made with tuna and salmon loin. It delivers high levels of vitamin A and vitamin E, along with the full B-complex (B1, B2, B6, B9, B12) and taurine, supporting your cat's overall everyday vitality. Its creamy texture and fish flavor make it ideal for strengthening the bond with your cat while boosting their multivitamin intake. No artificial preservatives, flavors, or carrageenan.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "f5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f5b6c7d8e9f1",
              _type: "span",
              marks: [],
              text: "Une friandise crémeuse vitaminée pour chats adultes, élaborée à base de longe de thon et de saumon. Elle apporte de la vitamine A et de la vitamine E à des niveaux élevés, ainsi que le complexe B complet (B1, B2, B6, B9, B12) et de la taurine, pour soutenir la vitalité générale du chat au quotidien. Sa texture crémeuse et son goût de poisson en font une option idéale pour renforcer le lien avec votre chat tout en complétant son apport multivitaminé. Sans conservateurs, arômes artificiels ni carraghénane.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Water, tuna loin, salmon loin, starch, tuna hydrolysate, fish oil, vitamin E, guar gum, fructooligosaccharides, xanthan gum, vitamin B1, taurine, vitamin B2, vitamin B6, vitamin A, vitamin D3, vitamin B12, vitamin B9, rosemary extract and tocopherols.",
      fr: "Eau, longe de thon, longe de saumon, amidon, hydrolysat de thon, huile de poisson, vitamine E, gomme de guar, fructo-oligosaccharides, gomme xanthane, vitamine B1, taurine, vitamine B2, vitamine B6, vitamine A, vitamine D3, vitamine B12, vitamine B9, extrait de romarin et tocophérols.",
    },
    keyBenefits: [
      {
        key: "5c70c73493af",
        description: {
          en: "Highly palatable, well-accepted creamy treats",
          fr: "Des friandises crémeuses très appétentes et bien acceptées",
        },
      },
    ],
    kibbleDescription: {
      en: "Individual 15-gram serving for easy consumption.",
      fr: "Une présentation individuelle de 15 grammes pour une consommation facile.",
    },
  },
];
