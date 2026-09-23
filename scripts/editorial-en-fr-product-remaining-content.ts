/**
 * NUPEC – Contenido EN/FR (traducción adaptada, no literal) de los 27
 * productos publicados restantes: nutricion-especializada (14: 9 canino +
 * 5 felino), suplementos (4, solo canino), alimentos-humedos (9: 5 canino
 * + 4 felino).
 *
 * Último tramo de product.ts — completa junto con los lotes anteriores
 * (21 de nutricion-diaria+premios-funcionales, 7 de nutricion-clinica) los
 * 56 productos publicados del catálogo.
 *
 * Campos cubiertos (solo los que faltaban en Sanity): name (2 productos
 * húmedos caninos sin en/fr), tagline, description (rich text), ingredients,
 * claims, highTech, keyBenefits, kibble.description.
 *
 * `warnings` NO se incluye en este lote: el schema de estos 27 productos
 * (a diferencia de otros lotes) solo tiene `warnings.es`, sin campos
 * `warnings.en`/`warnings.fr` — no hay nada que traducir ahí.
 *
 * CORRECCIONES DE ES aplicadas antes de traducir (documentadas en detalle
 * en README-traduccion-editorial.md):
 * 1. `fec6eebd-bcfa-45fb-a817-67ca4fb3a527` (Vitality Water Sabor Frutal):
 *    description.es decía "Sabor carne" (copy-paste de "Sabor Carne"), se
 *    corrigió a "Sabor frutal". Este archivo traduce sobre el ES corregido.
 * 2. `product-felino-felino-humedo-indoor`: warnings.es tenía el texto
 *    completo duplicado dos veces consecutivas, se corrigió a una sola
 *    copia. warnings no se traduce en este lote, no afecta este archivo.
 * 3. `21d2abd4-ec74-4c79-8a7b-03a771da3d72` (Felino Hairball): era el único
 *    de los 27 sin warnings.es — el usuario lo completó manualmente.
 *    warnings no se traduce en este lote, no afecta este archivo.
 * 4. `product-canino-renal-care`.keyBenefits[_key="888db60121d7"]: tenía un
 *    carácter de control invisible (\u0003) incrustado en description.es
 *    ("Disminución del\u0003 trabajo renal."), se limpió a "Disminución del
 *    trabajo renal." antes de traducir.
 *
 * Sigue el mismo patrón de tipos que
 * scripts/editorial-en-fr-product-daily-treats-content.ts.
 *
 * Reglas de contenido: traducción adaptada (no literal), nunca se toca
 * `es`, solo se incluye lo realmente faltante. "NUPECMR"/"NUPEC®" en
 * `description` (Portable Text) se colapsa a un solo span "NUPEC®" en
 * EN/FR, salvo cuando el ES usa el mark `em` sobre una palabra que no es
 * el marcador de marca (ej. "Adulto" en product-canino-renal-care), en
 * cuyo caso ese mark se preserva.
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
  nameField?: LangText; // solo en los 2 productos con `name` faltante
  tagline?: LangText;
  description?: { en: PortableTextBlock[]; fr: PortableTextBlock[] };
  ingredients?: LangText;
  highTech?: HighTechPatch[];
  keyBenefits?: KeyBenefitPatch[];
  claims?: ClaimPatch[];
  kibbleDescription?: LangText;
};

export const PRODUCT_REMAINING_CONTENT_PATCHES: ProductContentPatch[] = [
  // ══════════════ CANINO NUTRICIÓN ESPECIALIZADA (9) ══════════════
  {
    id: "product-canino-1st-care",
    name: "1st Care",
    tagline: {
      en: "We strengthen your puppy's immune system with an exclusive formula",
      fr: "Nous renforçons le système immunitaire de votre chiot grâce à une formule exclusive",
    },
    description: {
      en: [
        {
          _key: "0b436773281b",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "0f5f8071d964",
              _type: "span",
              marks: [],
              text: "At NUPEC® we understand how critical nutrition is during a puppy's first six months of life. This is when dogs need to strengthen their defenses to guarantee optimal development in every stage that follows. That's why we created NUPEC® 1st CARE, a food with natural antibodies that helps strengthen your puppy's immune system.",
            },
          ],
        },
      ],
      fr: [
        {
          _key: "843fe30273ea",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "cb9940abd2fe",
              _type: "span",
              marks: [],
              text: "Chez NUPEC®, nous savons à quel point la nutrition est déterminante durant les six premiers mois de vie du chiot. C'est à ce stade que le chien doit renforcer ses défenses pour garantir un développement optimal dans les étapes suivantes de sa vie. C'est pourquoi nous avons créé NUPEC® 1st CARE, un aliment riche en anticorps naturels qui aide à renforcer le système immunitaire de votre chiot.",
            },
          ],
        },
      ],
    },
    claims: [
      {
        key: "97bcb195b8d6",
        text: {
          en: "Advanced, balanced formula with high energy content.",
          fr: "Formule avancée et équilibrée, à forte teneur énergétique.",
        },
      },
    ],
    highTech: [
      {
        key: "c43b5f5c5f86",
        title: {
          en: "Immune system strengthening — Increased natural antibodies",
          fr: "Renforcement du système immunitaire — Augmentation des anticorps naturels",
        },
        description: {
          en: "A puppy's immune system is still developing during its first weeks of life. That's why we created NUPEC® 1st CARE, a food that helps strengthen your young pet's antibodies.",
          fr: "Le système immunitaire du chiot est encore en développement durant ses premières semaines de vie. C'est pourquoi nous avons créé NUPEC® 1st CARE, un aliment qui aide à renforcer les anticorps de votre jeune compagnon.",
        },
      },
      {
        key: "758c33298336",
        title: {
          en: "Improves vaccine response",
          fr: "Améliore la réponse vaccinale",
        },
        description: {
          en: "NUPEC® 1st CARE, with its specialized IMMUNITY PLUS® formula, is designed to reduce the risk of viral and bacterial infections, supporting optimal puppy development, boosting the effect of the vaccination program, and preparing puppies to fight off the most common diseases of early life.",
          fr: "NUPEC® 1st CARE, avec sa formule spécialisée IMMUNITY PLUS®, est conçu pour réduire le risque d'infections virales et bactériennes, en favorisant le développement optimal du chiot, en renforçant l'efficacité du protocole de vaccination et en le préparant à lutter contre les maladies les plus courantes de la petite enfance.",
        },
      },
      {
        key: "13717c57c485",
        title: {
          en: "Helps deactivate intestinal pathogens, improving digestion",
          fr: "Aide à neutraliser les agents pathogènes intestinaux, améliorant la digestion",
        },
        description: {
          en: "A formula rich in IgY immunoglobulins from hyperimmunized egg.",
          fr: "Une formule riche en immunoglobulines IgY issues d'œuf hyperimmunisé.",
        },
      },
      {
        key: "93dcf064b709",
        title: {
          en: "Specialized nutrition",
          fr: "Nutrition spécialisée",
        },
        description: {
          en: "With the right balance of highly digestible protein, fat, lactose, and immunomodulators",
          fr: "Avec un équilibre adapté de protéines hautement digestibles, de matières grasses, de lactose et d'immunomodulateurs",
        },
      },
    ],
    // highTechTitleOverride ya completo es/en/fr — NO TOCAR
    ingredients: {
      en: "Chicken meat meal, rice, chicken fat, corn, vegetable protein concentrate, beet pulp, natural chicken flavor, dehydrated whole egg, lactose, fish oil, phosphorus, sodium, potassium, chicory root extract, mannan-oligosaccharides, choline chloride, L-taurine, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, EDDI, L-carnitine, Yucca schidigera extract, rosemary and tocopherols blend as preservatives.",
      fr: "Farine de viande de poulet, riz, graisse de poulet, maïs, concentré de protéines végétales, pulpe de betterave, arôme naturel de poulet, œuf entier déshydraté, lactose, huile de poisson, phosphore, sodium, potassium, extrait de racine de chicorée, mannane-oligosaccharides, chlorure de choline, L-taurine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, EDDI, L-carnitine, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "91ed9f689344", description: { en: "Improves colostrum quality", fr: "Améliore la qualité du colostrum" } },
      { key: "5d068105446c", description: { en: "Strengthens the immune system", fr: "Renforce le système immunitaire" } },
      { key: "7bbba28922b5", description: { en: "Strengthens the digestive system", fr: "Renforce le système digestif" } },
    ],
    kibbleDescription: {
      en: "Immunoglobulins and lactose are added at room temperature to preserve their full benefits.\n\nA dual-texture kibble — crunchy outside and softer inside — for easy eating.",
      fr: "Les immunoglobulines et le lactose sont incorporés à température ambiante afin de préserver l'intégrité de leurs bienfaits.\n\nCroquette à double texture, croustillante à l'extérieur et plus tendre à l'intérieur, pour faciliter la prise alimentaire.",
    },
  },
  {
    id: "product-canino-digestive-health",
    name: "Digestive Health (canino)",
    tagline: {
      en: "Specialized nutrition to support digestive health in dogs",
      fr: "Nutrition spécialisée pour accompagner la santé digestive du chien",
    },
    description: {
      en: [
        {
          _key: "9bf18842b386",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "9662d8ca9174", _type: "span", marks: [], text: "A food that helps support digestive health in dogs." }],
        },
      ],
      fr: [
        {
          _key: "a24225126e49",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "010c09c44770", _type: "span", marks: [], text: "Un aliment qui contribue à la santé digestive du chien." }],
        },
      ],
    },
    highTech: [
      { key: "419d5afaf056", title: { en: "PREBIOTICS", fr: "PRÉBIOTIQUES" }, description: { en: "Help promote a balanced gut microbiota.", fr: "Favorisent l'équilibre du microbiote intestinal." } },
      { key: "e2a249e1e50d", title: { en: "NUTRIENTS", fr: "NUTRIMENTS" }, description: { en: "Easy to digest and absorb.\n*Compared to NUPEC® Adult.", fr: "Faciles à digérer et à assimiler.\n*Par rapport à NUPEC® Adulte." } },
      { key: "f629a1dc5e6f", title: { en: "COMBINATION", fr: "COMBINAISON" }, description: { en: "Of soluble and insoluble fiber.", fr: "De fibres solubles et insolubles." } },
      { key: "c82735c096bf", title: { en: "HIGH CALORIC CONTENT*", fr: "FORTE DENSITÉ CALORIQUE*" }, description: { en: "*Compared to NUPEC® Adult.", fr: "*Par rapport à NUPEC® Adulte." } },
    ],
    ingredients: {
      en: "Rice, chicken meat meal, corn, chicken fat, soy protein concentrate, hydrolyzed chicken protein, beet pulp, brewer's yeast, fish meal, natural chicken flavor, fish oil, egg meal, fish hydrolysate, phosphorus, sodium, mannan-oligosaccharides, fructo-oligosaccharides, cellulose, lysine, methionine, taurine, glutamine, threonine, choline chloride, calcium, potassium, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de viande de poulet, maïs, graisse de poulet, concentré de protéines de soja, protéine hydrolysée de poulet, pulpe de betterave, levure de bière, farine de poisson, arôme naturel de poulet, huile de poisson, farine d'œuf, hydrolysat de poisson, phosphore, sodium, mannane-oligosaccharides, fructo-oligosaccharides, cellulose, lysine, méthionine, taurine, glutamine, thréonine, chlorure de choline, calcium, potassium, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "5bdbab800a27", description: { en: "OMEGA 3 & 6 FATTY ACIDS Help reduce inflammation in the digestive tract.", fr: "ACIDES GRAS OMÉGA 3 ET 6 Aident à réduire l'inflammation du tube digestif." } },
      { key: "d0547bcce163", description: { en: "PREBIOTICS Promote the growth of beneficial bacteria.", fr: "PRÉBIOTIQUES Favorisent le développement des bactéries bénéfiques." } },
      { key: "2b64550ba442", description: { en: "GLUTAMINE Provides energy to the enterocytes.", fr: "GLUTAMINE Fournit de l'énergie aux entérocytes." } },
      { key: "96845e2d3229", description: { en: "Yucca schidigera Helps reduce stool odor.", fr: "Yucca schidigera Aide à réduire les odeurs des selles." } },
      { key: "939fa60d86c9", description: { en: "HIGH PALATABILITY An appealing taste that stimulates your dog's appetite.", fr: "HAUTE PALATABILITÉ Une saveur attrayante qui stimule l'appétit du chien." } },
    ],
    // kibble: null — no aplica
  },
  {
    id: "product-canino-high-performance",
    name: "High Performance",
    tagline: {
      en: "Nutrition for active, high-performance dogs",
      fr: "Une nutrition pour les chiens actifs et à haute performance",
    },
    description: {
      en: [
        {
          _key: "de659d55c9dd",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "b1adc7395769", _type: "span", marks: [], text: "At NUPEC® we know that dogs with intense physical activity need a higher nutrient intake. That's why we formulated a specialized nutrition that improves performance, supports muscle development, and protects joints." }],
        },
      ],
      fr: [
        {
          _key: "dacee3e367f6",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "4e078e71c829", _type: "span", marks: [], text: "Chez NUPEC®, nous savons qu'un chien soumis à une activité physique intense a besoin d'un apport nutritionnel plus élevé. C'est pourquoi nous avons formulé une nutrition spécialisée qui améliore ses performances, favorise le développement musculaire et protège ses articulations." }],
        },
      ],
    },
    highTech: [
      { key: "0ee0f1d1e1c4", title: { en: "BETTER PERFORMANCE", fr: "MEILLEURE PERFORMANCE" }, description: { en: "High protein (30%) and fat (22%) content for dogs engaged in high-performance activities or that need a higher nutrient intake.", fr: "Forte teneur en protéines (30 %) et en matières grasses (22 %) pour les chiens soumis à des activités de haute performance ou nécessitant un apport nutritionnel plus élevé." } },
      { key: "23aa77ce19ca", title: { en: "MUSCLE SUPPORT AND OPTIMAL RECOVERY", fr: "SOUTIEN MUSCULAIRE ET RÉCUPÉRATION OPTIMALE" }, description: { en: "Animal-based protein as the first ingredient helps strengthen muscle mass during exercise.\nFast energy recovery thanks to the replenishment of carbohydrates, protein, and fat used during exercise.", fr: "Une protéine d'origine animale en premier ingrédient contribue au renforcement de la masse musculaire pendant l'effort.\nRécupération énergétique rapide grâce au rétablissement des glucides, protéines et graisses utilisés pendant l'exercice." } },
      { key: "372a2350437e", title: { en: "JOINT, DIGESTIVE, AND CARDIOVASCULAR PROTECTION", fr: "PROTECTION ARTICULAIRE, DIGESTIVE ET CARDIOVASCULAIRE" }, description: { en: "Omega 3 provides an anti-inflammatory action that protects the joints and helps prevent cardiovascular problems.\nBalanced fiber levels support a healthy gut microbiota, helping avoid digestive issues linked to the stress of intense physical activity.", fr: "L'oméga 3 exerce une action anti-inflammatoire qui protège les articulations et aide à prévenir les problèmes cardiovasculaires.\nUne nutrition aux niveaux de fibres adaptés favorise une bonne microbiote, évitant les troubles digestifs liés au stress de l'activité physique intense." } },
      { key: "fe31fb8ea271", title: { en: "GLUCOSAMINE, CHONDROITIN, AND L-CARNITINE", fr: "GLUCOSAMINE, CHONDROÏTINE ET L-CARNITINE" }, description: { en: "Glucosamine and Chondroitin as supplements to protect joint integrity.\nL-Carnitine promotes better fat utilization.", fr: "Glucosamine et Chondroïtine, des compléments qui protègent l'intégrité des articulations.\nL-Carnitine, qui favorise une meilleure utilisation des graisses." } },
    ],
    ingredients: {
      en: "Chicken meat meal, rice, chicken, chicken fat, vegetable protein concentrate, oats, beet pulp, flaxseed, natural chicken flavor, fish oil, mannan-oligosaccharides, phosphorus, sodium, potassium, chicory root extract, lysine, methionine, L-taurine, choline chloride, glucosamine, L-carnitine, chondroitin sulfate, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, organic iron, organic manganese, organic selenium, organic copper, organic zinc, EDDI, Yucca schidigera extract, rosemary and tocopherols blend as preservatives.",
      fr: "Farine de viande de poulet, riz, poulet, graisse de poulet, concentré de protéines végétales, avoine, pulpe de betterave, graine de lin, arôme naturel de poulet, huile de poisson, mannane-oligosaccharides, phosphore, sodium, potassium, extrait de racine de chicorée, lysine, méthionine, L-taurine, chlorure de choline, glucosamine, L-carnitine, sulfate de chondroïtine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, fer organique, manganèse organique, sélénium organique, cuivre organique, zinc organique, EDDI, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "dd62fd0b4452", description: { en: "Intestinal health", fr: "Santé intestinale" } },
      { key: "a721c3ce847a", description: { en: "Cardiovascular care", fr: "Soutien cardiovasculaire" } },
      { key: "8b00f8a67f02", description: { en: "Joint protection", fr: "Protection des articulations" } },
      { key: "9c4882e123b6", description: { en: "Muscle mass strengthening", fr: "Renforcement de la masse musculaire" } },
    ],
    kibbleDescription: {
      en: "The size and texture of each kibble are specially designed for the jaw and digestive tract of an adult dog.",
      fr: "La taille et la texture de chaque croquette sont spécialement conçues pour la mâchoire et le système digestif du chien adulte.",
    },
  },
  {
    id: "product-canino-renal-care",
    name: "Renal Care (canino)",
    tagline: {
      en: "Specialized nutrition to support kidney care in dogs",
      fr: "Nutrition spécialisée pour accompagner le soin rénal du chien",
    },
    description: {
      en: [
        {
          _key: "1594442fb03a",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "f2cc11092b83", _type: "span", marks: [], text: "Formulated with controlled levels of highly digestible protein to help reduce the kidney's nitrogen-filtration workload. Limited mineral levels in the diet help slow the progression of kidney disease. Its high caloric density* formula delivers the energy and nutrients your dog needs in a smaller portion of food, helping offset the reduced appetite seen in dogs affected by kidney disease.\n\n*Compared to NUPEC® " },
            { _key: "113c400945a6", _type: "span", marks: ["em"], text: "Adult" },
            { _key: "e20c1824614a", _type: "span", marks: [], text: "\n" },
          ],
        },
      ],
      fr: [
        {
          _key: "af8a7318a77b",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "3890f2440b8d", _type: "span", marks: [], text: "Formulé avec des niveaux contrôlés de protéines hautement digestibles qui aident à réduire la surcharge de travail rénal liée à la filtration de l'azote. Les niveaux limités de minéraux de la formule aident à ralentir la progression de la maladie rénale. Sa formule à haute densité calorique* apporte l'énergie et les nutriments nécessaires dans une petite portion d'aliment, ce qui aide à compenser la diminution de l'appétit chez les chiens atteints d'une maladie rénale.\n\n*Par rapport à NUPEC® " },
            { _key: "22887884765b", _type: "span", marks: ["em"], text: "Adulte" },
            { _key: "af81c0e19f2d", _type: "span", marks: [], text: "\n" },
          ],
        },
      ],
    },
    highTech: [
      { key: "07837620de76", title: { en: "PROTEIN RESTRICTION", fr: "RESTRICTION PROTÉIQUE" } },
      { key: "898ae9beb0b8", title: { en: "HIGH CALORIC CONTENT*", fr: "FORTE DENSITÉ CALORIQUE*" }, description: { en: "To help offset reduced appetite.\n*Compared to NUPEC® Adult.", fr: "Pour compenser la diminution de l'appétit.\n*Par rapport à NUPEC® Adulte." } },
      { key: "2913a0d63846", title: { en: "LOW* MINERAL INCLUSION", fr: "FAIBLE* TENEUR EN MINÉRAUX" }, description: { en: "*Compared to NUPEC® Adult.", fr: "*Par rapport à NUPEC® Adulte." } },
    ],
    ingredients: {
      en: "Rice, corn, chicken meat meal, chicken fat, egg meal, beet pulp, fish meal, corn gluten, fish oil, natural chicken flavor, cellulose, potassium, calcium, sodium, fructo-oligosaccharides, mannan-oligosaccharides, choline chloride, methionine, lysine, L-carnitine, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, maïs, farine de viande de poulet, graisse de poulet, farine d'œuf, pulpe de betterave, farine de poisson, gluten de maïs, huile de poisson, arôme naturel de poulet, cellulose, potassium, calcium, sodium, fructo-oligosaccharides, mannane-oligosaccharides, chlorure de choline, méthionine, lysine, L-carnitine, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "4bc8c1a2ed6d", description: { en: "OMEGA 3 FATTY ACIDS Help reduce kidney inflammation.", fr: "ACIDES GRAS OMÉGA 3 Aident à réduire l'inflammation rénale." } },
      { key: "888db60121d7", description: { en: "PROTEIN RESTRICTION Reduces the kidneys' workload.", fr: "RESTRICTION PROTÉIQUE Réduit la charge de travail rénale." } },
      { key: "4350ee9f0fec", description: { en: "PREBIOTICS Stimulate the growth of beneficial bacteria.", fr: "PRÉBIOTIQUES Stimulent le développement des bactéries bénéfiques." } },
      { key: "532055780aad", description: { en: "L-CARNITINE Promotes fat metabolism.", fr: "L-CARNITINE Favorise le métabolisme des graisses." } },
      { key: "2265e7a52035", description: { en: "Yucca schidigera Helps reduce stool odor.", fr: "Yucca schidigera Aide à réduire les odeurs des selles." } },
      { key: "b7848094feb0", description: { en: "HIGH PALATABILITY An appealing taste that stimulates your dog's appetite.", fr: "HAUTE PALATABILITÉ Une saveur attrayante qui stimule l'appétit du chien." } },
    ],
    // kibble: null — no aplica
  },
  {
    id: "product-canino-sensitive",
    name: "Sensitive (canino)",
    tagline: {
      en: "A diet that supports the management of food allergies",
      fr: "Une alimentation qui accompagne la prise en charge des allergies alimentaires",
    },
    description: {
      en: [
        {
          _key: "a4fce35391eb",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "bdbf01d722e1", _type: "span", marks: [], text: "At NUPEC® we know that dogs can develop sensitivities to certain foods. That's why we developed a specialized formula with hypoallergenic ingredients that support the management of food allergies.\n" }],
        },
      ],
      fr: [
        {
          _key: "127483089241",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "ad88f75efa58", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que les chiens peuvent développer des sensibilités à certains aliments. C'est pourquoi nous avons mis au point une formule spécialisée à base d'ingrédients hypoallergéniques qui accompagne la prise en charge des allergies alimentaires.\n" }],
        },
      ],
    },
    highTech: [
      { key: "85dbec22bbb1", title: { en: "PROTEIN FOR DELICATE SKIN", fr: "PROTÉINE POUR PEAU SENSIBLE" }, description: { en: "Made with proteins that provide ideal nutrition for dogs with sensitive skin.\nOver 90% protein digestibility.", fr: "Élaboré avec des protéines offrant une alimentation idéale pour les chiens à peau sensible.\nPlus de 90 % de digestibilité protéique." } },
      { key: "97019b6e4985", title: { en: "FORMULA RICH IN OMEGA 3 AND 6", fr: "FORMULE RICHE EN OMÉGA 3 ET 6" }, description: { en: "Stimulate the immune system and help control and prevent skin conditions.", fr: "Stimulent le système immunitaire et contribuent au contrôle et à la prévention des affections cutanées." } },
      { key: "35f113b858bf", title: { en: "VITAMINS, MINERALS, AND FATTY ACIDS", fr: "VITAMINES, MINÉRAUX ET ACIDES GRAS" }, description: { en: "Protect and maintain healthy skin and coat.", fr: "Protègent et maintiennent une peau et un pelage sains." } },
      { key: "ee343a170e56", title: { en: "SUPPORTS FOOD ALLERGY MANAGEMENT", fr: "SOUTIEN EN CAS D'ALLERGIES ALIMENTAIRES" }, description: { en: "Reduces the likelihood of developing allergic reactions to certain ingredients.", fr: "Réduit la probabilité de développer des réactions allergiques à certains ingrédients." } },
    ],
    ingredients: {
      en: "Brewer's rice, chicken meal, chicken fat, vegetable protein concentrate, chicken, beet pulp, salmon meal, flaxseed, fish oil, natural chicken flavor, salt, chicory root extract, potassium chloride, calcium carbonate, choline chloride, beta-glucans, hydrolyzed yeast (active Saccharomyces cerevisiae 1x10¹⁰), Yucca schidigera extract, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), tocopherols and rosemary extract blend as preservatives.",
      fr: "Riz de brasserie, farine de poulet, graisse de poulet, concentré de protéines végétales, poulet, pulpe de betterave, farine de saumon, graine de lin, huile de poisson, arôme naturel de poulet, sel, extrait de racine de chicorée, chlorure de potassium, carbonate de calcium, chlorure de choline, bêta-glucanes, levure hydrolysée (Saccharomyces cerevisiae active 1x10¹⁰), extrait de Yucca schidigera, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), mélange de tocophérols et extrait de romarin comme conservateurs.",
    },
    keyBenefits: [
      { key: "6b312ae92905", description: { en: "A diet that supports the management of food allergies.", fr: "Une alimentation qui accompagne la prise en charge des allergies alimentaires." } },
      { key: "6e76f6f875bd", description: { en: "Hypoallergenic ingredients.", fr: "Ingrédients hypoallergéniques." } },
      { key: "9d6a5dc41038", description: { en: "Helps restore damaged skin and coat.", fr: "Aide à restaurer la peau et le pelage abîmés." } },
    ],
    kibbleDescription: {
      en: "The size and texture of each kibble are specifically designed for proper prehension and easy digestion.",
      fr: "La taille et la texture de chaque croquette sont spécialement conçues pour une bonne préhension et une digestion facile.",
    },
  },
  {
    id: "product-canino-sensitive-razas-pequenas",
    name: "Sensitive Razas Pequeñas",
    tagline: {
      en: "A diet that supports the management of food allergies",
      fr: "Une alimentation qui accompagne la prise en charge des allergies alimentaires",
    },
    description: {
      en: [
        {
          _key: "09627b2c1510",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "beb1f80a3ad5", _type: "span", marks: [], text: "At NUPEC® we know that dogs can develop sensitivities to certain foods. That's why we developed a specialized formula with hypoallergenic ingredients that support the management of food allergies.\n" }],
        },
      ],
      fr: [
        {
          _key: "01abd89f46fe",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "15cad5efc131", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que les chiens peuvent développer des sensibilités à certains aliments. C'est pourquoi nous avons mis au point une formule spécialisée à base d'ingrédients hypoallergéniques qui accompagne la prise en charge des allergies alimentaires.\n" }],
        },
      ],
    },
    highTech: [
      { key: "38f75573c047", title: { en: "PROTEIN FOR DELICATE SKIN", fr: "PROTÉINE POUR PEAU SENSIBLE" }, description: { en: "Made with proteins that provide ideal nutrition for dogs with sensitive skin.\nOver 90% protein digestibility.", fr: "Élaboré avec des protéines offrant une alimentation idéale pour les chiens à peau sensible.\nPlus de 90 % de digestibilité protéique." } },
      { key: "ab64b89c4fe7", title: { en: "FORMULA RICH IN OMEGA 3 AND 6", fr: "FORMULE RICHE EN OMÉGA 3 ET 6" }, description: { en: "Stimulate the immune system and help control and prevent skin conditions.", fr: "Stimulent le système immunitaire et contribuent au contrôle et à la prévention des affections cutanées." } },
      { key: "79bfddbec11d", title: { en: "VITAMINS, MINERALS, AND FATTY ACIDS", fr: "VITAMINES, MINÉRAUX ET ACIDES GRAS" }, description: { en: "Protect and maintain healthy skin and coat.", fr: "Protègent et maintiennent une peau et un pelage sains." } },
      { key: "51ad9f470ea6", title: { en: "SUPPORTS FOOD ALLERGY MANAGEMENT", fr: "SOUTIEN EN CAS D'ALLERGIES ALIMENTAIRES" }, description: { en: "Reduces the likelihood of developing allergic reactions to certain ingredients.", fr: "Réduit la probabilité de développer des réactions allergiques à certains ingrédients." } },
    ],
    ingredients: {
      en: "Brewer's rice, chicken meal, chicken fat, vegetable protein concentrate, chicken, beet pulp, salmon meal, flaxseed, fish oil, natural chicken flavor, salt, chicory root extract, potassium chloride, calcium carbonate, choline chloride, beta-glucans, hydrolyzed yeast (active Saccharomyces cerevisiae 1x10¹⁰), Yucca schidigera extract, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), tocopherols and rosemary extract blend as preservatives.",
      fr: "Riz de brasserie, farine de poulet, graisse de poulet, concentré de protéines végétales, poulet, pulpe de betterave, farine de saumon, graine de lin, huile de poisson, arôme naturel de poulet, sel, extrait de racine de chicorée, chlorure de potassium, carbonate de calcium, chlorure de choline, bêta-glucanes, levure hydrolysée (Saccharomyces cerevisiae active 1x10¹⁰), extrait de Yucca schidigera, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), mélange de tocophérols et extrait de romarin comme conservateurs.",
    },
    keyBenefits: [
      { key: "d61822b6cbf3", description: { en: "A diet that supports the management of food allergies.", fr: "Une alimentation qui accompagne la prise en charge des allergies alimentaires." } },
      { key: "cc29578f0b24", description: { en: "Hypoallergenic ingredients.", fr: "Ingrédients hypoallergéniques." } },
      { key: "7f62dce0b64d", description: { en: "Helps restore damaged skin and coat.", fr: "Aide à restaurer la peau et le pelage abîmés." } },
    ],
    kibbleDescription: {
      en: "A small kibble specifically designed for proper prehension and easy digestion.",
      fr: "Une petite croquette spécialement conçue pour une bonne préhension et une digestion facile.",
    },
  },
  {
    id: "product-canino-urinary-management",
    name: "Urinary Management (canino)",
    tagline: {
      en: "Specialized nutrition to support urinary tract care in dogs",
      fr: "Nutrition spécialisée pour accompagner le soin des voies urinaires du chien",
    },
    description: {
      en: [
        {
          _key: "9dea4addd6f2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "65cd9d35dded", _type: "span", marks: [], text: "NUPEC® URINARY MANAGEMENT's formula is designed to promote balanced urinary pH. We've added cranberry concentrate, which promotes urinary acidification and, together with controlled mineral levels, has a preventive effect against the formation of urinary crystals. It also contains highly digestible protein to help maintain body condition.\n" }],
        },
      ],
      fr: [
        {
          _key: "880037cb11bb",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "e9f8b4f8f303", _type: "span", marks: [], text: "La formule de NUPEC® URINARY MANAGEMENT a été conçue pour favoriser l'équilibre du pH urinaire. Nous y avons ajouté un concentré de canneberge qui favorise l'acidification urinaire et qui, associé à des niveaux contrôlés de minéraux, exerce un effet préventif sur la formation de cristaux dans l'urine. Il contient des protéines hautement digestibles pour aider au maintien de la condition corporelle.\n" }],
        },
      ],
    },
    highTech: [
      { key: "c7af18c31b97", title: { en: "SPECIALLY DESIGNED FORMULA", fr: "FORMULE CONÇUE SUR MESURE" }, description: { en: "To help promote balanced urinary pH.", fr: "Pour favoriser l'équilibre du pH urinaire." } },
      { key: "82c3ae2e844b", title: { en: "HIGH CALORIC CONTENT", fr: "FORTE DENSITÉ CALORIQUE" }, description: { en: "To help offset reduced appetite.\n*Compared to NUPEC® Adult.", fr: "Pour compenser la diminution de l'appétit.\n*Par rapport à NUPEC® Adulte." } },
      { key: "83f881cc80cb", title: { en: "CONTROLLED MINERAL LEVELS", fr: "NIVEAUX DE MINÉRAUX CONTRÔLÉS" } },
    ],
    ingredients: {
      en: "Rice, chicken meat meal, chicken fat, corn, corn gluten, wheat gluten, fish oil, beet pulp, natural chicken flavor, cellulose, potassium, sodium, calcium, mannan-oligosaccharides, fructo-oligosaccharides, lysine, methionine, threonine, tryptophan, choline chloride, cranberry concentrate, L-carnitine, phosphorus, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de viande de poulet, graisse de poulet, maïs, gluten de maïs, gluten de blé, huile de poisson, pulpe de betterave, arôme naturel de poulet, cellulose, potassium, sodium, calcium, mannane-oligosaccharides, fructo-oligosaccharides, lysine, méthionine, thréonine, tryptophane, chlorure de choline, concentré de canneberge, L-carnitine, phosphore, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "3ad7e6332506", description: { en: "CRANBERRY CONCENTRATE Supports urinary acidification.", fr: "CONCENTRÉ DE CANNEBERGE Favorise l'acidification urinaire." } },
      { key: "589b1be31223", description: { en: "CONTROLLED MINERAL LEVELS Help prevent the formation of urinary crystals.", fr: "NIVEAUX CONTRÔLÉS DE MINÉRAUX Aident à prévenir la formation de cristaux urinaires." } },
      { key: "b1c3bb2ca4aa", description: { en: "PREBIOTICS Promote the growth of beneficial bacteria.", fr: "PRÉBIOTIQUES Favorisent le développement des bactéries bénéfiques." } },
      { key: "d3fe533cf045", description: { en: "L-CARNITINE Promotes fat metabolism.", fr: "L-CARNITINE Favorise le métabolisme des graisses." } },
      { key: "e6364f56e676", description: { en: "Yucca schidigera Helps reduce stool odor.", fr: "Yucca schidigera Aide à réduire les odeurs des selles." } },
      { key: "19a5ed169d45", description: { en: "HIGH PALATABILITY An appealing taste that stimulates your dog's appetite.", fr: "HAUTE PALATABILITÉ Une saveur attrayante qui stimule l'appétit du chien." } },
    ],
    // kibble: null — no aplica
  },
  {
    id: "product-canino-weight-control",
    name: "Weight Control (canino)",
    tagline: {
      en: "Suitable nutrition for overweight or obese dogs",
      fr: "Une nutrition adaptée aux chiens en surpoids ou obèses",
    },
    description: {
      en: [
        {
          _key: "3fdd6594fd7a",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "dd970eb5e7e5", _type: "span", marks: [], text: "At NUPEC® we know that being overweight is a health problem that affects your pet's quality of life and shortens its lifespan. That's why we formulated a specialized nutrition that helps reduce weight while maintaining optimal muscle mass, without affecting your dog's appetite.\n\n" },
            { _key: "3c77a45785e3", _type: "span", marks: ["strong"], text: "Ask your veterinarian to help determine the right diet." },
          ],
        },
      ],
      fr: [
        {
          _key: "421f44e16aeb",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "65a41e22da71", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que le surpoids est un problème de santé qui affecte la qualité de vie et réduit l'espérance de vie de votre compagnon. C'est pourquoi nous avons formulé une nutrition spécialisée qui aide à réduire le poids tout en maintenant une masse musculaire optimale, sans affecter l'appétit de votre chien.\n\n" },
            { _key: "550f4c420898", _type: "span", marks: ["strong"], text: "Consultez votre vétérinaire pour déterminer le régime alimentaire adapté." },
          ],
        },
      ],
    },
    highTech: [
      { key: "340c22e466ef", title: { en: "HIGH-QUALITY PROTEIN SOURCE", fr: "SOURCE DE PROTÉINE DE HAUTE QUALITÉ" }, description: { en: "Animal-based protein to help preserve muscle mass.\nOver 90% protein digestibility.", fr: "Protéine d'origine animale pour préserver la masse musculaire.\nPlus de 90 % de digestibilité protéique." } },
      { key: "8afef52f756f", title: { en: "BALANCED FIBER LEVELS", fr: "NIVEAUX DE FIBRES ADAPTÉS" }, description: { en: "Creates a feeling of satiety and supports digestive health. Reduces intestinal gas production.", fr: "Procure une sensation de satiété et protège la santé digestive. Réduit la production de gaz intestinaux." } },
      { key: "9e8884581729", title: { en: "L-CARNITINE", fr: "L-CARNITINE" }, description: { en: "Promotes the use of fat tissue to help metabolize excess fat.", fr: "Favorise l'utilisation du tissu graisseux pour métaboliser l'excès de graisse." } },
      { key: "2120995aeada", title: { en: "LOW IN CALORIES", fr: "FAIBLE EN CALORIES" }, description: { en: "Replaces fat with high-quality carbohydrates, reducing caloric intake.", fr: "Remplace les graisses par des glucides de haute qualité, réduisant l'apport calorique." } },
    ],
    ingredients: {
      en: "Beef meal, rice, corn, chicken, fish meal, chicken meal, beet pulp, flaxseed, chicken fat, brewer's yeast, egg meal, phosphorus, calcium, sodium, potassium, choline chloride, fructo-oligosaccharides, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, organic zinc, organic iron, organic manganese, organic copper, EDDI, organic selenium, L-carnitine, Yucca schidigera extract, rosemary and tocopherols blend as preservatives.",
      fr: "Farine de viande de bœuf, riz, maïs, poulet, farine de poisson, farine de poulet, pulpe de betterave, graine de lin, graisse de poulet, levure de bière, farine d'œuf, phosphore, calcium, sodium, potassium, chlorure de choline, fructo-oligosaccharides, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, zinc organique, fer organique, manganèse organique, cuivre organique, EDDI, sélénium organique, L-carnitine, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "301df1597393", description: { en: "Weight reduction without adverse effects.", fr: "Réduction du poids sans effets indésirables." } },
      { key: "e8b047ee0f29", description: { en: "A feeling of satiety.", fr: "Sensation de satiété." } },
      { key: "358b4c9914e9", description: { en: "With L-Carnitine to help promote the use of fat tissue", fr: "Avec de la L-Carnitine pour favoriser l'utilisation du tissu graisseux" } },
    ],
    kibbleDescription: {
      en: "A high-fiber kibble for a lasting feeling of satiety.",
      fr: "Une croquette riche en fibres pour une sensation de satiété durable.",
    },
  },
  {
    id: "product-canino-weight-control-razas-pequenas",
    name: "Weight Control Razas Pequeñas",
    tagline: {
      en: "Weight reduction with a lasting feeling of satiety",
      fr: "Réduction du poids avec une sensation de satiété durable",
    },
    description: {
      en: [
        {
          _key: "d4505a185dda",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "55f53544e712", _type: "span", marks: [], text: "At NUPEC® we know that being overweight is a health problem that affects your small-breed pet's quality of life and shortens its lifespan. That's why we formulated a specialized nutrition that helps reduce weight while maintaining optimal muscle mass, without affecting your dog's appetite." }],
        },
      ],
      fr: [
        {
          _key: "e8ca01ca7922",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "e9fa892559a1", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que le surpoids est un problème de santé qui affecte la qualité de vie et réduit l'espérance de vie de votre compagnon de petite race. C'est pourquoi nous avons formulé une nutrition spécialisée qui aide à réduire le poids tout en maintenant une masse musculaire optimale, sans affecter l'appétit de votre chien." }],
        },
      ],
    },
    highTech: [
      { key: "e09278f9dd96", title: { en: "HIGH-QUALITY PROTEIN SOURCE", fr: "SOURCE DE PROTÉINE DE HAUTE QUALITÉ" }, description: { en: "Animal-based protein to help preserve muscle mass.\nOver 90% protein digestibility.", fr: "Protéine d'origine animale pour préserver la masse musculaire.\nPlus de 90 % de digestibilité protéique." } },
      { key: "1e6d3ee0860a", title: { en: "L-CARNITINE", fr: "L-CARNITINE" }, description: { en: "Promotes the use of fat tissue to help metabolize excess fat.", fr: "Favorise l'utilisation du tissu graisseux pour métaboliser l'excès de graisse." } },
      { key: "cb4ff52d9ed2", title: { en: "BALANCED FIBER LEVELS", fr: "NIVEAUX DE FIBRES ADAPTÉS" }, description: { en: "Creates a feeling of satiety and supports digestive health. Reduces intestinal gas production.", fr: "Procure une sensation de satiété et protège la santé digestive. Réduit la production de gaz intestinaux." } },
      { key: "4a2d5caf2517", title: { en: "LOW IN CALORIES", fr: "FAIBLE EN CALORIES" }, description: { en: "Replaces fat with high-quality carbohydrates, reducing caloric intake.", fr: "Remplace les graisses par des glucides de haute qualité, réduisant l'apport calorique." } },
    ],
    ingredients: {
      en: "Beef meal, rice, corn, chicken, fish meal, chicken meal, beet pulp, flaxseed, chicken fat, brewer's yeast, egg meal, phosphorus, calcium, sodium, potassium, choline chloride, fructo-oligosaccharides, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, organic zinc, organic iron, organic manganese, organic copper, EDDI, organic selenium, L-carnitine, Yucca schidigera extract, rosemary and tocopherols blend as preservatives.",
      fr: "Farine de viande de bœuf, riz, maïs, poulet, farine de poisson, farine de poulet, pulpe de betterave, graine de lin, graisse de poulet, levure de bière, farine d'œuf, phosphore, calcium, sodium, potassium, chlorure de choline, fructo-oligosaccharides, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, zinc organique, fer organique, manganèse organique, cuivre organique, EDDI, sélénium organique, L-carnitine, extrait de Yucca schidigera, mélange de romarin et de tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "22cb57b2f93e", description: { en: "Weight reduction without adverse effects.", fr: "Réduction du poids sans effets indésirables." } },
      { key: "fd949aab8cde", description: { en: "A feeling of satiety.", fr: "Sensation de satiété." } },
      { key: "37249e3717ce", description: { en: "With carnitine to help metabolize excess fat.", fr: "Avec de la carnitine pour métaboliser l'excès de graisse." } },
    ],
    kibbleDescription: {
      en: "A small, high-fiber kibble for a lasting feeling of satiety.",
      fr: "Une petite croquette riche en fibres pour une sensation de satiété durable.",
    },
  },

  // ══════════════ FELINO NUTRICIÓN ESPECIALIZADA (5) ══════════════
  {
    id: "product-felino-felino-digestive-health",
    name: "Digestive Health (felino)",
    tagline: {
      en: "Specialized nutrition to support digestive health in cats",
      fr: "Nutrition spécialisée pour accompagner la santé digestive du chat",
    },
    description: {
      en: [
        {
          _key: "1f275864c6c2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "a0384a17f91f", _type: "span", marks: [], text: "NUPEC® FELINE DIGESTIVE HEALTH is a specialized food that supports the comprehensive management of digestive health in cats. The addition of prebiotics supports intestinal health by promoting the growth of beneficial bacteria. We've added GLUTAMINE, an amino acid that provides energy to the enterocytes, supporting the regeneration of the intestinal wall. The quality of the ingredients, the highly digestible protein, and the balanced fiber content make NUPEC® FELINE DIGESTIVE HEALTH a food that promotes your cat's intestinal health." }],
        },
      ],
      fr: [
        {
          _key: "856e24e1cd6e",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "931c4571268c", _type: "span", marks: [], text: "NUPEC® FÉLIN DIGESTIVE HEALTH est un aliment spécialisé qui accompagne la prise en charge globale de la santé digestive du chat. L'ajout de prébiotiques favorise la santé intestinale en stimulant le développement des bactéries bénéfiques. Nous y avons ajouté de la GLUTAMINE, un acide aminé qui fournit de l'énergie aux entérocytes, favorisant ainsi la régénération de la paroi intestinale. La qualité des ingrédients, les protéines hautement digestibles ainsi que l'équilibre des fibres font de NUPEC® FÉLIN DIGESTIVE HEALTH un aliment qui favorise la santé intestinale de votre chat." }],
        },
      ],
    },
    highTech: [
      // title.en ya estaba cargado ("High Palatability") — solo falta fr, se envía igual junto con en (mismo valor) para no perderlo por el .set() de ambos idiomas a la vez.
      { key: "87bd58853c0b", title: { en: "High Palatability", fr: "Haute palatabilité" }, description: { en: "An appealing taste to stimulate your cat's appetite.", fr: "Une saveur attrayante pour stimuler l'appétit du chat." } },
      { key: "a930618a5d2a", title: { en: "High caloric content", fr: "Forte densité calorique" }, description: { en: "To help offset reduced appetite. *Compared to NUPEC™ Feline Adult Indoor.", fr: "Pour compenser la diminution de l'appétit. *Par rapport à NUPEC™ Félin Adult Indoor." } },
      { key: "02dc5ed554eb", title: { en: "Omega 3 and Omega 6 fatty acids", fr: "Acides gras oméga 3 et oméga 6" }, description: { en: "Help reduce inflammation in the digestive tract.", fr: "Aident à réduire l'inflammation du tube digestif." } },
      { key: "241afb2a6537", title: { en: "Glutamine", fr: "Glutamine" }, description: { en: "Provides energy to the enterocytes (intestinal cells).", fr: "Fournit de l'énergie aux entérocytes (cellules intestinales)." } },
      { key: "98754ba9ad21", title: { en: "Prebiotics", fr: "Prébiotiques" }, description: { en: "Promote the growth of beneficial bacteria.", fr: "Favorisent le développement des bactéries bénéfiques." } },
      { key: "09f4ca5717c1", title: { en: "Yucca schidigera", fr: "Yucca schidigera" }, description: { en: "Helps reduce stool odor.", fr: "Aide à réduire les odeurs des selles." } },
    ],
    ingredients: {
      en: "Rice, chicken meat meal, chicken fat, corn gluten, soy protein concentrate, beet pulp, hydrolyzed chicken protein, fish oil, fish hydrolysate, natural chicken flavor, mannan-oligosaccharides, cellulose, chicory extract, potassium, sodium, phosphorus, methionine, glutamine, taurine, lysine, tryptophan, choline chloride, hydrolyzed yeast (active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, ascorbic acid, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de viande de poulet, graisse de poulet, gluten de maïs, concentré de protéines de soja, pulpe de betterave, protéine hydrolysée de poulet, huile de poisson, hydrolysat de poisson, arôme naturel de poulet, mannane-oligosaccharides, cellulose, extrait de chicorée, potassium, sodium, phosphore, méthionine, glutamine, taurine, lysine, tryptophane, chlorure de choline, levure hydrolysée (Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, acide ascorbique, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "8b3929d08e95", description: { en: "CHICKEN PROTEIN of high biological value that provides the essential amino acids for a highly digestible protein.", fr: "PROTÉINE DE POULET à haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible." } },
      { key: "d60ee6080501", description: { en: "FISH OIL concentrates large amounts of essential fatty acids that benefit health.", fr: "HUILE DE POISSON concentrant d'importantes quantités d'acides gras essentiels bénéfiques pour la santé." } },
      { key: "2f9fdfebd83e", description: { en: "SELECT RICE provides the energy needed for optimal growth.", fr: "RIZ DE QUALITÉ SUPÉRIEURE apportant l'énergie nécessaire à une croissance optimale." } },
    ],
    // kibble: NO_FIELD — no aplica
  },
  {
    id: "21d2abd4-ec74-4c79-8a7b-03a771da3d72",
    name: "Felino Hairball",
    tagline: {
      en: "Specialized nutrition for long-haired adult cats",
      fr: "Nutrition spécialisée pour les chats adultes à poil long",
    },
    description: {
      en: [
        {
          _key: "4da8540a11eb",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "4dc322894ee1", _type: "span", marks: [], text: "At NUPEC® we know that the metabolism of a long-haired cat calls for specialized nutrition. That's why we formulated a food with a proper nutrient balance that helps reduce hairball formation, giving maximum protection to skin and coat." }],
        },
      ],
      fr: [
        {
          _key: "147429d19fad",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "fa611bafab6e", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que le métabolisme d'un chat à poil long nécessite une nutrition spécialisée. C'est pourquoi nous avons formulé un aliment à l'équilibre nutritionnel adapté, qui aide à réduire la formation de boules de poils tout en offrant une protection maximale de la peau et du pelage." }],
        },
      ],
    },
    claims: [
      { key: "ce721d23744a", text: { en: "Food Safety", fr: "Sécurité alimentaire" } },
      { key: "26189aeb1b59", text: { en: "47 quality controls in raw-material selection", fr: "47 contrôles qualité dans la sélection des matières premières" } },
      { key: "65b9282018fd", text: { en: "Select ingredients with human-grade quality", fr: "Ingrédients sélectionnés de qualité grade humain" } },
    ],
    highTech: [
      { key: "dc7b64518594", title: { en: "TAURINE", fr: "TAURINE" }, description: { en: "Contributes to eye development, strengthening vision.", fr: "Contribue au développement oculaire en renforçant la vision." } },
      { key: "0c939a0b4b43", title: { en: "HIGH PALATABILITY", fr: "HAUTE PALATABILITÉ" }, description: { en: "Great taste and excellent acceptance.", fr: "Une saveur savoureuse et une excellente acceptation." } },
      { key: "757272d3e2d4", title: { en: "VITAMIN A", fr: "VITAMINE A" }, description: { en: "Essential for the maturation of cells in the skin's structure.", fr: "Essentielle à la maturation des cellules de la structure cutanée." } },
      { key: "fc816c8caa49", title: { en: "FIBER", fr: "FIBRES" }, description: { en: "Reduce hairball formation in the intestine.", fr: "Réduisent la formation de boules de poils dans l'intestin." } },
      { key: "6bcc4403bd46", title: { en: "PREBIOTICS (MOS and FOS)", fr: "PRÉBIOTIQUES (MOS et FOS)" }, description: { en: "Strengthen the digestive system.", fr: "Renforcent le système digestif." } },
      { key: "e70074b1617d", title: { en: "OMEGA 3 AND 6", fr: "OMÉGA 3 ET 6" }, description: { en: "Promote a shiny coat.", fr: "Favorisent un pelage brillant." } },
    ],
    ingredients: {
      en: "Chicken meat meal, brewer's rice, corn gluten, chicken fat, corn, salmon meal, beet pulp, cellulose, fish oil, natural chicken flavor, fructo-oligosaccharides, potassium chloride, sodium chloride, choline chloride, taurine, beta-glucans and mannan-oligosaccharides (derived from the cell wall of active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha-tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), Yucca schidigera extract, tocopherols blend and rosemary extract as preservatives.",
      fr: "Farine de viande de poulet, riz de brasserie, gluten de maïs, graisse de poulet, maïs, farine de saumon, pulpe de betterave, cellulose, huile de poisson, arôme naturel de poulet, fructo-oligosaccharides, chlorure de potassium, chlorure de sodium, chlorure de choline, taurine, bêta-glucanes et mannane-oligosaccharides (dérivés de la paroi cellulaire de Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), extrait de Yucca schidigera, mélange de tocophérols et extrait de romarin comme conservateurs.",
    },
    keyBenefits: [
      { key: "8cabf3901e8f", description: { en: "Chicken protein of high biological value that provides the essential amino acids for a highly digestible protein.", fr: "Protéine de poulet à haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible." } },
      { key: "efcd1f9e3a45", description: { en: "Salmon protein that concentrates large amounts of essential fatty acids.", fr: "Protéine de saumon concentrant d'importantes quantités d'acides gras essentiels." } },
      { key: "a5042eb3079a", description: { en: "Select rice that provides the energy needed for optimal growth.", fr: "Riz de qualité supérieure apportant l'énergie nécessaire à une croissance optimale." } },
    ],
    kibbleDescription: {
      en: "A crescent-shaped kibble designed for proper prehension.",
      fr: "Une croquette en forme de croissant, conçue pour une bonne préhension.",
    },
  },
  {
    id: "product-felino-felino-weight-care",
    name: "Felino Weight Care",
    tagline: {
      en: "Weight reduction and maintenance",
      fr: "Réduction et maintien du poids",
    },
    description: {
      en: [
        {
          _key: "67bfb3947de0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "5759b6f1e39d", _type: "span", marks: [], text: "At NUPEC® we know that a sedentary lifestyle, overfeeding, and spay/neuter surgery make cats more prone to being overweight. That's why we formulated a product that helps your cat reach and maintain its ideal weight through healthy nutrition.\n\n" },
            { _key: "31d8b36436ee", _type: "span", marks: ["strong"], text: "Ask your veterinarian to help determine the right diet." },
          ],
        },
      ],
      fr: [
        {
          _key: "9ad645ae54b7",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "ab03146d7dfb", _type: "span", marks: [], text: "Chez NUPEC®, nous savons que la sédentarité, la suralimentation et la stérilisation prédisposent les chats au surpoids. C'est pourquoi nous avons formulé un produit qui aide votre chat à atteindre et à maintenir son poids idéal grâce à une alimentation saine.\n\n" },
            { _key: "886b5968940b", _type: "span", marks: ["strong"], text: "Consultez votre vétérinaire pour déterminer le régime alimentaire adapté." },
          ],
        },
      ],
    },
    claims: [
      { key: "351749b20593", text: { en: "Food Safety", fr: "Sécurité alimentaire" } },
      { key: "958f75a73ece", text: { en: "47 quality controls in raw-material selection", fr: "47 contrôles qualité dans la sélection des matières premières" } },
      { key: "0371c1a81260", text: { en: "Select ingredients with human-grade quality", fr: "Ingrédients sélectionnés de qualité grade humain" } },
    ],
    highTech: [
      { key: "635f6168fa95", title: { en: "TAURINE", fr: "TAURINE" }, description: { en: "An essential amino acid to help maintain heart and eye health", fr: "Un acide aminé essentiel pour maintenir la santé cardiaque et oculaire" } },
      { key: "22c76452a04a", title: { en: "OMEGA 3 AND OMEGA 6", fr: "OMÉGA 3 ET OMÉGA 6" }, description: { en: "Helps keep skin and coat healthy", fr: "Aide à maintenir une peau et un pelage sains" } },
      { key: "9e7e705c87cb", title: { en: "CALORIC REDUCTION", fr: "RÉDUCTION CALORIQUE" }, description: { en: "Low caloric content*\n*Compared to NUPEC FELINE ADULT INDOOR", fr: "Faible teneur calorique*\n*Par rapport à NUPEC FÉLIN ADULT INDOOR" } },
      { key: "34998b7fb993", title: { en: "L-CARNITINE", fr: "L-CARNITINE" }, description: { en: "Promotes the use of fat tissue as an energy source", fr: "Favorise l'utilisation du tissu graisseux comme source d'énergie" } },
      { key: "db6243fff662", title: { en: "HIGHLY DIGESTIBLE PROTEIN", fr: "PROTÉINE HAUTEMENT DIGESTIBLE" }, description: { en: "To help preserve muscle mass", fr: "Pour préserver la masse musculaire" } },
      { key: "821cf6ce3d83", title: { en: "PREBIOTICS (MOS AND FOS)", fr: "PRÉBIOTIQUES (MOS ET FOS)" }, description: { en: "For a healthy gut microbiota", fr: "Pour une microbiote intestinale saine" } },
      { key: "d5e466cf886f", title: { en: "CHONDROITIN", fr: "CHONDROÏTINE" }, description: { en: "A joint regenerator that helps offset the wear caused by excess weight", fr: "Un régénérateur articulaire qui compense l'usure liée au surpoids" } },
      { key: "333ab62aa2f3", title: { en: "DIETARY FIBER BALANCE", fr: "ÉQUILIBRE DES FIBRES ALIMENTAIRES" }, description: { en: "Promotes intestinal motility and well-being", fr: "Favorise la motilité et le bien-être intestinal" } },
    ],
    ingredients: {
      en: "Chicken meat meal, brewer's rice, corn gluten, salmon meal, beet pulp, vegetable protein concentrate, chicken fat, fish oil, natural chicken flavor, miscanthus meal, fructo-oligosaccharides, choline chloride, sodium chloride, potassium chloride, taurine, beta-glucans and mannan-oligosaccharides (derived from the cell wall of active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), L-carnitine, retinol acetate (vitamin A source), cholecalciferol (vitamin D source), DL-alpha-tocopherol acetate (vitamin E source), menadione nicotinamide bisulfite (vitamin K source), ascorbic acid (vitamin C source), thiamine mononitrate (vitamin B1 source), riboflavin (vitamin B2 source), nicotinic acid (vitamin B3 source), pyridoxine hydrochloride (vitamin B6 source), cyanocobalamin (vitamin B12 source), D-biotin (vitamin H source), D-calcium pantothenate (vitamin B5 source), folic acid, trace minerals (zinc proteinate, manganese proteinate, copper proteinate, EDDI, iron glycinate, sodium selenite), chondroitin sulfate, Yucca schidigera extract, tocopherols blend and rosemary extract as preservatives.",
      fr: "Farine de viande de poulet, riz de brasserie, gluten de maïs, farine de saumon, pulpe de betterave, concentré de protéines végétales, graisse de poulet, huile de poisson, arôme naturel de poulet, farine de miscanthus, fructo-oligosaccharides, chlorure de choline, chlorure de sodium, chlorure de potassium, taurine, bêta-glucanes et mannane-oligosaccharides (dérivés de la paroi cellulaire de Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), L-carnitine, acétate de rétinol (source de vitamine A), cholécalciférol (source de vitamine D), acétate de DL-alpha-tocophérol (source de vitamine E), complexe de bisulfite de sodium et de ménadione (source de vitamine K), acide ascorbique (source de vitamine C), mononitrate de thiamine (source de vitamine B1), riboflavine (source de vitamine B2), acide nicotinique (source de vitamine B3), chlorhydrate de pyridoxine (source de vitamine B6), cyanocobalamine (source de vitamine B12), D-biotine (source de vitamine H), D-pantothénate de calcium (source de vitamine B5), acide folique, oligo-éléments (protéinate de zinc, protéinate de manganèse, protéinate de cuivre, EDDI, glycinate de fer, sélénite de sodium), sulfate de chondroïtine, extrait de Yucca schidigera, mélange de tocophérols et extrait de romarin comme conservateurs.",
    },
    keyBenefits: [
      { key: "0748e3a367e5", description: { en: "Chicken protein of high biological value that provides the essential amino acids for a highly digestible protein.", fr: "Protéine de poulet à haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible." } },
      { key: "01ec03773178", description: { en: "Salmon protein that concentrates large amounts of essential fatty acids.", fr: "Protéine de saumon concentrant d'importantes quantités d'acides gras essentiels." } },
      { key: "d61fa215f1c3", description: { en: "Select rice that provides the energy needed for optimal growth.", fr: "Riz de qualité supérieure apportant l'énergie nécessaire à une croissance optimale." } },
    ],
    // kibble: NO_FIELD — no aplica
  },
  {
    id: "product-felino-felino-renal-care",
    name: "Renal Care (felino)",
    tagline: {
      en: "Specialized nutrition to support kidney care in cats",
      fr: "Nutrition spécialisée pour accompagner le soin rénal du chat",
    },
    description: {
      en: [
        {
          _key: "2976ec01aeea",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "b4987cb1bdd1", _type: "span", marks: [], text: "NUPEC® FELINE RENAL CARE is a specialized food that supports the comprehensive management of kidney care in cats. It's formulated with controlled levels of highly digestible protein to help reduce the kidney's nitrogen-filtration workload. Limited mineral levels in the diet help slow the progression of kidney disease. Its high caloric density* formula delivers the energy and nutrients needed in a smaller portion of food, helping offset the reduced appetite seen in cats affected by kidney disease." }],
        },
      ],
      fr: [
        {
          _key: "139a6a89c3c1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "875524a4aa19", _type: "span", marks: [], text: "NUPEC® FÉLIN RENAL CARE est un aliment spécialisé qui accompagne la prise en charge globale du soin rénal du chat. Il est formulé avec des niveaux contrôlés de protéines hautement digestibles qui aident à réduire la surcharge de travail rénal liée à la filtration de l'azote. Les niveaux limités de minéraux de la formule aident à ralentir la progression de la maladie rénale. Sa formule à haute densité calorique* apporte l'énergie et les nutriments nécessaires dans une petite portion d'aliment, ce qui aide à compenser la diminution de l'appétit chez les chats atteints d'une maladie rénale." }],
        },
      ],
    },
    claims: [
      { key: "c6d86149cf56", text: { en: "Food Safety", fr: "Sécurité alimentaire" } },
      { key: "560e76207575", text: { en: "47 quality controls in raw-material selection", fr: "47 contrôles qualité dans la sélection des matières premières" } },
      { key: "3ce9fbdbdc71", text: { en: "Select ingredients with human-grade quality", fr: "Ingrédients sélectionnés de qualité grade humain" } },
    ],
    highTech: [
      { key: "cc1d9b214806", title: { en: "HIGH PALATABILITY", fr: "HAUTE PALATABILITÉ" }, description: { en: "An appealing taste that stimulates your cat's appetite.", fr: "Une saveur attrayante qui stimule l'appétit du chat." } },
      { key: "cb3ad1c253d5", title: { en: "PROTEIN RESTRICTION", fr: "RESTRICTION PROTÉIQUE" }, description: { en: "Reduces the kidneys' workload.", fr: "Réduit la charge de travail rénale." } },
      { key: "30283f98df50", title: { en: "L-CARNITINE", fr: "L-CARNITINE" }, description: { en: "Promotes fat metabolism.", fr: "Favorise le métabolisme des graisses." } },
      { key: "0958a8b4c44a", title: { en: "PREBIOTICS", fr: "PRÉBIOTIQUES" }, description: { en: "Stimulate the growth of beneficial bacteria.", fr: "Stimulent le développement des bactéries bénéfiques." } },
      { key: "37e284dd79df", title: { en: "OMEGA 3 FATTY ACIDS", fr: "ACIDES GRAS OMÉGA 3" }, description: { en: "Help reduce kidney inflammation.", fr: "Aident à réduire l'inflammation rénale." } },
      { key: "38873a9e1c8b", title: { en: "Yucca schidigera", fr: "Yucca schidigera" }, description: { en: "Helps reduce stool odor.", fr: "Aide à réduire les odeurs des selles." } },
    ],
    ingredients: {
      en: "Rice, chicken meat meal, corn, chicken fat, corn gluten, egg meal, fish oil, beet pulp, natural chicken flavor, cellulose, potassium, sodium, fructo-oligosaccharides, mannan-oligosaccharides, choline chloride, methionine, taurine, calcium, hydrolyzed yeast (active Saccharomyces cerevisiae 1x10¹⁰ CFU/g), L-carnitine, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de viande de poulet, maïs, graisse de poulet, gluten de maïs, farine d'œuf, huile de poisson, pulpe de betterave, arôme naturel de poulet, cellulose, potassium, sodium, fructo-oligosaccharides, mannane-oligosaccharides, chlorure de choline, méthionine, taurine, calcium, levure hydrolysée (Saccharomyces cerevisiae active 1x10¹⁰ UFC/g), L-carnitine, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "2a2ee3c54f4e", description: { en: "Chicken protein of high biological value that provides the essential amino acids for a highly digestible protein.", fr: "Protéine de poulet à haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible." } },
      { key: "b63d445105a5", description: { en: "Fish oil concentrates large amounts of essential fatty acids that benefit health.", fr: "L'huile de poisson concentre d'importantes quantités d'acides gras essentiels bénéfiques pour la santé." } },
      { key: "e3a93d7732dc", description: { en: "Select rice that provides the energy needed for optimal growth.", fr: "Riz de qualité supérieure apportant l'énergie nécessaire à une croissance optimale." } },
    ],
    // kibble: NO_FIELD — no aplica
  },
  {
    id: "product-felino-felino-urinary-management",
    name: "Urinary Management (felino)",
    tagline: {
      en: "Specialized nutrition to support urinary tract care in cats",
      fr: "Nutrition spécialisée pour accompagner le soin des voies urinaires du chat",
    },
    description: {
      en: [
        {
          _key: "c177eefcc59f",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "e896c8433e72", _type: "span", marks: [], text: "NUPEC® FELINE URINARY MANAGEMENT's formula is designed to promote balanced urinary pH. We've added cranberry concentrate, which promotes urinary acidification and, together with controlled mineral levels, has a preventive effect against the formation of urinary crystals." }],
        },
        {
          _key: "0e643aa49dac",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "6ea79de9954e", _type: "span", marks: [], text: "" }],
        },
        {
          _key: "025411cf5bfd",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "07ceb72a01db", _type: "span", marks: ["strong"], text: "Ask your veterinarian to help determine the right diet" },
            { _key: "2239bea081d9", _type: "span", marks: [], text: "." },
          ],
        },
      ],
      fr: [
        {
          _key: "120466fef406",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "d6aa1f9a4aef", _type: "span", marks: [], text: "La formule de NUPEC® FÉLIN URINARY MANAGEMENT a été conçue pour favoriser l'équilibre du pH urinaire. Nous y avons ajouté un concentré de canneberge qui favorise l'acidification urinaire et qui, associé à des niveaux contrôlés de minéraux, exerce un effet préventif sur la formation de cristaux dans l'urine." }],
        },
        {
          _key: "fa7f47e2e78c",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "3ffc944d3f46", _type: "span", marks: [], text: "" }],
        },
        {
          _key: "15077dcda23e",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            { _key: "2186f4ed035c", _type: "span", marks: ["strong"], text: "Consultez votre vétérinaire pour déterminer le régime alimentaire adapté" },
            { _key: "9c015d6cc8bb", _type: "span", marks: [], text: "." },
          ],
        },
      ],
    },
    claims: [
      { key: "e25cba753afa", text: { en: "Food Safety", fr: "Sécurité alimentaire" } },
      { key: "1c426846a770", text: { en: "47 quality controls in raw-material selection", fr: "47 contrôles qualité dans la sélection des matières premières" } },
      { key: "3095e371c9bd", text: { en: "Select ingredients with human-grade quality", fr: "Ingrédients sélectionnés de qualité grade humain" } },
    ],
    highTech: [
      { key: "965317025de4", title: { en: "APPEALING TASTE", fr: "SAVEUR ATTRAYANTE" }, description: { en: "Stimulates your cat's appetite.", fr: "Stimule l'appétit du chat." } },
      { key: "f9107ca00fa2", title: { en: "L-CARNITINE", fr: "L-CARNITINE" }, description: { en: "Promotes fat metabolism.", fr: "Favorise le métabolisme des graisses." } },
      { key: "1bf2953aa6ed", title: { en: "PREBIOTICS", fr: "PRÉBIOTIQUES" }, description: { en: "Promote the growth of beneficial bacteria.", fr: "Favorisent le développement des bactéries bénéfiques." } },
      { key: "695bb79607c1", title: { en: "CRANBERRY CONCENTRATE", fr: "CONCENTRÉ DE CANNEBERGE" }, description: { en: "Supports urinary acidification.", fr: "Favorise l'acidification urinaire." } },
      { key: "83beaafd844c", title: { en: "CONTROLLED MINERAL LEVELS", fr: "NIVEAUX CONTRÔLÉS DE MINÉRAUX" }, description: { en: "Help prevent the formation of urinary crystals.", fr: "Aident à prévenir la formation de cristaux urinaires." } },
      { key: "24b471665e58", title: { en: "Yucca schidigera", fr: "Yucca schidigera" }, description: { en: "Helps reduce stool odor.", fr: "Aide à réduire les odeurs des selles." } },
    ],
    ingredients: {
      en: "Rice, chicken meat meal, corn gluten, chicken fat, corn, potato protein, fish oil, beet pulp, natural chicken flavor, cellulose, sodium, potassium, phosphorus, mannan-oligosaccharides, fructo-oligosaccharides, methionine, taurine, choline chloride, L-carnitine, cranberry concentrate, vitamin A supplement, cholecalciferol, DL-alpha tocopherol acetate, menadione sodium bisulfite complex, thiamine mononitrate, riboflavin, nicotinic acid, pyridoxine hydrochloride, cyanocobalamin, D-biotin, calcium pantothenate, folic acid, iron glycinate, manganese glycinate, selenium yeast hydroxy-analogue, copper glycinate, zinc glycinate, ethylenediamine dihydroiodide, Yucca schidigera extract, rosemary and tocopherols as preservatives.",
      fr: "Riz, farine de viande de poulet, gluten de maïs, graisse de poulet, maïs, protéine de pomme de terre, huile de poisson, pulpe de betterave, arôme naturel de poulet, cellulose, sodium, potassium, phosphore, mannane-oligosaccharides, fructo-oligosaccharides, méthionine, taurine, chlorure de choline, L-carnitine, concentré de canneberge, supplément de vitamine A, cholécalciférol, acétate de DL-alpha-tocophérol, complexe de bisulfite de sodium et de ménadione, mononitrate de thiamine, riboflavine, acide nicotinique, chlorhydrate de pyridoxine, cyanocobalamine, D-biotine, pantothénate de calcium, acide folique, glycinate de fer, glycinate de manganèse, hydroxy-analogue de sélénométhionine, glycinate de cuivre, glycinate de zinc, dihydroiodure d'éthylènediamine, extrait de Yucca schidigera, romarin et tocophérols comme conservateurs.",
    },
    keyBenefits: [
      { key: "95000491ec65", description: { en: "Chicken protein of high biological value that provides the essential amino acids for a highly digestible protein.", fr: "Protéine de poulet à haute valeur biologique, apportant les acides aminés essentiels pour une protéine hautement digestible." } },
      { key: "e46860a3a1e1", description: { en: "Fish oil that concentrates large amounts of essential fatty acids that benefit health.", fr: "Huile de poisson qui concentre d'importantes quantités d'acides gras essentiels bénéfiques pour la santé." } },
      { key: "31a4e8626383", description: { en: "Select rice that provides the energy needed for optimal growth.", fr: "Riz de qualité supérieure apportant l'énergie nécessaire à une croissance optimale." } },
    ],
    // kibble: NO_FIELD — no aplica
  },

  // ══════════════ SUPLEMENTOS, solo canino (4) ══════════════
  {
    id: "product-canino-vitality-gel-multivitaminico",
    name: "Vitality Gel Multivitamínico",
    tagline: {
      en: "A vitamin supplement for times of higher physiological demand.",
      fr: "Un complément vitaminé pour les périodes de forte demande physiologique.",
    },
    description: {
      en: [
        {
          _key: "31bd08781dc2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "0a37e237814a", _type: "span", marks: [], text: "A multivitamin gel supplement designed to cover a dog's times of greatest nutritional need: growth, high performance, pregnancy, old age, or whenever recommended by a veterinarian. It provides vitamins A, E, D3, and the complete B complex, with precise dosing of 2 g per kilogram of body weight. It can be given straight from the tube or mixed into dry or wet food, making it easy to administer even to picky eaters. Cookie flavor with excellent palatability and acceptance." }],
        },
      ],
      fr: [
        {
          _key: "af38d622f47a",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "d361274143d3", _type: "span", marks: [], text: "Un complément multivitaminé en gel conçu pour couvrir les périodes de plus grande demande nutritionnelle du chien : croissance, haute performance, gestation, vieillesse ou sur recommandation du vétérinaire. Il apporte les vitamines A, E, D3 et le complexe B complet, avec un dosage précis de 2 g par kilogramme de poids. Il peut être donné directement depuis le tube ou déposé sur l'aliment sec ou humide, ce qui facilite son administration même chez les animaux difficiles. Saveur biscuit à l'excellente palatabilité et bien acceptée." }],
        },
      ],
    },
    claims: [{ key: "7f1094e7b9eb", text: { en: "Carrageenan-free", fr: "Sans carraghénane" } }],
    ingredients: {
      en: "Water, guar gum, poultry oil, vitamin A, vitamin E, vitamin D3, vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B6 (pyridoxine), vitamin B9 (folic acid), vitamin B12 (cyanocobalamin), citric acid, potassium sorbate as a preservative, rosemary extract and tocopherols, artificial cookie flavor.",
      fr: "Eau, gomme de guar, huile de volaille, vitamine A, vitamine E, vitamine D3, vitamine B1 (thiamine), vitamine B2 (riboflavine), vitamine B6 (pyridoxine), vitamine B9 (acide folique), vitamine B12 (cyanocobalamine), acide citrique, sorbate de potassium comme conservateur, extrait de romarin et tocophérols, arôme artificiel de biscuit.",
    },
    keyBenefits: [
      { key: "d6fd114e7749", description: { en: "Highly palatable, well-accepted cookie flavor", fr: "Saveur biscuit très appétente et bien acceptée" } },
    ],
    kibbleDescription: {
      en: "15 g units.",
      fr: "Unités de 15 g.",
    },
  },
  {
    id: "product-canino-vitality-water-carne",
    name: "Vitality Water Sabor Carne",
    tagline: {
      en: "Active hydration with vitamin support",
      fr: "Une hydratation active avec un apport vitaminé",
    },
    description: {
      en: [
        {
          _key: "51cc9ef551bf",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "ec127179cfc8", _type: "span", marks: [], text: "A liquid multivitamin drink designed as a supplement for adult dogs of all breeds. It provides vitamins A, E, D3, and the complete B complex in a ready-to-serve format, dosed according to the dog's weight range (10 to 150 ml). Ideal for easily boosting daily vitamin intake — add it to water, mix it into food, or give it directly. Highly palatable, well-accepted meat flavor. Formulated without carrageenan." }],
        },
      ],
      fr: [
        {
          _key: "1e19800b0bda",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "f7d7fd0f1cbd", _type: "span", marks: [], text: "Une boisson multivitaminée liquide conçue comme complément pour les chiens adultes de toutes races. Elle apporte les vitamines A, E, D3 et le complexe B complet, prête à l'emploi, avec un dosage adapté au poids du chien (10 à 150 ml). Idéale pour renforcer facilement l'apport vitaminé quotidien : à ajouter à l'eau, à mélanger à l'aliment ou à administrer directement. Saveur viande très appétente et bien acceptée. Formulée sans carraghénane." }],
        },
      ],
    },
    claims: [{ key: "1b43e7d0d941", text: { en: "Carrageenan-free", fr: "Sans carraghénane" } }],
    ingredients: {
      en: "Water, vitamin A, vitamin E, vitamin D3, vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B6 (pyridoxine), vitamin B12 (cyanocobalamin), citric acid, potassium sorbate as a preservative, artificial meat flavor.",
      fr: "Eau, vitamine A, vitamine E, vitamine D3, vitamine B1 (thiamine), vitamine B2 (riboflavine), vitamine B6 (pyridoxine), vitamine B12 (cyanocobalamine), acide citrique, sorbate de potassium comme conservateur, arôme artificiel de viande.",
    },
    keyBenefits: [
      { key: "85af3da8e494", description: { en: "An enriched multivitamin drink, highly palatable and well accepted", fr: "Une boisson multivitaminée enrichie, très appétente et bien acceptée" } },
    ],
    // kibble: null — no aplica
  },
  {
    id: "fec6eebd-bcfa-45fb-a817-67ca4fb3a527",
    name: "Vitality Water Sabor Frutal",
    tagline: {
      en: "Active hydration with vitamin support",
      fr: "Une hydratation active avec un apport vitaminé",
    },
    // Traducido sobre el `es` ya corregido por el usuario ("Sabor frutal",
    // no "Sabor carne" — ver nota de cabecera del archivo).
    description: {
      en: [
        {
          _key: "b4fd6873a6f1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "5478cad0c581", _type: "span", marks: [], text: "A liquid multivitamin drink designed as a supplement for adult dogs of all breeds. It provides vitamins A, E, D3, and the complete B complex in a ready-to-serve format, dosed according to the dog's weight range (10 to 150 ml). Ideal for easily boosting daily vitamin intake — add it to water, mix it into food, or give it directly. Highly palatable, well-accepted fruit flavor. Formulated without carrageenan." }],
        },
      ],
      fr: [
        {
          _key: "d81acb7c57da",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "6bc0ead2ed0e", _type: "span", marks: [], text: "Une boisson multivitaminée liquide conçue comme complément pour les chiens adultes de toutes races. Elle apporte les vitamines A, E, D3 et le complexe B complet, prête à l'emploi, avec un dosage adapté au poids du chien (10 à 150 ml). Idéale pour renforcer facilement l'apport vitaminé quotidien : à ajouter à l'eau, à mélanger à l'aliment ou à administrer directement. Saveur fruitée très appétente et bien acceptée. Formulée sans carraghénane." }],
        },
      ],
    },
    claims: [{ key: "1b43e7d0d941", text: { en: "Carrageenan-free", fr: "Sans carraghénane" } }],
    ingredients: {
      en: "Water, vitamin A, vitamin E, vitamin D3, vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B6 (pyridoxine), vitamin B12 (cyanocobalamin), citric acid, potassium sorbate as a preservative, artificial fruit flavor.",
      fr: "Eau, vitamine A, vitamine E, vitamine D3, vitamine B1 (thiamine), vitamine B2 (riboflavine), vitamine B6 (pyridoxine), vitamine B12 (cyanocobalamine), acide citrique, sorbate de potassium comme conservateur, arôme artificiel de fruits.",
    },
    keyBenefits: [
      { key: "85af3da8e494", description: { en: "An enriched multivitamin drink, highly palatable and well accepted", fr: "Une boisson multivitaminée enrichie, très appétente et bien acceptée" } },
    ],
    // kibble: null — no aplica
  },
  {
    id: "product-canino-vitality-water-sandia",
    name: "Vitality Water Sabor Sandía",
    tagline: {
      en: "Active hydration with vitamin support",
      fr: "Une hydratation active avec un apport vitaminé",
    },
    description: {
      en: [
        {
          _key: "19a0cc364b0b",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "8bef22d991e9", _type: "span", marks: [], text: "A liquid multivitamin drink designed as a supplement for adult dogs of all breeds. It provides vitamins A, E, D3, and the complete B complex in a ready-to-serve format, dosed according to the dog's weight range (10 to 150 ml). Ideal for easily boosting daily vitamin intake — add it to water, mix it into food, or give it directly. Highly palatable, well-accepted watermelon flavor. Formulated without carrageenan." }],
        },
      ],
      fr: [
        {
          _key: "781a85e4ad61",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "8e9cc49fc2bf", _type: "span", marks: [], text: "Une boisson multivitaminée liquide conçue comme complément pour les chiens adultes de toutes races. Elle apporte les vitamines A, E, D3 et le complexe B complet, prête à l'emploi, avec un dosage adapté au poids du chien (10 à 150 ml). Idéale pour renforcer facilement l'apport vitaminé quotidien : à ajouter à l'eau, à mélanger à l'aliment ou à administrer directement. Saveur pastèque très appétente et bien acceptée. Formulée sans carraghénane." }],
        },
      ],
    },
    claims: [{ key: "d11ca2964082", text: { en: "Carrageenan-free", fr: "Sans carraghénane" } }],
    ingredients: {
      en: "Water, vitamin A, vitamin E, vitamin D3, vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B6 (pyridoxine), vitamin B12 (cyanocobalamin), citric acid, potassium sorbate as a preservative, artificial watermelon flavor.",
      fr: "Eau, vitamine A, vitamine E, vitamine D3, vitamine B1 (thiamine), vitamine B2 (riboflavine), vitamine B6 (pyridoxine), vitamine B12 (cyanocobalamine), acide citrique, sorbate de potassium comme conservateur, arôme artificiel de pastèque.",
    },
    keyBenefits: [
      { key: "b5d6028f2d92", description: { en: "An enriched multivitamin drink, highly palatable and well accepted", fr: "Une boisson multivitaminée enrichie, très appétente et bien acceptée" } },
    ],
    // kibble: null — no aplica
  },

  // ══════════════ ALIMENTOS HÚMEDOS (9: 5 canino + 4 felino) ══════════════
  {
    id: "product-canino-humedo-adulto-carne-verduras",
    name: "Adulto Alimento Húmedo",
    nameField: { en: "Adult Wet Food", fr: "Humide Adulte" },
    tagline: {
      en: "Complete food for adult dogs",
      fr: "Aliment complet pour chiens adultes",
    },
    description: {
      en: [
        {
          _key: "c53f837a8616",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "e259fbf25bfa", _type: "span", marks: [], text: "Wet food with meat and vegetables for adult dogs" }],
        },
      ],
      fr: [
        {
          _key: "37ce82e70fd0",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "bff9454e0d69", _type: "span", marks: [], text: "Aliment humide à la viande et aux légumes pour chiens adultes" }],
        },
      ],
    },
    ingredients: {
      en: "Pork meat and by-products (liver, lung, spleen), and/or poultry (trimmings), and/or chicken (trimmings, liver, heart), sufficient water for processing, vegetables (carrot and pea), technical additives (xanthan gum, locust bean gum, carrageenan, guar gum), palatant (glycine), preservatives (sodium nitrite), carriers (beet pulp, natural mixture of steatite and chlorite, silicic acid, sepiolite), minerals (calcium carbonate), sugars (dextrose), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, biotin, manganese sulfate monohydrate, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de porc (foie, poumon, rate), et/ou de volaille (découpes), et/ou de poulet (découpes, foie, cœur), eau suffisante pour le procédé, légumes (carotte et pois), additifs technologiques (gomme xanthane, gomme de caroube, carraghénane, gomme guar), agent d'appétence (glycine), conservateurs (nitrite de sodium), supports (pulpe de betterave, mélange naturel de stéatite et de chlorite, acide silicique, sépiolite), minéraux (carbonate de calcium), sucres (dextrose), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, biotine, sulfate de manganèse monohydraté, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    claims: [
      { key: "29ea33108d52", text: { en: "Helps maintain muscle mass.", fr: "Aide au maintien de la masse musculaire." } },
      { key: "6ee6117d77cb", text: { en: "Helps maintain intestinal health.", fr: "Aide à maintenir la santé intestinale." } },
      { key: "dd833c2bd7f2", text: { en: "Strengthens the nervous system.", fr: "Renforce le système nerveux." } },
    ],
    kibbleDescription: {
      en: "Complete food for adult dogs. Serve at room temperature. We recommend adjusting the amount of food according to your dog's activity level, breed, and age.",
      fr: "Aliment complet pour chiens adultes. Servir à température ambiante. Il est recommandé d'ajuster la quantité d'aliment selon le niveau d'activité, la race et l'âge du chien.",
    },
  },
  {
    id: "product-canino-humedo-cachorro-alto-pollo",
    name: "Cachorro Alimento Húmedo",
    nameField: { en: "Puppy Wet Food", fr: "Humide Chiot" },
    tagline: {
      en: "Puppy High in Chicken Wet Food",
      fr: "Humide Chiot Riche en Poulet",
    },
    description: {
      en: [
        {
          _key: "6f8048bebec3",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "565a10aad827", _type: "span", marks: [], text: "Wet food for puppies of all breeds, made with chicken protein." }],
        },
      ],
      fr: [
        {
          _key: "bb545709830e",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "3b80733626c4", _type: "span", marks: [], text: "Aliment humide pour chiots de toutes races, à la protéine de poulet." }],
        },
      ],
    },
    ingredients: {
      en: "Chicken meat and by-products (trimmings, liver, heart) and/or pork (liver, lung, spleen), sufficient water for processing, technical additives (xanthan gum, carob, carob gum, carrageenan), palatants (glycine), minerals (calcium carbonate, potassium chloride), preservatives (sodium nitrate), carriers (corn flour, sepiolite, natural mixture of steatite and chlorite, silicic acid, sipernat), sugars (dextrose), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, biotin, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de poulet (découpes, foie, cœur) et/ou de porc (foie, poumon, rate), eau suffisante pour le procédé, additifs technologiques (gomme xanthane, caroube, gomme de caroube, carraghénane), agents d'appétence (glycine), minéraux (carbonate de calcium, chlorure de potassium), conservateurs (nitrate de sodium), supports (farine de maïs, sépiolite, mélange naturel de stéatite et de chlorite, acide silicique, sipernat), sucres (dextrose), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, biotine, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    claims: [
      { key: "7aaf351fc81c", text: { en: "For the development of strong bones and teeth.", fr: "Pour le développement d'os et de dents solides." } },
      { key: "6aa11296279d", text: { en: "Improves immune system response.", fr: "Améliore la réponse du système immunitaire." } },
      { key: "05a45f73ff05", text: { en: "Promotes muscle development.", fr: "Favorise le développement musculaire." } },
    ],
    kibbleDescription: {
      en: "Complete food for puppies. Serve at room temperature. We recommend adjusting the amount of food according to your dog's activity level, breed, and age.",
      fr: "Aliment complet pour chiots. Servir à température ambiante. Il est recommandé d'ajuster la quantité d'aliment selon le niveau d'activité, la race et l'âge du chien.",
    },
  },
  {
    id: "product-canino-humedo-digestive",
    name: "Digestive Alimento Húmedo",
    tagline: {
      en: "Digestive Wet Food",
      fr: "Humide Digestif",
    },
    description: {
      en: [
        {
          _key: "8cb35ffbabbe",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "15fde5c277dd", _type: "span", marks: [], text: "Wet food for adult dogs of all breeds." }],
        },
      ],
      fr: [
        {
          _key: "7d6eef4ddf1c",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "9c72fca07b88", _type: "span", marks: [], text: "Aliment humide pour chiens adultes de toutes races." }],
        },
      ],
    },
    ingredients: {
      en: "Pork meat and by-products (liver, lung, spleen) and/or chicken (trimmings, liver, heart), and/or poultry (trimmings), sufficient water for processing, whitefish and its by-products (heads and fins), technical additives (xanthan gum, carrageenan, carob gum, guar gum, carob), palatant (glycine), carriers (corn flour, sepiolite, natural mixtures of steatite and chlorite, silicic acid), preservative (sodium nitrate), minerals (calcium carbonate), sugars (dextrose), plant-derived ingredients (chicory), nutritional additives (vitamin E, taurine, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de porc (foie, poumon, rate) et/ou de poulet (découpes, foie, cœur), et/ou de volaille (découpes), eau suffisante pour le procédé, poisson blanc et ses sous-produits (têtes et nageoires), additifs technologiques (gomme xanthane, carraghénane, gomme de caroube, gomme guar, caroube), agent d'appétence (glycine), supports (farine de maïs, sépiolite, mélanges naturels de stéatite et de chlorite, acide silicique), conservateur (nitrate de sodium), minéraux (carbonate de calcium), sucres (dextrose), dérivés d'origine végétale (chicorée), additifs nutritionnels (vitamine E, taurine, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    claims: [
      { key: "68dfb563bcdc", text: { en: "With prebiotics that help optimize digestion and nutrient absorption.", fr: "Avec des prébiotiques qui aident à optimiser la digestion et l'absorption des nutriments." } },
      { key: "383aa62f298c", text: { en: "Helps prevent cellular aging.", fr: "Aide à prévenir le vieillissement cellulaire." } },
    ],
    kibbleDescription: {
      en: "Complete food for adult dogs. Serve at room temperature. We recommend adjusting the amount of food according to your dog's activity level, breed, and age.",
      fr: "Aliment complet pour chien adulte. Servir à température ambiante. Il est recommandé d'ajuster la quantité d'aliment selon le niveau d'activité, la race et l'âge du chien.",
    },
  },
  {
    id: "product-canino-humedo-senior",
    name: "Senior Alimento Húmedo",
    tagline: {
      en: "Wet food for senior adult dogs of all breeds.",
      fr: "Aliment humide pour chiens adultes seniors de toutes races.",
    },
    description: {
      en: [
        {
          _key: "e0b5bfcfa69f",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "2ea99052207d", _type: "span", marks: [], text: "Wet food for senior adult dogs of all breeds. For small breeds from 9 years of age and large breeds from 7 years of age." }],
        },
      ],
      fr: [
        {
          _key: "7d584716eb16",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "86cb975e151e", _type: "span", marks: [], text: "Aliment humide pour chiens adultes seniors de toutes races. Pour les petites races à partir de 9 ans et les grandes races à partir de 7 ans." }],
        },
      ],
    },
    ingredients: {
      en: "Chicken meat and by-products (trimmings, liver, heart) and/or pork (liver, lung, spleen), sufficient water for processing, technical additives (carob, xanthan gum, carob gum, carrageenan, guar gum), palatant (glycine), preservative (sodium nitrate), carriers (corn flour, natural mixtures of steatite and chlorite, silicic acid), minerals (calcium carbonate, potassium chloride, sodium carbonate), sugars (dextrose), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de poulet (découpes, foie, cœur) et/ou de porc (foie, poumon, rate), eau suffisante pour le procédé, additifs technologiques (caroube, gomme xanthane, gomme de caroube, carraghénane, gomme guar), agent d'appétence (glycine), conservateur (nitrate de sodium), supports (farine de maïs, mélanges naturels de stéatite et de chlorite, acide silicique), minéraux (carbonate de calcium, chlorure de potassium, carbonate de sodium), sucres (dextrose), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    claims: [
      { key: "81754c12cd56", text: { en: "Supports heart protection.", fr: "Contribue à la protection cardiaque." } },
      { key: "3cb487160aec", text: { en: "Helps prevent cellular aging.", fr: "Aide à prévenir le vieillissement cellulaire." } },
      { key: "615ad4a1a629", text: { en: "Strengthens the nervous system.", fr: "Renforce le système nerveux." } },
    ],
    kibbleDescription: {
      en: "Complete food for senior dogs. Serve at room temperature. We recommend adjusting the amount of food according to your dog's activity level, breed, and age.",
      fr: "Aliment complet pour chien senior. Servir à température ambiante. Il est recommandé d'ajuster la quantité d'aliment selon le niveau d'activité, la race et l'âge du chien.",
    },
  },
  {
    id: "product-canino-humedo-weight-control",
    name: "Weight Control Alimento Húmedo",
    tagline: {
      en: "Wet food for overweight or obese dogs.",
      fr: "Aliment humide pour chiens en surpoids ou obèses.",
    },
    description: {
      en: [
        {
          _key: "5d192c7aa93c",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "0f9eb06bf3eb", _type: "span", marks: [], text: "Wet food for overweight or obese adult dogs of all breeds." }],
        },
      ],
      fr: [
        {
          _key: "e989a5742bd4",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "90ad414ffbbe", _type: "span", marks: [], text: "Aliment humide pour chiens adultes de toutes races, en surpoids ou obèses." }],
        },
      ],
    },
    ingredients: {
      en: "Sufficient water for processing, pork meat and by-products (liver, lung, spleen) and/or chicken (trimmings, liver, heart) and/or poultry (trimmings), technical additives (carob, xanthan gum, carrageenan, carob gum, guar gum), minerals (calcium carbonate), preservatives (sodium nitrate), carriers (corn flour, natural mixtures of steatite and chlorite, silicic acid), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Eau suffisante pour le procédé, viande et sous-produits de porc (foie, poumon, rate) et/ou de poulet (découpes, foie, cœur) et/ou de volaille (découpes), additifs technologiques (caroube, gomme xanthane, carraghénane, gomme de caroube, gomme guar), minéraux (carbonate de calcium), conservateurs (nitrate de sodium), supports (farine de maïs, mélanges naturels de stéatite et de chlorite, acide silicique), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    claims: [
      { key: "054343e63288", text: { en: "Low in fat*.", fr: "Faible en matières grasses*." } },
      { key: "f191cc3ff6ea", text: { en: "Helps prevent cellular aging.", fr: "Aide à prévenir le vieillissement cellulaire." } },
    ],
    kibbleDescription: {
      en: "Complete food for adult dogs. Serve at room temperature. We recommend adjusting the amount of food according to your dog's activity level, breed, and age.",
      fr: "Aliment complet pour chien adulte. Servir à température ambiante. Il est recommandé d'ajuster la quantité d'aliment selon le niveau d'activité, la race et l'âge du chien.",
    },
  },
  {
    id: "product-felino-felino-humedo-hairball",
    name: "Felino Hairball Alimento Húmedo",
    tagline: {
      en: "Helps reduce hairball formation",
      fr: "Aide à réduire la formation de boules de poils",
    },
    description: {
      en: [
        {
          _key: "2b8f77b62e6f",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "7ed9ef807979", _type: "span", marks: [], text: "Wet food for adult cats of all breeds that helps reduce hairball formation." }],
        },
      ],
      fr: [
        {
          _key: "78fdc3b3b46c",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "c3894a8606b9", _type: "span", marks: [], text: "Aliment humide pour chats adultes de toutes races, qui aide à réduire la formation de boules de poils." }],
        },
      ],
    },
    ingredients: {
      en: "Sufficient water for processing, chicken meat and by-products (trimmings, liver, heart) and/or pork (liver, lung, spleen), whitefish and its by-products (heads and fins), plant-derived ingredients (pea fiber, chicory), palatants (glycine), technical additives (carob, xanthan gum, carrageenan, carob gum), minerals (calcium carbonate, potassium chloride, sodium carbonate), carriers (corn flour, sepiolite, natural mixture of steatite and chlorite, silicic acid, sipernat), preservatives (sodium nitrate), various sugars (dextrose), nutritional additives (vitamin E, taurine, zinc sulfate monohydrate, vitamin B1, biotin, manganese sulfate monohydrate, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Eau suffisante pour le procédé, viande et sous-produits de poulet (découpes, foie, cœur) et/ou de porc (foie, poumon, rate), poisson blanc et ses sous-produits (têtes et nageoires), dérivés d'origine végétale (fibre de pois, chicorée), agents d'appétence (glycine), additifs technologiques (caroube, gomme xanthane, carraghénane, gomme de caroube), minéraux (carbonate de calcium, chlorure de potassium, carbonate de sodium), supports (farine de maïs, sépiolite, mélange naturel de stéatite et de chlorite, acide silicique, sipernat), conservateurs (nitrate de sodium), divers sucres (dextrose), additifs nutritionnels (vitamine E, taurine, sulfate de zinc monohydraté, vitamine B1, biotine, sulfate de manganèse monohydraté, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    keyBenefits: [
      { key: "b2c4736c245e", description: { en: "Help reduce hairball formation.", fr: "Aident à réduire la formation de boules de poils." } },
      { key: "699612421709", description: { en: "For a shiny coat and healthy skin.", fr: "Pour un pelage brillant et une peau saine." } },
      { key: "ff8dff6a8e6f", description: { en: "Supports heart protection.", fr: "Contribue à la protection cardiaque." } },
    ],
    // kibble.description: NO_FIELD — no aplica
  },
  {
    id: "product-felino-felino-humedo-indoor",
    name: "Felino Indoor Alimento Húmedo",
    tagline: {
      en: "We strengthen the nervous system",
      fr: "Nous renforçons le système nerveux",
    },
    description: {
      en: [
        {
          _key: "f14ab50fce93",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "1f8361a901f7", _type: "span", marks: [], text: "Wet food for adult cats of all breeds." }],
        },
      ],
      fr: [
        {
          _key: "999360226227",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "22df7bd8a759", _type: "span", marks: [], text: "Aliment humide pour chats adultes de toutes races." }],
        },
      ],
    },
    ingredients: {
      en: "Pork meat and by-products (liver, lung, spleen) and/or chicken (trimmings, liver, heart) and/or poultry (trimmings), sufficient water for processing, technical additives (carob, xanthan gum, carrageenan, carob gum), palatants (glycine), minerals (calcium carbonate, potassium chloride), preservatives (sodium nitrate), carriers (corn flour, sepiolite, natural mixture of steatite and chlorite, silicic acid, sipernat), sugars (dextrose), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, biotin, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de porc (foie, poumon, rate) et/ou de poulet (découpes, foie, cœur) et/ou de volaille (découpes), eau suffisante pour le procédé, additifs technologiques (caroube, gomme xanthane, carraghénane, gomme de caroube), agents d'appétence (glycine), minéraux (carbonate de calcium, chlorure de potassium), conservateurs (nitrate de sodium), supports (farine de maïs, sépiolite, mélange naturel de stéatite et de chlorite, acide silicique, sipernat), sucres (dextrose), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, biotine, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    keyBenefits: [
      { key: "e86eb49884ca", description: { en: "Strengthens the nervous system.", fr: "Renforce le système nerveux." } },
      { key: "809053142323", description: { en: "Supports heart protection.", fr: "Contribue à la protection cardiaque." } },
      { key: "9b9d21047733", description: { en: "Helps maintain muscle mass.", fr: "Aide au maintien de la masse musculaire." } },
    ],
    // kibble.description: NO_FIELD — no aplica; warnings.es ya corregido por el usuario (sin duplicado) — no se traduce en este lote.
  },
  {
    id: "product-felino-felino-humedo-kitten",
    name: "Felino Kitten Alimento Húmedo",
    tagline: {
      en: "Optimal visual development",
      fr: "Un développement visuel optimal",
    },
    description: {
      en: [
        {
          _key: "37ebc94e8b9a",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "a66af762d3fe", _type: "span", marks: [], text: "Wet food for kittens of all breeds." }],
        },
      ],
      fr: [
        {
          _key: "b9535c018f1f",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "b1291f350c1f", _type: "span", marks: [], text: "Aliment humide pour chatons de toutes races." }],
        },
      ],
    },
    ingredients: {
      en: "Pork meat and by-products (liver, lung, spleen) and/or chicken (trimmings, liver, heart), sufficient water for processing, technical additives (xanthan gum, carrageenan, carob gum, carob), palatants (glycine), minerals (calcium carbonate, potassium chloride), preservatives (sodium nitrate), carriers (corn flour, sepiolite, natural mixture of steatite and chlorite, silicic acid, sipernat), various sugars (dextrose), nutritional additives (taurine, vitamin E, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, biotin, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Viande et sous-produits de porc (foie, poumon, rate) et/ou de poulet (découpes, foie, cœur), eau suffisante pour le procédé, additifs technologiques (gomme xanthane, carraghénane, gomme de caroube, caroube), agents d'appétence (glycine), minéraux (carbonate de calcium, chlorure de potassium), conservateurs (nitrate de sodium), supports (farine de maïs, sépiolite, mélange naturel de stéatite et de chlorite, acide silicique, sipernat), divers sucres (dextrose), additifs nutritionnels (taurine, vitamine E, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, biotine, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    keyBenefits: [
      { key: "1450956830e9", description: { en: "Bone and muscle development.", fr: "Développement osseux et musculaire." } },
      { key: "b8324c2eb7a7", description: { en: "Contributes to eye development, strengthening vision.", fr: "Contribue au développement oculaire en renforçant la vision." } },
    ],
    // kibble.description: NO_FIELD — no aplica
  },
  {
    id: "product-felino-felino-humedo-urinary",
    name: "Felino Urinary Alimento Húmedo",
    tagline: {
      en: "Helps balance urinary pH",
      fr: "Aide à équilibrer le pH urinaire",
    },
    description: {
      en: [
        {
          _key: "bdf821708154",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "25b4bb2cf427", _type: "span", marks: [], text: "Wet food for adult cats of all breeds that helps balance urinary pH." }],
        },
      ],
      fr: [
        {
          _key: "171380ed9b86",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "075c32fc4dff", _type: "span", marks: [], text: "Aliment humide pour chats adultes de toutes races, qui aide à équilibrer le pH urinaire." }],
        },
      ],
    },
    ingredients: {
      en: "Sufficient water for processing, poultry meat and by-products (trimmings) and/or pork (liver, lung, spleen), whitefish and its by-products (heads and fins), technical additives (carob, xanthan gum, carrageenan, carob gum, xanthan), palatants (glycine), fruit: cranberry, minerals (calcium carbonate, potassium chloride, sodium carbonate), carriers (corn flour, sepiolite, natural mixture of steatite and chlorite, silicic acid, sipernat), preservatives (sodium nitrate), various sugars (dextrose), nutritional additives (taurine, vitamin E, DL-methionine, zinc sulfate monohydrate, vitamin B1, manganese sulfate monohydrate, biotin, copper sulfate pentahydrate, anhydrous calcium iodate).",
      fr: "Eau suffisante pour le procédé, viande et sous-produits de volaille (découpes) et/ou de porc (foie, poumon, rate), poisson blanc et ses sous-produits (têtes et nageoires), additifs technologiques (caroube, gomme xanthane, carraghénane, gomme de caroube, xanthane), agents d'appétence (glycine), fruits : canneberge, minéraux (carbonate de calcium, chlorure de potassium, carbonate de sodium), supports (farine de maïs, sépiolite, mélange naturel de stéatite et de chlorite, acide silicique, sipernat), conservateurs (nitrate de sodium), divers sucres (dextrose), additifs nutritionnels (taurine, vitamine E, DL-méthionine, sulfate de zinc monohydraté, vitamine B1, sulfate de manganèse monohydraté, biotine, sulfate de cuivre pentahydraté, iodate de calcium anhydre).",
    },
    keyBenefits: [
      { key: "131a5d18f78f", description: { en: "Helps balance urinary pH.", fr: "Aide à équilibrer le pH urinaire." } },
      { key: "c96e8bb82011", description: { en: "Promotes urinary tract health.", fr: "Favorise la santé des voies urinaires." } },
      { key: "804e38b6af41", description: { en: "Supports heart protection.", fr: "Contribue à la protection cardiaque." } },
      { key: "22fe61152ef0", description: { en: "Cranberries, a source of natural antioxidants.", fr: "Canneberges, source d'antioxydants naturels." } },
    ],
    // kibble.description: NO_FIELD — no aplica
  },
];
