/**
 * NUPEC – Contenido EN/FR (traducción, no localización) del plan SEO/AEO:
 * meta título + meta descripción de 11 categorías y 55 productos, y meta
 * título + meta descripción + FAQ de las 3 páginas institucionales.
 *
 * Traducción adaptada (no literal) del copy ES ya cargado en Sanity
 * (ver scripts/patch-seo-es.ts y scripts/seed-seo-paginas-institucionales.ts),
 * respetando: meta título ≤60 caracteres, meta descripción ≤155 caracteres,
 * posicionamiento "súper premium" ("super premium" en ambos idiomas) y el
 * mismo tono por sección (técnico-confiable en especializada/clínica,
 * cercano-emocional en diaria/premios/húmedos/suplementos). Longitudes
 * validadas con scripts/seo-en-fr-check-lengths.ts.
 *
 * Consumido por scripts/patch-seo-en-fr.ts.
 */

type Patch = {
  id: string;
  name: string;
  en: { metaTitle: string; metaDescription: string };
  fr: { metaTitle: string; metaDescription: string };
};

export const CATEGORY_PATCHES: Patch[] = [
  // ── Canino ──
  {
    id: "e977c68b-e44d-495d-8164-3f45ee5d0f6e",
    name: "Nutrición diaria (canino)",
    en: {
      metaTitle: "Daily Nutrition NUPEC — Super Premium Dog Food",
      metaDescription: "Super premium NUPEC dog food for every life stage: puppy, adult and senior. Balanced nutrition that supports health and vitality.",
    },
    fr: {
      metaTitle: "Nutrition Quotidienne NUPEC — Croquettes Super Premium",
      metaDescription: "Aliment super premium NUPEC pour chiens à chaque étape de vie : chiot, adulte et senior. Une nutrition équilibrée pour sa santé.",
    },
  },
  {
    id: "category-canino-nutricion-especializada",
    name: "Nutrición especializada (canino)",
    en: {
      metaTitle: "Specialized Nutrition NUPEC for Dogs",
      metaDescription: "Targeted formulas for dogs with specific needs: digestion, skin, weight, energy or early life stages. Precision nutrition support.",
    },
    fr: {
      metaTitle: "Nutrition Spécialisée NUPEC pour Chiens",
      metaDescription: "Formules ciblées pour chiens aux besoins spécifiques : digestion, peau, poids, énergie ou premiers stades de vie. Précision nutritionnelle.",
    },
  },
  {
    id: "category-canino-nutricion-clinica",
    name: "Nutrición clínica (canino)",
    en: {
      metaTitle: "Clinical Nutrition NUPEC — Therapeutic Diets for Dogs",
      metaDescription: "NUPEC therapeutic diets scientifically formulated to manage disease in dogs, under veterinary prescription and supervision.",
    },
    fr: {
      metaTitle: "Nutrition Clinique NUPEC — Diètes Thérapeutiques Chiens",
      metaDescription: "Diètes thérapeutiques NUPEC formulées scientifiquement pour la gestion des maladies chez le chien, sous prescription vétérinaire.",
    },
  },
  {
    id: "category-canino-premios-funcionales",
    name: "Premios funcionales (canino)",
    en: {
      metaTitle: "Functional Treats NUPEC for Dogs | Healthy Snacks",
      metaDescription: "NUPEC treats that pamper your dog and deliver real benefits: dental, digestive and joint health, plus anxiety management.",
    },
    fr: {
      metaTitle: "Friandises Fonctionnelles NUPEC pour Chiens",
      metaDescription: "Friandises NUPEC qui font plaisir à votre chien et offrent de vrais bienfaits : santé dentaire, digestive, articulaire et anti-stress.",
    },
  },
  {
    id: "category-canino-suplementos",
    name: "Suplementos (canino)",
    en: {
      metaTitle: "Supplements NUPEC for Dogs | Vitality Water & Gel",
      metaDescription: "Smart hydration and vitality for your dog with Vitality Water and Vitality Gel: the ideal complement to daily nutrition.",
    },
    fr: {
      metaTitle: "Suppléments NUPEC pour Chiens | Vitality Water et Gel",
      metaDescription: "Hydratation intelligente et vitalité pour votre chien avec Vitality Water et Vitality Gel : le complément idéal au quotidien.",
    },
  },
  {
    id: "category-canino-alimentos-humedos",
    name: "Alimentos húmedos (canino)",
    en: {
      metaTitle: "Wet Food NUPEC Super Premium for Dogs",
      metaDescription: "NUPEC wet food, 100% balanced for dogs at every life stage. Complete nutrition that also pampers your dog.",
    },
    fr: {
      metaTitle: "Pâtée NUPEC Super Premium pour Chiens",
      metaDescription: "Pâtée NUPEC 100% équilibrée pour chiens à chaque étape de vie. Une nutrition complète qui fait aussi plaisir.",
    },
  },

  // ── Felino ──
  {
    id: "b377fa52-c4a8-42b6-8f88-179788df3d1d",
    name: "Nutrición diaria (felino)",
    en: {
      metaTitle: "Daily Nutrition NUPEC for Cats | +90% Digestibility",
      metaDescription: "Super premium NUPEC cat food with over 90% digestibility, formulated by life stage: kitten, adult and senior.",
    },
    fr: {
      metaTitle: "Nutrition Quotidienne NUPEC Chats | +90% Digestibilité",
      metaDescription: "Aliment super premium NUPEC pour chats avec plus de 90% de digestibilité, formulé selon l'âge : chaton, adulte, senior.",
    },
  },
  {
    id: "category-felino-nutricion-especializada",
    name: "Nutrición especializada (felino)",
    en: {
      metaTitle: "Specialized Nutrition NUPEC for Cats",
      metaDescription: "Targeted formulas for cats with specific needs: digestion, weight, urinary tract, hairball control or indoor life.",
    },
    fr: {
      metaTitle: "Nutrition Spécialisée NUPEC pour Chats",
      metaDescription: "Formules ciblées pour chats aux besoins spécifiques : digestion, poids, voies urinaires, boules de poils ou vie en intérieur.",
    },
  },
  {
    id: "category-felino-nutricion-clinica",
    name: "Nutrición clínica (felino)",
    en: {
      metaTitle: "Clinical Nutrition NUPEC — Therapeutic Diets for Cats",
      metaDescription: "NUPEC therapeutic diets scientifically formulated to manage disease in cats, under veterinary prescription and supervision.",
    },
    fr: {
      metaTitle: "Nutrition Clinique NUPEC — Diètes Thérapeutiques Chats",
      metaDescription: "Diètes thérapeutiques NUPEC formulées scientifiquement pour la gestion des maladies chez le chat, sous prescription vétérinaire.",
    },
  },
  {
    id: "category-felino-premios-funcionales",
    name: "Premios funcionales (felino)",
    en: {
      metaTitle: "Functional Treats NUPEC for Cats | Creamy Treats",
      metaDescription: "NUPEC creamy treats, science-backed, to pamper your cat and help with medication intake, with real benefits.",
    },
    fr: {
      metaTitle: "Friandises Fonctionnelles NUPEC Chats | Creamy Treats",
      metaDescription: "Friandises crémeuses NUPEC, validées scientifiquement, pour gâter votre chat et faciliter la prise de médicaments.",
    },
  },
  {
    id: "category-felino-alimentos-humedos",
    name: "Alimentos húmedos (felino)",
    en: {
      metaTitle: "Wet Food NUPEC Super Premium for Cats",
      metaDescription: "NUPEC wet food, biologically complete for cats, honoring their carnivorous nature in a gourmet experience.",
    },
    fr: {
      metaTitle: "Pâtée NUPEC Super Premium pour Chats",
      metaDescription: "Pâtée NUPEC biologiquement complète pour chats, qui respecte leur nature carnivore dans une expérience gourmet.",
    },
  },
];

