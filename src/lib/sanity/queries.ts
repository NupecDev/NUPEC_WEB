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

export const categoryIntrosBySpeciesQuery = groq`
  *[_type == "category" && species == $species] | order(order asc) {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    species,
    "description": description[$lang],
    "excerpt": excerpt[$lang],
    "complementaryText": complementaryText[$lang],
    familyImage
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
    "slug": select(
      slug.current match ($categoria + "/*") => string::split(slug.current, "/")[1],
      slug.current
    ),
    "tagline": tagline[$lang],
    color,
    image,
    lifeStage,
    breedSize,
    specialNeeds,
    "presentations": presentations[]{
      "value": select(_type == "presentation" => weight, @)
    }.value
  }
`;

export const productBySlugQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    category->slug.current == $categoria &&
    (slug.current == $slug || slug.current == ($categoria + "/" + $slug)) &&
    isActive == true
  ][0] {
    _id,
    "name": name[$lang],
    "slug": select(
      slug.current match ($categoria + "/*") => string::split(slug.current, "/")[1],
      slug.current
    ),
    "tagline": tagline[$lang],
    color,
    "description": description[$lang],
    "ingredients": ingredients[$lang],
    image,
    technicalSheet,
    "presentations": presentations[]{
      "value": select(_type == "presentation" => weight, @)
    }.value,
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
    },
    "guaranteedAnalysis": guaranteedAnalysis[]{
      label,
      value,
      min
    },
    "claims": claims[]{
      icon,
      "text": text[$lang]
    },
    "highTech": highTech[]{
      icon,
      "title": title[$lang],
      "description": description[$lang]
    },
    "keyBenefits": keyBenefits[]{
      icon,
      "description": description[$lang]
    },
    "kibble": {
      "image": kibble.image,
      "description": kibble.description[$lang]
    },

    // ── Clinical-only fields ─────────────────────────────────────
    "clinicalIndications": clinicalIndications[]{
      "label": label[$lang],
      icon
    },
    "mechanismOfAction": mechanismOfAction[] | order(step asc) {
      step,
      "title": title[$lang],
      "description": description[$lang],
      icon
    },
    "clinicalCases": clinicalCases[]->{
      _id,
      "title": title[$lang],
      "slug": slug.current,
      patient,
      "diagnosis": diagnosis[$lang],
      "history": history[$lang],
      "intervention": intervention[$lang],
      "duration": duration[$lang],
      "outcome": outcome[$lang],
      metrics,
      author,
      isPublished
    },
    "technicalResources": technicalResources[]{
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "fileUrl": file.asset->url
    },
    "differentiators": differentiators[]{
      icon,
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "description": description[$lang]
    }
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    species,
    "description": description[$lang],
    "excerpt": excerpt[$lang],
    familyImage
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
