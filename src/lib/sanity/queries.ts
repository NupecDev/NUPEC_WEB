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

export const randomBannerProductsQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    isActive == true
  ] {
    _id,
    "name": name[$lang],
    "slug": select(
      slug.current match (category->slug.current + "/*") => string::split(slug.current, "/")[1],
      slug.current
    ),
    "tagline": tagline[$lang],
    color,
    image,
    bannerImage,
    "category": {
      "name": category->name[$lang],
      "slug": category->slug.current
    }
  }
`;

export const clinicalProductsByCategoryQuery = groq`
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
    "indications": clinicalIndications[]{
      "label": label[$lang]
    }.label
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
    "warnings": warnings[$lang],
    image,
    bannerImage,
    benefitsBannerImage,
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
      "notes": notes[$lang],
      "secondaryTitle": secondaryTitle[$lang],
      "secondaryWeightColumnLabel": secondaryWeightColumnLabel[$lang],
      "secondaryColumnGroups": secondaryColumnGroups[]{
        "label": label[$lang],
        "subColumns": subColumns[]{
          "label": label[$lang]
        }
      },
      "secondaryTableRows": secondaryTableRows[]{
        weightLabel,
        values
      },
      "secondaryNotes": secondaryNotes[$lang]
    },
    "guaranteedAnalysis": guaranteedAnalysis[]{
      label,
      value,
      min
    },
    "claims": claims[]{
      icon,
      invertColors,
      "text": text[$lang]
    },
    "highTech": highTech[]{
      icon,
      "title": title[$lang],
      "description": description[$lang]
    },
    "highTechTitleOverride": highTechTitleOverride[$lang],
    "keyBenefits": keyBenefits[]{
      icon,
      invertColors,
      "description": description[$lang]
    },
    "kibble": {
      "image": kibble.image{
        ...,
        "isGif": asset->mimeType == "image/gif"
      },
      "video": kibble.video.asset->{
        "url": url,
        mimeType
      },
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
      "iconUrl": icon.asset->url
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
      "bullets": bullets[]{
        "title": title[$lang],
        "description": description[$lang]
      }
    },
    "ingredientHighlights": ingredientHighlights[]->{
      _id,
      "name": name[$lang],
      "eyebrow": eyebrow[$lang],
      "summary": summary[$lang],
      image,
      "keyPoints": keyPoints[]{
        icon,
        "text": text[$lang]
      },
      "studies": studies[]{
        type,
        "title": title[$lang],
        duration,
        "result": result[$lang],
        externalUrl,
        "pdf": pdf.asset->{ url }
      },
      "badges": badges[]{
        image,
        "label": label[$lang]
      }
    }
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug && species == $species][0] {
    _id,
    "name": name[$lang],
    "slug": slug.current,
    species,
    "description": description[$lang],
    "excerpt": excerpt[$lang],
    familyImage,
    bannerImage,
    "stats": stats[] {
      value,
      "label": label[$lang],
      "description": description[$lang]
    }
  }
`;

// ── Wizard ─────────────────────────────────────────────────────────────────────

export const wizardProductsQuery = groq`
  *[
    _type == "product" &&
    species == $species &&
    isActive == true &&
    ($lifeStage == null || $lifeStage in lifeStage) &&
    ($breedSize == null || $breedSize in breedSize || "todas" in breedSize) &&
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
