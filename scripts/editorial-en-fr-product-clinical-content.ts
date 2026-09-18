/**
 * NUPEC – Contenido EN/FR (traducción fiel/adaptada según campo) de los 7
 * productos publicados del lote "nutricion-clinica" (4 canino + 3 felino).
 *
 * Fuente del mapeo: otro agente redactó el mapeo completo ES→EN→FR campo por
 * campo (ver mapping-clinical-raw.md, secciones 1 y 2). Este archivo lo
 * transcribe a datos TypeScript listos para un patch a Sanity.
 *
 * Productos cubiertos:
 * - product-canino-acute-hepatic
 * - product-canino-cardiac
 * - product-canino-hepatic
 * - product-canino-hypoallergenic
 * - product-felino-felino-cardiac
 * - product-felino-felino-hepatic
 * - product-felino-felino-hypoallergenic
 *
 * Campos cubiertos por producto (todos estaban pendientes en EN/FR según el
 * mapeo fuente — `name` ya estaba completo en los 7 y no se toca aquí):
 * tagline, description (rich text), ingredients, warnings, claims,
 * clinicalIndications, differentiators (con bullets anidados),
 * mechanismOfAction, problemSolution, transitionGuide (con steps) y
 * technicalResources (solo donde existe en el producto).
 *
 * Sigue el mismo patrón de tipos que
 * scripts/editorial-en-fr-product-daily-treats-content.ts, extendido con los
 * tipos exclusivos de nutrición clínica (clinicalIndications,
 * transitionGuide, mechanismOfAction, differentiators, problemSolution,
 * technicalResources).
 *
 * Reglas de contenido:
 * - Nunca se toca el campo `es`.
 * - Solo se incluyen campos/sub-items realmente faltantes en Sanity (según
 *   la sección 1 del mapeo fuente: en este lote absolutamente todo estaba
 *   pendiente en EN/FR salvo `name`, así que cada producto trae el set
 *   completo de campos aplicable a su estructura real, p. ej.
 *   `technicalResources` se omite en los productos donde el campo es `null`
 *   en Sanity).
 *
 * DECISIONES ESPECIALES TOMADAS EN ESTE LOTE (ver instrucciones del encargo):
 *
 * 1. `warnings` de los 3 productos FELINOS (product-felino-felino-cardiac,
 *    product-felino-felino-hepatic, product-felino-felino-hypoallergenic):
 *    el ES fuente dice "cachorros" (terminología canina, error de
 *    copy-paste del texto canino) en "No indicado para hembras gestantes,
 *    lactantes ni cachorros en crecimiento." El ES NO se modificó (fuera de
 *    alcance), pero por decisión explícita del usuario la traducción EN/FR
 *    se adaptó a la especie correcta del producto en vez de traducir
 *    literalmente "cachorros" como "puppies"/"chiots":
 *      EN: "Not recommended for pregnant or lactating females, or for
 *           growing kittens."
 *      FR: "Non recommandé pour les femelles gestantes, allaitantes, ni
 *           pour les chatons en croissance."
 *    Solo se cambió la palabra de especie; el resto de la frase se mantuvo
 *    igual a la estructura de warnings de los productos caninos del mismo
 *    lote.
 *
 * 2. `problemSolution[]` con texto ES idéntico entre productos de distinta
 *    especie/producto (p. ej. product-felino-felino-hepatic reutiliza el
 *    mismo ES que product-canino-acute-hepatic/product-canino-hepatic;
 *    product-canino-cardiac y product-felino-felino-cardiac comparten ES;
 *    product-canino-hypoallergenic y product-felino-felino-hypoallergenic
 *    comparten ES): por decisión explícita del usuario, se tradujo
 *    fielmente el ES tal cual está, duplicado incluido, sin excluir ni
 *    adaptar nada a la especie. Los `_key` de `problemSolution[]` NO son
 *    hashes hex sino claves semánticas en texto — confirmado releyendo
 *    products-clinical-es.json (fuente original de Sanity):
 *      product-canino-acute-hepatic: "proteina", "energia", "cobre", "inflamacion"
 *      product-canino-cardiac: "caquexia", "metabolismo-energetico", "sodio-electrolitos", "estres-oxidativo"
 *      product-canino-hepatic: "proteina", "energia", "cobre", "inflamacion"
 *      product-canino-hypoallergenic: "proteinas-antigenicas", "barrera-intestinal"
 *      product-felino-felino-cardiac: "caquexia", "metabolismo-energetico", "sodio-electrolitos", "estres-oxidativo"
 *      product-felino-felino-hepatic: "proteina", "energia", "cobre", "inflamacion"
 *      product-felino-felino-hypoallergenic: "proteinas-antigenicas", "barrera-intestinal"
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

type ClinicalIndicationPatch = {
  key: string;
  label: LangText;
};

type TransitionGuideStepPatch = {
  key: string;
  label: LangText;
};

type TransitionGuidePatch = {
  title?: LangText;
  subtitle?: LangText;
  noteBold?: LangText;
  noteText?: LangText;
  steps?: TransitionGuideStepPatch[];
};

type MechanismOfActionPatch = {
  key: string;
  title?: LangText;
  description?: LangText;
};

type DifferentiatorBulletPatch = {
  key: string;
  title?: LangText;
  description?: LangText;
};

type DifferentiatorPatch = {
  key: string;
  title?: LangText;
  subtitle?: LangText;
  bullets?: DifferentiatorBulletPatch[];
};

type ProblemSolutionPatch = {
  key: string;
  problem?: LangText;
  solution?: LangText;
};

type TechnicalResourcePatch = {
  key: string;
  title?: LangText;
  subtitle?: LangText;
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
  clinicalIndications?: ClinicalIndicationPatch[];
  transitionGuide?: TransitionGuidePatch;
  mechanismOfAction?: MechanismOfActionPatch[];
  differentiators?: DifferentiatorPatch[];
  problemSolution?: ProblemSolutionPatch[];
  technicalResources?: TechnicalResourcePatch[];
};

export const PRODUCT_CLINICAL_CONTENT_PATCHES: ProductContentPatch[] = [
  // ── 1. Acute Hepatic (canino) ───────────────────────────────────
  {
    id: "product-canino-acute-hepatic",
    name: "Acute Hepatic (canino)",
    tagline: {
      en: "Therapeutic nutrition for acute hepatocellular restoration",
      fr: "Nutrition thérapeutique pour la restauration hépatocellulaire aiguë",
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
              _key: "f1a2b3c4d5e6",
              _type: "span",
              marks: [],
              text: "Designed for the period of greatest hepatic vulnerability: acute liver injury. It delivers rapidly available energy through coconut-oil MCTs — with direct access to the hepatocyte, requiring no biliary conjugation or carnitine — plus moderate, highly digestible protein (egg + casein) to support hepatic protein synthesis without an excessive ammonia load. Silymarin acts as an immediate-action hepatoprotectant against acute oxidative damage. Includes a step-up introduction protocol for patients with elevated ALT or active hepatic encephalopathy, supporting the patient through the first 2–8 weeks of the crisis.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "a1b2c3d4e5f6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b1b2c3d4e5f6",
              _type: "span",
              marks: [],
              text: "Conçu pour la période de plus grande vulnérabilité hépatique : la lésion hépatique aiguë. Il apporte une énergie rapidement disponible grâce aux TCM issus de l'huile de coco — à accès direct à l'hépatocyte, sans nécessiter de conjugaison biliaire ni de carnitine — et des protéines modérées à haute digestibilité (œuf + caséine) pour soutenir la synthèse hépatique sans surcharge ammoniacale. La silymarine agit comme hépatoprotecteur à action immédiate contre les dommages oxydatifs aigus. Comprend un protocole d'introduction progressive pour les patients présentant une ALT élevée ou une encéphalopathie hépatique active, en accompagnement durant les 2 à 8 premières semaines de la crise.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, oats, poultry fat, chicken meat meal, dried egg, beet pulp, casein, fish hydrolysate, coconut oil, natural chicken flavor, salt, calcium, potassium chloride, L-arginine, L-isoleucine, L-valine, choline chloride, taurine, L-carnitine, vitamin A supplement, cholecalciferol, alpha-tocopherol acetate, sodium bisulfite menadione complex, vitamin C, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, vitamin B12 supplement, biotin, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic zinc, ethylenediamine dihydroiodide, Silymarin, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, avoine, graisse de volaille, farine de viande de poulet, œuf déshydraté, pulpe de betterave, caséine, hydrolysat de poisson, huile de coco, arôme naturel de poulet, sel, calcium, chlorure de potassium, L-arginine, L-isoleucine, L-valine, chlorure de choline, taurine, L-carnitine, supplément de vitamine A, cholécalciférol, acétate d'alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, vitamine C, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, supplément de vitamine B12, biotine, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, zinc organique, dihydroiodure d'éthylènediamine, Silymarine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing puppies.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chiots en croissance.",
    },
    claims: [
      {
        key: "98765a83db79",
        text: {
          en: "A product dedicated to the acute phase, distinct from chronic management. Not every hepatic formula on the market distinguishes between an active crisis and stable maintenance.",
          fr: "Un produit dédié à la phase aiguë, distinct de la prise en charge chronique. Toutes les formules hépatiques du marché ne font pas la distinction entre une crise active et un maintien stable.",
        },
      },
      {
        key: "65396375873b",
        text: {
          en: "Moderate, highly digestible protein (egg + casein) that supports acute-phase protein synthesis without generating excessive ammonia load.",
          fr: "Protéines modérées à haute digestibilité (œuf + caséine) qui soutiennent la synthèse des protéines de phase aiguë sans générer de charge ammoniacale excessive.",
        },
      },
      {
        key: "9effdd96531f",
        text: {
          en: "Caloric sources with immediate access to the injured hepatocyte, key for patients with compromised liver function.",
          fr: "Des sources caloriques à accès immédiat pour l'hépatocyte lésé, essentielles chez le patient dont la fonction hépatique est compromise.",
        },
      },
      {
        key: "cac35d8b919a",
        text: {
          en: "Silymarin as an antioxidant, anti-inflammatory hepatoprotectant at the moment of greatest clinical vulnerability.",
          fr: "Silymarine comme hépatoprotecteur antioxydant et anti-inflammatoire au moment de la plus grande vulnérabilité clinique.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "4331d7ef71cf",
        label: {
          en: "Food designed to support therapy in dogs of all breeds undergoing an acute hepatic condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chiens de toutes races présentant une affection hépatique aiguë diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "eb11aede2d46",
        title: {
          en: "AMMONIA DETOXIFICATION",
          fr: "DÉTOXIFICATION DE L'AMMONIAC",
        },
        bullets: [
          {
            key: "23dc153d7333",
            title: { en: "MIXED PROTEIN", fr: "PROTÉINES MIXTES" },
            description: {
              en: "Animal and plant sources of high biological quality",
              fr: "Sources animales et végétales de haute qualité biologique",
            },
          },
          {
            key: "56088259c4b5",
            title: { en: "AMINO ACID PROFILE", fr: "PROFIL D'ACIDES AMINÉS" },
            description: {
              en: "Elevated BCAAs that reduce nitrogenous compounds",
              fr: "BCAA élevés qui réduisent les composés azotés",
            },
          },
          {
            key: "097ed0fc406d",
            title: { en: "SOLUBLE FIBER", fr: "FIBRES SOLUBLES" },
            description: {
              en: "Generates an acidic pH that converts ammonia into ammonium",
              fr: "Génère un pH acide qui transforme l'ammoniac en ammonium",
            },
          },
        ],
      },
      {
        key: "2884b3e21ac9",
        title: { en: "DUAL COPPER CONTROL", fr: "CONTRÔLE DUAL DU CUIVRE" },
        bullets: [
          {
            key: "d6392edb3731",
            title: { en: "COPPER < 10 PPM", fr: "CUIVRE < 10 PPM" },
            description: {
              en: "Prevents accumulation and toxic effects, reducing hepatic inflammation and fibrosis",
              fr: "Prévient l'accumulation et l'effet toxique, réduisant l'inflammation et la fibrose hépatique",
            },
          },
          {
            key: "aea808ed4a0c",
            title: { en: "ORGANIC ZINC", fr: "ZINC ORGANIQUE" },
            description: {
              en: "A copper antagonist at the intestinal level that decreases its absorption",
              fr: "Antagoniste du cuivre au niveau intestinal, qui diminue son absorption",
            },
          },
        ],
      },
      {
        key: "d17179d2df3b",
        title: {
          en: "HEPATOPROTECTION AND REGENERATION",
          fr: "HÉPATOPROTECTION ET RÉGÉNÉRATION",
        },
        bullets: [
          {
            key: "f03084a988cc",
            title: { en: "SILYMARIN 1000 PPM", fr: "SILYMARINE 1000 PPM" },
            description: {
              en: "An antioxidant that protects the liver, slows inflammation and fibrogenesis, and activates hepatocyte proliferation. Covers the needs of a dog up to 20 kg",
              fr: "Antioxydant qui protège, freine l'inflammation et la fibrogenèse, et active la prolifération hépatocytaire. Couvre les besoins d'un chien jusqu'à 20 kg",
            },
          },
          {
            key: "d501fa99c0e7",
            title: { en: "CHOLINE", fr: "CHOLINE" },
            description: {
              en: "Helps prevent fat accumulation in the liver",
              fr: "Aide à prévenir l'accumulation de graisse dans le foie",
            },
          },
        ],
      },
      {
        key: "534e80a8a6fb",
        title: {
          en: "ENERGY AND METABOLIC SUPPORT",
          fr: "SOUTIEN ÉNERGÉTIQUE ET MÉTABOLIQUE",
        },
        bullets: [
          {
            key: "5b60cac4376c",
            title: {
              en: "COCONUT OIL AND CHICKEN FAT",
              fr: "HUILE DE COCO ET GRAISSE DE POULET",
            },
            description: {
              en: "Highly digestible, palatable energy that stimulates intake",
              fr: "Énergie hautement digestible et appétente qui stimule la consommation",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "7eddbcbcf70b",
        title: {
          en: "REDUCTION OF HEPATIC ENCEPHALOPATHY",
          fr: "RÉDUCTION DE L'ENCÉPHALOPATHIE HÉPATIQUE",
        },
      },
      {
        key: "e2a8e81faab2",
        title: {
          en: "REDUCTION OF ACUTE OXIDATIVE DAMAGE",
          fr: "RÉDUCTION DES DOMMAGES OXYDATIFS AIGUS",
        },
      },
      {
        key: "c0458a453cbc",
        title: {
          en: "REGENERATION OF THE HEPATIC PARENCHYMA",
          fr: "RÉGÉNÉRATION DU PARENCHYME HÉPATIQUE",
        },
      },
      {
        key: "be14c857a395",
        title: {
          en: "PRESERVATION OF MUSCLE MASS",
          fr: "PRÉSERVATION DE LA MASSE MUSCULAIRE",
        },
      },
    ],
    problemSolution: [
      {
        key: "proteina",
        problem: {
          en: "Excessive protein restriction leads to muscle mass loss and malnutrition. In patients with hepatic encephalopathy, excess protein can increase ammonia production and worsen clinical signs.",
          fr: "Une restriction protéique excessive entraîne une perte de masse musculaire et une malnutrition. Chez les patients atteints d'encéphalopathie hépatique, un excès de protéines peut augmenter la production d'ammoniac et aggraver les signes cliniques.",
        },
        solution: {
          en: "Highly digestible, high biological quality protein (egg and casein) to maintain muscle mass and nitrogen balance.",
          fr: "Protéines à haute digestibilité et haute qualité biologique (œuf et caséine) pour maintenir la masse musculaire et l'équilibre azoté.",
        },
      },
      {
        key: "energia",
        problem: {
          en: "Maintaining an adequate, highly digestible energy supply to limit catabolism and preserve muscle mass in patients with reduced appetite.",
          fr: "Maintenir un apport énergétique adéquat et hautement digestible pour limiter le catabolisme et préserver la masse musculaire chez les patients à appétit réduit.",
        },
        solution: {
          en: "High energy density (fish oil, coconut oil, chicken fat) and selected carbohydrates (rice and oats) that help adequately cover energy needs.",
          fr: "Densité énergétique élevée (huile de poisson, huile de coco, graisse de poulet) et glucides sélectionnés (riz et avoine) qui contribuent à couvrir de manière adéquate les besoins énergétiques.",
        },
      },
      {
        key: "cobre",
        problem: {
          en: "In liver diseases caused by copper accumulation or altered biliary excretion, copper builds up in hepatocytes, increasing oxidative stress and promoting inflammation, hepatocellular damage, and fibrosis.",
          fr: "Dans les hépatopathies liées à une accumulation de cuivre ou à une altération de son excrétion biliaire, le cuivre s'accumule dans les hépatocytes, augmentant le stress oxydatif et favorisant l'inflammation, les lésions hépatocellulaires et la fibrose.",
        },
        solution: {
          en: "Ingredients naturally low in copper, selected to keep total intake below 5 PPM, with controlled zinc levels that help limit intestinal absorption.",
          fr: "Sélection d'ingrédients naturellement pauvres en cuivre pour maintenir un apport total inférieur à 5 PPM, avec un apport contrôlé de zinc qui contribue à limiter l'absorption intestinale.",
        },
      },
      {
        key: "inflamacion",
        problem: {
          en: "Persistent inflammation and oxidative stress promote hepatocellular damage, fibrosis progression, and loss of liver function.",
          fr: "L'inflammation et le stress oxydatif persistants favorisent les lésions hépatocellulaires, la progression de la fibrose et la perte de fonction hépatique.",
        },
        solution: {
          en: "EPA+DHA as modulators of the inflammatory response; choline and silymarin with antioxidant and hepatoprotective activity.",
          fr: "EPA+DHA comme modulateurs de la réponse inflammatoire ; choline et silymarine aux propriétés antioxydantes et hépatoprotectrices.",
        },
      },
    ],
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR ACUTE HEPATIC in a 3:1 ratio and gradually increase the amount. Keep in mind that each dog's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR ACUTE HEPATIC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chien varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      steps: [
        {
          key: "d8ccc1b9dfbf",
          label: { en: "Day 1–3", fr: "Jour 1–3" },
        },
        {
          key: "5a6d1ed37557",
          label: { en: "Day 4–6", fr: "Jour 4–6" },
        },
        {
          key: "5b94d26f5de3",
          label: { en: "Day 7–9", fr: "Jour 7–9" },
        },
        {
          key: "1cb939a937f9",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 2. Cardiac (canino) ──────────────────────────────────────────
  {
    id: "product-canino-cardiac",
    name: "Cardiac (canino)",
    tagline: {
      en: "Therapeutic nutrition for cardiovascular health",
      fr: "Nutrition thérapeutique pour la santé cardiovasculaire",
    },
    description: {
      en: [
        {
          _key: "c2d3e4f5a6b7",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d2d3e4f5a6b7",
              _type: "span",
              marks: [],
              text: "Degenerative mitral valve disease (MMVD) is the most prevalent acquired heart disease in dogs. NUPEC® Cardiac is a complete and balanced food that addresses the pathophysiological changes of canine heart disease: sodium retention, protein hypercatabolism, and cardiac cachexia. Its formula combines moderate sodium restriction, high caloric density, highly digestible protein, omega-3 (EPA+DHA), L-carnitine, and taurine. Indicated from ACVIM stage B2, it supports heart rhythm stability and delays the progression of myocardial damage.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "e2d3e4f5a6b7",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "f2d3e4f5a6b7",
              _type: "span",
              marks: [],
              text: "La maladie valvulaire mitrale dégénérative (MVMD) est la cardiopathie acquise la plus fréquente chez le chien. NUPEC® Cardiac est un aliment complet et équilibré qui répond aux changements physiopathologiques de la maladie cardiaque canine : rétention de sodium, hypercatabolisme protéique et cachexie cardiaque. Sa formule associe une restriction modérée en sodium, une densité calorique élevée, des protéines hautement digestibles, des oméga-3 (EPA+DHA), de la L-carnitine et de la taurine. Indiqué dès le stade ACVIM B2, il favorise la stabilité du rythme cardiaque et retarde la progression des lésions myocardiques.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Oats, sorghum, poultry fat, barley, chicken meat meal, corn gluten, natural chicken flavor, turkey meal, pea protein concentrate, beet pulp, fish hydrolysate, dried egg, animal plasma, fish oil, L-Arginine, L-Carnitine, L-Taurine, sodium, calcium, potassium, choline, magnesium, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, sodium bisulfite menadione complex, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, ethylenediamine dihydroiodide, Scutellaria baicalensis, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Avoine, sorgho, graisse de volaille, orge, farine de viande de poulet, gluten de maïs, arôme naturel de poulet, farine de dinde, concentré de protéines de pois, pulpe de betterave, hydrolysat de poisson, œuf déshydraté, plasma animal, huile de poisson, L-arginine, L-carnitine, L-taurine, sodium, calcium, potassium, choline, magnésium, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, dihydroiodure d'éthylènediamine, Scutellaria baicalensis, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing puppies.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chiots en croissance.",
    },
    claims: [
      {
        key: "47ea3da434fc",
        text: {
          en: "No unnecessary protein restriction. Unlike conventional formulas that reduce protein as a default, NUPEC® Cardiac maintains high levels of highly digestible protein (min. 23% DM) to preserve muscle mass, in line with ACVIM and WSAVA guidelines, which only recommend protein restriction when concurrent kidney disease is present.",
          fr: "Aucune restriction protéique inutile. Contrairement aux formules conventionnelles qui réduisent systématiquement les protéines, NUPEC® Cardiac maintient des niveaux élevés de protéines hautement digestibles (min. 23 % MS) pour préserver la masse musculaire, conformément aux recommandations ACVIM et WSAVA, qui ne préconisent une restriction protéique qu'en cas de maladie rénale concomitante.",
        },
      },
      {
        key: "d65b9dee52d2",
        text: {
          en: "Designed to accompany the patient from ACVIM stage B2 through refractory congestive heart failure (D), without needing to change diets as the disease progresses.",
          fr: "Conçu pour accompagner le patient dès le stade ACVIM B2 jusqu'à l'insuffisance cardiaque congestive réfractaire (D), sans qu'il soit nécessaire de changer de régime au fil de la progression de la maladie.",
        },
      },
      {
        key: "2ec6e838da21",
        text: {
          en: "Cardioprotectants: taurine, L-carnitine, and omega-3 (EPA+DHA) present in the formula.",
          fr: "Cardioprotecteurs : taurine, L-carnitine et oméga-3 (EPA+DHA) présents dans la formule.",
        },
      },
      {
        key: "7c6fbac6e09f",
        text: {
          en: "Functional ingredients backed by veterinary medicine: Scutellaria baicalensis and Yucca schidigera extract as part of the antioxidant and anti-inflammatory approach. High caloric density to offset the hypercatabolism and anorexia seen in cardiac patients.",
          fr: "Ingrédients fonctionnels reconnus en médecine vétérinaire : Scutellaria baicalensis et extrait de Yucca schidigera dans le cadre de l'approche antioxydante et anti-inflammatoire. Densité calorique élevée pour compenser l'hypercatabolisme et l'anorexie du patient cardiaque.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "aaa4ce1110d9",
        label: {
          en: "Food designed to support therapy in adult dogs of all breeds undergoing a cardiac condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chiens adultes de toutes races présentant une affection cardiaque diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "fc6d04f6e4e7",
        title: { en: "HEMODYNAMIC CONTROL", fr: "CONTRÔLE HÉMODYNAMIQUE" },
        bullets: [
          {
            key: "9b08f9ce23df",
            title: { en: "MODERATE SODIUM", fr: "SODIUM MODÉRÉ" },
            description: {
              en: "Reduces fluid retention",
              fr: "Réduit la rétention hydrique",
            },
          },
          {
            key: "e927b1ce36da",
            title: { en: "ADEQUATE MAGNESIUM", fr: "MAGNÉSIUM ADÉQUAT" },
            description: {
              en: "Reduces the risk of arrhythmias",
              fr: "Réduit le risque d'arythmies",
            },
          },
          {
            key: "3208f073b658",
            title: { en: "ADEQUATE POTASSIUM", fr: "POTASSIUM ADÉQUAT" },
            description: {
              en: "Stabilizes membrane potential",
              fr: "Stabilise le potentiel de membrane",
            },
          },
        ],
      },
      {
        key: "403aea3c86ed",
        title: {
          en: "MYOCARDIAL ENERGY SUPPORT",
          fr: "SOUTIEN ÉNERGÉTIQUE DU MYOCARDE",
        },
        bullets: [
          {
            key: "7afde3c059dc",
            title: { en: "L-CARNITINE", fr: "L-CARNITINE" },
            description: {
              en: "Transports fatty acids into the mitochondria",
              fr: "Transport des acides gras vers la mitochondrie",
            },
          },
          {
            key: "56c6e3ffe502",
            title: { en: "TAURINE", fr: "TAURINE" },
            description: {
              en: "Regulates intracellular calcium",
              fr: "Régule le calcium intracellulaire",
            },
          },
          {
            key: "a2a376426ee2",
            title: {
              en: "LOW GLYCEMIC INDEX CARBOHYDRATES",
              fr: "GLUCIDES À FAIBLE INDICE GLYCÉMIQUE",
            },
            description: {
              en: "Glycemic stability for a favorable metabolic environment",
              fr: "Stabilité glycémique pour un environnement métabolique favorable",
            },
          },
        ],
      },
      {
        key: "02f24cb8040a",
        title: {
          en: "ANTIOXIDANT PROTECTION OF THE CARDIOMYOCYTE",
          fr: "PROTECTION ANTIOXYDANTE DU CARDIOMYOCYTE",
        },
        bullets: [
          {
            key: "88488f2cfa53",
            title: { en: "Scutellaria baicalensis", fr: "Scutellaria baicalensis" },
            description: {
              en: "Reduces chronic inflammatory processes and oxidative stress",
              fr: "Réduit les processus inflammatoires chroniques et le stress oxydatif",
            },
          },
          {
            key: "c1e16a329a24",
            title: { en: "ORGANIC SELENIUM", fr: "SÉLÉNIUM ORGANIQUE" },
            description: {
              en: "Boosts GPx, a key antioxidant enzyme in myocardial protection",
              fr: "Renforce la GPx, enzyme antioxydante clé dans la protection du myocarde",
            },
          },
          {
            key: "ea76fff23941",
            title: { en: "VITAMIN E", fr: "VITAMINE E" },
            description: {
              en: "Protects the cardiomyocyte cell membrane",
              fr: "Protège la membrane cellulaire du cardiomyocyte",
            },
          },
        ],
      },
      {
        key: "bc69323eeb45",
        title: {
          en: "CARDIOVASCULAR MODULATION",
          fr: "MODULATION CARDIOVASCULAIRE",
        },
        bullets: [
          {
            key: "d4d0fde548ef",
            title: { en: "EPA-DHA", fr: "EPA-DHA" },
            description: {
              en: "Modulate ion channels, reducing arrhythmias",
              fr: "Modulent les canaux ioniques, réduisant les arythmies",
            },
          },
          {
            key: "27fe209a6b35",
            title: { en: "ARGININE", fr: "ARGININE" },
            description: {
              en: "Vasodilatory action.\nReduces cardiac workload.",
              fr: "Action vasodilatatrice.\nRéduit le travail cardiaque.",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "a16f24a4dc72",
        title: {
          en: "DECREASES PULMONARY CONGESTION AND EDEMA",
          fr: "DIMINUE LA CONGESTION PULMONAIRE ET L'ŒDÈME",
        },
      },
      {
        key: "79d39ffab3b5",
        title: {
          en: "PROMOTES HEART RHYTHM STABILITY",
          fr: "FAVORISE LA STABILITÉ DU RYTHME CARDIAQUE",
        },
      },
      {
        key: "b4f932aa8033",
        title: {
          en: "DELAYS THE PROGRESSION OF MYOCARDIAL DAMAGE",
          fr: "RETARDE LA PROGRESSION DES LÉSIONS MYOCARDIQUES",
        },
      },
      {
        key: "3d53b4e3723a",
        title: {
          en: "REDUCES CARDIAC FATIGUE",
          fr: "RÉDUIT LA FATIGUE CARDIAQUE",
        },
      },
    ],
    problemSolution: [
      {
        key: "caquexia",
        problem: {
          en: "Development of a catabolic state that promotes progressive muscle mass loss (cardiac cachexia); a condition associated with a worse prognosis.",
          fr: "Développement d'un état catabolique favorisant une perte progressive de masse musculaire (cachexie cardiaque), une condition associée à un pronostic plus défavorable.",
        },
        solution: {
          en: "Highly digestible, high biological quality proteins (chicken, turkey, fish, and egg) with essential amino acids to help maintain muscle mass.",
          fr: "Protéines hautement digestibles et de haute qualité biologique (poulet, dinde, poisson et œuf) avec acides aminés essentiels pour contribuer au maintien de la masse musculaire.",
        },
      },
      {
        key: "metabolismo-energetico",
        problem: {
          en: "Altered myocardial energy metabolism (lower efficiency in producing and using ATP). In advanced stages, reduced appetite and the catabolic state compromise energy intake and promote muscle mass loss.",
          fr: "Métabolisme énergétique du myocarde altéré (moindre efficacité à produire et utiliser l'ATP). Aux stades avancés, la baisse de l'appétit et l'état catabolique compromettent l'apport énergétique et favorisent la perte de masse musculaire.",
        },
        solution: {
          en: "A highly digestible diet with adequate energy density, using selected sources of carbohydrates and fats, that helps meet energy needs and limit body catabolism.",
          fr: "Une alimentation hautement digestible et à densité énergétique adaptée, avec des sources sélectionnées de glucides et de lipides, qui contribue à couvrir les besoins énergétiques et à limiter le catabolisme corporel.",
        },
      },
      {
        key: "sodio-electrolitos",
        problem: {
          en: "Sodium and water retention. Diuretic treatment can alter the balance of electrolytes such as potassium and magnesium, which are important for electrical and muscular function.",
          fr: "Rétention de sodium et d'eau. Le traitement diurétique peut modifier l'équilibre d'électrolytes tels que le potassium et le magnésium, importants pour la fonction électrique et musculaire.",
        },
        solution: {
          en: "Moderately restricted dietary sodium that helps manage fluid retention, with controlled levels of potassium and magnesium that maintain adequate electrolyte balance. Supplemented with arginine, a precursor of nitric oxide, to support endothelial and vascular function.",
          fr: "Sodium alimentaire modérément restreint contribuant à la gestion de la rétention hydrique, avec des niveaux contrôlés de potassium et de magnésium maintenant un équilibre électrolytique adéquat. Enrichi en arginine, précurseur du monoxyde d'azote, pour le maintien de la fonction endothéliale et vasculaire.",
        },
      },
      {
        key: "estres-oxidativo",
        problem: {
          en: "Persistent oxidative stress and chronic inflammation contribute to cellular damage and the progression of cardiac dysfunction.",
          fr: "Le stress oxydatif persistant et l'inflammation chronique contribuent aux lésions cellulaires et à la progression de la dysfonction cardiaque.",
        },
        solution: {
          en: "Omega-3s as cardioprotectants, with antiarrhythmic and anti-inflammatory effects, along with taurine and L-carnitine that optimize fat oxidation, stabilize electrical function, and reinforce the cardiac walls.",
          fr: "Oméga-3 comme cardioprotecteurs, aux effets antiarythmiques et anti-inflammatoires, ainsi que taurine et L-carnitine qui optimisent l'oxydation des graisses, stabilisent la fonction électrique et renforcent les parois cardiaques.",
        },
      },
    ],
    technicalResources: [
      {
        key: "144bbbc162f3",
        title: { en: "Monograph", fr: "Monographie" },
        subtitle: {
          en: "Learn more about the product",
          fr: "En savoir plus sur le produit",
        },
      },
    ],
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR CARDIAC in a 3:1 ratio and gradually increase the amount. Keep in mind that each dog's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR CARDIAC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chien varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      noteText: {
        en: "Consult your veterinarian",
        fr: "Consultez votre vétérinaire",
      },
      steps: [
        {
          key: "99865aa3061b",
          label: { en: "Day 1-3", fr: "Jour 1-3" },
        },
        {
          key: "0d6827c5ea88",
          label: { en: "Day 4-6", fr: "Jour 4-6" },
        },
        {
          key: "aea28f8e6b33",
          label: { en: "Day 7-9", fr: "Jour 7-9" },
        },
        {
          key: "748eb95057f2",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 3. Hepatic (canino) ──────────────────────────────────────────
  {
    id: "product-canino-hepatic",
    name: "Hepatic (canino)",
    tagline: {
      en: "Continuous therapeutic hepatic nutrition",
      fr: "Nutrition thérapeutique hépatique continue",
    },
    description: {
      en: [
        {
          _key: "a3b4c5d6e7f8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b3b4c5d6e7f8",
              _type: "span",
              marks: [],
              text: "Formulated for the long-term management of chronic canine liver disease. It addresses the key pathophysiological axes: oxidative damage, progressive fibrosis, and the risk of hepatic encephalopathy. Silymarin — a hepatoprotectant with Class I evidence in veterinary hepatology — is the central ingredient, complemented by moderate, highly digestible protein with a favorable branched-chain amino acid profile, restricted copper (<5 ppm), and high caloric density. It does not restrict protein routinely, in line with WSAVA guidelines, except in documented hepatic encephalopathy.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "c3b4c5d6e7f8",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d3b4c5d6e7f8",
              _type: "span",
              marks: [],
              text: "Formulé pour la prise en charge à long terme de la maladie hépatique chronique canine. Il répond aux axes physiopathologiques clés : dommages oxydatifs, fibrose progressive et risque d'encéphalopathie hépatique. La silymarine — hépatoprotecteur bénéficiant d'une preuve de classe I en hépatologie vétérinaire — est l'ingrédient central, complétée par des protéines modérées à haute digestibilité avec un profil favorable d'acides aminés ramifiés, un cuivre restreint (< 5 ppm) et une densité calorique élevée. Il ne restreint pas systématiquement les protéines, conformément aux recommandations de la WSAVA, sauf en cas d'encéphalopathie hépatique documentée.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, oats, dried egg, casein, poultry fat, barley, fish hydrolysate, coconut oil, fish oil, natural chicken flavor, beet pulp, chicory inulin, calcium, potassium chloride, salt, L-arginine, L-isoleucine, L-valine, choline chloride, taurine, L-carnitine, L-threonine, vitamin A supplement, cholecalciferol, alpha-tocopherol acetate, sodium bisulfite menadione complex, vitamin C, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, vitamin B12 supplement, biotin, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic zinc, ethylenediamine dihydroiodide, Silymarin, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, avoine, œuf déshydraté, caséine, graisse de volaille, orge, hydrolysat de poisson, huile de coco, huile de poisson, arôme naturel de poulet, pulpe de betterave, inuline de chicorée, calcium, chlorure de potassium, sel, L-arginine, L-isoleucine, L-valine, chlorure de choline, taurine, L-carnitine, L-thréonine, supplément de vitamine A, cholécalciférol, acétate d'alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, vitamine C, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, supplément de vitamine B12, biotine, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, zinc organique, dihydroiodure d'éthylènediamine, Silymarine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing puppies.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chiots en croissance.",
    },
    claims: [
      {
        key: "30f97b7c3ebd",
        text: {
          en: "Highly digestible animal-based protein sources (chicken meat meal, egg, casein) instead of relying mainly on plant protein.",
          fr: "Sources de protéines animales hautement digestibles (farine de viande de poulet, œuf, caséine) plutôt qu'une dépendance principale aux protéines végétales.",
        },
      },
      {
        key: "bd4bb197f676",
        text: {
          en: "No unnecessary protein restriction.",
          fr: "Aucune restriction protéique inutile.",
        },
      },
      {
        key: "965c2225ec57",
        text: {
          en: "Maintains moderate, highly digestible protein levels (16% DM) with a favorable branched-chain amino acid profile, in line with WSAVA's recommendation not to routinely restrict protein except in documented hepatic encephalopathy.",
          fr: "Maintient des niveaux modérés de protéines hautement digestibles (16 % MS) avec un profil favorable d'acides aminés ramifiés, conformément à la recommandation de la WSAVA de ne pas restreindre systématiquement les protéines, sauf en cas d'encéphalopathie hépatique documentée.",
        },
      },
      {
        key: "652a17affff6",
        text: {
          en: "Copper strictly restricted to therapeutic levels (<5 ppm), relevant for breeds genetically predisposed to copper accumulation. Silymarin as an antioxidant, antifibrotic, anti-inflammatory, and hepatocyte-regenerating ingredient — not merely a secondary additive.",
          fr: "Cuivre restreint à un niveau thérapeutique strict (< 5 ppm), pertinent pour les races génétiquement prédisposées à l'accumulation de cuivre. Silymarine comme ingrédient antioxydant, antifibrotique, anti-inflammatoire et régénérateur hépatocytaire, et non un simple additif secondaire.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "012c9eacdcc4",
        label: {
          en: "Food designed to support therapy in adult dogs of all breeds undergoing a hepatic condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chiens adultes de toutes races présentant une affection hépatique diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "e4a932d07f40",
        title: {
          en: "AMMONIA DETOXIFICATION",
          fr: "DÉTOXIFICATION DE L'AMMONIAC",
        },
        bullets: [
          {
            key: "48b82a9dbfac",
            title: {
              en: "CONTROLLED INCLUSION OF MIXED PROTEIN",
              fr: "INCLUSION CONTRÔLÉE DE PROTÉINES MIXTES",
            },
            description: {
              en: "Animal and plant sources of high biological quality",
              fr: "Sources animales et végétales de haute qualité biologique",
            },
          },
          {
            key: "cbc221a8890a",
            title: { en: "AMINO ACID PROFILE", fr: "PROFIL D'ACIDES AMINÉS" },
            description: {
              en: "Elevated BCAAs that reduce nitrogenous compounds",
              fr: "BCAA élevés qui réduisent les composés azotés",
            },
          },
          {
            key: "c0bd2cbec0f4",
            title: { en: "SOLUBLE FIBER", fr: "FIBRES SOLUBLES" },
            description: {
              en: "Generates an acidic pH that converts ammonia into ammonium",
              fr: "Génère un pH acide qui transforme l'ammoniac en ammonium",
            },
          },
        ],
      },
      {
        key: "6d4778992732",
        title: { en: "DUAL COPPER CONTROL", fr: "CONTRÔLE DUAL DU CUIVRE" },
        bullets: [
          {
            key: "01a4d7138561",
            title: { en: "COPPER < 5 PPM", fr: "CUIVRE < 5 PPM" },
            description: {
              en: "Prevents accumulation and toxic effects, reducing hepatic inflammation and fibrosis",
              fr: "Prévient l'accumulation et l'effet toxique, réduisant l'inflammation et la fibrose hépatique",
            },
          },
          {
            key: "aff9ef797714",
            title: { en: "ORGANIC ZINC", fr: "ZINC ORGANIQUE" },
            description: {
              en: "A copper antagonist at the intestinal level that decreases its absorption",
              fr: "Antagoniste du cuivre au niveau intestinal, qui diminue son absorption",
            },
          },
        ],
      },
      {
        key: "950bb2397030",
        title: {
          en: "HEPATOPROTECTION AND REGENERATION",
          fr: "HÉPATOPROTECTION ET RÉGÉNÉRATION",
        },
        bullets: [
          {
            key: "fefdea834e9f",
            title: { en: "SILYMARIN 1000 PPM", fr: "SILYMARINE 1000 PPM" },
            description: {
              en: "An antioxidant that protects the liver, slows inflammation and fibrogenesis, and activates hepatocyte proliferation. Covers the needs of a dog up to 20 kg",
              fr: "Antioxydant qui protège, freine l'inflammation et la fibrogenèse, et active la prolifération hépatocytaire. Couvre les besoins d'un chien jusqu'à 20 kg",
            },
          },
          {
            key: "40cf6f8cc7c2",
            title: { en: "CHOLINE", fr: "CHOLINE" },
            description: {
              en: "Helps prevent fat accumulation in the liver",
              fr: "Aide à prévenir l'accumulation de graisse dans le foie",
            },
          },
        ],
      },
      {
        key: "3619e07ecd76",
        title: {
          en: "ENERGY AND METABOLIC SUPPORT",
          fr: "SOUTIEN ÉNERGÉTIQUE ET MÉTABOLIQUE",
        },
        bullets: [
          {
            key: "eb97afbbff9f",
            title: {
              en: "FISH OIL AND CHICKEN FAT",
              fr: "HUILE DE POISSON ET GRAISSE DE POULET",
            },
            description: {
              en: "Highly digestible, palatable energy that stimulates intake",
              fr: "Énergie hautement digestible et appétente qui stimule la consommation",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "63340bf46943",
        title: {
          en: "REDUCTION OF HEPATIC ENCEPHALOPATHY",
          fr: "RÉDUCTION DE L'ENCÉPHALOPATHIE HÉPATIQUE",
        },
      },
      {
        key: "3dad28539c53",
        title: {
          en: "CONTROL OF COPPER-INDUCED OXIDATIVE DAMAGE",
          fr: "CONTRÔLE DES DOMMAGES OXYDATIFS LIÉS AU CUIVRE",
        },
      },
      {
        key: "8e4a3443a43e",
        title: {
          en: "REGENERATION OF THE PARENCHYMA",
          fr: "RÉGÉNÉRATION DU PARENCHYME",
        },
      },
      {
        key: "9cc03dde3dc6",
        title: {
          en: "PRESERVATION OF MUSCLE MASS",
          fr: "PRÉSERVATION DE LA MASSE MUSCULAIRE",
        },
      },
    ],
    problemSolution: [
      {
        key: "proteina",
        problem: {
          en: "Excessive protein restriction leads to muscle mass loss and malnutrition. In patients with hepatic encephalopathy, excess protein can increase ammonia production and worsen clinical signs.",
          fr: "Une restriction protéique excessive entraîne une perte de masse musculaire et une malnutrition. Chez les patients atteints d'encéphalopathie hépatique, un excès de protéines peut augmenter la production d'ammoniac et aggraver les signes cliniques.",
        },
        solution: {
          en: "Highly digestible, high biological quality protein (egg and casein) to maintain muscle mass and nitrogen balance.",
          fr: "Protéines à haute digestibilité et haute qualité biologique (œuf et caséine) pour maintenir la masse musculaire et l'équilibre azoté.",
        },
      },
      {
        key: "energia",
        problem: {
          en: "Maintaining an adequate, highly digestible energy supply to limit catabolism and preserve muscle mass in patients with reduced appetite.",
          fr: "Maintenir un apport énergétique adéquat et hautement digestible pour limiter le catabolisme et préserver la masse musculaire chez les patients à appétit réduit.",
        },
        solution: {
          en: "High energy density (fish oil, coconut oil, chicken fat) and selected carbohydrates (rice and oats) that help adequately cover energy needs.",
          fr: "Densité énergétique élevée (huile de poisson, huile de coco, graisse de poulet) et glucides sélectionnés (riz et avoine) qui contribuent à couvrir de manière adéquate les besoins énergétiques.",
        },
      },
      {
        key: "cobre",
        problem: {
          en: "In liver diseases caused by copper accumulation or altered biliary excretion, copper builds up in hepatocytes, increasing oxidative stress and promoting inflammation, hepatocellular damage, and fibrosis.",
          fr: "Dans les hépatopathies liées à une accumulation de cuivre ou à une altération de son excrétion biliaire, le cuivre s'accumule dans les hépatocytes, augmentant le stress oxydatif et favorisant l'inflammation, les lésions hépatocellulaires et la fibrose.",
        },
        solution: {
          en: "Ingredients naturally low in copper, selected to keep total intake below 5 PPM, with controlled zinc levels that help limit intestinal absorption.",
          fr: "Sélection d'ingrédients naturellement pauvres en cuivre pour maintenir un apport total inférieur à 5 PPM, avec un apport contrôlé de zinc qui contribue à limiter l'absorption intestinale.",
        },
      },
      {
        key: "inflamacion",
        problem: {
          en: "Persistent inflammation and oxidative stress promote hepatocellular damage, fibrosis progression, and loss of liver function.",
          fr: "L'inflammation et le stress oxydatif persistants favorisent les lésions hépatocellulaires, la progression de la fibrose et la perte de fonction hépatique.",
        },
        solution: {
          en: "EPA+DHA as modulators of the inflammatory response; choline and silymarin with antioxidant and hepatoprotective activity.",
          fr: "EPA+DHA comme modulateurs de la réponse inflammatoire ; choline et silymarine aux propriétés antioxydantes et hépatoprotectrices.",
        },
      },
    ],
    technicalResources: [
      {
        key: "0265ae2a4a6a",
        title: { en: "Monograph", fr: "Monographie" },
        subtitle: {
          en: "Learn more about the product",
          fr: "En savoir plus sur le produit",
        },
      },
    ],
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR HEPATIC in a 3:1 ratio and gradually increase the amount. Keep in mind that each dog's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR HEPATIC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chien varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      noteText: {
        en: "Consult your veterinarian",
        fr: "Consultez votre vétérinaire",
      },
      steps: [
        {
          key: "6c4be94357a7",
          label: { en: "Day 1–3", fr: "Jour 1–3" },
        },
        {
          key: "a7d034a328ab",
          label: { en: "Day 4–6", fr: "Jour 4–6" },
        },
        {
          key: "1cab6b933768",
          label: { en: "Day 7–9", fr: "Jour 7–9" },
        },
        {
          key: "6436e0fb4692",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 4. Hypoallergenic (canino) ───────────────────────────────────
  {
    id: "product-canino-hypoallergenic",
    name: "Hypoallergenic (canino)",
    tagline: {
      en: "Advanced therapeutic nutrition for adverse food reactions",
      fr: "Nutrition thérapeutique avancée pour les réactions alimentaires indésirables",
    },
    description: {
      en: [
        {
          _key: "a4b5c6d7e8f9",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b4b5c6d7e8f9",
              _type: "span",
              marks: [],
              text: "Formulated for the management of adult dogs with adverse food reactions. Its protein source is hydrolyzed salmon broken down into low molecular weight peptides (<10 kDa), designed to reduce the immune system's exposure to recognizable epitopes. It includes highly digestible carbohydrates with no prior exposure, gastrointestinal support with glutamine, sodium butyrate, and chicory inulin, and fatty acids with anti-inflammatory action (EPA+DHA). Designed for use as an elimination diet during 8–12 week diagnostic protocols and as long-term nutritional management.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "c4b5c6d7e8f9",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d4b5c6d7e8f9",
              _type: "span",
              marks: [],
              text: "Formulé pour la prise en charge des chiens adultes présentant des réactions alimentaires indésirables. Sa source protéique est le saumon hydrolysé, fractionné en peptides de faible poids moléculaire (< 10 kDa), conçus pour réduire l'exposition du système immunitaire à des épitopes reconnaissables. Il comprend des glucides hautement digestibles sans exposition préalable, un soutien gastro-intestinal avec glutamine, butyrate de sodium et inuline de chicorée, ainsi que des acides gras à action anti-inflammatoire (EPA+DHA). Conçu pour être utilisé comme régime d'élimination lors de protocoles diagnostiques de 8 à 12 semaines et comme prise en charge nutritionnelle à long terme.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Hydrolyzed salmon, tapioca, pregelatinized corn starch, poultry fat, beet pulp, calcium orthophosphate, cellulose, fish oil, natural hydrolyzed palatant, calcium, potassium chloride, sodium, chicory inulin, glutamine, methionine, mannan-oligosaccharides, threonine, L-valine, L-arginine, lysine, sodium butyrate, choline chloride, tryptophan, L-carnitine, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, sodium bisulfite menadione complex, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, ethylenediamine dihydroiodide, Yucca schidigera extract, Scutellaria baicalensis, rosemary and tocopherols as preservatives.",
      fr: "Saumon hydrolysé, tapioca, amidon de maïs prégélatinisé, graisse de volaille, pulpe de betterave, orthophosphate de calcium, cellulose, huile de poisson, appétant naturel hydrolysé, calcium, chlorure de potassium, sodium, inuline de chicorée, glutamine, méthionine, mannane-oligosaccharides, thréonine, L-valine, L-arginine, lysine, butyrate de sodium, chlorure de choline, tryptophane, L-carnitine, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, Scutellaria baicalensis, romarin et tocophérols comme conservateurs.",
    },
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing puppies.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chiots en croissance.",
    },
    claims: [
      {
        key: "f8f703bdd01a",
        text: {
          en: "A single protein source of hydrolyzed salmon, instead of relying on plant protein.",
          fr: "Source protéique unique de saumon hydrolysé, plutôt qu'une dépendance aux protéines végétales.",
        },
      },
      {
        key: "952d360ab5ba",
        text: {
          en: "Gastrointestinal support with five functional ingredients (glutamine, sodium butyrate, chicory inulin, MOS) designed specifically to repair the intestinal barrier, not just avoid the allergen.",
          fr: "Soutien gastro-intestinal avec cinq ingrédients fonctionnels (glutamine, butyrate de sodium, inuline de chicorée, MOS) conçu spécifiquement pour réparer la barrière intestinale, et non seulement pour éviter l'allergène.",
        },
      },
      {
        key: "8634641a827e",
        text: {
          en: "Fat sources with active anti-inflammatory action (EPA+DHA) that modulate the immune response, beyond simply providing energy.",
          fr: "Sources lipidiques à action anti-inflammatoire active (EPA+DHA) qui modulent la réponse immunitaire, au-delà du simple apport énergétique.",
        },
      },
      {
        key: "63535379e48e",
        text: {
          en: "Additional functional ingredients (Scutellaria baicalensis, Yucca schidigera extract) not found in conventional hypoallergenic formulas on the market.",
          fr: "Ingrédients fonctionnels additionnels (Scutellaria baicalensis, extrait de Yucca schidigera) absents des formules hypoallergéniques conventionnelles du marché.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "ee43b3b5dbef",
        label: {
          en: "This is a food designed to support therapy in adult dogs of all breeds undergoing a food allergy condition clinically diagnosed by a veterinarian.",
          fr: "Il s'agit d'un aliment conçu pour accompagner la thérapie des chiens adultes de toutes races présentant une allergie alimentaire diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "21af5ab08b0d",
        title: { en: "ANTIGENIC CONTROL", fr: "CONTRÔLE ANTIGÉNIQUE" },
        bullets: [
          {
            key: "acb01e1db556",
            title: { en: "100% PROTEIN", fr: "PROTÉINE 100 %" },
            description: {
              en: "hydrolyzed with no recognizable epitopes",
              fr: "hydrolysée sans épitopes reconnaissables",
            },
          },
          {
            key: "e902cbd75bb5",
            title: { en: "HYDROLYZED SALMON", fr: "SAUMON HYDROLYSÉ" },
            description: {
              en: "as the sole protein source",
              fr: "comme seule source protéique",
            },
          },
          {
            key: "5c91af959356",
            title: { en: "CARBOHYDRATE SOURCES", fr: "SOURCES DE GLUCIDES" },
            description: {
              en: "with no hidden antigens",
              fr: "sans antigènes cachés",
            },
          },
        ],
      },
      {
        key: "243311426594",
        title: {
          en: "INFLAMMATORY AND OXIDATIVE MODULATION",
          fr: "MODULATION INFLAMMATOIRE ET OXYDATIVE",
        },
        bullets: [
          {
            key: "8b751ce9b901",
            title: { en: "EPA+DHA", fr: "EPA+DHA" },
            description: {
              en: "Anti-inflammatory and antipruritic effect",
              fr: "Effet anti-inflammatoire et antiprurigineux",
            },
          },
          {
            key: "047fb3e12c53",
            title: {
              en: "SCUTELLARIA BAICALENSIS",
              fr: "SCUTELLARIA BAICALENSIS",
            },
            description: {
              en: "Modulates the cutaneous allergic cascade",
              fr: "Module la cascade allergique cutanée",
            },
          },
          {
            key: "4dccddd49c6a",
            title: { en: "VITAMIN E", fr: "VITAMINE E" },
            description: {
              en: "Protects cell membranes by interrupting lipid peroxidation",
              fr: "Protège les membranes cellulaires en interrompant la lipoperoxydation",
            },
          },
          {
            key: "38a997afb5ba",
            title: { en: "ORGANIC SELENIUM", fr: "SÉLÉNIUM ORGANIQUE" },
            description: {
              en: "Activates GPx — an antioxidant enzyme in enterocytes and keratinocytes",
              fr: "Active la GPx, enzyme antioxydante des entérocytes et des kératinocytes",
            },
          },
        ],
      },
      {
        key: "25e92689659b",
        title: { en: "BARRIER REPAIR", fr: "RÉPARATION DES BARRIÈRES" },
        bullets: [
          {
            key: "77854382c819",
            title: { en: "ORGANIC ZINC + BIOTIN", fr: "ZINC ORGANIQUE + BIOTINE" },
            description: {
              en: "Skin barrier recovery through activation of ceramide and keratin synthesis",
              fr: "Récupération de la barrière cutanée par l'activation de la synthèse des céramides et de la kératine",
            },
          },
          {
            key: "247a5cce614c",
            title: {
              en: "GLUTAMINE + BUTYRATE + L-CARNITINE",
              fr: "GLUTAMINE + BUTYRATE + L-CARNITINE",
            },
            description: {
              en: "Intestinal barrier regeneration to prevent antigen passage",
              fr: "Régénération de la barrière intestinale pour empêcher le passage des antigènes",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "650b63a18194",
        title: {
          en: "REDUCTION OF PRURITUS AND ASSOCIATED SKIN LESIONS",
          fr: "RÉDUCTION DU PRURIT ET DES LÉSIONS CUTANÉES ASSOCIÉES",
        },
      },
      {
        key: "7b3a7676478b",
        title: {
          en: "SKIN AND COAT RECOVERY",
          fr: "RÉCUPÉRATION DE LA PEAU ET DU PELAGE",
        },
      },
      {
        key: "12086998d029",
        title: {
          en: "REDUCTION OF DIGESTIVE SIGNS",
          fr: "DIMINUTION DES SIGNES DIGESTIFS",
        },
      },
      {
        key: "cfe81d8b7b92",
        title: {
          en: "REDUCES ALLERGIC REACTIVITY AND IMPROVES ANTIGENIC TOLERANCE",
          fr: "RÉDUIT LA RÉACTIVITÉ ALLERGIQUE ET AMÉLIORE LA TOLÉRANCE ANTIGÉNIQUE",
        },
      },
    ],
    problemSolution: [
      {
        key: "proteinas-antigenicas",
        problem: {
          en: "Dietary proteins can trigger adverse reactions in sensitized patients. Beef, dairy, chicken, and wheat are the most frequently associated.",
          fr: "Les protéines alimentaires peuvent déclencher des réactions indésirables chez les patients sensibilisés. Le bœuf, les produits laitiers, le poulet et le blé sont les plus fréquemment associés.",
        },
        solution: {
          en: "Hydrolyzed salmon as a selected protein source to reduce exposure to potentially antigenic intact proteins. Tapioca and highly purified corn starch as highly digestible carbohydrate sources.",
          fr: "Saumon hydrolysé comme source protéique sélectionnée pour réduire l'exposition aux protéines intactes potentiellement antigéniques. Tapioca et amidon de maïs hautement purifié comme sources de glucides hautement digestibles.",
        },
      },
      {
        key: "barrera-intestinal",
        problem: {
          en: "Impaired intestinal barrier function can increase the immune system's exposure to dietary antigens and contribute to the loss of oral tolerance.",
          fr: "L'altération de la barrière intestinale peut augmenter l'exposition du système immunitaire aux antigènes alimentaires et contribuer à la perte de la tolérance orale.",
        },
        solution: {
          en: "Glutamine, butyrate, and inulin to support intestinal barrier integrity and function; EPA+DHA to modulate the inflammatory response; and zinc and biotin as essential nutrients for maintaining skin and coat integrity.",
          fr: "Glutamine, butyrate et inuline pour soutenir l'intégrité et la fonction de la barrière intestinale ; EPA+DHA pour moduler la réponse inflammatoire ; et zinc et biotine comme nutriments essentiels au maintien de l'intégrité de la peau et du pelage.",
        },
      },
    ],
    technicalResources: [
      {
        key: "5d701fcef8fc",
        title: { en: "Monograph", fr: "Monographie" },
        subtitle: {
          en: "Learn more about the product",
          fr: "En savoir plus sur le produit",
        },
      },
    ],
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR HYPOALLERGENIC in a 3:1 ratio and gradually increase the amount. Keep in mind that each dog's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR HYPOALLERGENIC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chien varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      steps: [
        {
          key: "8ebea85703dd",
          label: { en: "Day 1–3", fr: "Jour 1–3" },
        },
        {
          key: "da4635409960",
          label: { en: "Day 4–6", fr: "Jour 4–6" },
        },
        {
          key: "a4c5bb489f5d",
          label: { en: "Day 7–9", fr: "Jour 7–9" },
        },
        {
          key: "f8150ed1481c",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 5. FELINO Cardiac (felino) ───────────────────────────────────
  {
    id: "product-felino-felino-cardiac",
    name: "FELINO Cardiac (felino)",
    tagline: {
      en: "Therapeutic nutrition for cardiovascular health",
      fr: "Nutrition thérapeutique pour la santé cardiovasculaire",
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
              _key: "b5b6c7d8e9f0",
              _type: "span",
              marks: [],
              text: "Hypertrophic cardiomyopathy (HCM) is the most prevalent heart disease in cats, with a pathophysiology distinct from that of dogs, requiring a species-specific formulation. NUPEC® Feline Cardiac provides high protein to preserve muscle mass, mandatorily supplemented taurine, marine-sourced EPA+DHA as a functional cardioprotective ingredient, and moderate sodium restriction. Designed for adult cats with clinically diagnosed heart disease, it supports nutritional management from early stages (ACVIM B1) through congestive heart failure, helping to delay the progression of myocardial damage.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "c5b6c7d8e9f0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d5b6c7d8e9f0",
              _type: "span",
              marks: [],
              text: "La cardiomyopathie hypertrophique (CMH) est la cardiopathie la plus fréquente chez le chat, avec une physiopathologie distincte de celle du chien qui exige une formulation spécifique à l'espèce. NUPEC® Félin Cardiaque apporte des protéines élevées pour préserver la masse musculaire, de la taurine supplémentée de manière obligatoire, de l'EPA+DHA d'origine marine comme ingrédient fonctionnel cardioprotecteur, et une restriction modérée en sodium. Conçu pour les chats adultes atteints d'une maladie cardiaque diagnostiquée cliniquement, il accompagne la prise en charge nutritionnelle dès les stades précoces (ACVIM B1) jusqu'à l'insuffisance cardiaque congestive, contribuant à retarder la progression des lésions myocardiques.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Rice, poultry fat, casein, dried egg, fish hydrolysate, potato protein, coconut oil, beet pulp, fish oil, natural chicken flavor, chicory inulin, chicken meat meal, L-arginine, L-isoleucine, cellulose, L-valine, choline, taurine, sodium, potassium, calcium, lysine, L-carnitine, methionine, vitamin A supplement, cholecalciferol, alpha-tocopherol acetate, sodium bisulfite menadione complex, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, vitamin B12 supplement, biotin, vitamin C, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic zinc, ethylenediamine dihydroiodide, Silymarin, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, graisse de volaille, caséine, œuf déshydraté, hydrolysat de poisson, protéine de pomme de terre, huile de coco, pulpe de betterave, huile de poisson, arôme naturel de poulet, inuline de chicorée, farine de viande de poulet, L-arginine, L-isoleucine, cellulose, L-valine, choline, taurine, sodium, potassium, calcium, lysine, L-carnitine, méthionine, supplément de vitamine A, cholécalciférol, acétate d'alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, supplément de vitamine B12, biotine, vitamine C, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, zinc organique, dihydroiodure d'éthylènediamine, Silymarine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    // Warnings: decisión especial 1 — ES dice "cachorros" (error de
    // copy-paste canino) en un producto felino. Adaptado a la especie
    // correcta: "kittens"/"chatons" en vez de "puppies"/"chiots".
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing kittens.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chatons en croissance.",
    },
    claims: [
      {
        key: "00d13ad4bae5",
        text: {
          en: "High protein (min. 39% DM) to preserve the obligate carnivore's muscle mass, preventing the cardiac cachexia characteristic of feline patients.",
          fr: "Protéines élevées (min. 39 % MS) pour préserver la masse musculaire du carnivore strict, prévenant la cachexie cardiaque caractéristique du patient félin.",
        },
      },
      {
        key: "26758d7b9652",
        text: {
          en: "Taurine supplemented mandatorily as a core pillar of the formula, not as a secondary additive — addressing the cat's absolute dietary dependence on this amino acid.",
          fr: "Taurine supplémentée de manière obligatoire comme pilier central de la formule, et non comme additif secondaire — répondant à la dépendance alimentaire absolue du chat envers cet acide aminé.",
        },
      },
      {
        key: "6ac0c4b3dbd9",
        text: {
          en: "EPA+DHA from a direct marine source, designed specifically to compensate for the Δ6-desaturase enzyme deficiency in felines, which prevents them from efficiently converting plant-based fatty acids.",
          fr: "EPA+DHA d'origine marine directe, conçu spécifiquement pour compenser le déficit en enzyme Δ6-désaturase chez les félins, qui ne peuvent pas convertir efficacement les acides gras végétaux.",
        },
      },
      {
        key: "f4eff2947709",
        text: {
          en: "L-carnitine and L-arginine declared as part of the active cardioprotective approach.",
          fr: "L-carnitine et L-arginine déclarées dans le cadre de l'approche cardioprotectrice active.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "419f69c2fcbb",
        label: {
          en: "Food designed to support therapy in adult cats of all breeds undergoing a cardiac condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chats adultes de toutes races présentant une affection cardiaque diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "e3566b75d64b",
        title: { en: "HEMODYNAMIC CONTROL", fr: "CONTRÔLE HÉMODYNAMIQUE" },
        bullets: [
          {
            key: "4ac199a8580c",
            title: { en: "RESTRICTED SODIUM", fr: "SODIUM RESTREINT" },
            description: {
              en: "Reduces fluid retention",
              fr: "Réduit la rétention hydrique",
            },
          },
          {
            key: "e6402201602b",
            title: { en: "ADEQUATE MAGNESIUM", fr: "MAGNÉSIUM ADÉQUAT" },
            description: {
              en: "Reduces the risk of arrhythmias",
              fr: "Réduit le risque d'arythmies",
            },
          },
          {
            key: "bb76d3b96566",
            title: { en: "ADEQUATE POTASSIUM", fr: "POTASSIUM ADÉQUAT" },
            description: {
              en: "Prevents diuretic-induced hypokalemia\nand avoids arrhythmias",
              fr: "Prévient l'hypokaliémie liée\naux diurétiques et évite les arythmies",
            },
          },
        ],
      },
      {
        key: "b5354182f868",
        title: {
          en: "FELINE MYOCARDIAL ENERGY SUPPORT",
          fr: "SOUTIEN ÉNERGÉTIQUE DU MYOCARDE FÉLIN",
        },
        bullets: [
          {
            key: "36490c9ba14b",
            title: { en: "TAURINE", fr: "TAURINE" },
            description: {
              en: "Improves myocardial\ncontractile efficiency",
              fr: "Améliore l'efficacité\ncontractile du myocarde",
            },
          },
          {
            key: "e3375df15c83",
            title: { en: "L-CARNITINE", fr: "L-CARNITINE" },
            description: {
              en: "Reduces cardiac fatigue",
              fr: "Réduit la fatigue cardiaque",
            },
          },
          {
            key: "173cb044f224",
            title: {
              en: "LOW GLYCEMIC INDEX CARBOHYDRATES",
              fr: "GLUCIDES À FAIBLE INDICE GLYCÉMIQUE",
            },
            description: {
              en: "Glycemic stability for a\nfavorable metabolic environment",
              fr: "Stabilité glycémique pour un\nenvironnement métabolique favorable",
            },
          },
        ],
      },
      {
        key: "a7c83dc220ae",
        title: {
          en: "ANTIOXIDANT PROTECTION OF THE HYPERTROPHIC CARDIOMYOCYTE",
          fr: "PROTECTION ANTIOXYDANTE DU CARDIOMYOCYTE HYPERTROPHIQUE",
        },
        bullets: [
          {
            key: "223b95af2234",
            title: { en: "Scutellaria baicalensis", fr: "Scutellaria baicalensis" },
            description: {
              en: "Reduces chronic inflammatory\nprocesses and oxidative stress",
              fr: "Réduit les processus inflammatoires\nchroniques et le stress oxydatif",
            },
          },
          {
            key: "0ae04da78385",
            title: { en: "ORGANIC SELENIUM", fr: "SÉLÉNIUM ORGANIQUE" },
            description: {
              en: "Boosts GPx, a key antioxidant\nenzyme in myocardial protection",
              fr: "Renforce la GPx, enzyme antioxydante\nclé dans la protection du myocarde",
            },
          },
          {
            key: "6a9013628cda",
            title: { en: "VITAMIN E", fr: "VITAMINE E" },
            description: {
              en: "Protects the cardiomyocyte\ncell membrane",
              fr: "Protège la membrane\ncellulaire du cardiomyocyte",
            },
          },
        ],
      },
      {
        key: "de72725a221e",
        title: {
          en: "CARDIOVASCULAR AND ANTITHROMBOTIC MODULATION",
          fr: "MODULATION CARDIOVASCULAIRE ET ANTITHROMBOTIQUE",
        },
        bullets: [
          {
            key: "5b007ce3bb0c",
            title: { en: "EPA-DHA", fr: "EPA-DHA" },
            description: {
              en: "Protect the endothelium, reducing\nthe risk of thrombi",
              fr: "Protègent l'endothélium, réduisant\nle risque de thrombus",
            },
          },
          {
            key: "f8d982bd8cc0",
            title: { en: "ARGININE", fr: "ARGININE" },
            description: {
              en: "Vasodilatory action. Improves\nmyocardial perfusion",
              fr: "Action vasodilatatrice. Améliore la\nperfusion du myocarde",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "1be8654f5032",
        title: {
          en: "MAINTENANCE OF ELECTROLYTE BALANCE",
          fr: "MAINTIEN DE L'ÉQUILIBRE ÉLECTROLYTIQUE",
        },
      },
      {
        key: "78050363f9cd",
        title: {
          en: "REDUCTION OF CARDIAC FATIGUE",
          fr: "RÉDUCTION DE LA FATIGUE CARDIAQUE",
        },
      },
      {
        key: "ee894560b9e3",
        title: {
          en: "DECREASES THE RISK OF ARTERIAL THROMBOEMBOLISM",
          fr: "DIMINUE LE RISQUE DE THROMBOEMBOLIE ARTÉRIELLE",
        },
      },
      {
        key: "3c62f8837cf8",
        title: {
          en: "DELAYS THE PROGRESSION OF MYOCARDIAL DAMAGE",
          fr: "RETARDE LA PROGRESSION DES LÉSIONS MYOCARDIQUES",
        },
      },
    ],
    // problemSolution: decisión especial 2 — el ES fuente de este producto es
    // idéntico al de product-canino-cardiac (texto genérico no adaptado a
    // gato). Se traduce fielmente tal cual, sin adaptarlo a la especie.
    problemSolution: [
      {
        key: "caquexia",
        problem: {
          en: "Development of a catabolic state that promotes progressive muscle mass loss (cardiac cachexia); a condition associated with a worse prognosis.",
          fr: "Développement d'un état catabolique favorisant une perte progressive de masse musculaire (cachexie cardiaque), une condition associée à un pronostic plus défavorable.",
        },
        solution: {
          en: "Highly digestible, high biological quality proteins (chicken, turkey, fish, and egg) with essential amino acids to help maintain muscle mass.",
          fr: "Protéines hautement digestibles et de haute qualité biologique (poulet, dinde, poisson et œuf) avec acides aminés essentiels pour contribuer au maintien de la masse musculaire.",
        },
      },
      {
        key: "metabolismo-energetico",
        problem: {
          en: "Altered myocardial energy metabolism (lower efficiency in producing and using ATP). In advanced stages, reduced appetite and the catabolic state compromise energy intake and promote muscle mass loss.",
          fr: "Métabolisme énergétique du myocarde altéré (moindre efficacité à produire et utiliser l'ATP). Aux stades avancés, la baisse de l'appétit et l'état catabolique compromettent l'apport énergétique et favorisent la perte de masse musculaire.",
        },
        solution: {
          en: "A highly digestible diet with adequate energy density, using selected sources of carbohydrates and fats, that helps meet energy needs and limit body catabolism.",
          fr: "Une alimentation hautement digestible et à densité énergétique adaptée, avec des sources sélectionnées de glucides et de lipides, qui contribue à couvrir les besoins énergétiques et à limiter le catabolisme corporel.",
        },
      },
      {
        key: "sodio-electrolitos",
        problem: {
          en: "Sodium and water retention. Diuretic treatment can alter the balance of electrolytes such as potassium and magnesium, which are important for electrical and muscular function.",
          fr: "Rétention de sodium et d'eau. Le traitement diurétique peut modifier l'équilibre d'électrolytes tels que le potassium et le magnésium, importants pour la fonction électrique et musculaire.",
        },
        solution: {
          en: "Moderately restricted dietary sodium that helps manage fluid retention, with controlled levels of potassium and magnesium that maintain adequate electrolyte balance. Supplemented with arginine, a precursor of nitric oxide, to support endothelial and vascular function.",
          fr: "Sodium alimentaire modérément restreint contribuant à la gestion de la rétention hydrique, avec des niveaux contrôlés de potassium et de magnésium maintenant un équilibre électrolytique adéquat. Enrichi en arginine, précurseur du monoxyde d'azote, pour le maintien de la fonction endothéliale et vasculaire.",
        },
      },
      {
        key: "estres-oxidativo",
        problem: {
          en: "Persistent oxidative stress and chronic inflammation contribute to cellular damage and the progression of cardiac dysfunction.",
          fr: "Le stress oxydatif persistant et l'inflammation chronique contribuent aux lésions cellulaires et à la progression de la dysfonction cardiaque.",
        },
        solution: {
          en: "Omega-3s as cardioprotectants, with antiarrhythmic and anti-inflammatory effects, along with taurine and L-carnitine that optimize fat oxidation, stabilize electrical function, and reinforce the cardiac walls.",
          fr: "Oméga-3 comme cardioprotecteurs, aux effets antiarythmiques et anti-inflammatoires, ainsi que taurine et L-carnitine qui optimisent l'oxydation des graisses, stabilisent la fonction électrique et renforcent les parois cardiaques.",
        },
      },
    ],
    technicalResources: [
      {
        key: "52a26709b685",
        title: { en: "Monograph", fr: "Monographie" },
        subtitle: {
          en: "Learn more about the product",
          fr: "En savoir plus sur le produit",
        },
      },
    ],
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR FELINO CARDIAC in a 3:1 ratio and gradually increase the amount. Keep in mind that each cat's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR FELINO CARDIAC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chat varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      noteText: {
        en: "Consult your veterinarian.",
        fr: "Consultez votre vétérinaire.",
      },
      steps: [
        {
          key: "940627efcab8",
          label: { en: "Days 1-3", fr: "Jours 1-3" },
        },
        {
          key: "98a4cad85f55",
          label: { en: "Days 4-6", fr: "Jours 4-6" },
        },
        {
          key: "8787881ee189",
          label: { en: "Days 7-9", fr: "Jours 7-9" },
        },
        {
          key: "0f209feab046",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 6. FELINO Hepatic (felino) ───────────────────────────────────
  {
    id: "product-felino-felino-hepatic",
    name: "FELINO Hepatic (felino)",
    tagline: {
      en: "Continuous therapeutic nutrition for feline liver insufficiency",
      fr: "Nutrition thérapeutique continue pour l'insuffisance hépatique féline",
    },
    description: {
      en: [
        {
          _key: "a6b7c8d9e0f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b6b7c8d9e0f1",
              _type: "span",
              marks: [],
              text: "Formulated for the species-specific hepatic particularities of cats: high protein (28% DM) for the obligate carnivore, which cannot reduce its constitutive protein catabolism; mandatorily supplemented taurine due to its role in biliary conjugation; and methionine as a precursor of glutathione, the main endogenous hepatocellular antioxidant in felines. Also designed to reduce the risk of hepatic lipidosis — the most frequent and severe complication in feline liver disease — while avoiding excessive protein restriction. Silymarin serves as the central hepatoprotectant.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "c6b7c8d9e0f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d6b7c8d9e0f1",
              _type: "span",
              marks: [],
              text: "Formulé pour les particularités hépatiques spécifiques à l'espèce féline : protéines élevées (28 % MS) pour le carnivore strict, incapable de réduire son catabolisme protéique constitutif, taurine supplémentée de manière obligatoire en raison de son rôle dans la conjugaison biliaire, et méthionine comme précurseur du glutathion, principal antioxydant hépatocellulaire endogène félin. Conçu également pour réduire le risque de lipidose hépatique — la complication la plus fréquente et la plus grave de l'hépatopathie féline —, tout en évitant une restriction protéique excessive. La silymarine agit comme hépatoprotecteur central.",
            },
          ],
        },
      ],
    },
    // ingredients: idéntico al de product-felino-felino-cardiac en el
    // mapeo fuente; se transcribe la misma traducción EN/FR ya generada
    // (ver Casos Dudosos del mapeo, punto 5).
    ingredients: {
      en: "Rice, poultry fat, casein, dried egg, fish hydrolysate, potato protein, coconut oil, beet pulp, fish oil, natural chicken flavor, chicory inulin, chicken meat meal, L-arginine, L-isoleucine, cellulose, L-valine, choline, taurine, sodium, potassium, calcium, lysine, L-carnitine, methionine, vitamin A supplement, cholecalciferol, alpha-tocopherol acetate, sodium bisulfite menadione complex, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, vitamin B12 supplement, biotin, vitamin C, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic zinc, ethylenediamine dihydroiodide, Silymarin, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, graisse de volaille, caséine, œuf déshydraté, hydrolysat de poisson, protéine de pomme de terre, huile de coco, pulpe de betterave, huile de poisson, arôme naturel de poulet, inuline de chicorée, farine de viande de poulet, L-arginine, L-isoleucine, cellulose, L-valine, choline, taurine, sodium, potassium, calcium, lysine, L-carnitine, méthionine, supplément de vitamine A, cholécalciférol, acétate d'alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, supplément de vitamine B12, biotine, vitamine C, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, zinc organique, dihydroiodure d'éthylènediamine, Silymarine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    // Warnings: decisión especial 1 — adaptado a especie felina.
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing kittens.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chatons en croissance.",
    },
    claims: [
      {
        key: "9877681f302c",
        text: {
          en: "A 100% species-specific formulation that recognizes cats cannot adapt their metabolism to fasting the way dogs can, and therefore does not aggressively restrict protein.",
          fr: "Formulation 100 % spécifique à l'espèce, qui reconnaît que le chat ne peut pas adapter son métabolisme au jeûne comme le chien, et qui ne restreint donc pas les protéines de manière agressive.",
        },
      },
      {
        key: "7c1d44aed69e",
        text: {
          en: "High protein (min. 28% DM) designed to prevent hepatic lipidosis and sarcopenia, avoiding the classic mistake of restricting protein in feline patients.",
          fr: "Protéines élevées (min. 28 % MS) conçues pour prévenir la lipidose hépatique et la sarcopénie, évitant l'erreur classique de restreindre les protéines chez le patient félin.",
        },
      },
      {
        key: "d5ceeb5b6530",
        text: {
          en: "Taurine + methionine supplemented mandatorily — methionine as a precursor of glutathione, the most relevant endogenous hepatocellular antioxidant in cats, an approach that goes beyond taurine alone.",
          fr: "Taurine + méthionine supplémentées de manière obligatoire — la méthionine comme précurseur du glutathion, l'antioxydant hépatocellulaire endogène le plus important chez le chat, une approche qui va au-delà de la seule taurine.",
        },
      },
      {
        key: "6abb6018a23f",
        text: {
          en: "Silymarin as the central hepatoprotectant, tailored to the particularities of the obligate carnivore.",
          fr: "Silymarine comme hépatoprotecteur central, adapté aux particularités du carnivore strict.",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "3f77d7e141a1",
        label: {
          en: "Food designed to support therapy in adult cats of all breeds undergoing a hepatic condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chats adultes de toutes races présentant une affection hépatique diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "d5061718462f",
        title: { en: "DUAL COPPER CONTROL", fr: "CONTRÔLE DUAL DU CUIVRE" },
        bullets: [
          {
            key: "b6397adec294",
            title: { en: "COPPER < 5 PPM", fr: "CUIVRE < 5 PPM" },
            description: {
              en: "Prevents accumulation and toxic\neffects, reducing hepatic inflammation\nand fibrosis",
              fr: "Prévient l'accumulation et l'effet\ntoxique, réduisant l'inflammation et\nla fibrose hépatique",
            },
          },
          {
            key: "1a7fb6acc308",
            title: { en: "ORGANIC ZINC", fr: "ZINC ORGANIQUE" },
            description: {
              en: "A copper antagonist at the intestinal level",
              fr: "Antagoniste du cuivre au niveau intestinal",
            },
          },
        ],
      },
      {
        key: "05991b48cad6",
        title: {
          en: "AMMONIA DETOXIFICATION",
          fr: "DÉTOXIFICATION DE L'AMMONIAC",
        },
        bullets: [
          {
            key: "01610e9a334e",
            title: { en: "ANIMAL PROTEIN", fr: "PROTÉINE ANIMALE" },
            description: {
              en: "preserves muscle mass and\nreduces the risk of hepatic lipidosis",
              fr: "préserve la masse musculaire et\nréduit le risque de lipidose hépatique",
            },
          },
          {
            key: "30eeca6eb315",
            title: { en: "AMINO ACID PROFILE", fr: "PROFIL D'ACIDES AMINÉS" },
            description: {
              en: "Elevated BCAAs that reduce\nnitrogenous compounds",
              fr: "BCAA élevés qui réduisent les\ncomposés azotés",
            },
          },
          {
            key: "2e5532ce6f2b",
            title: { en: "SOLUBLE FIBER", fr: "FIBRES SOLUBLES" },
            description: {
              en: "Generates an acidic pH that converts\nammonia into ammonium",
              fr: "Génère un pH acide qui transforme\nl'ammoniac en ammonium",
            },
          },
        ],
      },
      {
        key: "614d6d439b72",
        title: {
          en: "ANTI-LIPIDOSIS ENERGY SUPPORT",
          fr: "SOUTIEN ÉNERGÉTIQUE ANTI-LIPIDOSE",
        },
        bullets: [
          {
            key: "278a5286cb1b",
            title: {
              en: "FISH OIL, COCONUT OIL, AND CHICKEN FAT",
              fr: "HUILE DE POISSON, HUILE DE COCO ET GRAISSE DE POULET",
            },
            description: {
              en: "Highly palatable, highly digestible\nenergy that covers nutritional\nrequirements and prevents\nlipid mobilization",
              fr: "Énergie hautement appétente et\ndigestible qui couvre les besoins\nnutritionnels et prévient\nla mobilisation lipidique",
            },
          },
          {
            key: "7706beeb6737",
            title: { en: "L-CARNITINE", fr: "L-CARNITINE" },
            description: {
              en: "Promotes the oxidation of free fatty\nacids in the liver and prevents\ntheir accumulation",
              fr: "Favorise l'oxydation des acides gras\nlibres dans le foie et empêche\nleur accumulation",
            },
          },
        ],
      },
      {
        key: "5249f24c081b",
        title: {
          en: "HEPATOPROTECTION AND REGENERATION",
          fr: "HÉPATOPROTECTION ET RÉGÉNÉRATION",
        },
        bullets: [
          {
            key: "9ea846bc6890",
            title: { en: "SILYMARIN 1000 PPM", fr: "SILYMARINE 1000 PPM" },
            description: {
              en: "An antioxidant that protects the\nhepatocyte, slows inflammation and\nfibrogenesis, and activates\nhepatocyte proliferation",
              fr: "Antioxydant qui protège\nl'hépatocyte, freine l'inflammation et\nla fibrogenèse, et active la\nprolifération hépatocytaire",
            },
          },
          {
            key: "e5b3e4ba52b0",
            title: { en: "CHOLINE", fr: "CHOLINE" },
            description: {
              en: "Helps prevent fat\naccumulation\nin the liver.",
              fr: "Aide à prévenir\nl'accumulation de graisse\ndans le foie.",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "e61a12335956",
        title: {
          en: "REDUCTION OF HEPATIC ENCEPHALOPATHY",
          fr: "RÉDUCTION DE L'ENCÉPHALOPATHIE HÉPATIQUE",
        },
      },
      {
        key: "cbe09b0cba4f",
        title: {
          en: "PREVENTION OF SECONDARY LIPIDOSIS",
          fr: "PRÉVENTION DE LA LIPIDOSE SECONDAIRE",
        },
      },
      {
        key: "4347ed6c5083",
        title: {
          en: "HEPATIC REGENERATION",
          fr: "RÉGÉNÉRATION HÉPATIQUE",
        },
      },
      {
        key: "17e1b01d29fd",
        title: {
          en: "PRESERVATION OF MUSCLE MASS IN THE OBLIGATE CARNIVORE",
          fr: "PRÉSERVATION DE LA MASSE MUSCULAIRE CHEZ LE CARNIVORE STRICT",
        },
      },
    ],
    // problemSolution: decisión especial 2 — el ES fuente es idéntico al de
    // product-canino-acute-hepatic / product-canino-hepatic (texto genérico
    // no adaptado a gato). Se traduce fielmente tal cual.
    problemSolution: [
      {
        key: "proteina",
        problem: {
          en: "Excessive protein restriction leads to muscle mass loss and malnutrition. In patients with hepatic encephalopathy, excess protein can increase ammonia production and worsen clinical signs.",
          fr: "Une restriction protéique excessive entraîne une perte de masse musculaire et une malnutrition. Chez les patients atteints d'encéphalopathie hépatique, un excès de protéines peut augmenter la production d'ammoniac et aggraver les signes cliniques.",
        },
        solution: {
          en: "Highly digestible, high biological quality protein (egg and casein) to maintain muscle mass and nitrogen balance.",
          fr: "Protéines à haute digestibilité et haute qualité biologique (œuf et caséine) pour maintenir la masse musculaire et l'équilibre azoté.",
        },
      },
      {
        key: "energia",
        problem: {
          en: "Maintaining an adequate, highly digestible energy supply to limit catabolism and preserve muscle mass in patients with reduced appetite.",
          fr: "Maintenir un apport énergétique adéquat et hautement digestible pour limiter le catabolisme et préserver la masse musculaire chez les patients à appétit réduit.",
        },
        solution: {
          en: "High energy density (fish oil, coconut oil, chicken fat) and selected carbohydrates (rice and oats) that help adequately cover energy needs.",
          fr: "Densité énergétique élevée (huile de poisson, huile de coco, graisse de poulet) et glucides sélectionnés (riz et avoine) qui contribuent à couvrir de manière adéquate les besoins énergétiques.",
        },
      },
      {
        key: "cobre",
        problem: {
          en: "In liver diseases caused by copper accumulation or altered biliary excretion, copper builds up in hepatocytes, increasing oxidative stress and promoting inflammation, hepatocellular damage, and fibrosis.",
          fr: "Dans les hépatopathies liées à une accumulation de cuivre ou à une altération de son excrétion biliaire, le cuivre s'accumule dans les hépatocytes, augmentant le stress oxydatif et favorisant l'inflammation, les lésions hépatocellulaires et la fibrose.",
        },
        solution: {
          en: "Ingredients naturally low in copper, selected to keep total intake below 5 PPM, with controlled zinc levels that help limit intestinal absorption.",
          fr: "Sélection d'ingrédients naturellement pauvres en cuivre pour maintenir un apport total inférieur à 5 PPM, avec un apport contrôlé de zinc qui contribue à limiter l'absorption intestinale.",
        },
      },
      {
        key: "inflamacion",
        problem: {
          en: "Persistent inflammation and oxidative stress promote hepatocellular damage, fibrosis progression, and loss of liver function.",
          fr: "L'inflammation et le stress oxydatif persistants favorisent les lésions hépatocellulaires, la progression de la fibrose et la perte de fonction hépatique.",
        },
        solution: {
          en: "EPA+DHA as modulators of the inflammatory response; choline and silymarin with antioxidant and hepatoprotective activity.",
          fr: "EPA+DHA comme modulateurs de la réponse inflammatoire ; choline et silymarine aux propriétés antioxydantes et hépatoprotectrices.",
        },
      },
    ],
    // technicalResources: null en Sanity para este producto — no se incluye.
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR FELINO HEPATIC in a 3:1 ratio and gradually increase the amount. Keep in mind that each cat's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR FELINO HEPATIC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chat varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      noteText: {
        en: "Consult your veterinarian.",
        fr: "Consultez votre vétérinaire.",
      },
      steps: [
        {
          key: "04151eabf404",
          label: { en: "Day 1–3", fr: "Jour 1–3" },
        },
        {
          key: "8d90fbc2b850",
          label: { en: "Day 4–6", fr: "Jour 4–6" },
        },
        {
          key: "702f12f5fe93",
          label: { en: "Day 7–9", fr: "Jour 7–9" },
        },
        {
          key: "87381bcf57d2",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },

  // ── 7. FELINO Hypoallergenic (felino) ────────────────────────────
  {
    id: "product-felino-felino-hypoallergenic",
    name: "FELINO Hypoallergenic (felino)",
    tagline: {
      en: "Clinical nutrition that supports hypoallergenic therapy in felines",
      fr: "Nutrition clinique qui accompagne la thérapie hypoallergénique chez les félins",
    },
    description: {
      en: [
        {
          _key: "a7b8c9d0e1f2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "b7b8c9d0e1f2",
              _type: "span",
              marks: [],
              text: "Formulated for the species-specific particularities of cats with adverse food reactions. Its central active ingredient is hydrolyzed salmon protein as the sole source, with a lower likelihood of being recognized as an antigen. It includes mandatorily supplemented taurine, high protein (30% DM) for the obligate carnivore, and intestinal barrier support with five components (glutamine, sodium butyrate, FOS, MOS, and chicory inulin). Designed for use as a diagnostic elimination diet for 8–12 weeks and as long-term nutritional management.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "c7b8c9d0e1f2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "d7b8c9d0e1f2",
              _type: "span",
              marks: [],
              text: "Formulé pour les particularités spécifiques à l'espèce féline en cas de réaction alimentaire indésirable. Son principe actif central est la protéine de saumon hydrolysée comme source unique, avec une probabilité moindre d'être reconnue comme antigène. Il comprend de la taurine supplémentée de manière obligatoire, des protéines élevées (30 % MS) pour le carnivore strict, et un soutien de la barrière intestinale avec cinq composants (glutamine, butyrate de sodium, FOS, MOS et inuline de chicorée). Conçu pour être utilisé comme régime d'élimination diagnostique de 8 à 12 semaines et comme prise en charge nutritionnelle à long terme.",
            },
          ],
        },
      ],
    },
    ingredients: {
      en: "Hydrolyzed salmon, tapioca, poultry fat, pregelatinized corn starch, beet pulp, calcium orthophosphate, cellulose, fish oil, natural hydrolyzed palatant, potassium chloride, chicory inulin, calcium, glutamine, methionine, mannan-oligosaccharides, lysine, choline chloride, taurine, L-arginine, threonine, tryptophan, sodium butyrate, L-carnitine, fructo-oligosaccharides, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, sodium bisulfite menadione complex, thiamine mononitrate, riboflavin, niacin, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, ethylenediamine dihydroiodide, Yucca schidigera extract, Scutellaria baicalensis, rosemary and tocopherols as preservatives.",
      fr: "Saumon hydrolysé, tapioca, graisse de volaille, amidon de maïs prégélatinisé, pulpe de betterave, orthophosphate de calcium, cellulose, huile de poisson, appétant naturel hydrolysé, chlorure de potassium, inuline de chicorée, calcium, glutamine, méthionine, mannane-oligosaccharides, lysine, chlorure de choline, taurine, L-arginine, thréonine, tryptophane, butyrate de sodium, L-carnitine, fructo-oligosaccharides, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, Scutellaria baicalensis, romarin et tocophérols comme conservateurs.",
    },
    // Warnings: decisión especial 1 — adaptado a especie felina.
    warnings: {
      en: "Not recommended for pregnant or lactating females, or for growing kittens.",
      fr: "Non recommandé pour les femelles gestantes, allaitantes, ni pour les chatons en croissance.",
    },
    claims: [
      {
        key: "05f5e4a40cd9",
        text: {
          en: "A single protein source of hydrolyzed salmon, instead of plant or poultry sources — with a lower likelihood of cross-reactivity in cats sensitized to avian proteins (one of the most commonly reported allergens in felines).",
          fr: "Source protéique unique de saumon hydrolysé, plutôt que des sources végétales ou aviaires — avec une probabilité moindre de réactivité croisée chez les chats sensibilisés aux protéines aviaires (l'un des allergènes les plus fréquemment rapportés chez les félins).",
        },
      },
      {
        key: "5d387061749b",
        text: {
          en: "High protein (30% DM) tailored to the needs of the obligate carnivore, avoiding the excessive protein restriction that can compromise feline muscle mass during weeks on an elimination diet.",
          fr: "Protéines élevées (30 % MS) adaptées aux besoins du carnivore strict, évitant la restriction protéique excessive susceptible de compromettre la masse musculaire féline pendant les semaines de régime d'élimination.",
        },
      },
      {
        key: "e3b24c374010",
        text: {
          en: "Taurine supplemented mandatorily, a species-specific requirement that not every elimination formula prioritizes as a core pillar.",
          fr: "Taurine supplémentée de manière obligatoire, une exigence spécifique à l'espèce que toutes les formules d'élimination ne considèrent pas comme un pilier central.",
        },
      },
      {
        key: "d07243b23541",
        text: {
          en: "Intestinal barrier support with five components (glutamine, sodium butyrate, FOS, MOS, chicory inulin).",
          fr: "Soutien de la barrière intestinale avec cinq composants (glutamine, butyrate de sodium, FOS, MOS, inuline de chicorée).",
        },
      },
    ],
    clinicalIndications: [
      {
        key: "7708d602404e",
        label: {
          en: "Food designed to support therapy in adult cats of all breeds undergoing a food allergy condition clinically diagnosed by a veterinarian.",
          fr: "Aliment conçu pour accompagner la thérapie des chats adultes de toutes races présentant une allergie alimentaire diagnostiquée cliniquement par un vétérinaire.",
        },
      },
    ],
    differentiators: [
      {
        key: "fa4abf360941",
        title: { en: "ANTIGENIC CONTROL", fr: "CONTRÔLE ANTIGÉNIQUE" },
        bullets: [
          {
            key: "06d58cac3532",
            title: { en: "MADE WITH", fr: "ÉLABORÉ AVEC" },
            description: {
              en: "100% hydrolyzed protein with no\nrecognizable epitopes",
              fr: "Protéine 100 % hydrolysée sans\népitopes reconnaissables",
            },
          },
          {
            key: "f0c2a010cb35",
            title: { en: "HYDROLYZED SALMON", fr: "SAUMON HYDROLYSÉ" },
            description: {
              en: "as the sole protein source",
              fr: "comme seule source protéique",
            },
          },
        ],
      },
      {
        key: "bbc1aefe7f47",
        title: {
          en: "INFLAMMATORY AND OXIDATIVE MODULATION",
          fr: "MODULATION INFLAMMATOIRE ET OXYDATIVE",
        },
        bullets: [
          {
            key: "dafe88630342",
            title: { en: "EPA + DHA", fr: "EPA + DHA" },
            description: {
              en: "Modulate the inflammatory\nresponse to relieve\npruritus",
              fr: "Modulent la réponse\ninflammatoire pour soulager\nle prurit",
            },
          },
          {
            key: "2080d2e4ae73",
            title: {
              en: "SCUTELLARIA BAICALENSIS",
              fr: "SCUTELLARIA BAICALENSIS",
            },
            description: {
              en: "Modulates the cutaneous allergic cascade",
              fr: "Module la cascade allergique cutanée",
            },
          },
          {
            key: "f35811ef70de",
            title: { en: "VITAMIN E", fr: "VITAMINE E" },
            description: {
              en: "Protects cell\nmembranes",
              fr: "Protège les membranes\ncellulaires",
            },
          },
          {
            key: "164fd9f09107",
            title: { en: "ORGANIC SELENIUM", fr: "SÉLÉNIUM ORGANIQUE" },
            description: {
              en: "Activates GPx — the enzyme that\nneutralizes the specific oxidant",
              fr: "Active la GPx, enzyme qui\nneutralise l'oxydant spécifique",
            },
          },
        ],
      },
      {
        key: "6ba868ba3644",
        title: { en: "BARRIER REPAIR", fr: "RÉPARATION DES BARRIÈRES" },
        bullets: [
          {
            key: "1559b9a78173",
            title: { en: "ORGANIC ZINC + BIOTIN", fr: "ZINC ORGANIQUE + BIOTINE" },
            description: {
              en: "Skin barrier recovery through\nactivation of ceramide and\nkeratin synthesis",
              fr: "Récupération de la barrière\ncutanée par l'activation de la\nsynthèse des céramides et de la kératine",
            },
          },
          {
            key: "30ead3d9e019",
            title: {
              en: "GLUTAMINE + BUTYRATE + L-CARNITINE",
              fr: "GLUTAMINE + BUTYRATE + L-CARNITINE",
            },
            description: {
              en: "Intestinal barrier regeneration\nto prevent antigen\npassage",
              fr: "Régénération de la barrière\nintestinale pour empêcher le passage\ndes antigènes",
            },
          },
        ],
      },
    ],
    mechanismOfAction: [
      {
        key: "caa86d54d1d8",
        title: {
          en: "REDUCTION OF PRURITUS AND ASSOCIATED SKIN LESIONS",
          fr: "RÉDUCTION DU PRURIT ET DES LÉSIONS CUTANÉES ASSOCIÉES",
        },
      },
      {
        key: "730277642d5f",
        title: {
          en: "SKIN AND COAT RECOVERY",
          fr: "RÉCUPÉRATION DE LA PEAU ET DU PELAGE",
        },
      },
      {
        key: "9ccd98d078bb",
        title: {
          en: "REDUCTION OF DIGESTIVE SIGNS",
          fr: "DIMINUTION DES SIGNES DIGESTIFS",
        },
      },
      {
        key: "33b337b24d20",
        title: {
          en: "CONTROL OF COMPULSIVE GROOMING",
          fr: "CONTRÔLE DU LÉCHAGE COMPULSIF",
        },
      },
    ],
    // problemSolution: decisión especial 2 — el ES fuente es idéntico al de
    // product-canino-hypoallergenic. Se traduce fielmente tal cual.
    problemSolution: [
      {
        key: "proteinas-antigenicas",
        problem: {
          en: "Dietary proteins can trigger adverse reactions in sensitized patients. Beef, dairy, chicken, and wheat are the most frequently associated.",
          fr: "Les protéines alimentaires peuvent déclencher des réactions indésirables chez les patients sensibilisés. Le bœuf, les produits laitiers, le poulet et le blé sont les plus fréquemment associés.",
        },
        solution: {
          en: "Hydrolyzed salmon as a selected protein source to reduce exposure to potentially antigenic intact proteins. Tapioca and highly purified corn starch as highly digestible carbohydrate sources.",
          fr: "Saumon hydrolysé comme source protéique sélectionnée pour réduire l'exposition aux protéines intactes potentiellement antigéniques. Tapioca et amidon de maïs hautement purifié comme sources de glucides hautement digestibles.",
        },
      },
      {
        key: "barrera-intestinal",
        problem: {
          en: "Impaired intestinal barrier function can increase the immune system's exposure to dietary antigens and contribute to the loss of oral tolerance.",
          fr: "L'altération de la barrière intestinale peut augmenter l'exposition du système immunitaire aux antigènes alimentaires et contribuer à la perte de la tolérance orale.",
        },
        solution: {
          en: "Glutamine, butyrate, and inulin to support intestinal barrier integrity and function; EPA+DHA to modulate the inflammatory response; and zinc and biotin as essential nutrients for maintaining skin and coat integrity.",
          fr: "Glutamine, butyrate et inuline pour soutenir l'intégrité et la fonction de la barrière intestinale ; EPA+DHA pour moduler la réponse inflammatoire ; et zinc et biotine comme nutriments essentiels au maintien de l'intégrité de la peau et du pelage.",
        },
      },
    ],
    // technicalResources: null en Sanity para este producto — no se incluye.
    transitionGuide: {
      title: {
        en: "Dietary transition guide",
        fr: "Guide de transition alimentaire",
      },
      noteBold: {
        en: "Any change in diet should be gradual. Mix the previous food with NUPECMR FELINO HYPOALLERGENIC in a 3:1 ratio and gradually increase the amount. Keep in mind that each cat's nutritional needs vary depending on size, sex, breed, activity level, physiological stage, and ambient temperature.",
        fr: "Tout changement alimentaire doit être progressif. Mélangez l'ancien aliment avec NUPECMR FELINO HYPOALLERGENIC dans une proportion de 3 pour 1, puis augmentez la quantité progressivement. Gardez à l'esprit que les besoins nutritionnels de chaque chat varient selon la taille, le sexe, la race, l'activité, le stade physiologique et la température ambiante.",
      },
      steps: [
        {
          key: "73c92a356cb8",
          label: { en: "Day 1–3", fr: "Jour 1–3" },
        },
        {
          key: "df241e564898",
          label: { en: "Day 4–6", fr: "Jour 4–6" },
        },
        {
          key: "0440bb1010be",
          label: { en: "Day 7–9", fr: "Jour 7–9" },
        },
        {
          key: "03bd1b994628",
          label: { en: "Day 10", fr: "Jour 10" },
        },
      ],
    },
  },
];
