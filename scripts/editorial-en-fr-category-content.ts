/**
 * NUPEC – Contenido EN/FR (traducción adaptada, no literal) del contenido
 * editorial de category.ts: description, excerpt, complementaryText y
 * stats[].label/description.
 *
 * Continuación del trabajo de SEO/AEO (ver scripts/README-traduccion-seo.md).
 * Ese trabajo cubrió seo.metaTitle/metaDescription y faq — este archivo NO
 * los repite.
 *
 * Ámbito: 11 categorías publicadas. Excluye a propósito
 * `drafts.category-felino-suplementos` (documento sin publicar, fuera del
 * alcance de este trabajo).
 *
 * Reglas de contenido (igual que en seo-en-fr-content.ts):
 * - Traducción adaptada, no literal (EN mercado US, FR mercado francófono)
 * - "súper premium" → "super premium" (igual en ambos idiomas)
 * - Tono técnico-confiable en especializada/clínica; cercano-emocional en
 *   diaria/premios/húmedos/suplementos
 * - Nunca se toca el campo `es`
 *
 * Consumido por scripts/patch-editorial-en-fr-category.ts.
 */

type LangText = { en: string; fr: string };

type CategoryContentPatch = {
  id: string;
  name: string; // solo para logs, no se escribe a Sanity
  description?: LangText;
  excerpt?: LangText;
  complementaryText?: LangText;
  stats?: { key: string; label?: LangText; description?: LangText }[];
};

