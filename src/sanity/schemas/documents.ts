import { defineArrayMember, defineField, defineType } from "sanity";

const slugField = defineField({
  name: "slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", type: "string", initialValue: "Garnet Solutions Limited" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "phone",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Leave empty until the client confirms the numbers.",
    }),
    defineField({ name: "whatsapp", type: "string", description: "Full international format." }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({ name: "officeHours", type: "string" }),
    defineField({
      name: "mapEmbedUrl",
      type: "url",
      description: "Google Maps embed URL for the contact page.",
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: ["LinkedIn", "X", "Facebook", "Instagram", "YouTube"],
              },
            }),
            defineField({ name: "url", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({ name: "footerSummary", type: "text", rows: 3 }),
    defineField({ name: "defaultSeo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "category",
      type: "string",
      options: { list: ["financing", "investment", "logistics"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({ name: "heroImage", type: "heroImage" }),
    defineField({ name: "overview", type: "richText" }),
    defineField({
      name: "garnetRole",
      title: "Garnet's role",
      type: "text",
      rows: 4,
      description:
        "Must state accurately whether Garnet facilitates through partners or deploys its own capital.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "capabilities", type: "array", of: [defineArrayMember({ type: "featureItem" })] }),
    defineField({ name: "benefits", type: "array", of: [defineArrayMember({ type: "featureItem" })] }),
    defineField({ name: "process", type: "array", of: [defineArrayMember({ type: "processStep" })] }),
    defineField({
      name: "audience",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: ["SMEs", "Corporates", "Individuals"] },
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })],
    }),
    defineField({
      name: "relatedSolutions",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })],
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
    }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", type: "heroImage" }),
    defineField({
      name: "painPoints",
      title: "What this audience is dealing with",
      type: "array",
      of: [defineArrayMember({ type: "featureItem" })],
    }),
    defineField({
      name: "services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({ name: "process", type: "array", of: [defineArrayMember({ type: "processStep" })] }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", type: "heroImage" }),
    defineField({
      name: "challenges",
      type: "array",
      of: [defineArrayMember({ type: "featureItem" })],
      description: "Sector-specific. Avoid text that would read identically for another industry.",
    }),
    defineField({ name: "financingNeeds", type: "richText" }),
    defineField({ name: "logisticsNeeds", type: "richText" }),
    defineField({
      name: "relevantServices",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "relevantSolutions",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })],
    }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "position", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "biography", type: "text", rows: 6 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "position", media: "photo" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", type: "richText", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["financing", "investment", "logistics", "general"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedService",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

export const investmentOpportunity = defineType({
  name: "investmentOpportunity",
  title: "Investment opportunity",
  type: "document",
  description:
    "Only publish after written client approval. Never enter figures that have not been approved.",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "richText" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["structured-fixed-income", "real-estate", "project", "venture", "corporate"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minimumInvestment",
      type: "string",
      description: "Leave empty unless the client has approved a figure in writing.",
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["open", "under-review", "closed"], layout: "radio" },
      initialValue: "under-review",
    }),
    defineField({ name: "featuredImage", type: "heroImage" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "riskDisclosure",
      type: "richText",
      description: "Required before publishing.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "body", type: "richText" }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
