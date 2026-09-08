import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Overrides the page title. Aim for 50–60 characters.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Shown in search results. Aim for 140–160 characters.",
      validation: (rule) => rule.max(180),
    }),
    defineField({ name: "canonical", type: "url" }),
    defineField({ name: "ogImage", title: "Social share image", type: "image" }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
    defineField({ name: "primaryLabel", type: "string" }),
    defineField({ name: "primaryHref", type: "string" }),
    defineField({ name: "secondaryLabel", type: "string" }),
    defineField({ name: "secondaryHref", type: "string" }),
  ],
});

export const richText = defineType({
  name: "richText",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
  ],
});

/** Reusable labelled item used for capabilities, benefits, challenges. */
export const featureItem = defineType({
  name: "featureItem",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon name, e.g. 'landmark'. Optional.",
    }),
  ],
});

export const processStep = defineType({
  name: "processStep",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const heroImage = defineType({
  name: "heroImage",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Describe the image for screen readers.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "credit", type: "string", title: "Photo credit / licence" }),
  ],
});
