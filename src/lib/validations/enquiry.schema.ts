import { z } from "zod";
import { consentField, emailField, honeypotField, nameField, phoneField } from "./shared";

/**
 * Investment enquiry. Deliberately does not collect financial position,
 * documents or identity data - an enquiry only needs to start a conversation.
 */
export const enquirySchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  opportunitySlug: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.enum(["structured-fixed-income", "project", "venture", "real-estate", "general"], {
    message: "Select an area of interest",
  }),
  message: z.string().trim().min(20, "Tell us a little more").max(2000),
  consent: consentField,
  website: honeypotField,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
