import type { SchemaTypeDefinition } from "sanity";
import { cta, featureItem, heroImage, processStep, richText, seo } from "./objects";
import {
  faq,
  industry,
  investmentOpportunity,
  page,
  service,
  siteSettings,
  solution,
  teamMember,
} from "./documents";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  cta,
  richText,
  featureItem,
  processStep,
  heroImage,
  // documents
  siteSettings,
  service,
  solution,
  industry,
  teamMember,
  faq,
  investmentOpportunity,
  page,
];
