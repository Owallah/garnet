/**
 * Types for drafted content.
 *
 * These drafts are the fallback layer: pages render Sanity content when it
 * exists and this when it does not, so the site is never empty and the client
 * has real copy to edit rather than a blank CMS.
 *
 * Every value here is traceable to the company profile unless marked
 * `requiresApproval`, which flags copy that was written to fill a structural
 * gap the profile does not cover.
 */

export type Feature = {
  title: string;
  description: string;
};

export type Step = {
  title: string;
  description: string;
};

export type ServiceCategory = "financing" | "investment" | "logistics";

export type DraftService = {
  title: string;
  slug: string;
  category: ServiceCategory;
  /** Under 220 characters - used in cards, meta descriptions and nav. */
  shortDescription: string;
  overview: string[];
  /**
   * Required. States whether Garnet facilitates through partners or commits
   * its own capital. This is the sentence that must never drift.
   */
  garnetRole: string;
  capabilities: Feature[];
  audience: Array<"SMEs" | "Corporates" | "Individuals">;
  process: Step[];
  relatedIndustries: string[];
  relatedSolutions: string[];
  imageBrief: string;
  requiresApproval?: boolean;
};

export type DraftSolution = {
  title: string;
  slug: string;
  audienceLabel: string;
  description: string;
  overview: string[];
  painPoints: Feature[];
  services: string[];
  imageBrief: string;
  requiresApproval?: boolean;
};

export type DraftIndustry = {
  title: string;
  slug: string;
  description: string;
  overview: string[];
  challenges: Feature[];
  relevantServices: string[];
  imageBrief: string;
  requiresApproval?: boolean;
};

export type DraftFaq = {
  question: string;
  answer: string[];
  category: "financing" | "investment" | "logistics" | "general";
  /** Slugs of services this FAQ should also appear on. */
  services?: string[];
};

export type DraftPerson = {
  name: string;
  position: string;
  biography: string;
  order: number;
};