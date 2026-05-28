import { groq } from "next-sanity";

// ── Categorías ────────────────────────────────────────────────────────────────

export const categoriesBySpeciesQuery = groq`
  *[_type == "category" && species == $species] | order(order asc) {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    species,
    "description": description[$lang]
  }
`;

// ── Productos ─────────────────────────────────────────────────────────────────

export const productsByCategoryQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    category->slug.current == $categoria &&
    isActive == true
  ] | order(name.es asc) {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    "tagline": tagline[$lang],
    image,
    lifeStage,
    breedSize,
    specialNeeds,
    presentations
  }
`;

export const productBySlugQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    category->slug.current == $categoria &&
    slug.current == $slug &&
    isActive == true
  ][0] {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    "tagline": tagline[$lang],
    "description": description[$lang],
    "ingredients": ingredients[$lang],
    image,
    technicalSheet,
    presentations,
    lifeStage,
    breedSize,
    specialNeeds,
    "category": {
      "name": category->name[$lang],
      "slug": category->slug.current
    },
    "feedingGuide": feedingGuide->{
      rows,
      "notes": notes[$lang]
    }
  }
`;

// ── Wizard ─────────────────────────────────────────────────────────────────────

export const wizardProductsQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    isActive == true &&
    ($lifeStage == null || lifeStage == $lifeStage) &&
    ($breedSize == null || breedSize == $breedSize || breedSize == "todas") &&
    ($specialNeed == null || $specialNeed in specialNeeds)
  ] | order(name.es asc) {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    "tagline": tagline[$lang],
    image,
    species,
    "categoria": category->slug.current
  }
`;
