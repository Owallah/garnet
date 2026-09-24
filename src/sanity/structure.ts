import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation.
 *
 * Two things this fixes over the default document list:
 *
 * 1. `siteSettings` is a singleton. The default list lets an editor create a
 *    second one, and then the site silently reads whichever the query happens
 *    to return first. Here it is a single editable document with no "create"
 *    action, reached directly.
 *
 * 2. Documents are grouped the way the client thinks about the site rather
 *    than alphabetically by schema name.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Garnet")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(
          S.documentTypeList("service")
            .title("Services")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("Solutions")
        .schemaType("solution")
        .child(
          S.documentTypeList("solution")
            .title("Solutions")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("Industries")
        .schemaType("industry")
        .child(
          S.documentTypeList("industry")
            .title("Industries")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Investment opportunities")
        .schemaType("investmentOpportunity")
        .child(
          S.documentTypeList("investmentOpportunity")
            .title("Investment opportunities")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),

      S.listItem()
        .title("Leadership")
        .schemaType("teamMember")
        .child(
          S.documentTypeList("teamMember")
            .title("Leadership")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("FAQs")
        .schemaType("faq")
        .child(
          S.documentTypeList("faq")
            .title("FAQs")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
    ]);