/**
 * NUPEC – Seed script: Categorías Canino (ES / EN / FR)
 *
 * Uso:
 *   npx ts-node --esm seed-categories-canino.ts
 *   — o con tsx —
 *   npx tsx seed-categories-canino.ts
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (con permisos de escritura)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─────────────────────────────────────────────
//  Tipo auxiliar
// ─────────────────────────────────────────────
interface CategorySeed {
  _type: "category";
  name: { es: string; en: string; fr: string };
  slug: { _type: "slug"; current: string };
  species: "canino";
  description: { es: string; en: string; fr: string };
  order: number;
}

// ─────────────────────────────────────────────
//  Datos
// ─────────────────────────────────────────────
const categories: CategorySeed[] = [
  // ── 1. NUTRICIÓN DIARIA ──────────────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Nutrición diaria",
      en: "Daily Nutrition",
      fr: "Nutrition quotidienne",
    },
    slug: { _type: "slug", current: "nutricion-diaria" },
    species: "canino",
    order: 1,
    description: {
      es: `POTENCIA CADA DÍA DE SU VIDA

En NUPEC somos conscientes de que cada perro es único. Por eso diseñamos productos específicos para cada etapa de vida, formulados para satisfacer las necesidades nutricionales precisas de cachorros, adultos y seniors. Nuestra pasión es potenciar la salud, la vitalidad y la productividad animal para nutrir la plenitud del vínculo HUMANO-CANINO.

PRODUCTOS DISEÑADOS POR EXPERTOS
Inspirados en elevar la calidad de vida de cada mascota, formulamos una familia de productos con más del 90% de digestibilidad de la proteína, respaldados por expertos en nutrición, veterinarios y científicos especializados en el desarrollo de alimentos. Nuestra prioridad es nutrir conscientemente el lazo que une a humanos y caninos, para que sigan compartiendo momentos inolvidables.`,

      en: `ENHANCING EVERY DAY OF THEIR LIVES

At NUPEC, we understand that every dog is unique. That's why we design specific products for each life stage, formulated to meet the precise nutritional needs of puppies, adults, and senior dogs. Our passion is to enhance animal health, vitality, and well-being to nurture the full potential of the HUMAN-DOG bond.

PRODUCTS DESIGNED BY EXPERTS
Inspired by the goal of improving every pet's quality of life, we've formulated a product line with over 90% protein digestibility, backed by nutrition experts, veterinarians, and scientists specializing in food development. Our priority is to consciously nurture the bond between humans and dogs, so they can continue to share unforgettable moments.`,

      fr: `DE L'ÉNERGIE POUR CHAQUE JOUR DE SA VIE

Chez NUPEC, nous savons que chaque chien est unique. C'est pourquoi nous concevons des produits spécifiques pour chaque étape de la vie, formulés pour répondre aux besoins nutritionnels précis des chiots, des chiens adultes et des chiens âgés. Notre passion est de favoriser la santé, la vitalité et la forme physique des animaux afin de nourrir pleinement le lien entre l'homme et le chien.

DES PRODUITS CONÇUS PAR DES EXPERTS
Soucieux d'améliorer la qualité de vie de chaque animal de compagnie, nous avons formulé une gamme de produits dont la digestibilité des protéines dépasse 90 %, avec le soutien d'experts en nutrition, de vétérinaires et de scientifiques spécialisés dans le développement d'aliments. Notre priorité est de nourrir consciemment le lien qui unit les humains et les chiens, afin qu'ils continuent à partager des moments inoubliables.`,
    },
  },

  // ── 2. NUTRICIÓN ESPECIALIZADA ───────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Nutrición especializada",
      en: "Specialized Nutrition",
      fr: "Nutrition spécialisée",
    },
    slug: { _type: "slug", current: "nutricion-especializada" },
    species: "canino",
    order: 2,
    description: {
      es: `NUTRICIÓN A LA MEDIDA DE SU NATURALEZA

Cada perro tiene una composición corporal, un metabolismo y un estilo de vida distintos. La Nutrición Especializada NUPEC responde a esas particularidades con fórmulas desarrolladas para razas pequeñas, perros activos, hembras gestantes o en lactancia y otras necesidades fisiológicas específicas. Porque nutrir bien no es solo alimentar, es entender a fondo quién es tu perro.

CIENCIA APLICADA A CADA DIFERENCIA
Nuestros productos especializados combinan perfiles proteicos de alta calidad, niveles calóricos precisos y micronutrientes estratégicamente dosificados. Cada fórmula es el resultado de investigación científica rigurosa y del trabajo conjunto de nutriólogos, veterinarios y zootecnistas, comprometidos con hacer de cada comida un aporte real a la salud de tu compañero.`,

      en: `NUTRITION TAILORED TO THEIR NATURE

Every dog has a unique body composition, metabolism, and lifestyle. NUPEC Specialized Nutrition addresses these particularities with formulas developed for small breeds, active dogs, pregnant or lactating females, and other specific physiological needs. Because proper nutrition isn't just feeding — it's truly understanding your dog.

SCIENCE APPLIED TO EVERY DIFFERENCE
Our specialized products combine high-quality protein profiles, precise caloric levels, and strategically dosed micronutrients. Each formula is the result of rigorous scientific research and collaborative work between nutritionists, veterinarians, and animal scientists, committed to making every meal a real contribution to your companion's health.`,

      fr: `UNE NUTRITION ADAPTÉE À SA NATURE

Chaque chien a une composition corporelle, un métabolisme et un mode de vie qui lui sont propres. La Nutrition Spécialisée NUPEC répond à ces particularités avec des formules développées pour les petites races, les chiens actifs, les femelles gestantes ou allaitantes et d'autres besoins physiologiques spécifiques. Car bien nourrir ne se limite pas à alimenter : c'est comprendre en profondeur qui est votre chien.

LA SCIENCE AU SERVICE DE CHAQUE DIFFÉRENCE
Nos produits spécialisés combinent des profils protéiques de haute qualité, des niveaux caloriques précis et des micronutriments dosés de manière stratégique. Chaque formule est le fruit d'une recherche scientifique rigoureuse et d'un travail collaboratif entre nutritionnistes, vétérinaires et zootechniciens, engagés à faire de chaque repas une contribution réelle à la santé de votre compagnon.`,
    },
  },

  // ── 3. NUTRICIÓN CLÍNICA ─────────────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Nutrición clínica",
      en: "Clinical Nutrition",
      fr: "Nutrition clinique",
    },
    slug: { _type: "slug", current: "nutricion-clinica" },
    species: "canino",
    order: 3,
    description: {
      es: `EL ALIADO NUTRICIONAL DEL ESPECIALISTA VETERINARIO

Cuando la salud de un perro requiere intervención clínica, la alimentación se convierte en parte del tratamiento. La línea de Nutrición Clínica NUPEC está formulada en estrecha colaboración con médicos veterinarios especialistas para apoyar el manejo nutricional de condiciones diagnosticadas como enfermedad renal, hepática, cardíaca, gastrointestinal y más. Cada producto es una herramienta terapéutica.

PRECISIÓN NUTRICIONAL, RESULTADOS VERIFICABLES
Nuestras dietas clínicas están desarrolladas con base en evidencia científica actualizada, con niveles de nutrientes clínicamente relevantes y una palatabilidad cuidadosamente trabajada para garantizar la aceptación del paciente. Recomendadas y supervisadas por el médico veterinario, estas fórmulas están diseñadas para mejorar la calidad de vida de cada paciente canino.`,

      en: `THE VETERINARY SPECIALIST'S NUTRITIONAL ALLY

When a dog's health requires clinical intervention, nutrition becomes part of the treatment. NUPEC's Clinical Nutrition line is formulated in close collaboration with specialist veterinarians to support the nutritional management of diagnosed conditions such as renal, hepatic, cardiac, and gastrointestinal disease, and more. Every product is a therapeutic tool.

NUTRITIONAL PRECISION, VERIFIABLE RESULTS
Our clinical diets are developed based on current scientific evidence, with clinically relevant nutrient levels and carefully crafted palatability to ensure patient acceptance. Recommended and supervised by the veterinarian, these formulas are designed to improve the quality of life of every canine patient.`,

      fr: `L'ALLIÉ NUTRITIONNEL DU VÉTÉRINAIRE SPÉCIALISTE

Lorsque la santé d'un chien nécessite une intervention clinique, l'alimentation devient une partie intégrante du traitement. La gamme de Nutrition Clinique NUPEC est formulée en étroite collaboration avec des vétérinaires spécialistes pour soutenir la prise en charge nutritionnelle de conditions diagnostiquées telles que les maladies rénales, hépatiques, cardiaques, gastro-intestinales et autres. Chaque produit est un outil thérapeutique.

PRÉCISION NUTRITIONNELLE, RÉSULTATS VÉRIFIABLES
Nos régimes cliniques sont développés sur la base de données scientifiques actualisées, avec des niveaux de nutriments cliniquement pertinents et une palatabilité soigneusement travaillée pour garantir l'acceptation par le patient. Recommandées et supervisées par le vétérinaire, ces formules sont conçues pour améliorer la qualité de vie de chaque patient canin.`,
    },
  },

  // ── 4. PREMIOS FUNCIONALES ───────────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Premios funcionales",
      en: "Functional Treats",
      fr: "Récompenses fonctionnelles",
    },
    slug: { _type: "slug", current: "premios-funcionales" },
    species: "canino",
    order: 4,
    description: {
      es: `CADA PREMIO, UN MOMENTO QUE TAMBIÉN NUTRE

Los premios NUPEC no son solo recompensas: son una extensión de la filosofía de nutrición consciente que nos define. Formulados con ingredientes funcionales seleccionados, cada bocado refuerza el vínculo entre tú y tu perro mientras aporta beneficios reales a su salud: digestión, pelaje, articulaciones, inmunidad y más.

PLACER CON PROPÓSITO
Desarrollados por nuestro equipo científico con la misma rigurosidad que nuestras líneas principales, los Premios Funcionales NUPEC combinan alta palatabilidad con ingredientes activos de eficacia comprobada. Porque los momentos de conexión merecen productos que estén a la altura del amor que les tienes.`,

      en: `EVERY TREAT, A MOMENT THAT ALSO NOURISHES

NUPEC treats are more than rewards — they are an extension of the conscious nutrition philosophy that defines us. Formulated with selected functional ingredients, every bite strengthens the bond between you and your dog while delivering real health benefits: digestion, coat, joints, immunity, and more.

PLEASURE WITH PURPOSE
Developed by our scientific team with the same rigor as our main product lines, NUPEC Functional Treats combine high palatability with proven active ingredients. Because moments of connection deserve products that match the love you have for them.`,

      fr: `CHAQUE RÉCOMPENSE, UN MOMENT QUI NOURRIT AUSSI

Les récompenses NUPEC ne sont pas de simples friandises : elles sont le prolongement de la philosophie de nutrition consciente qui nous définit. Formulées avec des ingrédients fonctionnels soigneusement sélectionnés, chaque bouchée renforce le lien entre vous et votre chien tout en apportant de vrais bénéfices pour sa santé : digestion, pelage, articulations, immunité et bien plus.

LE PLAISIR AVEC UN BUT
Développées par notre équipe scientifique avec la même rigueur que nos gammes principales, les Récompenses Fonctionnelles NUPEC associent une haute palatabilité à des ingrédients actifs à l'efficacité prouvée. Parce que les moments de complicité méritent des produits à la hauteur de l'amour que vous leur portez.`,
    },
  },

  // ── 5. SUPLEMENTOS ──────────────────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Suplementos",
      en: "Supplements",
      fr: "Suppléments",
    },
    slug: { _type: "slug", current: "suplementos" },
    species: "canino",
    order: 5,
    description: {
      es: `NUTRICIÓN QUE VA MÁS ALLÁ DEL PLATO

Hay etapas de vida y condiciones específicas donde el organismo de tu perro necesita un apoyo adicional. Los Suplementos NUPEC están diseñados para complementar la dieta diaria con nutrientes clave —vitaminas, minerales, ácidos grasos y más— en formas de alta biodisponibilidad que el cuerpo puede aprovechar de forma óptima.

RESPALDO CIENTÍFICO PARA CADA NECESIDAD
Formulados por nuestros especialistas en nutrición animal con base en investigación clínica actualizada, los suplementos NUPEC cubren desde el soporte articular hasta la salud inmunológica, la condición del pelaje y el bienestar reproductivo. Una herramienta precisa para el cuidado integral del perro en cada momento de su vida.`,

      en: `NUTRITION THAT GOES BEYOND THE BOWL

There are specific life stages and conditions where your dog's body needs additional support. NUPEC Supplements are designed to complement the daily diet with key nutrients — vitamins, minerals, fatty acids, and more — in highly bioavailable forms that the body can optimally absorb.

SCIENTIFIC BACKING FOR EVERY NEED
Formulated by our animal nutrition specialists based on current clinical research, NUPEC supplements cover everything from joint support to immune health, coat condition, and reproductive well-being. A precise tool for the comprehensive care of your dog at every stage of life.`,

      fr: `UNE NUTRITION QUI VA AU-DELÀ DE L'ÉCUELLE

Il existe des étapes de vie et des conditions spécifiques où l'organisme de votre chien a besoin d'un soutien supplémentaire. Les Suppléments NUPEC sont conçus pour compléter l'alimentation quotidienne avec des nutriments essentiels — vitamines, minéraux, acides gras et bien plus — sous des formes hautement biodisponibles que l'organisme peut utiliser de manière optimale.

UN SOUTIEN SCIENTIFIQUE POUR CHAQUE BESOIN
Formulés par nos spécialistes en nutrition animale sur la base de recherches cliniques actualisées, les suppléments NUPEC couvrent tout, du soutien articulaire à la santé immunitaire, en passant par la condition du pelage et le bien-être reproductif. Un outil précis pour le soin global de votre chien à chaque étape de sa vie.`,
    },
  },

  // ── 6. ALIMENTOS HÚMEDOS ────────────────────────────────────────────────
  {
    _type: "category",
    name: {
      es: "Alimentos húmedos",
      en: "Wet Food",
      fr: "Aliments humides",
    },
    slug: { _type: "slug", current: "alimentos-humedos" },
    species: "canino",
    order: 6,
    description: {
      es: `LA HIDRATACIÓN TAMBIÉN SE COME

Los alimentos húmedos NUPEC aportan algo que el kibble convencional no puede ofrecer: un contenido de humedad que contribuye activamente al estado hídrico de tu perro, especialmente relevante en etapas críticas como la vejez, la recuperación postquirúrgica o cuando el apetito disminuye. Nutrición completa, palatabilidad superior, hidratación integrada.

TEXTURA QUE ENAMORA, FÓRMULA QUE CUIDA
Elaborados con proteínas animales de alta calidad y sin rellenos artificiales, nuestros alimentos húmedos ofrecen el balance nutricional completo de NUPEC en una presentación irresistible para el paladar canino. Ideales como alimento único o como complemento de la dieta seca, adaptándose a las preferencias y necesidades de cada perro.`,

      en: `HYDRATION YOU CAN EAT

NUPEC wet foods offer something conventional kibble cannot: a moisture content that actively supports your dog's hydration status — especially relevant during critical stages such as senior years, post-surgical recovery, or when appetite decreases. Complete nutrition, superior palatability, built-in hydration.

A TEXTURE THEY LOVE, A FORMULA THAT CARES
Made with high-quality animal proteins and no artificial fillers, our wet foods deliver NUPEC's complete nutritional balance in a presentation irresistible to the canine palate. Ideal as a standalone meal or as a complement to dry food, adapting to every dog's preferences and needs.`,

      fr: `L'HYDRATATION SE MANGE AUSSI

Les aliments humides NUPEC apportent quelque chose que les croquettes conventionnelles ne peuvent pas offrir : une teneur en humidité qui contribue activement à l'état d'hydratation de votre chien, particulièrement importante lors d'étapes critiques telles que la vieillesse, la récupération post-chirurgicale ou lorsque l'appétit diminue. Nutrition complète, palatabilité supérieure, hydratation intégrée.

UNE TEXTURE QUI SÉDUIT, UNE FORMULE QUI PREND SOIN
Élaborés avec des protéines animales de haute qualité et sans charges artificielles, nos aliments humides offrent l'équilibre nutritionnel complet de NUPEC dans une présentation irrésistible pour le palais canin. Idéaux en tant qu'aliment unique ou en complément de l'alimentation sèche, ils s'adaptent aux préférences et aux besoins de chaque chien.`,
    },
  },
];

// ─────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────
async function seed() {
  console.log(`\n🐾  NUPEC – Seed categorías canino`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  for (const cat of categories) {
    const docId = `category-canino-${cat.slug.current}`;

    // Upsert: si ya existe lo reemplaza, si no lo crea
    const result = await client.createOrReplace({
      _id: docId,
      ...cat,
    });

    console.log(`  ✅  [${cat.order}] ${cat.name.es.padEnd(28)} → _id: ${result._id}`);
  }

  console.log(`\n✨  ${categories.length} categorías canino importadas correctamente.\n`);
}

seed().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