export const PRODUCT_PATCHES: Patch[] = [
  // ── Canino / Nutrición diaria ──
  {
    id: "94543c98-c670-466e-82cd-aa62c446a963",
    name: "Adulto",
    en: {
      metaTitle: "NUPEC Adult — Super Premium Food for Dogs",
      metaDescription: "Super premium NUPEC food for adult dogs: maximum nutritional uptake for better health and quality of life.",
    },
    fr: {
      metaTitle: "NUPEC Adulte — Aliment Super Premium pour Chiens",
      metaDescription: "Aliment super premium NUPEC pour chiens adultes : assimilation nutritionnelle maximale pour une meilleure qualité de vie.",
    },
  },
  {
    id: "product-canino-adulto-razas-mini",
    name: "Adulto Razas Mini",
    en: {
      metaTitle: "NUPEC Adult Mini Breeds — Super Premium Food",
      metaDescription: "Super premium specialized nutrition for adult mini-breed dogs, with the energy their metabolism requires.",
    },
    fr: {
      metaTitle: "NUPEC Adulte Races Miniatures — Super Premium",
      metaDescription: "Nutrition spécialisée super premium pour chiens adultes de race miniature, avec l'énergie que réclame leur métabolisme.",
    },
  },
  {
    id: "product-canino-adulto-razas-pequenas",
    name: "Adulto Razas Pequeñas",
    en: {
      metaTitle: "NUPEC Adult Small Breeds — Super Premium",
      metaDescription: "Super premium NUPEC food with the right energy for the fast metabolism of adult small-breed dogs.",
    },
    fr: {
      metaTitle: "NUPEC Adulte Petites Races — Super Premium",
      metaDescription: "Aliment super premium NUPEC à l'énergie adaptée au métabolisme rapide des chiens adultes de petite race.",
    },
  },
  {
    id: "product-canino-cachorro-razas-mini",
    name: "Cachorro Razas Mini",
    en: {
      metaTitle: "NUPEC Puppy Mini Breeds — Super Premium Food",
      metaDescription: "Super premium specialized nutrition for the optimal development of mini-breed puppies.",
    },
    fr: {
      metaTitle: "NUPEC Chiot Races Miniatures — Super Premium",
      metaDescription: "Nutrition spécialisée super premium pour le développement optimal des chiots de race miniature.",
    },
  },
  {
    id: "product-canino-cachorro-razas-pequenas",
    name: "Cachorro Razas Pequeñas",
    en: {
      metaTitle: "NUPEC Puppy Small Breeds — Super Premium",
      metaDescription: "Super premium nutritional balance for the optimal development of small-breed puppies.",
    },
    fr: {
      metaTitle: "NUPEC Chiot Petites Races — Super Premium",
      metaDescription: "Équilibre nutritionnel super premium pour le développement optimal des chiots de petite race.",
    },
  },
  {
    id: "product-canino-senior",
    name: "Senior",
    en: {
      metaTitle: "NUPEC Senior — Super Premium Food for Dogs",
      metaDescription: "Super premium specialized nutrition that improves vitality and quality of life in senior dogs.",
    },
    fr: {
      metaTitle: "NUPEC Senior — Aliment Super Premium pour Chiens",
      metaDescription: "Nutrition spécialisée super premium qui améliore la vitalité et la qualité de vie des chiens seniors.",
    },
  },
  {
    id: "product-canino-senior-razas-mini",
    name: "Senior Razas Mini",
    en: {
      metaTitle: "NUPEC Senior Mini Breeds — Super Premium Food",
      metaDescription: "Super premium specialized nutrition for senior mini-breed dogs, caring for their daily vitality.",
    },
    fr: {
      metaTitle: "NUPEC Senior Races Miniatures — Super Premium",
      metaDescription: "Nutrition spécialisée super premium pour chiens seniors de race miniature, pour leur vitalité au quotidien.",
    },
  },
  {
    id: "product-canino-senior-razas-pequenas",
    name: "Senior Razas Pequeñas",
    en: {
      metaTitle: "NUPEC Senior Small Breeds — Joint Care",
      metaDescription: "Super premium food that strengthens the joints of senior small-breed dogs.",
    },
    fr: {
      metaTitle: "NUPEC Senior Petites Races — Santé Articulaire",
      metaDescription: "Aliment super premium qui renforce les articulations des chiens seniors de petite race.",
    },
  },

  // ── Canino / Nutrición especializada ──
  {
    id: "product-canino-1st-care",
    name: "1st Care",
    en: {
      metaTitle: "NUPEC 1st Care — Strengthens the Immune System",
      metaDescription: "Exclusive NUPEC formula that strengthens the immune system of puppies in their earliest life stages.",
    },
    fr: {
      metaTitle: "NUPEC 1st Care — Renforce le Système Immunitaire",
      metaDescription: "Formule exclusive NUPEC qui renforce le système immunitaire des chiots dès leurs premières étapes de vie.",
    },
  },
  {
    id: "product-canino-digestive-health",
    name: "Digestive Health",
    en: {
      metaTitle: "NUPEC Digestive Health — Canine Digestive Care",
      metaDescription: "Specialized nutrition to support digestive health in adult and senior dogs. Veterinary-backed.",
    },
    fr: {
      metaTitle: "NUPEC Digestive Health — Santé Digestive Canine",
      metaDescription: "Nutrition spécialisée qui soutient la santé digestive des chiens adultes et seniors. Validé vétérinaire.",
    },
  },
  {
    id: "product-canino-high-performance",
    name: "High Performance",
    en: {
      metaTitle: "NUPEC High Performance — Dogs High in Activity",
      metaDescription: "NUPEC specialized nutrition for active dogs with high physical performance demands.",
    },
    fr: {
      metaTitle: "NUPEC High Performance — Chiens Très Actifs",
      metaDescription: "Nutrition spécialisée NUPEC pour chiens actifs et à haute performance physique.",
    },
  },
  {
    id: "product-canino-renal-care",
    name: "Renal Care",
    en: {
      metaTitle: "NUPEC Renal Care — Kidney Care for Dogs",
      metaDescription: "Specialized nutrition to support kidney care in adult and senior dogs.",
    },
    fr: {
      metaTitle: "NUPEC Renal Care — Santé Rénale Canine",
      metaDescription: "Nutrition spécialisée qui soutient la santé rénale des chiens adultes et seniors.",
    },
  },
  {
    id: "product-canino-sensitive",
    name: "Sensitive",
    en: {
      metaTitle: "NUPEC Sensitive — Food Allergies in Dogs",
      metaDescription: "Diet to help manage food allergies in adult and senior dogs.",
    },
    fr: {
      metaTitle: "NUPEC Sensitive — Allergies Alimentaires Chiens",
      metaDescription: "Diète qui aide à gérer les allergies alimentaires chez les chiens adultes et seniors.",
    },
  },
  {
    id: "product-canino-sensitive-razas-pequenas",
    name: "Sensitive Razas Pequeñas",
    en: {
      metaTitle: "NUPEC Sensitive Small Breeds — Allergies",
      metaDescription: "Diet to help manage food allergies in adult small-breed dogs.",
    },
    fr: {
      metaTitle: "NUPEC Sensitive Petites Races — Allergies",
      metaDescription: "Diète qui aide à gérer les allergies alimentaires chez les chiens adultes de petite race.",
    },
  },
  {
    id: "product-canino-urinary-management",
    name: "Urinary Management",
    en: {
      metaTitle: "NUPEC Urinary Management — Canine Urinary Tract",
      metaDescription: "Specialized nutrition to support urinary tract care in adult and senior dogs.",
    },
    fr: {
      metaTitle: "NUPEC Urinary Management — Voies Urinaires Chien",
      metaDescription: "Nutrition spécialisée qui soutient la santé des voies urinaires des chiens adultes et seniors.",
    },
  },
  {
    id: "product-canino-weight-control",
    name: "Weight Control",
    en: {
      metaTitle: "NUPEC Weight Control — Weight Management in Dogs",
      metaDescription: "Proper nutrition for overweight or obese dogs, under veterinary supervision.",
    },
    fr: {
      metaTitle: "NUPEC Weight Control — Gestion du Poids Chien",
      metaDescription: "Nutrition adaptée pour chiens en surpoids ou obèses, sous supervision vétérinaire.",
    },
  },
  {
    id: "product-canino-weight-control-razas-pequenas",
    name: "Weight Control Razas Pequeñas",
    en: {
      metaTitle: "NUPEC Weight Control Small Breeds",
      metaDescription: "Weight reduction with a feeling of fullness for overweight small-breed dogs.",
    },
    fr: {
      metaTitle: "NUPEC Weight Control Petites Races",
      metaDescription: "Réduction de poids avec sensation de satiété pour chiens de petite race en surpoids.",
    },
  },

  // ── Canino / Nutrición clínica ──
  {
    id: "product-canino-acute-hepatic",
    name: "Acute Hepatic",
    en: {
      metaTitle: "NUPEC Acute Hepatic — Hepatic Therapeutic Nutrition",
      metaDescription: "NUPEC therapeutic nutrition for acute hepatocellular restoration in dogs. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Acute Hepatic — Nutrition Thérapeutique Hépatique",
      metaDescription: "Nutrition thérapeutique NUPEC pour la restauration hépatocellulaire aiguë chez le chien. Prescription vétérinaire.",
    },
  },
  {
    id: "product-canino-hepatic",
    name: "Hepatic",
    en: {
      metaTitle: "NUPEC Hepatic — Ongoing Therapeutic Nutrition",
      metaDescription: "NUPEC ongoing therapeutic nutrition for liver management in dogs. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Hepatic — Nutrition Thérapeutique Continue",
      metaDescription: "Nutrition thérapeutique continue NUPEC pour la gestion hépatique chez le chien. Prescription vétérinaire.",
    },
  },
  {
    id: "product-canino-cardiac",
    name: "Cardiac",
    en: {
      metaTitle: "NUPEC Cardiac — Cardiovascular Therapeutic Nutrition",
      metaDescription: "NUPEC therapeutic nutrition for cardiovascular health in dogs. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Cardiac — Nutrition Thérapeutique Cardiovasculaire",
      metaDescription: "Nutrition thérapeutique NUPEC pour la santé cardiovasculaire du chien. Prescription vétérinaire.",
    },
  },
  {
    id: "product-canino-hypoallergenic",
    name: "Hypoallergenic",
    en: {
      metaTitle: "NUPEC Hypoallergenic — Adverse Food Reaction",
      metaDescription: "NUPEC advanced therapeutic nutrition for adverse food reactions in dogs. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Hypoallergenic — Réaction Alimentaire Indésirable",
      metaDescription: "Nutrition thérapeutique avancée NUPEC pour les réactions alimentaires indésirables chez le chien. Prescription vétérinaire.",
    },
  },

  // ── Canino / Premios funcionales ──
  {
    id: "product-canino-dental-care-treats",
    name: "Dental Care Treats",
    en: {
      metaTitle: "NUPEC Dental Care Treats — Canine Dental Health",
      metaDescription: "NUPEC treat with functional ingredients that helps control plaque and tartar in dogs.",
    },
    fr: {
      metaTitle: "NUPEC Dental Care Treats — Santé Dentaire Chien",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui aide à contrôler la plaque et le tartre chez le chien.",
    },
  },
  {
    id: "product-canino-digestive-care-treats",
    name: "Digestive Care Treats",
    en: {
      metaTitle: "NUPEC Digestive Care Treats — Digestive Health",
      metaDescription: "NUPEC treat with functional ingredients that promotes healthy digestion in dogs.",
    },
    fr: {
      metaTitle: "NUPEC Digestive Care Treats — Santé Digestive",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui favorise une digestion saine chez le chien.",
    },
  },
  {
    id: "product-canino-joint-care-treats",
    name: "Joint Care Treats",
    en: {
      metaTitle: "NUPEC Joint Care Treats — Canine Joint Health",
      metaDescription: "NUPEC treat with functional ingredients that helps maintain healthy joints.",
    },
    fr: {
      metaTitle: "NUPEC Joint Care Treats — Santé Articulaire Chien",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui aide à maintenir des articulations saines.",
    },
  },
  {
    id: "product-canino-relax-treats",
    name: "Relax Treats",
    en: {
      metaTitle: "NUPEC Relax Treats — Anxiety & Stress in Dogs",
      metaDescription: "NUPEC treat with functional ingredients that helps manage anxiety and stress in dogs.",
    },
    fr: {
      metaTitle: "NUPEC Relax Treats — Anxiété et Stress Canin",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui aide à gérer l'anxiété et le stress chez le chien.",
    },
  },
  {
    id: "product-canino-smart-treats",
    name: "Smart Treats",
    en: {
      metaTitle: "NUPEC Smart Treats — Canine Cognitive Function",
      metaDescription: "NUPEC treat with functional ingredients that promotes cognitive function in dogs.",
    },
    fr: {
      metaTitle: "NUPEC Smart Treats — Fonction Cognitive Canine",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui favorise la fonction cognitive chez le chien.",
    },
  },
  {
    id: "product-canino-training-treats",
    name: "Training Treats",
    en: {
      metaTitle: "NUPEC Training Treats — Dog Training",
      metaDescription: "NUPEC treat with functional ingredients that supports your dog's training.",
    },
    fr: {
      metaTitle: "NUPEC Training Treats — Éducation Canine",
      metaDescription: "Friandise NUPEC aux ingrédients fonctionnels qui accompagne le dressage de votre chien.",
    },
  },

  // ── Canino / Suplementos ──
  {
    id: "product-canino-vitality-gel-multivitaminico",
    name: "Vitality Gel Multivitamínico",
    en: {
      metaTitle: "NUPEC Vitality Gel — Multivitamin Supplement",
      metaDescription: "NUPEC vitamin supplement for dogs during periods of high physiological demand.",
    },
    fr: {
      metaTitle: "NUPEC Vitality Gel — Supplément Multivitaminé",
      metaDescription: "Supplément vitaminé NUPEC pour chiens en périodes de forte exigence physiologique.",
    },
  },
  {
    id: "product-canino-vitality-water-carne",
    name: "Vitality Water Sabor Carne",
    en: {
      metaTitle: "NUPEC Vitality Water Meat — Active Hydration",
      metaDescription: "Active hydration with vitamin support for dogs, meat flavor. The ideal complement to daily nutrition.",
    },
    fr: {
      metaTitle: "NUPEC Vitality Water Viande — Hydratation Active",
      metaDescription: "Hydratation active avec apport vitaminé pour chiens, saveur viande. Le complément idéal au quotidien.",
    },
  },
  {
    id: "fec6eebd-bcfa-45fb-a817-67ca4fb3a527",
    name: "Vitality Water Sabor Frutal",
    en: {
      metaTitle: "NUPEC Vitality Water Fruit — Active Hydration",
      metaDescription: "Active hydration with vitamin support for dogs, fruit flavor. The ideal complement to daily nutrition.",
    },
    fr: {
      metaTitle: "NUPEC Vitality Water Fruits — Hydratation Active",
      metaDescription: "Hydratation active avec apport vitaminé pour chiens, saveur fruitée. Le complément idéal au quotidien.",
    },
  },
  {
    id: "product-canino-vitality-water-sandia",
    name: "Vitality Water Sabor Sandía",
    en: {
      metaTitle: "NUPEC Vitality Water Watermelon — Hydration",
      metaDescription: "Active hydration with vitamin support for dogs, watermelon flavor. The ideal complement to daily nutrition.",
    },
    fr: {
      metaTitle: "NUPEC Vitality Water Pastèque — Hydratation Active",
      metaDescription: "Hydratation active avec apport vitaminé pour chiens, saveur pastèque. Le complément idéal au quotidien.",
    },
  },

  // ── Canino / Alimentos húmedos ──
  {
    id: "product-canino-humedo-adulto-carne-verduras",
    name: "Adulto Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Adult — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food, complete and balanced for adult dogs.",
    },
    fr: {
      metaTitle: "NUPEC Adulte — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC, complète et équilibrée pour chiens adultes.",
    },
  },
  {
    id: "product-canino-humedo-cachorro-alto-pollo",
    name: "Cachorro Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Puppy — Wet Food High in Chicken",
      metaDescription: "Super premium NUPEC wet food, high in chicken, for growing puppies.",
    },
    fr: {
      metaTitle: "NUPEC Chiot — Pâtée Riche en Poulet",
      metaDescription: "Pâtée super premium NUPEC, riche en poulet, pour le développement des chiots.",
    },
  },
  {
    id: "product-canino-humedo-digestive",
    name: "Digestive Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Digestive — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food that supports digestive health in adult and senior dogs.",
    },
    fr: {
      metaTitle: "NUPEC Digestive — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC qui soutient la santé digestive des chiens adultes et seniors.",
    },
  },
  {
    id: "product-canino-humedo-senior",
    name: "Senior Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Senior — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food for senior dogs of all breeds.",
    },
    fr: {
      metaTitle: "NUPEC Senior — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC pour chiens seniors, toutes races confondues.",
    },
  },
  {
    id: "product-canino-humedo-weight-control",
    name: "Weight Control Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Weight Control — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food for overweight or obese dogs.",
    },
    fr: {
      metaTitle: "NUPEC Weight Control — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC pour chiens en surpoids ou obèses.",
    },
  },

  // ── Felino / Nutrición diaria ──
  {
    id: "product-felino-felino-indoor",
    name: "FELINO Indoor",
    en: {
      metaTitle: "NUPEC Indoor — Super Premium Food for Cats",
      metaDescription: "Super premium specialized nutrition for adult indoor cats, caring for their nervous system.",
    },
    fr: {
      metaTitle: "NUPEC Indoor — Aliment Super Premium pour Chats",
      metaDescription: "Nutrition spécialisée super premium pour chats adultes d'intérieur, prenant soin de leur système nerveux.",
    },
  },
  {
    id: "product-felino-felino-kitten",
    name: "FELINO Kitten",
    en: {
      metaTitle: "NUPEC Kitten — Super Premium Food for Kittens",
      metaDescription: "Super premium specialized nutrition for young kittens, in their peak stage of development.",
    },
    fr: {
      metaTitle: "NUPEC Kitten — Aliment Super Premium pour Chatons",
      metaDescription: "Nutrition spécialisée super premium pour chatons en bas âge, à leur stade de développement clé.",
    },
  },
  {
    id: "product-felino-felino-senior",
    name: "FELINO Senior",
    en: {
      metaTitle: "NUPEC Senior — Super Premium Food for Cats",
      metaDescription: "Super premium specialized nutrition for older cats, caring for their daily vitality.",
    },
    fr: {
      metaTitle: "NUPEC Senior — Aliment Super Premium pour Chats",
      metaDescription: "Nutrition spécialisée super premium pour chats âgés, pour leur vitalité au quotidien.",
    },
  },

  // ── Felino / Nutrición especializada ──
  {
    id: "product-felino-felino-digestive-health",
    name: "Digestive Health (felino)",
    en: {
      metaTitle: "NUPEC Digestive Health — Feline Digestive Care",
      metaDescription: "Specialized nutrition to support digestive health in adult cats. Veterinary-backed.",
    },
    fr: {
      metaTitle: "NUPEC Digestive Health — Santé Digestive Féline",
      metaDescription: "Nutrition spécialisée qui soutient la santé digestive des chats adultes. Validé vétérinaire.",
    },
  },
  {
    id: "21d2abd4-ec74-4c79-8a7b-03a771da3d72",
    name: "Felino Hairball",
    en: {
      metaTitle: "NUPEC Hairball — Hairball Control",
      metaDescription: "NUPEC specialized nutrition for adult long-haired cats, helping control hairballs.",
    },
    fr: {
      metaTitle: "NUPEC Hairball — Contrôle des Boules de Poils",
      metaDescription: "Nutrition spécialisée NUPEC pour chats adultes à poil long, qui aide à contrôler les boules de poils.",
    },
  },
  {
    id: "product-felino-felino-weight-care",
    name: "Felino Weight Care",
    en: {
      metaTitle: "NUPEC Weight Care — Weight Management in Cats",
      metaDescription: "Weight reduction and healthy maintenance for cats, under veterinary supervision.",
    },
    fr: {
      metaTitle: "NUPEC Weight Care — Gestion du Poids Chat",
      metaDescription: "Réduction et maintien d'un poids sain pour chats, sous supervision vétérinaire.",
    },
  },
  {
    id: "product-felino-felino-renal-care",
    name: "Renal Care (felino)",
    en: {
      metaTitle: "NUPEC Renal Care — Kidney Care for Cats",
      metaDescription: "Specialized nutrition to support kidney care in adult cats.",
    },
    fr: {
      metaTitle: "NUPEC Renal Care — Santé Rénale Féline",
      metaDescription: "Nutrition spécialisée qui soutient la santé rénale des chats adultes.",
    },
  },
  {
    id: "product-felino-felino-urinary-management",
    name: "Urinary Management (felino)",
    en: {
      metaTitle: "NUPEC Urinary Management — Feline Urinary Tract",
      metaDescription: "Specialized nutrition to support urinary tract care in adult cats.",
    },
    fr: {
      metaTitle: "NUPEC Urinary Management — Voies Urinaires Chat",
      metaDescription: "Nutrition spécialisée qui soutient la santé des voies urinaires des chats adultes.",
    },
  },

  // ── Felino / Nutrición clínica ──
  {
    id: "product-felino-felino-cardiac",
    name: "FELINO Cardiac",
    en: {
      metaTitle: "NUPEC Cardiac Feline — Cardiovascular Nutrition",
      metaDescription: "NUPEC therapeutic nutrition for cardiovascular health in cats. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Cardiac Félin — Nutrition Cardiovasculaire",
      metaDescription: "Nutrition thérapeutique NUPEC pour la santé cardiovasculaire du chat. Prescription vétérinaire.",
    },
  },
  {
    id: "product-felino-felino-hepatic",
    name: "FELINO Hepatic",
    en: {
      metaTitle: "NUPEC Hepatic Feline — Hepatic Therapeutic Nutrition",
      metaDescription: "NUPEC ongoing therapeutic nutrition for feline liver insufficiency. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Hepatic Félin — Nutrition Thérapeutique",
      metaDescription: "Nutrition thérapeutique continue NUPEC pour l'insuffisance hépatique féline. Prescription vétérinaire.",
    },
  },
  {
    id: "product-felino-felino-hypoallergenic",
    name: "FELINO Hypoallergenic",
    en: {
      metaTitle: "NUPEC Hypoallergenic Feline — Hypoallergenic Therapy",
      metaDescription: "NUPEC clinical nutrition that supports hypoallergenic therapy in cats. Veterinary prescription only.",
    },
    fr: {
      metaTitle: "NUPEC Hypoallergenic Félin — Thérapie Hypoallergénique",
      metaDescription: "Nutrition clinique NUPEC qui soutient la thérapie hypoallergénique chez le chat. Prescription vétérinaire.",
    },
  },

  // ── Felino / Premios funcionales ──
  {
    id: "product-felino-creamy-treats-digestive-care",
    name: "Creamy Treats Digestive Care",
    en: {
      metaTitle: "NUPEC Creamy Treats Digestive Care — Cats",
      metaDescription: "NUPEC creamy treat that supports your cat's daily digestive health.",
    },
    fr: {
      metaTitle: "NUPEC Creamy Treats Digestive Care — Chats",
      metaDescription: "Friandise crémeuse NUPEC qui soutient la santé digestive quotidienne de votre chat.",
    },
  },
  {
    id: "product-felino-creamy-treats-joint-care",
    name: "Creamy Treats Joint Care",
    en: {
      metaTitle: "NUPEC Creamy Treats Joint Care — Joint Health",
      metaDescription: "NUPEC creamy treat that supports your cat's daily joint health.",
    },
    fr: {
      metaTitle: "NUPEC Creamy Treats Joint Care — Santé Articulaire",
      metaDescription: "Friandise crémeuse NUPEC qui soutient la santé articulaire quotidienne de votre chat.",
    },
  },
  {
    id: "product-felino-creamy-treats-skin-coat",
    name: "Creamy Treats Skin & Coat",
    en: {
      metaTitle: "NUPEC Creamy Treats Skin & Coat — Cats",
      metaDescription: "NUPEC creamy treat that supports your cat's skin and coat health.",
    },
    fr: {
      metaTitle: "NUPEC Creamy Treats Skin & Coat — Chats",
      metaDescription: "Friandise crémeuse NUPEC qui soutient la santé de la peau et du pelage de votre chat.",
    },
  },
  {
    id: "product-felino-creamy-treats-vitality-care",
    name: "Creamy Treats Vitality Care",
    en: {
      metaTitle: "NUPEC Creamy Treats Vitality Care — Cats",
      metaDescription: "NUPEC creamy treat that supports your cat's daily vitality.",
    },
    fr: {
      metaTitle: "NUPEC Creamy Treats Vitality Care — Chats",
      metaDescription: "Friandise crémeuse NUPEC qui soutient la vitalité quotidienne de votre chat.",
    },
  },

  // ── Felino / Alimentos húmedos ──
  {
    id: "product-felino-felino-humedo-hairball",
    name: "Felino Hairball Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Hairball — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food that helps reduce hairball formation in cats.",
    },
    fr: {
      metaTitle: "NUPEC Hairball — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC qui aide à réduire la formation de boules de poils chez le chat.",
    },
  },
  {
    id: "product-felino-felino-humedo-indoor",
    name: "Felino Indoor Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Indoor — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food that strengthens the nervous system of indoor cats.",
    },
    fr: {
      metaTitle: "NUPEC Indoor — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC qui renforce le système nerveux des chats d'intérieur.",
    },
  },
  {
    id: "product-felino-felino-humedo-kitten",
    name: "Felino Kitten Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Kitten — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food for the optimal visual development of kittens.",
    },
    fr: {
      metaTitle: "NUPEC Kitten — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC pour le développement visuel optimal des chatons.",
    },
  },
  {
    id: "product-felino-felino-humedo-urinary",
    name: "Felino Urinary Alimento Húmedo",
    en: {
      metaTitle: "NUPEC Urinary — Super Premium Wet Food",
      metaDescription: "Super premium NUPEC wet food that helps balance urinary pH in cats.",
    },
    fr: {
      metaTitle: "NUPEC Urinary — Pâtée Super Premium",
      metaDescription: "Pâtée super premium NUPEC qui aide à équilibrer le pH urinaire chez le chat.",
    },
  },
];

