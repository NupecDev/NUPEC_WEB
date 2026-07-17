/**
 * NUPEC – Seed script: Categorías Felino faltantes (ES / EN / FR)
 *
 * Crea las 4 categorías felino que aún no existían en Sanity:
 *   - nutricion-especializada
 *   - nutricion-clinica
 *   - premios-funcionales
 *   - alimentos-humedos
 *
 * (nutricion-diaria y suplementos para felino ya existen y no se tocan aquí)
 *
 * Uso:
 *   npx tsx scripts/seed-categories-felino.ts
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

interface CategorySeed {
  _id: string;
  _type: "category";
  name: { es: string; en: string; fr: string };
  slug: { _type: "slug"; current: string };
  species: "felino";
  description: { es: string; en: string; fr: string };
  order: number;
}

const categories: CategorySeed[] = [
  // ── 2. NUTRICIÓN ESPECIALIZADA ───────────────────────────────────────────
  {
    _id: "category-felino-nutricion-especializada",
    _type: "category",
    name: {
      es: "Nutrición especializada",
      en: "Specialized Nutrition",
      fr: "Nutrition spécialisée",
    },
    slug: { _type: "slug", current: "nutricion-especializada" },
    species: "felino",
    order: 2,
    description: {
      es: `NUTRICIÓN A LA MEDIDA DE SU NATURALEZA

Cada gato tiene una composición corporal, un metabolismo y un estilo de vida distintos. La Nutrición Especializada NUPEC responde a esas particularidades con fórmulas desarrolladas para gatos de interior, hembras gestantes o en lactancia y otras necesidades fisiológicas específicas. Porque nutrir bien no es solo alimentar, es entender a fondo quién es tu gato.

CIENCIA APLICADA A CADA DIFERENCIA
Nuestros productos especializados combinan perfiles proteicos de alta calidad, niveles calóricos precisos y micronutrientes estratégicamente dosificados. Cada fórmula es el resultado de investigación científica rigurosa y del trabajo conjunto de nutriólogos, veterinarios y zootecnistas, comprometidos con hacer de cada comida un aporte real a la salud de tu compañero.`,

      en: `NUTRITION TAILORED TO THEIR NATURE

Every cat has a unique body composition, metabolism, and lifestyle. NUPEC Specialized Nutrition addresses these particularities with formulas developed for indoor cats, pregnant or lactating females, and other specific physiological needs. Because proper nutrition isn't just feeding — it's truly understanding your cat.

SCIENCE APPLIED TO EVERY DIFFERENCE
Our specialized products combine high-quality protein profiles, precise caloric levels, and strategically dosed micronutrients. Each formula is the result of rigorous scientific research and collaborative work between nutritionists, veterinarians, and animal scientists, committed to making every meal a real contribution to your companion's health.`,

      fr: `UNE NUTRITION ADAPTÉE À SA NATURE

Chaque chat a une composition corporelle, un métabolisme et un mode de vie qui lui sont propres. La Nutrition Spécialisée NUPEC répond à ces particularités avec des formules développées pour les chats d'intérieur, les femelles gestantes ou allaitantes et d'autres besoins physiologiques spécifiques. Car bien nourrir ne se limite pas à alimenter : c'est comprendre en profondeur qui est votre chat.

LA SCIENCE AU SERVICE DE CHAQUE DIFFÉRENCE
Nos produits spécialisés combinent des profils protéiques de haute qualité, des niveaux caloriques précis et des micronutriments dosés de manière stratégique. Chaque formule est le fruit d'une recherche scientifique rigoureuse et d'un travail collaboratif entre nutritionnistes, vétérinaires et zootechniciens, engagés à faire de chaque repas une contribution réelle à la santé de votre compagnon.`,
    },
  },

  // ── 3. NUTRICIÓN CLÍNICA ─────────────────────────────────────────────────
  {
    _id: "category-felino-nutricion-clinica",
    _type: "category",
    name: {
      es: "Nutrición clínica",
      en: "Clinical Nutrition",
      fr: "Nutrition clinique",
    },
    slug: { _type: "slug", current: "nutricion-clinica" },
    species: "felino",
    order: 3,
    description: {
      es: `EL ALIADO NUTRICIONAL DEL ESPECIALISTA VETERINARIO

Cuando la salud de un gato requiere intervención clínica, la alimentación se convierte en parte del tratamiento. La línea de Nutrición Clínica NUPEC está formulada en estrecha colaboración con médicos veterinarios especialistas para apoyar el manejo nutricional de condiciones diagnosticadas como enfermedad renal, hepática, cardíaca, gastrointestinal y más. Cada producto es una herramienta terapéutica.

PRECISIÓN NUTRICIONAL, RESULTADOS VERIFICABLES
Nuestras dietas clínicas están desarrolladas con base en evidencia científica actualizada, con niveles de nutrientes clínicamente relevantes y una palatabilidad cuidadosamente trabajada para garantizar la aceptación del paciente. Recomendadas y supervisadas por el médico veterinario, estas fórmulas están diseñadas para mejorar la calidad de vida de cada paciente felino.`,

      en: `THE VETERINARY SPECIALIST'S NUTRITIONAL ALLY

When a cat's health requires clinical intervention, nutrition becomes part of the treatment. NUPEC's Clinical Nutrition line is formulated in close collaboration with specialist veterinarians to support the nutritional management of diagnosed conditions such as renal, hepatic, cardiac, and gastrointestinal disease, and more. Every product is a therapeutic tool.

NUTRITIONAL PRECISION, VERIFIABLE RESULTS
Our clinical diets are developed based on current scientific evidence, with clinically relevant nutrient levels and carefully crafted palatability to ensure patient acceptance. Recommended and supervised by the veterinarian, these formulas are designed to improve the quality of life of every feline patient.`,

      fr: `L'ALLIÉ NUTRITIONNEL DU VÉTÉRINAIRE SPÉCIALISTE

Lorsque la santé d'un chat nécessite une intervention clinique, l'alimentation devient une partie intégrante du traitement. La gamme de Nutrition Clinique NUPEC est formulée en étroite collaboration avec des vétérinaires spécialistes pour soutenir la prise en charge nutritionnelle de conditions diagnostiquées telles que les maladies rénales, hépatiques, cardiaques, gastro-intestinales et autres. Chaque produit est un outil thérapeutique.

PRÉCISION NUTRITIONNELLE, RÉSULTATS VÉRIFIABLES
Nos régimes cliniques sont développés sur la base de données scientifiques actualisées, avec des niveaux de nutriments cliniquement pertinents et une palatabilité soigneusement travaillée pour garantir l'acceptation par le patient. Recommandées et supervisées par le vétérinaire, ces formules sont conçues pour améliorer la qualité de vie de chaque patient félin.`,
    },
  },

  // ── 4. PREMIOS FUNCIONALES ───────────────────────────────────────────────
  {
    _id: "category-felino-premios-funcionales",
    _type: "category",
    name: {
      es: "Premios funcionales",
      en: "Functional Treats",
      fr: "Récompenses fonctionnelles",
    },
    slug: { _type: "slug", current: "premios-funcionales" },
    species: "felino",
    order: 4,
    description: {
      es: `CADA PREMIO, UN MOMENTO QUE TAMBIÉN NUTRE

Los premios NUPEC no son solo recompensas: son una extensión de la filosofía de nutrición consciente que nos define. Formulados con ingredientes funcionales seleccionados, cada bocado refuerza el vínculo entre tú y tu gato mientras aporta beneficios reales a su salud: digestión, pelaje, articulaciones, inmunidad y más.

PLACER CON PROPÓSITO
Desarrollados por nuestro equipo científico con la misma rigurosidad que nuestras líneas principales, los Premios Funcionales NUPEC combinan alta palatabilidad con ingredientes activos de eficacia comprobada. Porque los momentos de conexión merecen productos que estén a la altura del amor que les tienes.`,

      en: `EVERY TREAT, A MOMENT THAT ALSO NOURISHES

NUPEC treats are more than rewards — they are an extension of the conscious nutrition philosophy that defines us. Formulated with selected functional ingredients, every bite strengthens the bond between you and your cat while delivering real health benefits: digestion, coat, joints, immunity, and more.

PLEASURE WITH PURPOSE
Developed by our scientific team with the same rigor as our main product lines, NUPEC Functional Treats combine high palatability with proven active ingredients. Because moments of connection deserve products that match the love you have for them.`,

      fr: `CHAQUE RÉCOMPENSE, UN MOMENT QUI NOURRIT AUSSI

Les récompenses NUPEC ne sont pas de simples friandises : elles sont le prolongement de la philosophie de nutrition consciente qui nous définit. Formulées avec des ingrédients fonctionnels soigneusement sélectionnés, chaque bouchée renforce le lien entre vous et votre chat tout en apportant de vrais bénéfices pour sa santé : digestion, pelage, articulations, immunité et bien plus.

LE PLAISIR AVEC UN BUT
Développées par notre équipe scientifique avec la même rigueur que nos gammes principales, les Récompenses Fonctionnelles NUPEC associent une haute palatabilité à des ingrédients actifs à l'efficacité prouvée. Parce que les moments de complicité méritent des produits à la hauteur de l'amour que vous leur portez.`,
    },
  },

  // ── 6. ALIMENTOS HÚMEDOS ────────────────────────────────────────────────
  {
    _id: "category-felino-alimentos-humedos",
    _type: "category",
    name: {
      es: "Alimentos húmedos",
      en: "Wet Food",
      fr: "Aliments humides",
    },
    slug: { _type: "slug", current: "alimentos-humedos" },
    species: "felino",
    order: 6,
    description: {
      es: `LA HIDRATACIÓN TAMBIÉN SE COME

Los alimentos húmedos NUPEC aportan algo que el kibble convencional no puede ofrecer: un contenido de humedad que contribuye activamente al estado hídrico de tu gato, especialmente relevante en etapas críticas como la vejez, la recuperación postquirúrgica o cuando el apetito disminuye. Nutrición completa, palatabilidad superior, hidratación integrada.

TEXTURA QUE ENAMORA, FÓRMULA QUE CUIDA
Elaborados con proteínas animales de alta calidad y sin rellenos artificiales, nuestros alimentos húmedos ofrecen el balance nutricional completo de NUPEC en una presentación irresistible para el paladar felino. Ideales como alimento único o como complemento de la dieta seca, adaptándose a las preferencias y necesidades de cada gato.`,

      en: `HYDRATION YOU CAN EAT

NUPEC wet foods offer something conventional kibble cannot: a moisture content that actively supports your cat's hydration status — especially relevant during critical stages such as senior years, post-surgical recovery, or when appetite decreases. Complete nutrition, superior palatability, built-in hydration.

A TEXTURE THEY LOVE, A FORMULA THAT CARES
Made with high-quality animal proteins and no artificial fillers, our wet foods deliver NUPEC's complete nutritional balance in a presentation irresistible to the feline palate. Ideal as a standalone meal or as a complement to dry food, adapting to every cat's preferences and needs.`,

      fr: `L'HYDRATATION SE MANGE AUSSI

Les aliments humides NUPEC apportent quelque chose que les croquettes conventionnelles ne peuvent pas offrir : une teneur en humidité qui contribue activement à l'état d'hydratation de votre chat, particulièrement importante lors d'étapes critiques telles que la vieillesse, la récupération post-chirurgicale ou lorsque l'appétit diminue. Nutrition complète, palatabilité supérieure, hydratation intégrée.

UNE TEXTURE QUI SÉDUIT, UNE FORMULE QUI PREND SOIN
Élaborés avec des protéines animales de haute qualité et sans charges artificielles, nos aliments humides offrent l'équilibre nutritionnel complet de NUPEC dans une présentation irrésistible pour le palais félin. Idéaux en tant qu'aliment unique ou en complément de l'alimentation sèche, ils s'adaptent aux préférences et aux besoins de chaque chat.`,
    },
  },
];

// ─────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────
async function seed() {
  console.log(`\n🐾  NUPEC – Seed categorías felino faltantes`);
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`);

  for (const cat of categories) {
    const result = await client.createOrReplace(cat);
    console.log(`  ✅  [${cat.order}] ${cat.name.es.padEnd(28)} → _id: ${result._id}`);
  }

  console.log(`\n✨  ${categories.length} categorías felino creadas correctamente.\n`);
}

seed().catch((err) => {
  console.error("❌  Error durante el seed:", err.message);
  process.exit(1);
});