export const CATEGORY_CONTENT_PATCHES: CategoryContentPatch[] = [
  // ── Canino ──────────────────────────────────────────────────────
  {
    id: "e977c68b-e44d-495d-8164-3f45ee5d0f6e",
    name: "Nutrición diaria (canino)",
    excerpt: {
      en: "THE FOUNDATION OF A HEALTHY LIFE",
      fr: "LA BASE D'UNE VIE SAINE",
    },
    description: {
      en: "Every life stage of a dog has specific nutritional needs. Daily nutrition is the first line of prevention: a balanced supply of protein, energy, vitamins and minerals that supports development, vitality and long-term health.\nNourishing goes beyond feeding — it means precision at every stage, puppy, adult and senior, respecting the differences between sizes and breeds. Well-formulated daily nutrition doesn't just meet requirements: it anticipates future challenges and builds the foundation for healthy aging.",
      fr: "Chaque étape de vie du chien a des besoins nutritionnels spécifiques. La nutrition quotidienne est la première ligne de prévention : un apport équilibré en protéines, énergie, vitamines et minéraux qui soutient le développement, la vitalité et la santé à long terme.\nNourrir va au-delà de l'alimentation : il s'agit d'apporter une précision à chaque étape — chiot, adulte et senior — en respectant les différences entre les tailles et les races. Une nutrition quotidienne bien formulée ne couvre pas seulement les besoins : elle anticipe les défis futurs et construit les bases d'un vieillissement en bonne santé.",
    },
    complementaryText: {
      en: "Driven to elevate every pet's quality of life, we formulate a family of super premium products with over 90% protein digestibility, backed by nutrition experts, veterinarians and food-development scientists. Our priority is to nourish, with real intention, the bond between humans and dogs — so we keep sharing unforgettable moments together.",
      fr: "Animés par la volonté d'élever la qualité de vie de chaque animal, nous formulons une famille de produits super premium avec plus de 90% de digestibilité protéique, soutenus par des experts en nutrition, des vétérinaires et des scientifiques spécialisés dans le développement alimentaire. Notre priorité est de nourrir, en pleine conscience, le lien qui unit les humains et les chiens, pour continuer à partager des moments inoubliables.",
    },
  },
  {
    id: "category-canino-nutricion-especializada",
    name: "Nutrición especializada (canino)",
    excerpt: {
      en: "Precise solutions for specific needs",
      fr: "Des solutions précises pour des besoins spécifiques",
    },
    description: {
      en: "Not every dog has the same needs. Some require digestive support, others present skin or food sensitivities, need weight management, are going through early life stages, or have higher energy demands from physical activity.\nSpecialized nutrition addresses these scenarios with targeted formulations: selected ingredients, adjusted nutritional profiles and inclusion levels designed for each particular condition. This isn't a generic solution — it's a nutritional approach that supports the veterinarian in managing cases that require greater precision.",
      fr: "Tous les chiens n'ont pas les mêmes besoins. Certains ont besoin d'un soutien digestif, d'autres présentent des sensibilités cutanées ou alimentaires, ont besoin d'un contrôle du poids, traversent les premières étapes de vie ou ont des besoins énergétiques plus élevés en raison de leur activité physique.\nLa nutrition spécialisée répond à ces situations avec des formulations ciblées : ingrédients sélectionnés, profils nutritionnels ajustés et niveaux d'inclusion pensés pour chaque condition particulière. Ce n'est pas une solution générique, mais une approche nutritionnelle qui accompagne le vétérinaire dans la gestion de cas exigeant plus de précision.",
    },
    complementaryText: {
      en: "Aware of each dog's specific needs, at NUPEC® we've formulated a family of Specialized Super Premium products backed by nutritional scientific research.",
      fr: "Conscients des besoins spécifiques de chaque chien, chez NUPEC® nous avons formulé une famille de produits Super Premium Spécialisés, soutenus par la recherche scientifique en nutrition.",
    },
  },
  {
    id: "category-canino-nutricion-clinica",
    name: "Nutrición clínica (canino)",
    excerpt: {
      en: "Therapeutic diets that support medical treatment.",
      fr: "Des diètes thérapeutiques qui soutiennent le traitement médical.",
    },
    description: {
      en: "Clinical nutrition holds a different place than daily or specialized nutrition: these are therapeutic diets scientifically designed to manage disease, prevent relapse and extend dogs' lives through the precise modification of their nutrients, becoming an active part of medical treatment. Their prescription and monitoring are the exclusive responsibility of the veterinarian, who determines their use based on diagnosis and the patient's progress. Formulated with precise levels of key nutrients, these diets support the management of specific conditions, helping improve treatment response and the patient's quality of life.",
      fr: "La nutrition clinique occupe une place différente de la nutrition quotidienne ou spécialisée : il s'agit de diètes thérapeutiques conçues scientifiquement pour traiter les maladies, prévenir les rechutes et prolonger la vie des chiens grâce à une modification précise de leurs nutriments, devenant ainsi partie active du traitement médical. Leur prescription et leur suivi relèvent exclusivement du vétérinaire, qui en détermine l'usage selon le diagnostic et l'évolution du patient. Formulées avec des niveaux précis de nutriments clés, ces diètes soutiennent la gestion de conditions spécifiques, contribuant à améliorer la réponse au traitement et la qualité de vie du patient.",
    },
    complementaryText: {
      en: "When a dog faces a health challenge, love and medical care are essential — but nutrition plays a decisive role.",
      fr: "Lorsqu'un chien fait face à un défi de santé, l'amour et les soins médicaux sont essentiels, mais la nutrition joue un rôle décisif.",
    },
  },
  {
    id: "category-canino-premios-funcionales",
    name: "Premios funcionales (canino)",
    excerpt: {
      en: "The healthy treat that complements their nutrition.",
      fr: "La récompense saine qui complète sa nutrition.",
    },
    description: {
      en: "Spoiling your dog is one of the happiest moments of the day — but what if that treat could do more for them? Our functional treats line combines the delicious flavor they love with active ingredients that support their health, well-being and daily vitality.\nThey're not a medical treatment and don't replace clinical therapy; they're premium snacks designed to deliver a real, measurable benefit while strengthening the bond with your pet.",
      fr: "Gâter son chien est l'un des moments les plus heureux de la journée, mais si cette récompense pouvait aussi faire plus pour lui ? Notre gamme de friandises fonctionnelles associe la saveur délicieuse qu'ils adorent à des ingrédients actifs qui soutiennent leur santé, leur bien-être et leur vitalité quotidienne.\nElles ne constituent ni un traitement médical ni une thérapie clinique ; ce sont des friandises premium conçues pour apporter un bénéfice réel et mesurable tout en renforçant le lien avec votre animal.",
    },
    complementaryText: {
      en: "Delicious dog treats with active ingredients that support your dog's daily health and well-being. Designed to spoil them with the flavor they love, while delivering a real benefit — without disrupting the balance of their daily nutrition.",
      fr: "De délicieuses friandises pour chien, avec des ingrédients actifs qui soutiennent sa santé et son bien-être quotidien. Conçues pour le gâter avec la saveur qu'il adore, tout en apportant un bénéfice réel, sans perturber l'équilibre de sa nutrition quotidienne.",
    },
  },
  {
    id: "category-canino-suplementos",
    name: "Suplementos (canino)",
    excerpt: {
      en: "Smart hydration and vitality for your dog.",
      fr: "Une hydratation intelligente et de la vitalité pour votre chien.",
    },
    description: {
      en: "Keeping your dog well hydrated is vital, but plain water isn't always enough to replenish their energy or encourage them to drink what they need. Our Vitality Water line is an innovative alternative that turns daily hydration into a refreshing, delicious and highly nutritious habit. It doesn't replace their food or act as a clinical treatment; it's the perfect complement to make sure your companion gets the water and micronutrients their body needs to perform at its best.",
      fr: "Maintenir son chien bien hydraté est essentiel, mais l'eau seule ne suffit pas toujours à reconstituer son énergie ou à l'inciter à boire ce dont il a besoin. Notre gamme Vitality Water est une alternative innovante qui transforme l'hydratation quotidienne en une habitude rafraîchissante, savoureuse et hautement nutritive. Elle ne remplace pas son alimentation et ne constitue pas un traitement clinique ; c'est le complément parfait pour garantir que votre compagnon reçoive l'eau et les micronutriments dont son corps a besoin pour fonctionner au mieux.",
    },
    complementaryText: {
      en: "Flavored drinks that support your dog's well-being with a real, preventive benefit — keeping them active, protected and healthily hydrated every day.",
      fr: "Des boissons aromatisées qui soutiennent le bien-être de votre chien avec un bénéfice réel et préventif, le maintenant actif, protégé et sainement hydraté chaque jour.",
    },
  },
  {
    id: "category-canino-alimentos-humedos",
    name: "Alimentos húmedos (canino)",
    excerpt: {
      en: "Complete nutrition that also indulges.",
      fr: "Une nutrition complète qui fait aussi plaisir.",
    },
    description: {
      en: "Our wet food line offers complete nutrition, made with premium selected ingredients. As 100% balanced recipes, they guarantee the nutrients your dog needs, whether used as their sole source of food with total confidence, or as part of a diet combined with dry food. Each recipe has been developed with different life stages in mind — puppies, adults and seniors — or specific conditions that require special care, ensuring light digestion and optimal health.",
      fr: "Notre gamme d'aliments humides offre une nutrition complète, élaborée avec des ingrédients sélectionnés de première qualité. Étant des recettes 100% équilibrées, elle garantit les nutriments dont votre chien a besoin, que ce soit comme unique source d'alimentation en toute confiance, ou comme complément d'une alimentation avec des croquettes. Chaque recette a été développée en pensant aux différentes étapes de développement (chiots, adultes et seniors) ou à des conditions spécifiques nécessitant un soin particulier, garantissant une digestion légère et une santé optimale.",
    },
    complementaryText: {
      en: "Scientifically formulated foods that cover all your dog's nutritional needs at every stage or condition of their life. Perfect for delighting their palate while caring for their health.",
      fr: "Des aliments formulés scientifiquement pour couvrir tous les besoins nutritionnels de votre chien à chaque étape ou condition de sa vie. Parfaits pour ravir son palais tout en prenant soin de sa santé.",
    },
  },

  // ── Felino ──────────────────────────────────────────────────────
  {
    // Ya tiene complementaryText y excerpt en/fr cargados — solo description.
    id: "b377fa52-c4a8-42b6-8f88-179788df3d1d",
    name: "Nutrición diaria (felino)",
    description: {
      en: "Every life stage of a cat has specific nutritional needs. Daily nutrition is the first line of prevention: a balanced supply of protein, energy, vitamins and minerals that supports development, vitality and long-term health.\nNourishing goes beyond feeding — it means precision at every stage, kitten, adult and senior, respecting the species' unique physiological traits, such as its distinct amino acid requirements. Well-formulated daily nutrition doesn't just meet requirements: it anticipates future challenges and builds the foundation for healthy aging.",
      fr: "Chaque étape de vie du chat a des besoins nutritionnels spécifiques. La nutrition quotidienne est la première ligne de prévention : un apport équilibré en protéines, énergie, vitamines et minéraux qui soutient le développement, la vitalité et la santé à long terme.\nNourrir va au-delà de l'alimentation : il s'agit d'apporter une précision à chaque étape — chaton, adulte et senior — en respectant les particularités physiologiques de l'espèce, comme ses besoins uniques en acides aminés. Une nutrition quotidienne bien formulée ne couvre pas seulement les besoins : elle anticipe les défis futurs et construit les bases d'un vieillissement en bonne santé.",
    },
  },
  {
    id: "category-felino-nutricion-especializada",
    name: "Nutrición especializada (felino)",
    excerpt: {
      en: "Specialized nutrition for every need",
      fr: "Une nutrition spécialisée pour chaque besoin",
    },
    description: {
      en: "Not every cat has the same needs. Each condition, life stage or lifestyle calls for a different nutritional approach, with targeted formulations: selected ingredients, adjusted nutritional profiles and inclusion levels designed for each particular case. This isn't a generic solution — it's a nutritional approach that supports the veterinarian in managing cases that require greater precision and clinical follow-up.",
      fr: "Tous les chats n'ont pas les mêmes besoins. Chaque condition, étape de vie ou style de vie requiert une approche nutritionnelle différente, avec des formulations ciblées : ingrédients sélectionnés, profils nutritionnels ajustés et niveaux d'inclusion pensés pour chaque cas particulier. Ce n'est pas une solution générique, mais une approche nutritionnelle qui accompagne le vétérinaire dans la gestion de cas exigeant plus de précision et de suivi clinique.",
    },
    complementaryText: {
      en: "Aware of each cat's specific needs, at NUPEC® we've formulated a family of Specialized Super Premium products backed by nutritional scientific research, ensuring the highest quality nutrition so you can keep sharing unforgettable moments together.",
      fr: "Conscients des besoins spécifiques de chaque chat, chez NUPEC® nous avons formulé une famille de produits Super Premium Spécialisés, soutenus par la recherche scientifique en nutrition, garantissant une nutrition de la plus haute qualité pour continuer à partager des moments inoubliables ensemble.",
    },
    stats: [
      {
        key: "ea2da1efdda1",
        label: { en: "Quality checks", fr: "Contrôles de qualité" },
        description: {
          en: "47 quality checks in the selection of raw materials",
          fr: "47 contrôles de qualité dans la sélection des matières premières",
        },
      },
      {
        key: "3ec1e10ce6a8",
        label: { en: "Specialized formulas", fr: "Formules spécialisées" },
        description: {
          en: "Foods formulated for your cat's specific needs.",
          fr: "Aliments formulés pour les besoins spécifiques de votre chat.",
        },
      },
    ],
  },
  {
    id: "category-felino-nutricion-clinica",
    name: "Nutrición clínica (felino)",
    excerpt: {
      en: "Therapeutic diets that support medical treatment.",
      fr: "Des diètes thérapeutiques qui soutiennent le traitement médical.",
    },
    description: {
      en: "Clinical nutrition holds a different place than daily or specialized nutrition: these are therapeutic diets scientifically designed to manage disease, prevent relapse and extend cats' lives through the precise modification of their nutrients, becoming an active part of medical treatment. Their prescription and monitoring are the exclusive responsibility of the veterinarian, who determines their use based on diagnosis and the patient's progress. Formulated with precise levels of key nutrients, these diets support the management of specific conditions, helping improve treatment response and the patient's quality of life.",
      fr: "La nutrition clinique occupe une place différente de la nutrition quotidienne ou spécialisée : il s'agit de diètes thérapeutiques conçues scientifiquement pour traiter les maladies, prévenir les rechutes et prolonger la vie des chats grâce à une modification précise de leurs nutriments, devenant ainsi partie active du traitement médical. Leur prescription et leur suivi relèvent exclusivement du vétérinaire, qui en détermine l'usage selon le diagnostic et l'évolution du patient. Formulées avec des niveaux précis de nutriments clés, ces diètes soutiennent la gestion de conditions spécifiques, contribuant à améliorer la réponse au traitement et la qualité de vie du patient.",
    },
    complementaryText: {
      en: "Cats have a highly specialized metabolism and very strict nutritional requirements. When they face an illness, nutrition becomes a fundamental pillar.",
      fr: "Les chats ont un métabolisme hautement spécialisé et des besoins nutritionnels très stricts. Lorsqu'ils font face à une maladie, la nutrition devient un pilier fondamental.",
    },
  },
  {
    id: "category-felino-premios-funcionales",
    name: "Premios funcionales (felino)",
    excerpt: {
      en: "The healthy treat that complements their nutrition.",
      fr: "La récompense saine qui complète sa nutrition.",
    },
    description: {
      en: "NUPEC functional treats are allies for your cat's health. Each creamy treat, with its irresistible texture, is formulated with active ingredients and scientific backing to deliver a real benefit. It's the perfect way to spoil them, reward them, or make giving medication easier — with the peace of mind of adding real value to their nutrition.",
      fr: "Les friandises fonctionnelles NUPEC sont des alliées de la santé de votre chat. Chaque friandise crémeuse, à la texture irrésistible, est formulée avec des ingrédients actifs et un soutien scientifique pour apporter un bénéfice réel. C'est la façon idéale de le gâter, de le récompenser ou de faciliter la prise de médicaments, avec l'assurance d'apporter de vrais bénéfices à sa nutrition.",
    },
    complementaryText: {
      en: "Delicious creamy treats with active ingredients that support your cat's health and encourage healthy daily hydration.",
      fr: "De délicieuses friandises crémeuses avec des ingrédients actifs qui soutiennent la santé de votre chat et favorisent une hydratation quotidienne saine.",
    },
  },
  {
    id: "category-felino-alimentos-humedos",
    name: "Alimentos húmedos (felino)",
    excerpt: {
      en: "Complete nutrition that also indulges.",
      fr: "Une nutrition complète qui fait aussi plaisir.",
    },
    description: {
      en: "Cats have very particular biological requirements, where nutrition and water intake go hand in hand. Our line offers biologically complete and balanced nutrition, made with the highest quality ingredients. This formula allows it to be your pet's sole source of food or the ideal daily complement. Each recipe is designed for different life stages (kittens, adults, seniors) or specific conditions, ensuring a gourmet experience that cares for their metabolism and respects their carnivorous nature.",
      fr: "Les chats ont des besoins biologiques très particuliers, où la nutrition et la consommation d'eau vont de pair. Notre gamme offre une nutrition biologiquement complète et équilibrée, élaborée avec des ingrédients de la plus haute qualité. Cette formule lui permet d'être l'unique source d'alimentation de votre animal ou le complément quotidien idéal. Chaque recette est conçue pour les différentes étapes de vie (chatons, adultes, seniors) ou des conditions spécifiques, garantissant une expérience gastronomique qui préserve son métabolisme et respecte sa nature carnivore.",
    },
    complementaryText: {
      en: "Scientifically formulated foods that cover all your cat's nutritional needs according to their life stage or condition. Complements their diet and acts as a crucial source of additional hydration to protect their health.",
      fr: "Des aliments formulés scientifiquement pour couvrir tous les besoins nutritionnels de votre chat selon son étape ou sa condition. Complète son alimentation et agit comme une source cruciale d'hydratation supplémentaire pour protéger sa santé.",
    },
  },
];
