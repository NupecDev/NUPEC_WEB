import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

function structure(S: StructureBuilder) {
  return S.list()
    .title("NUPEC")
    .items([
      // ── Productos ──────────────────────────────────────────────
      S.listItem()
        .title("Productos — Canino")
        .schemaType("product")
        .child(
          S.documentList()
            .title("Productos Caninos")
            .filter('_type == "product" && species == "canino"')
            .defaultOrdering([
              { field: "category.name.es", direction: "asc" },
              { field: "name.es", direction: "asc" },
            ])
        ),
      S.listItem()
        .title("Productos — Felino")
        .schemaType("product")
        .child(
          S.documentList()
            .title("Productos Felinos")
            .filter('_type == "product" && species == "felino"')
            .defaultOrdering([
              { field: "category.name.es", direction: "asc" },
              { field: "name.es", direction: "asc" },
            ])
        ),

      S.divider(),

      // ── Categorías ─────────────────────────────────────────────
      S.listItem()
        .title("Categorías — Canino")
        .schemaType("category")
        .child(
          S.documentList()
            .title("Categorías Caninas")
            .filter('_type == "category" && species == "canino"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Categorías — Felino")
        .schemaType("category")
        .child(
          S.documentList()
            .title("Categorías Felinas")
            .filter('_type == "category" && species == "felino"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // ── Nutrición ──────────────────────────────────────────────
      S.documentTypeListItem("feedingGuide").title("Guías de Alimentación"),

      // ── Próximamente ───────────────────────────────────────────
      // S.documentTypeListItem("blogPost").title("Blog"),
      // S.documentTypeListItem("page").title("Páginas"),
      // S.documentTypeListItem("retailer").title("Dónde Comprar"),
      // S.documentTypeListItem("wizard").title("Wizard"),
    ]);
}

export default defineConfig({
  name: "nupec-studio",
  title: "NUPEC Studio",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    ...(process.env.NODE_ENV !== "production" ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
});