type FaqItem = { question: string; answer: string };
type PagePatch = {
  docId: string;
  pageId: "nosotros" | "conciencia" | "contacto";
  en: { metaTitle: string; metaDescription: string; faq: FaqItem[] };
  fr: { metaTitle: string; metaDescription: string; faq: FaqItem[] };
};

export const PAGE_PATCHES: PagePatch[] = [
  {
    docId: "page-nosotros",
    pageId: "nosotros",
    en: {
      metaTitle: "NUPEC — Over 30 Years Nourishing with Science",
      metaDescription: "Discover NUPEC's story, part of Grupo NUTEC since 1993. Science, experience and research in premium nutrition for dogs and cats.",
      faq: [
        {
          question: "Since when has NUPEC existed?",
          answer: "NUPEC was born from Grupo NUTEC, pioneers in animal nutrition in Mexico since 1993, with over 30 years of experience and scientific research.",
        },
        {
          question: "What does the name NUPEC mean?",
          answer: 'NUPEC combines "NU" from New and "PEEK" (dog in Mayan): a name that honors our Mexican roots and represents a new generation of pet nutrition.',
        },
        {
          question: "Where is NUPEC manufactured?",
          answer: "NUPEC is produced in two plants using 100% imported European technology, in partnership with Grupo CCPA of France.",
        },
      ],
    },
    fr: {
      metaTitle: "NUPEC — Plus de 30 Ans à Nourrir avec la Science",
      metaDescription: "Découvrez l'histoire de NUPEC, membre de Grupo NUTEC depuis 1993. Science, expérience et recherche en nutrition premium pour chiens et chats.",
      faq: [
        {
          question: "Depuis quand NUPEC existe-t-elle ?",
          answer: "NUPEC est née de Grupo NUTEC, pionnier de la nutrition animale au Mexique depuis 1993, avec plus de 30 ans d'expérience et de recherche scientifique.",
        },
        {
          question: "Que signifie le nom NUPEC ?",
          answer: 'NUPEC combine « NU » de Nouveau et « PEEK » (chien en maya) : un nom qui honore nos racines mexicaines et incarne une nouvelle génération de nutrition animale.',
        },
        {
          question: "Où est fabriquée NUPEC ?",
          answer: "NUPEC est produite dans deux usines dotées d'une technologie 100% importée d'Europe, en partenariat avec le Groupe CCPA de France.",
        },
      ],
    },
  },
  {
    docId: "page-conciencia",
    pageId: "conciencia",
    en: {
      metaTitle: "NUPEC Social Impact — Nourishing with Love",
      metaDescription: "NUPEC's social responsibility initiatives: animal-assisted therapy, Mexican wolf conservation and support for local talent.",
      faq: [
        {
          question: "What is NUPEC's Therapy with Love program?",
          answer: "It's NUPEC's alliance with Fundación Movimiento INCASÁRA for animal-assisted therapy with trained dogs and horses. A share of every purchase funds these therapies.",
        },
        {
          question: 'What is the "Con Amor de México" edition?',
          answer: "It's a special NUPEC edition featuring Otomí art from Guanajuato, Michoacán and Tlaxcala, which supports the training of local suppliers and talent.",
        },
        {
          question: "How many Mexican professionals support NUPEC?",
          answer: "Over 600 Mexican professionals — scientists, veterinarians and animal nutrition specialists — take part in developing NUPEC.",
        },
      ],
    },
    fr: {
      metaTitle: "NUPEC Impact Social — Nourrir avec Amour",
      metaDescription: "Initiatives de responsabilité sociale NUPEC : thérapies assistées par l'animal, conservation du loup mexicain et soutien au talent local.",
      faq: [
        {
          question: "Qu'est-ce que le programme Terapias con Amor de NUPEC ?",
          answer: "C'est l'alliance de NUPEC avec la Fondation Movimiento INCASÁRA pour la thérapie assistée par des chiens et chevaux entraînés. Un pourcentage de chaque achat finance ces thérapies.",
        },
        {
          question: 'Qu\'est-ce que l\'édition « Con Amor de México » ?',
          answer: "C'est une édition spéciale NUPEC ornée d'art otomi de Guanajuato, du Michoacán et de Tlaxcala, qui soutient la formation de fournisseurs et de talents locaux.",
        },
        {
          question: "Combien de professionnels mexicains soutiennent NUPEC ?",
          answer: "Plus de 600 professionnels mexicains — scientifiques, vétérinaires et spécialistes en nutrition animale — participent au développement de NUPEC.",
        },
      ],
    },
  },
  {
    docId: "page-contacto",
    pageId: "contacto",
    en: {
      metaTitle: "Contact NUPEC — Querétaro, Mexico",
      metaDescription: "Get in touch: (800) 926 8732, Monday to Friday, 8:00 am to 6:00 pm. We answer your questions about NUPEC nutrition for dogs and cats.",
      faq: [
        {
          question: "What is NUPEC's contact phone number?",
          answer: "You can call (800) 926 8732 (800 YA NUPEC), Monday to Friday from 8:00 am to 6:00 pm.",
        },
        {
          question: "Where are NUPEC's offices located?",
          answer: "NUPEC operates from Avenida de las Fuentes #14, Fraccionamiento Industrial Bernardo Quintana, El Marqués, Querétaro, C.P. 76240, Mexico.",
        },
      ],
    },
    fr: {
      metaTitle: "Contact NUPEC — Querétaro, Mexique",
      metaDescription: "Contactez-nous : (800) 926 8732, du lundi au vendredi de 8h à 18h. Nous répondons à vos questions sur la nutrition NUPEC pour chiens et chats.",
      faq: [
        {
          question: "Quel est le numéro de téléphone de NUPEC ?",
          answer: "Vous pouvez appeler le (800) 926 8732 (800 YA NUPEC), du lundi au vendredi de 8h à 18h.",
        },
        {
          question: "Où se trouvent les bureaux de NUPEC ?",
          answer: "NUPEC opère depuis Avenida de las Fuentes #14, Fraccionamiento Industrial Bernardo Quintana, El Marqués, Querétaro, C.P. 76240, Mexique.",
        },
      ],
    },
  },
];
