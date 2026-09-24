import { z } from "zod";
import { FINANCING_NEEDS, KENYA_COUNTIES } from "@/lib/site-config";
import {
  companyField,
  consentField,
  emailField,
  honeypotField,
  nameField,
  phoneField,
} from "./shared";

/** Step 1 - what the enquiry is about. */
export const financingStepOneSchema = z.object({
  financingNeed: z.enum(FINANCING_NEEDS, { message: "Choose a financing need" }),
  applicantType: z.enum(["sme", "corporate", "individual"], {
    message: "Tell us who is applying",
  }),
});

/** Step 2 - who is asking. */
export const financingStepTwoSchema = z.object({
  fullName: nameField,
  company: companyField,
  email: emailField,
  phone: phoneField,
  county: z.enum(KENYA_COUNTIES, { message: "Select a county" }),
  industry: z.string().trim().min(2, "Select or enter an industry").max(120),
});

/**
 * Step 3 - the request itself.
 * Amount is a range band, not a free number: bands qualify an enquiry
 * without implying an offer, and they survive currency changes.
 */
export const financingStepThreeSchema = z.object({
  amountBand: z.enum(
    ["under-1m", "1m-5m", "5m-20m", "20m-100m", "over-100m", "undecided"],
    { message: "Select an approximate amount" },
  ),
  currency: z.enum(["KES", "USD"]).default("KES"),
  purpose: z
    .string()
    .trim()
    .min(20, "Describe what the financing is for (at least 20 characters)")
    .max(1200),
  timeline: z.enum(["immediate", "1-3-months", "3-6-months", "exploring"], {
    message: "Select a timeline",
  }),
  additionalInformation: z.string().trim().max(2000).optional().or(z.literal("")),
});

/** Step 4 - review and consent. */
export const financingStepFourSchema = z.object({
  consent: consentField,
  website: honeypotField,
});

export const financingSchema = financingStepOneSchema
  .merge(financingStepTwoSchema)
  .merge(financingStepThreeSchema)
  .merge(financingStepFourSchema);

export type FinancingInput = z.infer<typeof financingSchema>;
export type FinancingStep = 1 | 2 | 3 | 4;

export const financingStepSchemas = {
  1: financingStepOneSchema,
  2: financingStepTwoSchema,
  3: financingStepThreeSchema,
  4: financingStepFourSchema,
} as const;

export const AMOUNT_BAND_LABELS: Record<
  z.infer<typeof financingStepThreeSchema>["amountBand"],
  string
> = {
  "under-1m": "Under 1 million",
  "1m-5m": "1 – 5 million",
  "5m-20m": "5 – 20 million",
  "20m-100m": "20 – 100 million",
  "over-100m": "Over 100 million",
  undecided: "Not decided yet",
};
